document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les blocs avec la classe 'reversible-text-block'
    const reversibleBlocks = document.querySelectorAll('.reversible-text-block');
    
    // Ajouter un gestionnaire d'événements à chaque bloc
    reversibleBlocks.forEach(block => {
        block.addEventListener('click', function(event) {
            // Trouver le paragraphe à l'intérieur du bloc
            const paragraph = this.querySelector('p');
            if (paragraph) {
                // Inverser le texte
                paragraph.innerText = paragraph.innerText.split('').reverse().join('');
            }
        });

        // Ajouter des attributs d'accessibilité
        block.setAttribute('role', 'button');
        block.setAttribute('tabindex', '0');
        block.setAttribute('aria-label', 'Cliquez pour inverser le texte');
        
        // Ajouter la gestion du clavier pour l'accessibilité
        block.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Simuler un clic
                this.click();
            }
        });
    });
});