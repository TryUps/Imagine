const System = function(options){

}

System.prototype.load = async function(){
    let response = await fetch('layout/desktop/desktop.html')
    let responseText = await response.text()
    document.querySelector('imagine.container').innerHTML = responseText
}

module.exports = exports = System