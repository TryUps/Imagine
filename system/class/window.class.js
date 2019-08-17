const fs = require("fs-extra");
const path = require("path");

const win = function(){
    this._apppath = "./system/apps/";
    this.ui_apppath = "./system/ui/imagine.ui/";
    this.apppath = "./storage/%user%/apps/";
    this.window = {};
    this.window.url = "./ui/imagine.ui/window/index.html";
    this.window.ui = $.ajax({url: this.window.url, async: false}).responseText;
    this.window.settings = {
        type: "app",
        style: {
            width: "800px",
            height: "500px"
        }
    }
}

win.prototype.open = function({appid, flags, settings}){
    const app = {};
    app.id = appid || "";
    app.path = "about:blank",
    app.json = "/app.json";
    
    const window = {};
    window.settings = settings || this.window.settings;

    flags = flags || null;

    if(this.isOpen(app.id)){
        if($("layout > desktop > [appid='"+app.id+"']").css("display") == "block"){
            return this.hide(app.id);
        }else{
            return this.show(app.id);
        }
    }

    if(fs.existsSync(this._apppath+app.id)){
        app.path = this._apppath+app.id;
    }else{
        if(fs.existsSync(this.ui_apppath+app.id)){
            app.path = this.ui_apppath+appid;
        }else{
            if(fs.existsSync(this.apppath+app.id)){
                app.path = this.apppath+app.id;
            }else{
                app.path = "about:blank";
            }
        }
    }
    app.json = app.path+app.json;
    if(!fs.existsSync(app.json)){
        return this.error(001);
    }
    app.json = "."+app.json;
    app.json = $.ajax({url: app.json,dataType: "json",async: false}).responseText,
    app.json = JSON.parse(app.json);

    app.homepath = "."+app.path+"/"+app.json["launch"];
    app.title = app.json["productName"];

    app.text = $.ajax({url: app.homepath, async: false}).responseText;

    var oldVars = [
        "{%app.content%}",
        "{%app.id%}",
        "{%app.title%}",
        "{%path%}",
        "{%style%}",
        "{%app.window.styles%}"
    ];
    var newVars = [
        app.text,
        app.id,
        app.title,
        app.path+"/",
        app.path+"/res/style.css",
        "width:"+window.settings.style.width+";height:"+window.settings.style.height+";"
    ];

    String.prototype.replaceArray = function(find, replace) {
        var replaceString = this;
        var regex;
        for (var i = 0; i < find.length; i++) {
          regex = new RegExp(find[i], "g");
          replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    };

    window.ui = this.window.ui,
    window.ui = window.ui.replaceArray(oldVars,newVars);

    window.settings.type = window.settings.type || "app";
    if(window.settings.type == "interface"){
        window.ui = $(window.ui).addClass("win-interface");
        $(window.ui).css({
            bottom: "55px",
            left: "10px",
            "max-width": "380px",
            "min-width":"380px"
        })
    }

    if(this.isOpen(app.id)){
        $("layout > desktop > [appid='"+app.id+"']").fadeIn(500);
        $("layout > desktop > window").removeClass("active");
        $("layout > desktop > [appid='"+app.id+"']").addClass("active");
    }else{
        $("layout > desktop").append(window.ui);
    }
    $("layout > desktop > window").removeClass("active");
    $("layout > desktop > [appid='"+app.id+"']").addClass("active");
    $("layout > desktop > [appid='"+app.id+"']").draggable({
        handle: "nav,[data-window-move='true']",
        start: function(event, ui) { 
            $("window").removeClass("active");
            ui.helper.addClass('active'); 
        }
    }).resizable();
    $("layout > desktop > [appid='"+app.id+"']").delay(100).fadeIn(500);



}

win.prototype.show = function(appid){
    $("layout > desktop > window").removeClass("active");
    $("layout > desktop > [appid='"+appid+"']").addClass("active");
    $("layout > desktop > [appid='"+appid+"']").delay(100).fadeIn(500);

    this.alert({
        message: "olá"
    })
}

win.prototype.hide = function(appid){
    $("layout > desktop > [appid='"+appid+"']").removeClass("active");
    $("layout > desktop > window").addClass("active");
    $("layout > desktop > [appid='"+appid+"']").delay(100).fadeOut(500);
}

win.prototype.close = function(appid){
    $("layout > desktop > [appid='"+appid+"']").remove();
    $("layout > desktop > window").addClass("active")
}

win.prototype.max = function(appid){
    if($("layout > desktop > [appid='"+appid+"']").hasClass("max")){
        $("layout > desktop > [appid='"+appid+"']").removeClass("max");
    }else{
        $("layout > desktop > [appid='"+appid+"']").addClass("max");
    }
}

win.prototype.isOpen = function(appid){
    if($("layout > desktop > [appid='"+appid+"']").length > 0){
        return true;
    }else{
        return false;
    }
}

win.prototype.error = function(errorCode){
    return this.open({appid:"ig.system.error", flags:"--appcontent-{%errorcode%}:"+errorCode});
}

win.prototype.alert = function({title, message}){
    console.log(message);
}

win.prototype.appExists = function(path){
    try  {
        return fs.statSync(path).isFile();
      }
      catch (e) {
    
        if (e.code == 'ENOENT') { // no such file or directory. File really does not exist
          console.log("File does not exist.");
          return false;
        }
        
        console.log("Exception fs.statSync (" + path + "): " + e);
        throw e; // something else went wrong, we don't have rights, ...
    }
}

module.exports = win;