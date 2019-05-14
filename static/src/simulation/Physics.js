class Physics {
    constructor(mass = 0) {
        this.mass = mass;
        this.acceleration = 0;
        this.speed = 0;
        this.forces = [];
    }

    update(env = null, args = null) {
        for (let index in this.forces) {
            this.forces[index].update(this, args);
        }
        if (this.mass != 0)
            this.acceleration = this.getSum() / this.mass;
        else
            this.acceleration = this.getSum();
        this.speed += this.acceleration / env.getElapsedTime();
    }

    addForce(name = null, value = 0, updater = null) {
        let force = new Force(name, value, updater);
        this.forces.push(force);
    }

    getForce(name) {
        const force = this.forces.find(el => el.name === name);

        if (!force) {
            console.warn(`Could not find force ${name}.`);
            return (0);
        } else {
            return (force.getValue());
        }
    }

    getSum() {
        let sum = 0;

        for (let index in this.forces) {
            sum += this.forces[index].getValue();
        }
        return (sum);
    }
}

class Force {
    constructor(name = null, value = 0, updater = null) {
        this.name = name;
        this.value = value;
        this.updater = updater;
    }

    update(physics, args) {
        if (this.updater) this.setValue(this.updater(physics, args));
    }

    setName(name = null) {
        this.name = name;
    }

    setValue(value = 0) {
        this.value = value;
    }

    getValue() {
        return (this.value);
    }

    setUpdater(updater = null) {
        this.updater = updater;
    }
}