/**
 * Base js functions
 */

$(document).ready(function(){

    var container = $('#category');
	var size = $("#category").data("size");

    var gutter = 5;
    var min_width = 300;
	
		
	$('#category').hide();
    container.imagesLoaded( function(){
	
		$('#category').show();
        container.masonry({
            itemSelector : '.box',
            gutterWidth: gutter,

            isAnimated: false,
              columnWidth: function( containerWidth ) {
                var box_width = (((containerWidth - 2*gutter)/size) - 5 | 0) ;

                if (box_width < min_width) {
                    box_width = (((containerWidth - gutter)/(size - 1)) - 5 | 0);
                }

                if (box_width < min_width) {
                    box_width = containerWidth;
                }

				

                $('.box').width(box_width);
				
                return box_width;
              }
        });

		
    });
});


