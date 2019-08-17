const system = require("./class/system.class.js");
let win = require("./class/window.class.js");
const sys = new system("./imagine.json");
win = new win();
sys.load({
    el: "body",
    url: "./ui/imagine.ui/desktop/index.html",
    time: 100,
    fade: 5000
});