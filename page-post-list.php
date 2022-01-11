<?php
/**
 * The template for displaying post list page
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            <?php
            // Start the loop.
            while ( have_posts() ) :
                the_post();
            endwhile;
            ?>
            <header class="page-header">
                <h1 class="page-title">Post List</h1>
            </header><!-- .page-header -->
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="entry-content">
                    
                    <form id="order-form" action="<?php echo admin_url('admin-ajax.php')?>" method="POST">
                    <p class=''><span class='title'></span><span class=''>
                        <label>Order by <select name="orderby">
                            <option value="date" selected>date</option>
                            <option value="title">title</option>
                            <option value="comment_count">popularity</option>
                            <option value="modified">modification</option>
                        </select></label></span></p>
                        <input type="hidden" value="<?php echo get_post()->post_name;?>"  name='action'/>
                    </form>
                    <div class='list  widget_recent_entries'><p><ul></ul></p></div>
                    
        
                </div><!-- .entry-content -->
            </article>
		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
