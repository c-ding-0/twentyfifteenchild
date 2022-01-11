jQuery(document).ready(function($) {
    $('.widget.widget_categories').addClass('categories');
    $('.widget.widget_recent_entries ul').append("<li class='entry-footer'><a href='"+sidebarData.postListPageURL+"'>View All <i class='fas fa-angle-double-right'></i></a></li>");
    $('.widget.widget_recent_comments ul').append("<li class='entry-footer'><a href='"+sidebarData.commentListPageURL+"'>View All <i class='fas fa-angle-double-right'></i></a></li>");
    $('.widget.widget_recent_entries ul,  .widget.widget_recent_comments ul').show(500);
});