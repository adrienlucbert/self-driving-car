class Track {
    constructor(env = null, url = null) {
        this.env = env;
        this.init = false;
        this.title = null;
        this.size = new Vector(0, 0);
        this.edges = [];
        if (url) this.createFromURL(url);
        if (env) env.objs.push(this);
    }

    createFromJSON(json) {
        this.title = json.title;
        this.size.x = json.size[0];
        this.size.y = json.size[1];
        this.edges = json.edges;
        this.init = true;
    }

    createFromURL(url) {
        fetch(url)
        .then(data => data.json())
        .then(json => this.createFromJSON(json))
        .catch(err => {
            console.error("Couldn't create track.");
            console.error(err);
        });
    }

    dumpToJSON() {
        let json = {
            "title": this.title,
            "size": this.size,
            "edges": this.edges
        };

        return (json);
    }

    getOrigin(ctx) {
        let origin = new Vector(0, 0);
        let view = new Vector(ctx.canvas.clientWidth, ctx.canvas.clientHeight);

        origin.x = (view.x - this.size.x) / 2;
        origin.y = (view.y - this.size.y) / 2;
        return (origin);
    }

    render(ctx) {
        let origin = this.getOrigin(ctx);

        if (!this.init) return;
        ctx.beginPath();
        ctx.rect(origin.x, origin.y, this.size.x, this.size.y);
        ctx.fillStyle = "#65d649";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.edges[0][0][0], this.edges[1][0][1]);
        for (let index in this.edges[0]) {
            ctx.lineTo(this.edges[0][index][0], this.edges[0][index][1]);
        }
        ctx.fillStyle = "#666666";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.edges[1][0][0], this.edges[1][0][1]);
        for (let index in this.edges[1]) {
            ctx.lineTo(this.edges[1][index][0], this.edges[1][index][1]);
        }
        ctx.fillStyle = "#65d649";
        ctx.fill();
        ctx.closePath();
    }

    edit(ctx) {
        let save = this.edges;

        this.edges = [];
    }
}