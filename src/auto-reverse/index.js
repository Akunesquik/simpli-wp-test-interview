import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.scss';  // Importation des styles CSS

import metadata from './block.json';  // Importation des métadonnées du block

registerBlockType(metadata.name, {
    // Fonction de modification du bloc dans l'éditeur Gutenberg
    edit: ({ attributes, setAttributes }) => {
        const { content, backgroundColor, borderColor, textColor } = attributes;
        const [text, setText] = useState(content);

        return (
            <div {...useBlockProps({ 
                style: { 
                    backgroundColor, 
                    border: `2px solid ${borderColor}`, 
                    padding: '10px'
                } 
            })}>
                {/* Panneau de contrôle pour changer les couleurs */}
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
                        <p>Text Color</p>
                        <ColorPalette 
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                    </PanelBody>
                </InspectorControls>

                {/* Permet à l'utilisateur d'éditer le texte du bloc */}
                <RichText
                    tagName="p"
                    value={text}
                    onChange={(value) => setText(value)}
                    onBlur={() => setAttributes({ content: text })}
                    style={{ color: textColor }}
                />
            </div>
        );
    },

    // Fonction de rendu du bloc côté frontend
    save: ({ attributes }) => {
        const { content, backgroundColor, borderColor, textColor } = attributes;

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
                <p style={{ color: textColor }}>{content}</p>
            </div>
        );
    },
});