const system = function(settings){
    this.configfile = settings;
}

system.prototype.create = function(){
    return false;
}

system.prototype.build = {
    element: function(ele){
        console.log(ele);
    }
}

system.prototype.load = function({el,url,time,fade}){
    var el = el || "body";
    var url = url || "./";
    var time = time || 0;
    var fade = fade || 0;
    var page = $.get({url: url,async: false}).responseText || "Error !";

    setTimeout(function() {
      $(el).empty();
      $(el).html(page).hide().fadeIn(fade);
    }, time);
}

module.exports = system;