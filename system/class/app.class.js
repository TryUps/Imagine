/*
 *  Nap App
*/
const app = function(settings){
    
}

app.prototype.open = function(options){
    let app = {}
    if(typeof options === 'string'){
        app.id = options
    }else{
        options = options || {}
        app = options;
    }
    console.log(app.id)
    appContent = $.ajax({url: 'apps/ml.imagine.naptest.app/index.html', async: false}).responseText;
    $("layout > desktop").append("<main id='appxs'></main>");
    var win = document.querySelector('main').attachShadow({mode:'closed'});
    win.innerHTML = appContent;
}

app.prototype.start = function() {
    
}

module.exports = exports = app;