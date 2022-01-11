<?php
/**
 * The template part for displaying a message that posts cannot be found
 *
 * Learn more: {@link https://developer.wordpress.org/themes/basics/template-hierarchy/}
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?>

<section class="no-results not-found">
	<header class="page-header">
		<h1 class="page-title"><span><?php _e( 'Nothing Found', 'twentyfifteen' ); ?></span>
            <?php if(current_user_can('edit_posts')){echo "<a href='".get_insert_post_link()."'><i class='fa fa-plus'></i> New Post</a>";}?>
        </h1>
	</header><!-- .page-header -->

	<div class="page-content">

		<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

			<p>
			<?php
			/* translators: %s: Post editor URL. */
			printf( __( 'Ready to publish your first post? <a href="%s">Get started here</a>.', 'twentyfifteen' ), esc_url( get_insert_post_link() ) );
			?>
			</p>

		<?php elseif ( is_search() ) : ?>

			<p><?php _e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'twentyfifteen' ); ?></p>
			<?php get_search_form(); ?>

		<?php else : ?>

			<p><?php _e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'twentyfifteen' ); ?></p>
			<?php get_search_form(); ?>

		<?php endif; ?>

	</div><!-- .page-content -->
</section><!-- .no-results -->
