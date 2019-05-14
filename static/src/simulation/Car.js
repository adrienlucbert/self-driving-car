class Car {
    constructor(env = null) {
        this.env = env;
        this.position = new Vector(400, 300);
        this.size = new Vector(30, 15);
        this.maxSpeed = 20;
        this.wheelSpeed = 0;
        this.physics = new Physics(10);
        this.physics.addForce('friction', 0, (physics, args) => {
            return (-physics.speed * 5);
        });
        this.physics.addForce('tow', 0, (physics, args) => {
            return (args.wheelSpeed * args.maxSpeed);
        });
        this.wheelDir = 0;
        this.rotationSpeed = 50;
        this.direction = 0;
        if (env) env.objs.push(this);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        ctx.rotate(this.direction * Math.PI / 180);
        ctx.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        this.move();
    }

    showInfo(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.rect(ctx.canvas.clientWidth - 100, 0, 100, 110);
        ctx.fill();
        ctx.font = '15px sans-serif';
        ctx.fillStyle = 'rgb(220, 220, 220)';
        ctx.fillText(`speed: ${this.physics.speed.toFixed(2)}`, ctx.canvas.clientWidth - 90, 20);
        ctx.fillText(`accel: ${this.physics.acceleration.toFixed(2)}`, ctx.canvas.clientWidth - 90, 40);
        ctx.fillText(`wheel: ${this.wheelSpeed.toFixed(2)}`, ctx.canvas.clientWidth - 90, 60);
        ctx.fillText(`dir:   ${this.wheelDir.toFixed(2)}`, ctx.canvas.clientWidth - 90, 80);
        ctx.fillText(`fric:  ${this.physics.getForce('friction').toFixed(2)}`, ctx.canvas.clientWidth - 90, 100);
        ctx.closePath();
    }

    move() {
        const args = {'wheelSpeed':this.wheelSpeed, 'maxSpeed':this.maxSpeed};

        this.physics.update(this.env, args);

        const speed = this.physics.speed * this.maxSpeed / this.env.framerate;

        this.position.x += speed * Math.cos((this.direction) * Math.PI / 180);
        this.position.y += speed * Math.sin((this.direction) * Math.PI / 180);

        this.direction += (this.wheelDir * this.rotationSpeed * this.physics.speed) / this.env.framerate;
    }
    
    getWheelDir() {
        return (this.wheelDir);
    }
    
    setWheelDir(dir) {
        if (dir >= -1 && dir <= 1) {
            this.wheelDir = dir;
        } else {
            console.warn("Wheel direction out of range [-1; 1]");
        }
    }

    getWheelSpeed() {
        return (this.wheelSpeed);
    }

    setWheelSpeed(speed) {
        if (speed >= -0.5 && speed <= 1)
            this.wheelSpeed = speed;
        else
            console.warn("Wheel speed out of range [-0.5; 1]");
    }
}