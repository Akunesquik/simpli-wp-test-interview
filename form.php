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

<style>
    .simpli-form-container {
        max-width: 450px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #f9f9f9;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    }

    .simpli-form-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .simpli-form-group label {
        width: 120px; /* Largeur fixe pour aligner tous les labels */
        font-weight: bold;
        text-align: right;
        margin-right: 10px;
    }

    .simpli-form-group input,
    .simpli-form-group textarea {
        flex: 1;
        width: 100%; /* Tous les inputs prennent la même largeur */
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .simpli-form-group textarea {
        height: 80px;
        resize: vertical; /* Permet à l'utilisateur d'agrandir si besoin */
    }

    .simpli-submit-btn {
        width: 100%;
        padding: 10px;
        border: none;
        background: #0073aa;
        color: white;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }

    .simpli-submit-btn:hover {
        background: #005177;
    }
</style>

<div class="simpli-form-container">
    <h2>Mon formulaire pour créer un post et ses metadata</h2>
    <form method="post">
        <?php wp_nonce_field('simpli_post_nonce', 'simpli_nonce'); ?>

        <div class="simpli-form-group">
            <label for="simpli_post_title">Titre</label>
            <input type="text" name="simpli_post_title" required>
        </div>

        <div class="simpli-form-group">
            <label for="simpli_post_content">Contenu</label>
            <textarea name="simpli_post_content"></textarea>
        </div>

        <div class="simpli-form-group">
            <label for="simpli_mymeta">Métadonnée</label>
            <input type="text" name="simpli_mymeta">
        </div>

        <input type="submit" name="simpli_submit_post" value="Créer l'article" class="simpli-submit-btn">
    </form>
</div>

