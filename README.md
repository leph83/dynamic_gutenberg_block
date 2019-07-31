# dynamic_gutenberg_block
I want to create a 
custom gutenberg block with 
- image(s)
- title
- subtitle
- desription 
- links

Something like this: https://codepen.io/whatthephuc/pen/ydMQzj?editors=1100 or https://pixelgrade.com/plugins/nova-blocks-early-access/

The problem with Gutenberg is, that if you change something in the "save" function, the block will be deprecated. 
Description of the problem can be found here: https://github.com/WordPress/gutenberg/issues/4849#issuecomment-503773022

My goal is to create a custom gutenberg block, where I can choose a style in the inspector bar. 
Depending on the chosen style I want to add classes to my markup or even change the structure of the html. 
I also want to add additional options like "html tag" for the title or specific classes for the title.
