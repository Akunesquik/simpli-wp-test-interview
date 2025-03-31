<?php
namespace SimpliCeremonyStreamingPlugin;
class CeremonyStreamingPlugin
{
    public function __construct()
    {
        define('URL_SPHINX_BROADCAST','https://toto.fr');
        include_once plugin_dir_path( __FILE__ ).'/CeremonyStreamingWidget.php';
        //TODO utse WP widget in TunobWidget add_action('widgets_init', function(){register_widget('TunobWidget');});
        add_action('init', function (){
            new CeremonyStreamingWidget();
        });
       // Enregistrement du shortcode pour afficher le formulaire
       add_shortcode('simplifia_form', [$this, 'render_simplifia_form']);
    }

    public function render_simplifia_form()
    {
        ob_start();
        require plugin_dir_path(__FILE__) . 'form.php';
        return ob_get_clean();
    }
}

