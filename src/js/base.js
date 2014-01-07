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
        articleOffset = $('.' + articleToGo).offset();

    if (!articleOffset) {
      return;
    }

    $('body').stop().animate({
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

    $('.navbar-nav').on('click', 'a, img', function(e) {
      e.preventDefault();
      var articleToGo = $(this).data('article');
      _this.scrollPage(articleToGo);
    });
  };

  pyne2014.init();
});
