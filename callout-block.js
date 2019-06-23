( function( blocks, editor, i18n, element, components, _ ) {
    var el = element.createElement;
    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;

    blocks.registerBlockType( 'wtp/callout-block', {
        title: i18n.__( 'Example: Recipe Card', 'wtp' ),
        icon: 'index-card',
        category: 'common',

        attributes: {
            mediaID: {
                type: 'number',
            },
            mediaURL: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            title: {
                type: 'string',
                selector: 'h2',
            },
            subtitle: {
                type: 'string',
                selector: 'h3',
            },

            ingredients: {
                type: 'array',
                source: 'children',
                selector: '.ingredients',
            },
            instructions: {
                type: 'array',
                source: 'children',
                selector: '.steps',
            },
        },
        edit: function( props ) {
            var attributes = props.attributes;

            var onSelectImage = function( media ) {
                return props.setAttributes( {
                    mediaURL: media.url,
                    mediaID: media.id,
                } );
            };

            return (
                el( 'div', { className: props.className },
                    el( 'div', { className: 'recipe-image' },
                        el( MediaUpload, {
                            onSelect: onSelectImage,
                            allowedTypes: 'image',
                            value: attributes.mediaID,
                            render: function( obj ) {
                                return el( components.Button, {
                                        className: attributes.mediaID ? 'image-button' : 'button button-large',
                                        onClick: obj.open
                                    },
                                    ! attributes.mediaID ? i18n.__( 'Upload Image', 'wtp' ) : el( 'img', { src: attributes.mediaURL } )
                                );
                            }
                        } )
                    ),
                    el( RichText, {
                        tagName: 'h2',
                        inline: true,
                        placeholder: i18n.__( 'write title…', 'wtp' ),
                        value: attributes.title,
                        onChange: function( value ) {
                            props.setAttributes( { title: value } );
                        },
                    } ),
                    el( RichText, {
                        tagName: 'h3',
                        inline: true,
                        placeholder: i18n.__( 'write subtitle…', 'wtp' ),
                        value: attributes.subtitle,
                        onChange: function( value ) {
                            props.setAttributes( { subtitle: value } );
                        },
                    } ),
                    el( 'h3', {}, i18n.__( 'Ingredients', 'wtp' ) ),
                    el( RichText, {
                        tagName: 'ul',
                        multiline: 'li',
                        placeholder: i18n.__( 'Write a list of ingredients…', 'wtp' ),
                        value: attributes.ingredients,
                        onChange: function( value ) {
                            props.setAttributes( { ingredients: value } );
                        },
                        className: 'ingredients',
                    } ),
                    el( 'h3', {}, i18n.__( 'Instructions', 'wtp' ) ),
                    el( RichText, {
                        tagName: 'div',
                        inline: false,
                        placeholder: i18n.__( 'Write instructions…', 'wtp' ),
                        value: attributes.instructions,
                        onChange: function( value ) {
                            props.setAttributes( { instructions: value } );
                        },
                    } )
                )
            );
        },
        save: function( props ) {
            var attributes = props.attributes;

            return null
        },
    } );

} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.i18n,
    window.wp.element,
    window.wp.components,
    window._,
);
