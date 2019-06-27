( function( blocks, editor, i18n, element, components, _ ) {

    var el = element.createElement;
    var __ = i18n.__;

    
    var MediaUpload = editor.MediaUpload;



    blocks.registerBlockType( 'wtp/callout-block', {
        title: __( 'What the Phuc', 'wtp' ),
        icon: 'carrot',
        category: 'common', /* can't change that afterwards? */

        attributes: {
            imgID: {
                type: 'number',
            },
            imgURL: {
                type: 'string',
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
            var onSelectImage = function (media) {
                return props.setAttributes( {
                    imgID: media.id,
                    imgURL: media.url 
                } );
            }
            
            var onRemoveImage = function (media) {
                return props.setAttributes( {
                    imgURL: null, 
                    imgID: null 
                }); 
            }

            // var onSelectImage = function( media ) {
            //     return props.setAttributes( {
            //         mediaURL: media.url,
            //         mediaID: media.id,
            //     } );
            // };

            return [
                // INSPECTOR
                el( editor.InspectorControls, { key: 'inspector' }, 
                    // image or media
                    el( components.PanelBody, {
                            title: __( 'Media' ),
                            initialOpen: true,
                        },
                        el( components.TextControl, {
                            type: 'string',
                            label: __( 'Image ID' ),
                            value: props.attributes.imgID,
                            onChange: function( value ) {
                                props.setAttributes( { imgID: value } );
                            },
                        } ),
                        el( components.TextControl, {
                            type: 'string',
                            label: __( 'Image URL' ),
                            value: props.attributes.imgURL,
                            onChange: function( value ) {
                                props.setAttributes( { imgURL: value } );
                            },
                        } ),
                    ),
                    // text
                    el( components.PanelBody, {
                            title: __( 'Text' ),
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
                    ),
                ),              
                // build editor html
                el( 'div', { className: props.className },
                    el( 
                        editor.MediaUpload, {
                            type: 'image',
                            value: props.attributes.imgID,
                            onSelect: onSelectImage,
                            render: function( obj ) {
                                return  el( 'div', {} ,
                                    ( props.attributes.imgID ? 
                                        el( 'div', {
                                            className: 'admin-buttons',
                                        } ,
                                            el( 
                                                components.Button, 
                                                {
                                                    style: { marginRight: '8px', position: 'relative' },
                                                    isDefault: true,
                                                    onClick: obj.open
                                                },
                                                __( 'edit image' , 'wtp' )
                                            ),
                                            el( 
                                                components.Button, 
                                                {
                                                    style: { marginRight: '8px', position: 'relative' },
                                                    isDefault: true,
                                                    onClick: onRemoveImage
                                                },
                                                __( 'remove image' , 'wtp' )
                                            )
                                        )
                                    : null ),
                                    el( 
                                        components.Button, {
                                        style: { padding: '0' },
                                        className: props.attributes.imgID ? 'block__image' : 'is-button is-default',
                                        onClick: obj.open },
                                        ! props.attributes.imgID ? __( 'Upload Image' ) : el( 'img', { src: props.attributes.imgURL } )
                                    )
                                );
                            }
                        }
                    ),
                    el( 
                        editor.RichText, {
                            tagName: 'h2',
                            inline: true,
                            placeholder: __( 'title…', 'wtp' ),
                            className: 'block__title',
                            value: attributes.title,
                            onChange: function( value ) {
                                props.setAttributes( { title: value } );
                            },
                        } 
                    ),
                    el( 
                        editor.RichText, {
                            tagName: 'h3',
                            inline: true,
                            placeholder: __( 'subtitle…', 'wtp' ),
                            value: attributes.subtitle,
                            onChange: function( value ) {
                                props.setAttributes( { subtitle: value } );
                            },
                        }
                    )
                    // el( editor.RichText, {
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
