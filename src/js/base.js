/* global $ */

$(function() {

  var pyne2014 = window.pyne2014 || {};

  pyne2014.init = function() {
    this.HEADER_HEIGHT = 67;
    this.scrollHandler();

    window.pyne2014 = pyne2014;
  };

  pyne2014.scrollPage = function(articleToGo){
    var _this = this,
        articleTopPosition = $('.' + articleToGo).offset().top;
    $('body').stop().animate({
      scrollTop : articleTopPosition - _this.HEADER_HEIGHT
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

    $('.navbar-nav').on('click', 'a, img', function(e) {
      e.preventDefault();
      var articleToGo = $(this).data('article');
      _this.scrollPage(articleToGo);
    });

    var $window = $(window);
    $window.scroll(function() {


      var TOLERANCE = 200,
          aboutTop = $('.about').offset().top,
          speakersTop = $('.speakers').offset().top,
          sponsorsTop = $('.sponsors').offset().top,
          contactUsTop = $('.contact-us').offset().top,
          windowTop = $window.scrollTop() + _this.HEADER_HEIGHT + TOLERANCE;

      var $currentArticle;
      if (windowTop < aboutTop) {
        $currentArticle = null;
      }
      else if (windowTop < speakersTop) {
        $currentArticle = $('a[data-article=about]');
      }
      else if (windowTop < sponsorsTop) {
        $currentArticle = $('a[data-article=services]');
      }
      else if (windowTop < contactUsTop) {
        $currentArticle = $('a[data-article=portfolio]');
      }
      else {
        $currentArticle = $('a[data-article=contact-us]');
      }
      if ($currentArticle && !$currentArticle.hasClass('active')) {
          $('a', '.navbar-nav').removeClass('active');
          $currentArticle.addClass('active');
      }
      else if (!$currentArticle) {
          $('a', '.navbar-nav').removeClass('active');
      }
    });

  };

  pyne2014.init();
});
