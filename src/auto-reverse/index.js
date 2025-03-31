import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.scss';  // Import CSS styles

import metadata from './block.json';  // Import metadata from block.json

registerBlockType(metadata.name, {
    edit: ({ attributes, setAttributes }) => {
        const { content, backgroundColor, borderColor } = attributes;
        const [text, setText] = useState(content);

        return (
            <div { ...useBlockProps({ style: { backgroundColor, border: `2px solid ${borderColor}`, padding: '10px' } }) }>
                <InspectorControls>
                    <PanelBody title="Customization">
                        <p>Background Color</p>
                        <ColorPalette 
                            value={ backgroundColor }
                            onChange={ (color) => setAttributes({ backgroundColor: color }) }
                        />
                        <p>Border Color</p>
                        <ColorPalette 
                            value={ borderColor }
                            onChange={ (color) => setAttributes({ borderColor: color }) }
                        />
                    </PanelBody>
                </InspectorControls>
                <RichText
                    tagName="p"
                    value={ text }
                    onChange={(value) => setText(value)}
                    onBlur={() => setAttributes({ content: text })}
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        const { content, backgroundColor, borderColor } = attributes;

        const reverseText = (event) => {
            event.target.innerText = event.target.innerText.split('').reverse().join('');
        };

        return (
            <div style={{ backgroundColor, border: `2px solid ${borderColor}`, padding: '10px', cursor: 'pointer' }}
                 onClick={reverseText}>
                { content }
            </div>
        );
    },
});
