import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.scss';  // Importation des styles CSS

import metadata from './block.json';  // Importation des métadonnées du block

registerBlockType(metadata.name, {
    // Fonction de modification du bloc dans l'éditeur Gutenberg
    edit: ({ attributes, setAttributes }) => {
        const { content, backgroundColor, borderColor } = attributes;
        const [text, setText] = useState(content);

        return (
            <div {...useBlockProps({ style: { backgroundColor, border: `2px solid ${borderColor}`, padding: '10px' } })}>
                {/* Panneau de contrôle pour changer la couleur de fond et de bordure */}
                <InspectorControls>
                    <PanelBody title="Customization">
                        <p>Background Color</p>
                        <ColorPalette 
                            value={backgroundColor}
                            onChange={(color) => setAttributes({ backgroundColor: color })}
                        />
                        <p>Border Color</p>
                        <ColorPalette 
                            value={borderColor}
                            onChange={(color) => setAttributes({ borderColor: color })}
                        />
                    </PanelBody>
                </InspectorControls>

                {/* Permet à l'utilisateur d'éditer le texte du bloc */}
                <RichText
                    tagName="p"
                    value={text}
                    onChange={(value) => setText(value)}
                    onBlur={() => setAttributes({ content: text })}
                />
            </div>
        );
    },

    // Fonction de rendu du bloc côté frontend
    save: ({ attributes }) => {
        const { content, backgroundColor, borderColor } = attributes;

        return (
            <div 
                {...useBlockProps.save({
                    style: { 
                        backgroundColor, 
                        border: `2px solid ${borderColor}`, 
                        padding: '10px', 
                        cursor: 'pointer' 
                    },
                    className: 'reversible-text-block'
                })}
                data-content={content}
            >
                <p>{content}</p>
            </div>
        );
    },
});