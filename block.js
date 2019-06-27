( function( blocks, editor, i18n, element, components, _ ) {

    var el = element.createElement;
    var __ = i18n.__;


    blocks.registerBlockType( 'wtp/default-block', {
        title: __( 'wtp block', 'wtp' ),
        icon: 'carrot',
        category: 'common',
        styles: [
            {
                name: 'default',
                label: __( 'Default' ),
                isDefault: true
            },
            {
                name: 'hero',
                label: __( 'Hero' )
            },
        ],

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
                selector: '.block__subtitle',
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

            return [
                // INSPECTOR
                el( 
                    editor.InspectorControls, 
                    { key: 'inspector' }, 
                    // image or media
                    el( 
                        components.PanelBody, 
                        {
                            title: __( 'Media' ),
                            initialOpen: true,
                        },
                        el( 
                            editor.MediaUpload, 
                            {
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
                                            style: props.attributes.imgID ? { padding: '0' } : {  },
                                            className: props.attributes.imgID ? 'block__image' : 'is-button is-default',
                                            onClick: obj.open },
                                            ! props.attributes.imgID ? __( 'Upload Image' ) : el( 'img', { src: props.attributes.imgURL } )
                                        )
                                    );
                                }
                            }
                        ),
                    ),
                    // text
                    el( 
                        components.PanelBody, 
                        {
                            title: __( 'Text' ),
                            initialOpen: false,
                        },
                        el( components.TextControl, 
                        {
                            type: 'string',
                            label: __( 'Title' ),
                            value: props.attributes.title,
                            onChange: function( value ) {
                                props.setAttributes( { title: value } );
                            },
                        } ),
                        el( components.TextControl, 
                        {
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
                el( 
                    'div', 
                    { className: props.className },
                    el( 
                        editor.MediaUpload, 
                        {
                            type: 'image',
                            value: props.attributes.imgID,
                            onSelect: onSelectImage,
                            render: function( obj ) {
                                return  el( 'div', {} ,
                                    el( 
                                        components.Button, {
                                        style: props.attributes.imgID ? { padding: '0' } : {  },
                                        className: props.attributes.imgID ? 'block__image' : 'is-button is-default',
                                        onClick: obj.open },
                                        ! props.attributes.imgID ? __( 'Upload Image' ) : el( 'img', { src: props.attributes.imgURL } )
                                    )
                                );
                            }
                        }
                    ),
                    el(
                        editor.RichText, 
                        {
                            tagName: 'h2',
                            inline: true,
                            className: 'block__title',
                            placeholder: __( 'title…', 'wtp' ),
                            value: attributes.title,
                            onChange: function( value ) {
                                props.setAttributes( { title: value } );
                            },
                        } 
                    ),
                    el(
                        editor.RichText, 
                        {
                            tagName: 'h3',
                            inline: true,
                            className: 'block__subtitle',
                            placeholder: __( 'subtitle…', 'wtp' ),
                            value: attributes.subtitle,
                            onChange: function( value ) {
                                props.setAttributes( { subtitle: value } );
                            },
                        }
                    )
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
