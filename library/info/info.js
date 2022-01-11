jQuery(document).ready(function($){

    $(document).on('click',".info a",function() {
        var postID=$(this).getPostID();
        //alert(PostID);
        var content=$('#post-'+postID+' .entry-meta').html();
        $('<div class="entry-meta"></div>').html(content).dialog({title:'Post Information',buttons:{OK:function(){$(this).remove();}}});
        return false;
    });

    /*$(document).mouseup(function(e){
      var _con = $(".InformationCard");
      if(!_con.is(e.target) && _con.has(e.target).length === 0){
          $(".PromptDialog").remove();
          $(".PromptBackground").remove();
          return false;
      }
    });*/
});
/*jQuery(document).ready(function($) {
    $(document).on('click',".entry-footer .entry-actions > span > svg",function () {
        $(this).next()[0].click();
        return false;
    });
});*/