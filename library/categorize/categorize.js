
//manage categories
jQuery(document).ready(function($) {
    var IDClass='.categories';
    //$(IDClass+' .manage').click(function() {
    //$(IDClass + ' .toggle').toggle();
    var editHTML="<a class='edit action' href='#' title='edit'> "+icon('fas fa-edit')+" </a>";
    var newHTML="<li> <a class='new action'>"+icon('fas fa-plus')+" New Category</a></li>";
    $(IDClass+ ' ul li').append(editHTML);
    $(IDClass+ ' ul').prepend(newHTML);
    //return false;
    //});
    var dialogID='manage-categories';
    var dialogContent='<form  action="'+ajaxurl+'" method="post">\n' +
        '                        <input  name="name" type="text"  placeholder=\'Enter your category here\' />\n' +
        '                        <input type="hidden" name="action" value="manage_categories"/>\n' +
        '                        <input type="hidden" name="task"  value=""/>\n' +
        '                        <input type="hidden" name="id"  value="0"/>\n' +
        '                    </form>';

    $(document).on('click',IDClass+' .new',function(){
        var newCategoryDialog=$('<div/>',{
            id:dialogID,
            html:dialogContent,
        });
        newCategoryDialog.dialog({
            title:"Add a New Category",
            buttons: {
                Save: function () {
                    $('#' + dialogID + ' form input[name="task"]').val('new');
                    if ($('#' + dialogID + ' input[name="name"]').val() == '') {
                        alert("Please enter your category!");
                        return false;
                    } else {
                        $('#' + dialogID + ' form').submit();
                    }
                    $(this).remove();
                },
                Cancel:function(){
                    $(this).remove();
                }
            }
        });
        return false;
    });
    $(document).on('click',IDClass+' ul li .edit',function(){
        var itemID=$(this).getItemID();
        var editCategoryDialog=$('<div/>',{id:dialogID, html:dialogContent,});
        editCategoryDialog.dialog({
            title: 'Edit Category',
            buttons:{
                Save:function(){$('#'+dialogID+ ' form input[name="task"]').val('update');
                        if($('#'+dialogID+' input[name="name"]').val()==''){alert("Please enter your category!");return false;}else{$('#'+dialogID+ 'form').submit();}
                        $('#'+dialogID+ ' form').submit();
                        //$('#'+dialogID+ ' #Cancel').click();
                        $(this).remove();
                    },
                Delete:function () {
                        $('#' + dialogID + ' form input[name="task"]').val('trash');
                        if (confirm("You are about to delete the category! Are you sure?")) {
                            $('#' + dialogID + ' form').submit();
                            //$('#'+dialogID+ ' #Cancel').click();
                        }else{
                            return false;
                        }
                        $(this).remove();
                    },
                Cancel:function(){$(this).remove();},
            },
        });

        $('#'+dialogID+ ' form input[name="id"]').val(itemID);
        var name=$(this).parent().children(':first-child').text();
        $('#'+dialogID+" input[name='name']").val(name);
        return false;
    });

    $(document).off('submit',"#"+dialogID+"  form").on("submit","#"+dialogID+"  form",function(){
        //var progress=$('<div><i class="fa fa-spinner fa-spin"></i></div>').appendTo('body').css('position','fixed');
        //progress.progressbar({value:false});
        var processing=$('<div class="overlay" style="z-index:200"></div><div class="fixed-center" style="z-index:201"><i style="color:white" class="fa fa-spinner fa-spin fa-2x"></i></div>').appendTo('body');
        var form=$('#'+dialogID+"  form");
        $.ajax({
            url:form.attr('action'),
            data:form.serialize(),
            type:form.attr('method'),
            dataType: "json",
            beforeSend: function () {
                //$('body').beginProcess();

            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            },
            success: function (res) {
                processing.remove();

                //$('body').endProcess();
                $('#'+dialogID+ ' #Cancel').click();
                $('<div/>').html(res.message).dialog({buttons:{OK:function(){$(this).remove();}}});
                $(IDClass+ ' ul').html(res.categoryList);
                MathJax.typeset(['.categories']);
                $(IDClass+ ' ul li').append(editHTML);
                $(IDClass+ ' ul').prepend(newHTML);
            }
        });
        return false;
    });
    /*$(IDClass+' .managed').click(function(){
        $(IDClass + ' .toggle').toggle();
        $(IDClass+ ' ul li .edit').remove();
        return false;
    });*/
});


//categorize posts
jQuery(document).ready(function($) {
    $('.categorize a').click(function() {
        var that=this;
        var postID = $(this).getPostID();
        var postCategoryIDs = $(this).attr('href').split(', ');
        //$(this).append();
        var dialogContent=selectCategoriesForm(postCategoryIDs);
        dialogContent=dialogContent+'<form class="display-none" action="' + ajaxurl + '" method="post" class="categorize-form" id="categorize-form">' +
        '<input type="hidden" name="action" value="categorize"/>' +
        '<input type="hidden" name="category-ids" value=""/>' +
        '<input type="hidden"  name="post-id" value="'+postID+'"/></form>';
        var categorizeDialog=$('<div/>',{id:'dialog-select-categories',html:dialogContent,});
        categorizeDialog.dialog({title:'Select Categories',
            buttons:{
                Done:function(){
                    var categorySelector = '#dialog-select-categories li ';
                    var categoryIDs = jQuery(categorySelector + ' input[type="checkbox"]:checked').map(function () {
                        return jQuery(this).getItemID();
                    });//https://stackoverflow.com/questions/21307137/using-jquery-to-get-data-attribute-values-with-each
                     //alert(categoryIDs.get())
                    categoryIDs=categoryIDs.get();
                    $('#categorize-form input[name="category-ids"]').val(categoryIDs);
                    //$('#categorize-form').submit();
                    //var progressbar=$('<div><i class="fa fa-spinner fa-spin"></i></div>',{id:'progressbar'}).appendTo(that);
                    //progressbar.progressbar({value:false});
                    var progressbar=$('<div class="overlay" style="z-index:200"></div><div class="fixed-center" style="z-index:201"><i style="color:white" class="fa fa-spinner fa-spin fa-2x"></i></div>').appendTo('body');

                    var filter=$('#categorize-form');
                    $.ajax({
                        url:filter.attr('action'),
                        data:filter.serialize(), // form data
                        type:filter.attr('method'), // POST
                        dataType: "json",
                        beforeSend:function(){
                            //BeginProcess();
                        },
                        //error: function(ts) { MyAjaxErrorFunction(); },
                        success:function(res){
                            progressbar.remove();
                            categorizeDialog.remove();
                            var categorizeSuccessDialog=$("<div/>",{html:res.message}).dialog({buttons:{OK:function(){
                                //location.reload();
                                        $(this).remove();
                                        $(that).attr('href',res.success.join(', '));
                                },}});
                        }
                    }).then(function(){

                    });

                },
                Cancel:function(){$(this).remove();},
            }
        });

        /*
        function categorizeAjax(){

        }
        $('#categorize-form').off('submit').on('submit',function(){//because 'submit' was registered  in $(".catergorize-link").click();

            var filter=$('#categorize-form');
            $.ajax({
                url:filter.attr('action'),
                data:filter.serialize(), // form data
                type:filter.attr('method'), // POST
                dataType: "json",
                beforeSend:function(){
                    //BeginProcess();
                },
                //error: function(ts) { MyAjaxErrorFunction(); },
                success:function(res){
                    //EndProcess();
                    console.log(res);
                    if(res.success) {
                        var categorizeSuccessDialog = $("<div/>", {html: res.message}).dialog({
                            buttons: {
                                OK: function () {
                                    location.reload();
                                },
                            }
                        });
                    }
                }
            });
            return  false;
        });
        */
        return false;
    });
});


//select categories
function selectCategoriesForm(originalCategoryIDs) {
    originalCategoryIDs=defaultParameter(originalCategoryIDs,['']);
    jQuery('body').append('<div id="temporary" style="display:none"><div class="widget_categories">'+jQuery('.categories ul').prop('outerHTML')+'</div></div>');
    jQuery('#temporary .new').closest('li').remove();jQuery('#temporary .edit').remove();
    var categorySelector = '#temporary li ';
    for (var i = 0; i < jQuery(categorySelector).length; i++) {
        //var CategoryID=jQuery(this).parent().attr('class').match(/cat-item-(\S*)/)[1];
        var categoryID = jQuery(categorySelector).eq(i).getItemID();
        var categoryText = jQuery(categorySelector).eq(i).children('a').html();
        var checked = "";
        if (originalCategoryIDs.indexOf(categoryID)!=-1) {checked = "checked";}
        jQuery(categorySelector).eq(i).html('<label style="width:100%">' +
            '<input type="checkbox" data-category-id="' + categoryID + '" ' + checked + '/> ' + categoryText +
            '</label>');// $(x[i]).html()  or $(x).html().eq(i);
    }
    var temporaryHTML=jQuery('#temporary').html();
    jQuery('#temporary').remove();
    return temporaryHTML;
}
/*
function SelectCategories(Callback,OriginalCategoryIDs,Multichoice){
    OriginalCategoryIDs=IEDefaultParameter(OriginalCategoryIDs,['']);
    Multichoice=IEDefaultParameter(Multichoice,['']);
    if (Multichoice=="checked"||Multichoice==true){
        Multichoice="checked";
    }else{
        Multichoice="";
    }
    var DialogContent = '<div class="categories"><ul>' + jQuery('.categories  ul').html() + '</ul></div>';
    var Title= '<div style="display:flex;"><div class="float-left overflow-hidden" style="margin-right:1em; white-space:nowrap;">SELECT A CATEGORY </div><div style="margin-left:auto;"><label style="display:inline-block;white-space: nowrap;"><input style="  vertical-align: middle;" type="checkbox" name="multi-choice" '+ Multichoice+'/><span style="vertical-align: :middle;">multiple</span></label></div></div>';
    var DialogID="category-dialog";
    var categorySelector = '.dialog .categories li ';
    CreateDialog(DialogContent,Title, DialogID, '<div style=""><button class="display-none done-category click-me">Done</button>       <button class="cancel-category">Cancel</button></div>');
    jQuery('.dialog .new').closest('li').remove();jQuery('.dialog .edit').remove();
    for (var i = 0; i < jQuery(categorySelector).length; i++) {
        //var CategoryID=jQuery(this).parent().attr('class').match(/cat-item-(\S*)/)[1];
        var CategoryID = jQuery(categorySelector).eq(i).attr('class').match(/cat-item-(\S*)/)[1];
        var CategoryText = jQuery(categorySelector).eq(i).children('a').html();
        var Checked = "";
        if (OriginalCategoryIDs.indexOf(CategoryID)!=-1) {Checked = "checked";}
        var CategoryText =jQuery(categorySelector).eq(i).children('a').html();
        jQuery(categorySelector).eq(i).html('<label class=".width100"><input type="checkbox" class="display-none" data-category-id="' + CategoryID + '" ' + Checked + '/>' + CategoryText + '</label>');// $(x[i]).html()  or $(x).html().eq(i);
    }

    function MultiChoiceToggle(){
        if( jQuery('input[name="multi-choice"]').prop("checked")) {
            jQuery(categorySelector).find( 'input').show();
            jQuery('.dialog .done-category').show();
        }else
        {
            jQuery(categorySelector).find( 'input').hide();
            jQuery('.dialog .done-category').hide();
        }
    }
    MultiChoiceToggle();
    jQuery('input[name="multi-choice"]').on('change',function() {
        MultiChoiceToggle();
    });

    jQuery('.cancel-category').on('click', function () {
        RemoveDialog(DialogID);
        //return false;
    });
    var CategoryIDs='';
    jQuery( categorySelector+' input[type="checkbox"]'+ ','+ categorySelector+'label').on('click',  function(){//Do not bind click events inside of click events unless the click event creates the element. Use '.one'  or  '.off("click")'  otherwise.
        if(! jQuery('input[name="multi-choice"]').attr("checked")) {
            CategoryIDs=jQuery(this).closest('.cat-item').attr('class').match(/cat-item-(\S*)/)[1];
            RemoveDialog(DialogID);
            Callback(CategoryIDs);

        }
        //return false;
    });
    jQuery('.dialog .done-category').on('click', function () {

        var CategoryIDs = jQuery(categorySelector + ' input[type="checkbox"]:checked').map(function () {
            return jQuery(this).data("category-id");
        });//https://stackoverflow.com/questions/21307137/using-jquery-to-get-data-attribute-values-with-each
        //alert(CategoryIDs.get())
        CategoryIDs=CategoryIDs.get();
        RemoveDialog(DialogID);
        Callback(CategoryIDs);

    });

}
 */
(function( $ ){
    $.fn.extend({
        getItemID: function () {
            return this.closest('li').attr('class').match(/item-([0-9]*)/)[1];
        },
    });
})( jQuery );
