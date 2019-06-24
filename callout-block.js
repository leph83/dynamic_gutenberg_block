( function( blocks, editor, i18n, element, components, _ ) {

    var el = element.createElement;
    var __ = i18n.__;

    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;

    blocks.registerBlockType( 'wtp/callout-block', {
        title: __( 'What the Phuc', 'wtp' ),
        icon: 'carrot',
        category: 'common', /* can't change that afterwards? */

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
                selector: '.block__title',
            },
            subtitle: {
                type: 'string',
                selector: 'h3',
            },
            ingredients: {
                type: 'array',
                source: 'children',
                selector: '.ingredients',
            }
        },
        edit: function( props ) {
            var attributes = props.attributes;

            // set onChange functions

            var onSelectImage = function( media ) {
                return props.setAttributes( {
                    mediaURL: media.url,
                    mediaID: media.id,
                } );
            };

            return [
                // inspector
                // el( editor.InspectorControls, { key: 'inspector' },
                //     el(editor.PanelColorSettings, {
                //             title: __("Color Settings", "wtp"),
                //             colorSettings: [
                //                 {
                //                     label: __("Background Color", "wtp"),
                //                     value: props.attributes.backgroundColor,
                //                     onChange: function( newBackgroundColor ) {
                //                         props.setAttributes({ backgroundColor: newBackgroundColor });
                //                     }
                //                 },
                //                 {
                //                     label: __("Text Color", "wtp"),
                //                     value: props.attributes.textColor,
                //                     onChange: function( newColor ) {
                //                         props.setAttributes({ textColor: newColor });
                //                     }
                //                 },
                //             ]
                //         }
                //     )
                // ),
                // INSPECTOR
                el( editor.InspectorControls, { key: 'inspector' }, 
                    el( 
                        components.PanelBody, {
                            title: __( 'Content' ),
                            initialOpen: true,
                        },
                        el( components.TextControl, {
                            type: 'string',
                            label: __( 'Title' ),
                            value: props.attributes.title,
                            onChange: function( value ) {
                                props.setAttributes( { title: value } );
                            },
                        } ),
                        el( components.TextControl, {
                            type: 'string',
                            label: __( 'Subtitle' ),
                            value: props.attributes.subtitle,
                            onChange: function( value ) {
                                props.setAttributes( { subtitle: value } );
                            },
                        } ),
                        el( components.TextControl, {
                            type: 'string',
                            label: __( 'Image ID' ),
                            value: props.attributes.mediaID,
                            onChange: function( value ) {
                                props.setAttributes( { mediaID: value } );
                            },
                        } ),
                        el( components.TextControl, {
                            type: 'string',
                            label: __( 'Image URL' ),
                            value: props.attributes.mediaURL,
                            onChange: function( value ) {
                                props.setAttributes( { mediaURL: value } );
                            },
                        } ),
                    ),
                ),              
                // build editor html
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
                                    ! attributes.mediaID ? __( 'Upload Image', 'wtp' ) : el( 'img', { src: attributes.mediaURL } )
                                );
                            }
                        } )
                    ),
                    el( RichText, {
                        tagName: 'h2',
                        inline: true,
                        placeholder: __( 'title…', 'wtp' ),
                        className: 'block__title',
                        value: attributes.title,
                        onChange: function( value ) {
                            props.setAttributes( { title: value } );
                        },
                    } ),
                    el( RichText, {
                        tagName: 'h3',
                        inline: true,
                        placeholder: __( 'subtitle…', 'wtp' ),
                        value: attributes.subtitle,
                        onChange: function( value ) {
                            props.setAttributes( { subtitle: value } );
                        },
                    } )
                    // el( RichText, {
                    //     tagName: 'ul',
                    //     multiline: 'li',
                    //     placeholder: __( 'Write a list of ingredients…', 'wtp' ),
                    //     value: attributes.ingredients,
                    //     onChange: function( value ) {
                    //         props.setAttributes( { ingredients: value } );
                    //     },
                    //     className: 'ingredients',
                    // } )
                )
            ];
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
