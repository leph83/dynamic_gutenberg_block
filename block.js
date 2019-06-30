( function( blocks, editor, i18n, element, components, _ ) {

    var el = element.createElement;
    var __ = i18n.__;

    var Richtext = editor.RichText;
    var Mediaupload = editor.MediaUpload;
    var Selectcontrol = editor.SelectControl;

    blocks.registerBlockType( 'wtp/default-block', {
        title: __( 'wtp block', 'wtp' ),
        icon: 'carrot',
        category: 'common',

        attributes: {
            style: {
                type: 'string',
            },
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
                    // STYLE
                    el(
                        components.PanelBody,
                        {
                            title: __('Style'),
                            initialOpen: true,
                        },
                        // el( 
                        //     select,
                        //     {
                        //         type: 'string',
                        //         label: __( 'Style' ),
                        //         value: props.attributes.style,
                        //         onChange: function( value ) {
                        //             props.setAttributes( { style: value } );
                        //         },
                        //     },
                        //     el(
                        //         option,
                        //         {
                        //             type: 'string',
                        //             value: props.attributes.style,
                        //         }
                        //     ),
                        // ),
                    ),
                    // MEDIA
                    el( 
                        components.PanelBody,
                        {
                            title: __( 'Media' ),
                            initialOpen: true,
                        },
                        el( 
                            Mediaupload,
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
                    // TEXT
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
                // CONTENT ARE
                el( 
                    'div',
                    { 
                        className: props.className + '  block',
                    },
                    el( 
                        Mediaupload,
                        {
                            type: 'image',
                            value: props.attributes.imgID,
                            onSelect: onSelectImage,
                            render: function( obj ) {
                                return el( 
                                    'div', 
                                    {
                                        className: 'block__image',
                                    },
                                    el( 
                                        components.Button, 
                                        {
                                        style: props.attributes.imgID ? { padding: '0' } : {  },
                                        className: props.attributes.imgID ? 'block__image' : 'is-button is-default',
                                        onClick: obj.open },
                                        ! props.attributes.imgID ? __( 'Upload Image' ) : ''
                                    ),
                                    el(
                                        'img',
                                        {
                                            src: props.attributes.imgURL,
                                        }
                                    )
                                );
                            }
                        }
                    ),
                    el(
                        Richtext,
                        {
                            key: 'richtext',
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
                        Richtext,
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
