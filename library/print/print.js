jQuery(document).ready(function( $ ) {
    //window.onbeforeprint = function(event) { $() ...};
    $(".print a").click(function(){
        /*//var ID=$(this).closest('article');
        //alert(ID.attr('id'));
        var  PostID=$(this).closest('article').attr('id');
        $("#"+PostID).addClass("print");
        setTimeout(function(){window.print();},1000);
        */
        window.print();
        return false;
    });
});