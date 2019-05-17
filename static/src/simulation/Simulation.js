class Simulation {
    constructor(canvas = null, framerate = 60) {
        this.canvas = canvas;
        this.ctx = (canvas ? canvas.getContext('2d') : null);
        this.framerate = framerate;
        this.objs = [];
        this.timer = performance.now();
        this.loop = null;

        this.evtLoop = new CustomEvent('loop');
    }

    run() {
        if (!this.loop && this.canvas) {
            this.loop = setInterval(() => {
                this.render();
                document.dispatchEvent(this.evtLoop);
            }, 1000 / this.framerate);
        }
    }

    stop() {
        if (this.loop) {
            clearInterval(this.loop);
            this.loop = null;
        }
    }

    isRunning() {
        return (this.loop != null);
    }

    setFramerate(framerate) {
        if (framerate > 0) this.framerate = framerate;
    }

    getCanvas() {
        return (this.canvas);
    }

    getContext() {
        return (this.ctx);
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    getElapsedTime() {
        return (performance.now() - this.timer);
    }

    getTrack() {
        for (let index in this.objs) {
            if (this.objs[index] instanceof Track)
                return (this.objs[index]);
        }
        return (undefined);
    }

    render() {
        const fps = 1000 / this.getElapsedTime();

        if (this.isRunning()) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let index in this.objs) {
                this.ctx.beginPath();
                this.ctx.save();
                this.objs[index].render(this.ctx);
                this.ctx.restore();
                this.ctx.closePath();
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = '#444444';
            this.ctx.font = '20px sans-serif';
            this.ctx.fillText(`${parseInt(fps)}`, 10, this.canvas.height - 10);
            this.ctx.closePath();
            this.timer += this.getElapsedTime();
        }
    }
}