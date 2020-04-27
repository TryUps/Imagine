const system = require("./class/system.class.js");
let win = require("./class/window.class.js");
let app = require("./class/app.class.js");
const sys = new system("./imagine.json");
win = new win();
app = new app();
sys.load({
    el: "body",
    url: "./ui/imagine.ui/desktop/index.html",
    time: 100,
    fade: 5000
});