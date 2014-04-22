/* global $, jQuery, google */

$(function() {

  var pyne2014 = window.pyne2014 || {};

  pyne2014.init = function() {
    this.HEADER_HEIGHT = 67;
    this.scrollHandler();
    this.initializeJqueryFilters();
    this.parallaxHandler();
    this.initializeMap();

    window.pyne2014 = pyne2014;
  };

  pyne2014.initializeJqueryFilters = function() {
    (function($) {
      $.expr[':'].appearing = function(elem) {
        var $window = $(window),
            windowViewTop = $window.scrollTop(),
            windowViewBottom = windowViewTop + $window.height(),
            elemTop = $(elem).offset().top,
            elemBottom = elemTop + $(elem).height(),

            isAppearingFully = ((elemTop >= windowViewTop) && (elemBottom <= windowViewBottom)),
            isAppearingBottom = ((windowViewTop > elemTop) && (windowViewTop < elemBottom)),
            isAppearingTop = ((windowViewBottom > elemTop) && (windowViewTop < elemBottom));

        return isAppearingFully || isAppearingBottom || isAppearingTop;
      };
    })(jQuery);
  };

  pyne2014.scrollPage = function(articleToGo){
    var _this = this,
        articleOffset = $('.' + articleToGo).offset();

    if (!articleOffset) {
      return;
    }

    $('body, html').stop(true, true).animate({
      scrollTop : articleOffset.top - _this.HEADER_HEIGHT
    }, 1000, function(){
    document.location.hash = articleToGo;
    $('a', '.navbar-nav').removeClass('active');
    $('a[data-article='+ articleToGo + ']').addClass('active');
    });
  };

  pyne2014.scrollHandler = function() {
    var _this = this;

    var hash = document.location.hash.substring(1);
    if(hash !== ""){
      $(window).load(function() {
        setTimeout(function(){
          _this.scrollPage(hash);
        }, 100);
      });
    }

    var goTo = function(e) {
      var articleToGo = $(this).data('article');
      if (articleToGo) {
        e.preventDefault();
        _this.scrollPage(articleToGo);
      }
    };
    $('.navbar-nav').on('click', 'a, img', goTo);
    $('.palestrantes [data-article]').on('click', goTo);
  };

  pyne2014.parallaxHandler = function() {
    var $window = $(window);
    $window.scroll(function(){
      $('.full-bg').each(function(){
        var $this = $(this);
        if ($this.is(':appearing')) {
          var elemOffset = $this.offset(),
              scrolled = $window.scrollTop() - elemOffset.top;
          $this.css('backgroundPosition', '0 ' + scrolled * ($this.data('speed') || 0.7) + 'px');
        }
      });
    });
  };

  pyne2014.initializeMap = function() {

    ;(function(w, d, g) {

      var marker, position, mapRenderPosition, config, map, gMaps = g.maps;

      position = new gMaps.LatLng(-12.978778, -38.460592);
      mapRenderPosition = new gMaps.LatLng(-12.9791148, -38.4574931);

      config = {
        center: mapRenderPosition,
        mapTypeControl: false,
        mapTypeId: gMaps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoom: 16
      };

      map = new gMaps.Map(d.getElementById("map-canvas"), config);

      marker = new gMaps.Marker({
        map: map,
        animation: gMaps.Animation.BOUNCE,
        position: position,
      });

    }(window, document, google));
  };

  pyne2014.init();

});
