/// <reference path="definitions/jquery/jquery.d.ts"/>

namespace app {

  export class RippleButton {

    init(): void {

      $(document)
      .on('click touched', '.ripple', function(e) {

        var $ripple = $( '<i class="rippling" />' ),
          $button = $(this),
          btnOffset = $button.offset(),
          xPos = e.pageX - btnOffset.left,
          yPos = e.pageY - btnOffset.top,
          size = 0,
          animateSize = Math.max($button.width(), $button.height()) * Math.PI;

        $ripple.css({
          top: yPos,
          left: xPos,
          width: size,
          height: size,
          backgroundColor: $button.attr( 'ripple-color' )
        })
          .appendTo($button)
          .animate({
            width: animateSize,
            height: animateSize,
            opacity: 0
          }, 500, function() {
            $(this).remove();
          });
      });
    }
  }
}