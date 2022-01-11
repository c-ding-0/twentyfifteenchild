jQuery(document).ready(function($) {
    //var CurrentUserAdminAjaxURL=$('#current-user-admin-ajax-url').attr("href");
    var CurrentUserAdminAjaxURL=ajaxurl;
    //alert(ajaxurl);
    var pullNotification=function(){
        $.ajax({
            url: CurrentUserAdminAjaxURL,
            data: {"action": "pull_notification"},
            type: "POST",
            dataType: "json",
            beforeSend: function () {
                //BeginProcess();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            },
            success: function (res) {
                //EndProcess();
                //alert(res.bpNotification);
                $('#notification .overall').html(res.bpNotification);
            }
        });
    }
//setTimeout(pullNotification,3000);
setInterval(pullNotification,30000);
});