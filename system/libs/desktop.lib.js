
$(document).on('click', 'layout > nav.desktopBar > ul.primary-desktopBar > li > button', function(e){
    e.preventDefault
    let appid = $(this).attr('btn-id')
    if(appid === undefined){
        return false; // error handler
    }else{
        app.open(appid)
    }

})