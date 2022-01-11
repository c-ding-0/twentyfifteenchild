<?php
/**
 * The sidebar containing the main widget area
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) || is_active_sidebar( 'sidebar-1' ) ) : ?>
	<div id="secondary" class="secondary">

		<?php if ( has_nav_menu( 'primary' ) ) : ?>
			<nav id="site-navigation" class="main-navigation" role="navigation">
				<?php
					// Primary navigation menu.
					wp_nav_menu(
						array(
							'menu_class'     => 'nav-menu',
							'theme_location' => 'primary',
						)
					);
				?>
			</nav><!-- .main-navigation -->
		<?php endif; ?>

		<?php if ( has_nav_menu( 'social' ) ) : ?>
			<nav id="social-navigation" class="social-navigation" role="navigation">
				<?php
					// Social links navigation menu.
					wp_nav_menu(
						array(
							'theme_location' => 'social',
							'depth'          => 1,
							'link_before'    => '<span class="screen-reader-text">',
							'link_after'     => '</span>',
						)
					);
				?>
			</nav><!-- .social-navigation -->
		<?php endif; ?>

		<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<div id="widget-area" class="widget-area" role="complementary">
			<aside class="widget">
				<?php
                $args  = array(
                    'role' => "Editor",
                    'orderby' => 'display_name'
                );
                $my_user_query = new WP_User_Query($args);
                $authors = $my_user_query->get_results();
                if (!empty($authors)) {
                    //echo '<ul style="list-style: none;">';
                    foreach ($authors as $author)
                    {
                        $author_id=$author->ID;
                        $author_info = get_userdata($author->ID);
                        $author_name=$author_info->display_name;
                        $last_activity = bp_get_user_last_activity($author->ID);//timestamp
                        //var_dump($last_activity);
                        //$last_activity_unix_timestamp=implode('T',explode(' ',$last_activity));
						if($last_activity){
							$last_activity_unix_timestamp=strtotime($last_activity);
						}else{
							$last_activity_unix_timestamp=null;
						}
						//$last_activity_unix_timestamp=strtotime($last_activity);
                        $last_activity_date=wp_date(get_option('date_format'),$last_activity_unix_timestamp);
                        $profile_url=bp_core_get_user_domain($author->ID);
                        $avatar=get_avatar($author->ID);
                        //echo "<figure class='vcard'><a href='$profile_url' style='display:inline-block'><div style='text-align:center'>".get_avatar($author->ID)."</div><ul><li style='text-align: center;margin-top:1em;font-weight:800;'>$author_name</li><li ></li></ul></a></figure>";
                        echo "<div class=\"comment-author vcard\">$avatar					<b class=\"fn\"><a href=\"$profile_url\" rel=\"external nofollow ugc\" class=\"url\">$author_name</a></b>					</div>".
                            "<div class=\"comment-metadata\">
						<a href=\"#\">
							<time datetime=\"$last_activity\">
								 		$last_activity_date			</time>
						</a>				</div>";
                    }
                    //echo '</ul>';
                }
                ?>
			</aside>

			<aside class="widget">
				<?php
                 if(is_user_logged_in()){
                     $current_user=wp_get_current_user();
                     $current_user_id=$current_user->ID;
                     $current_user_name=$current_user->display_name;
                     echo "<p id='notification'><span class='greeting'>Howdy, $current_user_name!</span> <span class='overall'></span></p>";
                 }
                my_loginout();
				?>
			</aside>	


				<?//php dynamic_sidebar( 'sidebar-1' ); ?>

				
				<?php
				the_widget( 'WP_Widget_Search');
                $args=array(
						'before_widget'=>'<aside class="widget %s">',
						'after_widget'=>'</aside>',
                        'before_title'=>'<h2 class="widget-title">',
                        'after_title'=>'</h2>',
                );
				the_widget("WP_Widget_Recent_Posts",array(),$args);
				the_widget("WP_Widget_Categories",array(),$args);
				the_widget("WP_Widget_Recent_Comments",array(),$args);
                the_widget("WP_Widget_Tag_Cloud",array(),$args);
				?>
				</aside>
			</div><!-- .widget-area -->
		<?php endif; ?>

	</div><!-- .secondary -->

<?php endif; ?>
