const canvas = document.querySelector("canvas");
const framerate = 60;
const env = new Simulation(canvas, framerate);
new Track(env, "/src/track/test.json");
const car = new Car(env);

env.run();

document.addEventListener("loop", () => {
    car.showInfo(env.getContext());
});

document.onkeydown = (evt) => {
    if (evt.key == ' ') {
        car.setWheelDir(0);
        car.setWheelSpeed(0);
    }
    if (evt.key == "ArrowUp")
        car.setWheelSpeed(1);
    if (evt.key == "ArrowDown")
        car.setWheelSpeed(-0.5);
    if (evt.key == "ArrowRight")
        car.setWheelDir(1)
    if (evt.key == "ArrowLeft")
        car.setWheelDir(-1)
};