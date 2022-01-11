<?php
/**
 * The template for displaying edit page
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

$post_id=$_GET['id'];
$citations=get_post_meta($post_id,"bib",true);
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
                <h1 class="page-title">Edit</h1>
            </header><!-- .page-header -->
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="entry-content">
                <form action="<?php echo admin_url('admin-ajax.php')?>" method="post" id="edit-form">
                    <p><label>Title</label><input name="title" type="text" placeholder='Enter your title here'  value="" /></p>
                    <p class="content-section"><label>Content</label><textarea name="content" placeholder='Enter your content here' ><?php echo get_post_field('post_content', (int)$post_id);?></textarea></p>
                    <p><label>Key Words</label><input name="tags" type="text" placeholder='Enter key words here, separated with commas'  value="" /></p>

                    <p class="actions-section" style="display:flex;justify-content: space-between">
                        <a href="#" class="post-settings" style="border-bottom: none"><i class="fa fa-cog"></i>Post Setting</a>
                        <span>
                            <button  type="button" value="publish">Publish</button>
                            <button  type="button" value="trash" style="display:none">Delete</button>
                        </span>
                    </p>

                    <div id="settings-dialog" style="display:none;">
                        <p>Post Visibility</p>
                        <div>
                            <label><input type="radio" name="visibility" value="publish">Public</label>
                            <p>Visible to everyone.</p>
                        </div>
                        <div><label><input type="radio" name="visibility" value="private">Private</label>
                            <p>Only visible to youself.</p>
                        </div>
                        <div><label><input type="radio" name="visibility" value="password">Password Protected</label>
                            <p>Protected with a password you choose. Only those with the password can view this post.</p>
                            <input class="hidden" type="text"/>
                            <input placeholder="Enter your password here" type="password" name="password" value="" autocomplete="new-password" style="display:none"/>

                        </div>
                    </div>

                <input type="hidden" name="action" value="ajax_edit_post"/>
                <input type="hidden" name="task" value=""/>
                <input type="hidden" name="id" value="<?php echo $_GET['id'];?>"/>
                <input type="hidden" name="category-ids" value=""/>
                    <input type="hidden"  name="citations" value="<?php echo $citations?>"/>

                </form>
                </div><!-- .entry-content -->
            </article><!-- #post-<?php the_ID(); ?> -->
		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
