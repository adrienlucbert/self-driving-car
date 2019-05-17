class Ray {
    constructor(env = null, car, orientation) {
        let x = Math.cos(orientation * Math.PI / 180);
        let y = Math.sin(orientation * Math.PI / 180);
        this.origin = car;
        this.dir = new Vector(x, y);
        this.length = -1;
        this.env = env;
        if (env) env.objs.push(this);
    }

    castToWalls() {
        let track = this.env.getTrack();
        if (!track)
            return;
        for (let i in track.edges) {
            let wall = track.edges[i];
            for (let n = wall.length - 1; n >= 0; --n) {
                let tmp = n == 0 ? wall.length - 1 : n - 1;
                let start = new Vector(wall[n][0], wall[n][1]);
                let end = new Vector(wall[tmp][0], wall[tmp][1]);
                let length = this.getWallIntersect(start, end);
                if ((length < this.length || this.length < 0) && length != -1)
                    this.length = length;
            }
        }
    }

    getWallIntersect(start, end) {
        let rayStart = this.origin.getPosition();
        let rayEnd = new Vector(rayStart.x + this.dir.x, rayStart.y + this.dir.y);
        let div = (start.x - end.x) * (rayStart.y - rayEnd.y) - (start.y - end.y) * (rayStart.x - rayEnd.x);
        let t = (start.x - rayStart.x) * (rayStart.y - rayEnd.y) - (start.y - rayStart.y) * (rayStart.x - rayEnd.x);
        t /= div;
        let u = (start.x - end.x) * (start.y - rayStart.y) - (start.y - end.y) * (start.x - rayStart.x);
        u /= div;
        u *= -1;
        if (t <= 0 || t >= 1 || u <= 0)
            return (-1);
        let intersect = new Vector((start.x + t * (end.x - start.x)), (start.y + t * (end.y - start.y)));
        let length = Math.pow(intersect.x - rayStart.x, 2) + Math.pow(intersect.y - rayStart.y, 2);
        length = Math.sqrt(length);
        return (length);

    }

    render(ctx) {
        let pos = this.origin.getPosition();
        let x = 0;
        let y = 0;

        this.length = -1;
        this.castToWalls();
        if (this.length <= 0)
            return;
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        x = pos.x + (this.dir.x * this.length);
        y = pos.y + (this.dir.y * this.length);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}