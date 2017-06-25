jQuery(document).ready(function($){
  var Animate = {
    init: function() {
      $('.swipe .box').each(function(i, elt){
        Animate.hammerize(elt);
      });

      $('.nav .nav-content i').on('click', function(evt){
        evt.preventDefault();
        Animate.hideItem();
      });

      $('.toolbox.view').on('click', function(evt){
        evt.preventDefault();
        Animate.showItem($(this));
      });

      $('.toolbox.trash').on('click', function(evt){
        evt.preventDefault();
        var target = $(this).closest('li');
        target.addClass('removed');
      });

      $('li').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function(e){
        if($(e.currentTarget).hasClass('removed'))
          $(this).remove();
      });
    },
    showItems: function(elt) {
      if( ! $(elt).closest('li').hasClass('animate') )
        $(elt).closest('li').addClass('animate');
    },
    hideItems: function(elt) {
      if( $(elt).closest('li').hasClass('animate') )
        $(elt).closest('li').removeClass('animate');
    },
    showItem: function(elt) {
      var targetElement = elt.closest('li').find('div.box').clone();
      targetElement.appendTo( '.item-content' );
      $('.item-display').addClass('appear');
    },
    hideItem: function() {
      $('.item-display').removeClass('appear');
      $('div.item-display').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function(e){
        if(! $(e.currentTarget).hasClass('appear'))
          $( '.item-content' ).html('');
      });
    },
    hammerize: function(elt) {
      var hammerElt = new Hammer(elt);
      hammerElt.on('tap', function(evt) {
        var element = $(evt.target);
        if( element.closest('li').hasClass('animate') )
          return;
        Animate.showItem(element);
      });
      hammerElt.on('panleft swipeleft', function(ev) {
        if(Math.abs(ev.angle) > 150 && Math.abs(ev.overallVelocityX) > 1 && ev.isFinal != true) {
          Animate.showItems(elt);
        }
      });

      hammerElt.on('panright swiperight', function(ev) {
        if(Math.abs(ev.deltaX) > 150 && Math.abs(ev.overallVelocityX) > 1) {
          Animate.hideItems(elt);
        }
      });
    }
  }

  Animate.init();
});
