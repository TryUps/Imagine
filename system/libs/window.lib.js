$(document).on('dblclick','window > window-nav', function(e){
    e.preventDefault()
    $(this).parent().removeClass('center')
    $(this).parent().toggleClass('max')
})
