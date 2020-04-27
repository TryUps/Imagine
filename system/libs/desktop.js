$(function(){
    $(document).on("click", "layout > bar > nav.primary-navbar > ul > li > button", function(e){
        e.preventDefault();
        let appid = $(this).attr("btn-id");
        if(appid == undefined){
            return false;
        }else{
            win.open({
                appid: appid
            });
            $("[appid='dashboard']").hide();
        }
    });
    $(document).on("click", "layout > desktop > window",function(e){
        e.preventDefault();
        $("layout > desktop > window").removeClass("active");
        $(this).addClass("active");
    });

    $(document).on("click", "window[appid='dashboard'] > window-content > app > layout > content > list > ul > li > button",function(e){
        e.preventDefault();
        let appid = $(this).attr("btn-id");
        if(appid == undefined){
            return false;
        }else{
            win.open({ appid: appid });
            $("[appid='dashboard']").hide();
            $("[appid='dashboard']").removeClass("active");
            $("[appid='"+appid+"']").addClass("active");
        }
    });
});