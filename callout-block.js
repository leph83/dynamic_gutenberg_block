wp.blocks.registerBlockType( 'wtp/callout-block', {

    title: 'Callout Block',
    icon: 'megaphone',
    category: 'common',

    attributes: {
		content: {
            type: 'string',
			selector: 'h2',
        },
        backgroundColor: {
            type: 'string',
            default: '#900900',
        },
        textColor: {
            type: 'string',
            default: '#ffffff',
        },
        title: {
            type: 'string',
            default: 'title',
        }
	},

	edit: function( props ) {
		return wp.element.createElement( 
            wp.element.Fragment, 
            null, 
            // inspector
            wp.element.createElement(
                wp.editor.InspectorControls, 
                null,
                wp.element.createElement(
                    wp.editor.PanelColorSettings, {
                        title: wp.i18n.__("Color Settings", "wtp"),
                        colorSettings: [
                            {
                                label: wp.i18n.__("Background Color", "wtp"),
                                value: props.attributes.backgroundColor,
                                onChange: function( newBackgroundColor ) {
                                    props.setAttributes({ backgroundColor: newBackgroundColor });
                                }
                            },
                            {
                                label: wp.i18n.__("Text Color", "wtp"),
                                value: props.attributes.textColor,
                                onChange: function( newColor ) {
                                    props.setAttributes({ textColor: newColor });
                                }
                            },
                        ]
                    }
                )
            ),
            // edit
            wp.element.createElement( 
                wp.editor.RichText, {
                    tagName: 'h2',
                    placeholder: 'Enter Title',
                    className: props.className,
                    value: props.attributes.content,
                    style: {
                        backgroundColor: props.attributes.backgroundColor,
                        color: props.attributes.textColor
                    },
                    onChange: function( newContent ) {
                        props.setAttributes( { content: newContent } );
                    }
                } 
            ) 
        );
	},

	save: function( props ) {
        return null
	}
} );