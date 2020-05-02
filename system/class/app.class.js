const fs = require('fs-extra')
const path = require('path')
const App = function(options){
    return false;
}

App.prototype.open = function(app){
    if(typeof app === 'string'){
        appid = app
        app = {}
        app.id = appid
    }else{
        app = app || {}
    }

    if(!this.exists(app.id).boolean) return false;
    app.path = this.exists(app.id).path
    if(this.isOpen(app.id)){
        console.log(this.isOpen(app.id))
        if($("layout > desktop > window[app-id='"+app.id+"']").css("display") == "block"){
            return this.hide(app.id);
        }else{
            return this.show(app.id);
        }
    }

    that = this;
    String.prototype.replaceArray = function(find, replace) {
        return that.replaceArray(this,find,replace)
    }

    String.prototype.getfunctions = function(abc){
        var string = this;
        return this;
    }

    var rep = {}
    rep.old = [
        "{%app.content%}",
        "{%app.id%}",
        "{%app.title%}",
        "{%path%}",
        "{%style%}",
        "{%app.window.styles%}"
    ]
    rep.new = [
        app.text,
        app.id,
        app.title,
        app.path,
        app.path+"/res/style.css",
        "width:;height:;"
    ]

    let desktop = document.querySelector('layout > desktop')
    let window = this.load('./layout/window/default.html')
    let win = document.createElement(`window`)
    win.setAttribute('app-id',app.id)
    win.setAttribute('class','app center')
    win.innerHTML += window.replaceArray(rep.old,rep.new);
    desktop.appendChild(win)

    $("layout > desktop > [app-id='"+app.id+"']").draggable({
        handle: "window-nav,[data-window-move='true']",
        start: function(event, ui) { 
            $("window").removeClass("active");
            ui.helper.addClass('active'); 
            ui.helper.removeClass("center");
        }
    }).resizable().delay(100).fadeIn(500);
    app.content = this.load(`${app.path}index.html`),
    app.content = app.content.replaceArray(rep.old,rep.new)
 
   /* let nap = document.querySelector(`window[app-id='${app.id}']`)
    zody = document.createElement('window-content')
    zody.attachShadow({mode:'open'}).innerHTML += app.content
    let script = document.createElement('script')
    script.textContent = `
        var btn = document.getElementById('btn')
        btn.addEventListener('click', function(e){
            e.preventDefault
            var div = document.getElementById('text')
            text.innerHTML = "works !"
        })
    `
    zody.appendChild(script)
    nap.appendChild(zody)*/

    let windowApp = document.querySelector(`window[app-id='${app.id}'] > window-content`).shadowRoot
    windowApp.innerHTML += app.content;
    let framework = document.createElement('link')
    framework.type = 'text/css'
    framework.rel = 'stylesheet'
    framework.href = './layout/css/framework.css'

    windowApp.append(framework)

    let splash = document.createElement('splash')
    splash.class = 'splash-screen'
    splash.id = 'splash'
    splash.innerHTML = `<img src='' class='app-icon' />`
    windowApp.append(splash)
    
    setTimeout(function(){
        $(`window[app-id='${app.id}'] > window-content`).shadowRoot().find('splash').fadeOut(1000, function(){
            $(this).remove()
        })
    }, 1000);
}

App.prototype.alert = function(options){
    if(typeof options === 'string'){
        message = options
    }else{
        message = message || {}
    }
}

App.prototype.load = function(file){
    let req = new XMLHttpRequest();
    req.open("GET", file, false);
    req.send(null);
    return req.responseText; 
}

App.prototype.replaceArray = function(string, find, replace){
    var replaceString = string;
    var regex;
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
}

App.prototype.show = function(appid){
    $("layout > desktop > window").removeClass("active");
    $("layout > desktop > [app-id='"+appid+"']").addClass("active");
    $("layout > desktop > [app-id='"+appid+"']").delay(100).fadeIn(500);
}

App.prototype.hide = function(appid){
    $("layout > desktop > [app-id='"+appid+"']").removeClass("active");
    $("layout > desktop > [app-id='"+appid+"']").delay(100).fadeOut(500);
}

App.prototype.window = function(options){
    let funcfu;
    let adol = void(0)

    return false;
}



App.prototype.exists = function(appid = 'sys.imagine.error'){
    let app = {}
    var paths = ["../apps/","../layout/","../../storage/apps/"]
    for (var i = 0; i < paths.length; i++){
        try {
            fs.statSync(path.join(__dirname,paths[i])+ appid +'.app/').isDirectory()
            
            let result = {
                boolean: true,
                path: path.join(__dirname,paths[i])+ appid +'.app/'
            }
            return result
        } catch (e) {
            this.open({id:'sys.imagine.error', flag:'--error-unknow-app'})
            result = {
                boolean: false,
                path: undefined
            }
            return result
        }
    }
}

App.prototype.isOpen = function(appid){
    if($("layout > desktop > window[app-id='"+appid+"']").length > 0){
        return true;
    }else{
        return false;
    }
}

App.prototype.isApp = function(appid){
    return false;
}

module.exports = exports = App