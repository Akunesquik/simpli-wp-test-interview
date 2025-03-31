<?php
if (!defined('ABSPATH')) {
    exit;
}

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['simpli_submit_post'])) {
    if (!isset($_POST['simpli_nonce']) || !wp_verify_nonce($_POST['simpli_nonce'], 'simpli_post_nonce')) {
        wp_die('Échec de la vérification de sécurité.');
    }

    if (!current_user_can('edit_posts')) {
        wp_die('Vous n’avez pas les permissions nécessaires.');
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'simpli_posts';

    $title   = sanitize_text_field($_POST['simpli_post_title']);
    $content = sanitize_textarea_field($_POST['simpli_post_content']);
    $mymeta  = sanitize_text_field($_POST['simpli_mymeta']);

    if (!empty($title)) {
        $wpdb->insert($table_name, [
            'title'   => $title,
            'content' => $content,
            'mymeta'  => $mymeta,
        ]);

        if ($wpdb->insert_id) {
            wp_redirect(add_query_arg('success', '1', $_SERVER['REQUEST_URI']));
            exit;
        } else {
            wp_redirect(add_query_arg('error', '1', $_SERVER['REQUEST_URI']));
            exit;
        }
    } else {
        wp_redirect(add_query_arg('error', 'missing_title', $_SERVER['REQUEST_URI']));
        exit;
    }
}

// Affichage des messages après redirection
if (isset($_GET['success'])) {
    echo "<p style='color:green;'>✅ Post créé avec succès !</p>";
} elseif (isset($_GET['error'])) {
    echo "<p style='color:red;'>❌ Erreur lors de la création du post.</p>";
}
?>

<h2>Créer un nouveau post</h2>
<form method="post">
    <?php wp_nonce_field('simpli_post_nonce', 'simpli_nonce'); ?>

    <label for="simpli_post_title">Titre :</label><br>
    <input type="text" name="simpli_post_title" required><br><br>

    <label for="simpli_post_content">Contenu :</label><br>
    <textarea name="simpli_post_content"></textarea><br><br>

    <label for="simpli_mymeta">Métadonnée (mymeta) :</label><br>
    <input type="text" name="simpli_mymeta"><br><br>

    <input type="submit" name="simpli_submit_post" value="Créer l'article">
</form>
