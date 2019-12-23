Drupal.locale = { 'strings': {"":{"Hide":"\u9690\u85cf","July":"\u4e03\u6708","Upgrade":"\u5347\u7ea7","View more materials":"\u66f4\u591a\u8d44\u6599","View all":"\u67e5\u770b\u5168\u90e8","No results found":"\u672a\u627e\u5230\u7ed3\u679c","Please try another category":"\u8bf7\u5c1d\u8bd5\u5176\u4ed6\u7c7b\u578b","Scanned using Artec 3D technology":"Artec 3D\u79d1\u6280\u626b\u63cf\u5236\u4f5c","Scanned using @scanner":"@scanner\u626b\u63cf\u5236\u4f5c"}} };
;/*})'"*/
;/*})'"*/
(function($){'use strict';Drupal.behaviors.artecFix={attach:function(context,settings){$('a.active',context).on('click',function(){return false});$('.header #main-menu-wrap li a.nolink').on('click',function(a){a.preventDefault()});$('#edit-field-price-type-und').on('change',function(){var val=$(this).val();$('.group-one, .group-text-link, .group-list-price').hide();if(val=='single')$('.group-one').show();if(val=='link')$('.group-text-link').show();if(val=='list')$('.group-list-price').show();if(val=='AL_list')$('.group-list-price').show()});$('#edit-field-price-type-und').change();$('fieldset.filter-wrapper',context).each(function(){$(this).hide().before('<a class="fsf-btn" href="#show">Filters</a>');$(this).prev().click(function(){$(this).next().toggle();return false})})
function __reinitMVWtabs(){$('.mvw-tabs').each(function(){$(this).find('a').each(function(index){var oldIndex=$(this).data('fieldIndex');$(this).data('fieldIndex',index).removeClass('fieldIndex-'+oldIndex).addClass('fieldIndex-'+index)})});return true};__reinitMVWtabs();$('.mvw-tabs li a').on('mouseup',function(){var index=$(this).data('fieldIndex');$('a.fieldIndex-'+index).click()});$('.mvw-tabs').on('sortstop',function(evn,ui){__reinitMVWtabs();$(evn.toElement).mouseup()});var cheker=$('.webform-component--cheker input');cheker.each(function(){var token=$(this).parent().parent().find('input[name="form_build_id"]').val();$(this).val(token+'4z1')});var s3imgBlock=$('.node-form .field-name-field-s3-image');if(s3imgBlock.length>0)if(!s3imgBlock.hasClass('processed')){s3imgBlock.append('<a href="#toggle-s3image" id="s3img-toggle">toggle</a>');$('#s3img-toggle').on('click',function(){$(this).parent().find('.fieldset-wrapper').toggle();return false}).click();s3imgBlock.addClass('processed')}}};var JSAPP=window.JSAPP||{};JSAPP.reAnimation=function(){var scrolled=$(window).scrollTop(),win_height_padded=$(window).height()*1.1;$(".re-am:not(.animated)").each(function(){var $this=$(this),offsetTop=$this.offset().top;if(scrolled+win_height_padded>offsetTop)if($this.data('timeout')){window.setTimeout(function(){$this.addClass('animated ')},parseInt($this.data('timeout'),10))}else $this.addClass('animated '+$this.data('animation'))});$(".re-am.animated").each(function(index){var $this=$(this),offsetTop=$this.offset().top;if(scrolled+win_height_padded<offsetTop)$(this).removeClass('animated '+$this.data('animation'))})};JSAPP.animationOnScroll=function(){var $window=$(window);if($window.width()>480){$window.on('scroll',JSAPP.reAnimation);JSAPP.reAnimation()}};$(window).ready(function(){JSAPP.animationOnScroll()});JSAPP.s3toggle=function(){};$(document).ready(function(){JSAPP.s3toggle()});jQuery(document).ready(function(){if(navigator.userAgent.indexOf('Mac')>0){jQuery('body').addClass('mac-os')}else jQuery("body").addClass("pc-os")})}(jQuery));(function($){if(!$.browser)$.extend({browser:function(){var a={};try{navigator.vendor?/Chrome/.test(navigator.userAgent)?(a.browser="Chrome",a.version=parseFloat(navigator.userAgent.split("Chrome/")[1].split("Safari")[0])):/Safari/.test(navigator.userAgent)?(a.browser="Safari",a.version=parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0])):/Opera/.test(navigator.userAgent)&&(a.Opera="Safari",a.version=parseFloat(navigator.userAgent.split("Version/")[1])):/Firefox/.test(navigator.userAgent)?(a.browser="Firefox",a.version=parseFloat(navigator.userAgent.split("Firefox/")[1])):(a.browser="MSIE",/MSIE/.test(navigator.userAgent)?a.version=parseFloat(navigator.userAgent.split("MSIE")[1]):a.version="edge")}catch(e){a=e};return a}})})(jQuery);(function($){$.fn.outerHTML=function(){return $(this).clone().wrap('<div></div>').parent().html()}})(jQuery);;/*})'"*/
(function($){$(document).ready(function(){setTimeout(function(){var input=$('.search-n-lang .search-row__input');if(input.length)input.each(function(k,e){var small=$(e).parents('.header').hasClass('small')?'.small ':'';$(e).autocomplete({focus:function(event,ui){event.preventDefault()},source:'/'+Drupal.settings.pathPrefix+'search/ajax',minLength:3,appendTo:small+".search-n-lang .results-row"}).data("ui-autocomplete")._renderItem=function(ul,item){return $("<li></li>").data("item.autocomplete",item).append(item.label).appendTo(ul)}})},10)});$(document).on('click','.results-row .ui-autocomplete li a',function(){$('.search-n-lang .search-row__input').val('')})}(jQuery));;/*})'"*/
angular.module('artecApp', ['ngAnimate']);

//Cart block Controller
angular.module('artecApp').controller('ctrlCart', ['$scope', '$rootScope', 'Cart',
    function ($scope, $rootScope, Cart) {

        $scope.Cart = Cart;

    }
]);

var redirect = false;

//Add to cart Controllers
angular.module('artecApp').controller('addToCart', ['$scope', '$rootScope', 'Cart',
    function ($scope, $rootScope, Cart) {

        $scope.product = {};
        $scope.addToCart = function () {
            var $item = {
                NAME: $scope.product.name,
                CODE: $scope.product.sku,
                label: '',
                price: $scope.product.price.replace(/\s+/g, ''),
                currency: $scope.product.currency
            };

            Cart.addItem($item);
        };

        $scope.redirect = function() {
          redirect = true;
          var $item = {
            NAME: $scope.product.name,
            CODE: $scope.product.sku,
            label: $scope.product.sku,
            price: $scope.product.price.replace(/\s+/g, ''),
            currency: $scope.product.currency
          };

          Cart.addItem($item);
        };
    }
]);

//add to cart for list
angular.module('artecApp').controller('addToCartList', ['$scope', '$rootScope', 'Cart',
    function ($scope, $rootScope, Cart) {

        $scope.product = {};
        $scope.addToCart = function () {

            var $item = {
                NAME: $scope.product.name,
                CODE: $scope.product.sku,
                label: $scope.product[$scope.product.sku].label,
                price: $scope.product[$scope.product.sku].cost,
                currency: $scope.product.currency
            };

            Cart.addItem($item);
        }
    }
]);

//add to cart for AL list
angular.module('artecApp').controller('addToCartALList', ['$scope', '$rootScope', 'Cart',
    function ($scope, $rootScope, Cart) {

        $scope.tmp = {};

        $scope.product = {};

        $scope.addToCart = function () {

            var $item = {
                NAME: $scope.product.name,
                CODE: $scope.tmp.prop[$scope.tmp.radio1 + $scope.tmp.radio2].sku,
                label: $scope.tmp.prop[$scope.tmp.radio1 + $scope.tmp.radio2].label,
                price: $scope.tmp.prop[$scope.tmp.radio1 + $scope.tmp.radio2].cost,
                currency: $scope.product.currency
            };

            Cart.addItem($item);
        }
    }
]);


//Cart Service
angular.module('artecApp').service('Cart', ['$http', 'Rest', function ($http, Rest) {

    $self = this;
    $self.currency = '';

    $self.orderId = '';
    $self.orderSec = '';

    this.items = [];

    this.totalProds = function () {
        var count = 0;
        angular.forEach($self.items, function (item, key) {
            count += item.amount || 1;
        });

        return count;
    }

    this.totalPrice = function () {
        var total = 0;
        angular.forEach($self.items, function (item, key) {
            total += item.amount * item.price;
        });
        return total;
    };

    this.removeItem = function ($code) {
        //console.log($code);
        angular.forEach($self.items, function (item, key) {
            if (item.CODE == $code) {
                $self.items.splice(key, 1);
            }
        });
        $self.saveCart();
    }

    this.addItem = function ($newItem) {
        //$(this).parentsUntil('.node-product').addClass('sdsd');

        //angular.element('#cart-wrap .total-count-wr').addClass('asdad');

        var isNew = true;
        angular.forEach($self.items, function (item, key) {
            if (item.CODE == $newItem.CODE) {
                $self.items[key].amount++;
                $self.items[key].total = $self.items[key].amount * $self.items[key].price;
                isNew = false;
            }
        });

        if (isNew) {
            $newItem.total = $newItem.price;
            $newItem.amount = 1;
            $newItem.ID = $self.items.length;
            $self.items.push($newItem);
        }
        //console.log($newItem);
        $self.currency = $newItem.currency;
        $self.saveCart();
    }

    this.saveCart = function () {
        var order = {};
        order.cart = {
            items: $self.items,
            total: $self.totalPrice(),
            currency: $self.currency
        };
        //console.log(order);
        Rest.post('/api/shop/savecart', order)
            .then(function (data) {
                if (redirect) {
                  window.location.href = "/checkout/my-artec";
                }
                //console.log(data);
            }, function (data) {
                console.log('er save cart');
            });
    };

    this.loadCart = function () {
        var getParam = '';
        if ($self.orderId && $self.orderSec) {
            var rand = Math.random();
            getParam = '?orderId=' + $self.orderId + '&orderSec=' + $self.orderSec + '&rand=' + rand;
        }
        Rest.get('/api/shop/loadcart'+getParam)
            .then(function (data) {
                //console.log(data);
                $self.items = data.cart.items;
                $self.currency = data.cart.currency;
                angular.element('.total-count-wr').css({'display': 'block'});
            }, function (data) {
                console.log('not load cart');
                angular.element('.total-count-wr').css({'display': 'block'});
            });
    };

    this.updateCart = function () {
        var ordId = 'artec_order_id', ordSec = 'artec_order_secret';

        function getCookie(name) {
            var matches = document.cookie.match(new RegExp(
              "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        var orderId = getCookie(ordId);
        var orderSec = getCookie(ordSec);

        if(orderId && orderSec){
            $self.orderId = orderId;
            $self.orderSec = orderSec;
        }
    };
    this.updateCart();
    this.loadCart();

    return this;

}]);

angular.module('artecApp').factory("Rest", ['$http', '$q',
    function ($http, $q) { // This service connects to our REST API

        var obj = {};

        obj.get = function (query) {
            var defer = $q.defer();
            $http.get(query).success(function (data, status) {
                defer.resolve(data);
            }).error(function (data, status) {
                defer.reject(data);
            });
            return defer.promise;
        };

        obj.post = function (query, object) {

            var defer = $q.defer();
            $http.post(query, object).success(function (data, status) {
                defer.resolve(data);
            }).error(function (data, status) {
                defer.reject(data);
            });
            return defer.promise;
        };

        return obj;
    }]);


angular.module('artecApp').directive('animatetrigger', ['$animate', function ($animate) {

    return function (scope, elem, attrs) {
        elem.on('click', function (elem) {
            scope.$apply(function () {
                var el = angular.element('#cart-wrap .total-count-wr');
                var promise = $animate.addClass(el, "shakeit");
                promise.then(function () {
                    scope.$apply(function () {
                        $animate.removeClass(el, "shakeit");
                    });
                });
            });
        });
    }
}]);

angular.module('artecApp').filter('cur_simbol', function () {
    return function (input) {
        var cur_simbols = {'USD': 'US $', 'EUR': '€'};
        return cur_simbols[input];
    };
});

// Formatting Price By User Location
angular.module('artecApp').filter('priceFormatterByLocation', function () {
  return function(text, params){

      console.log('params', params);

    var out = '',
      locat = params[0],
      currency = params[1];

    if (currency == 'EUR') {
        curSymbol = '€';
    } else {
      curSymbol = '$';
    }

    var number_format = function(number, decimals, dec_point, thousands_sep) {
      // Strip all characters but numerical ones.
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
          };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
    };

    switch (locat) {
      case 'de':
      case 'es':
        out = number_format(text, 0, ",", ".") + ' ' + curSymbol;
        break;

      case 'fr':
        out = number_format(text, 0, ",", ".") + ' ' + curSymbol;
        break;

      case 'it':
        out = number_format(text, 0, ",", ".") + curSymbol;
        break;

      case 'ru':
        out = curSymbol + number_format(text, 0, ",", " ");
        break;

      case 'zh-hans':
        out = curSymbol + number_format(text, 0, ",", "");
        break;

      case 'ja':
        out = number_format(text, 0, ",", ".") + ' ' + currency;
        break;

      case 'ko':
        out = currency + number_format(text, 0, ",", ",");
        break;

      case 'en':
      default:
        out = curSymbol + number_format(text, 0, ",", ",");
        break;

    }

    return out;
  }
  }
);

;/*})'"*/
;/*})'"*/
/*!
	Colorbox 1.6.1
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(A+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in y[0]&&!y[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),y.focus())}function c(t){c.str!==t&&(y.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){A=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),A=W.index(_.el),-1===A&&(W=W.add(_.el),A=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),y.css({visibility:"hidden",display:"block",opacity:""}),I=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(I),j=T.height()+k.height()+b.outerHeight(!0)-b.height(),D=C.width()+H.width()+b.outerWidth(!0)-b.width(),N=I.outerHeight(!0),z=I.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-z-D,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-N-j,I.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(S).hide(),y.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){y||(V=!1,E=t(i),y=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),M=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),x=n(se,"Wrapper"),b=n(se,"Content").append(S=n(se,"Title"),F=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),R=n("button","Slideshow"),M),B=t('<button type="button"/>').attr({id:Z+"Close"}),x.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),L=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(F).add(R)),e.body&&!y.parent().length&&t(e.body).append(v,y.append(x,L))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return y?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if(q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-N-j:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-z-D:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-z-D,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-N-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){M.show()},100),_.get("inline")){var c=t(e);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=_.get("createImg"),t(U).addClass(Z+"Photo").bind("error."+Z,function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[A+1])&&(U.style.cursor="pointer",t(U).bind("click."+Z,function(){J.next()})),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&L.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,y,x,b,T,C,H,k,W,E,I,L,M,S,F,R,K,P,B,O,_,j,D,N,z,A,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullScreen=!0,i}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[A+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){R.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),y.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),R.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),y.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,R.hide(),t(),ae.unbind(ne,e).unbind(ie,t),y.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),R.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;return e=e||{},t.isFunction(o)&&(o=t("<a/>"),e.open=!0),o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(y[0].style.width,10)-D+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(y[0].style.height,10)-j+"px"}var r,h,s,l=0,d=0,c=y.offset();if(E.unbind("resize."+Z),y.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,y.css({position:"fixed"})):(l=h,d=s,y.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-z-D-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-z-D,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-N-j-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-N-j,0)/2),y.css({top:c.top,left:c.left,visibility:"visible"}),x[0].style.width=x[0].style.height="9999px",r={width:_.w+z+D,height:_.h+N+j,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||y.css(r),y.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,x[0].style.width=_.w+z+D+"px",x[0].style.height=_.h+N+j+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-z-D),t.innerWidth&&(_.w=a(t.innerWidth,"x")),I.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-N-j),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=I.scrollTop(),I.css({height:"auto"}),_.h=I.height()),I.css({height:_.h}),e&&I.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||I.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||I.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");I.remove(),I=n(se,"LoadedContent").append(i),I.hide().appendTo(L.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),L.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&y[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),M.hide(),u(ne),_.get("onComplete")},S.html(_.get("title")).show(),I.show(),a>1?("string"==typeof _.get("current")&&F.html(_.get("current").replace("{current}",A+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>A?"show":"hide"]().html(_.get("next")),P[_.get("loop")||A?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=_.get("createIframe"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),"class":Z+"Iframe"}).one("load",o).appendTo(I),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?y.fadeTo(g,1,i):i())},"fade"===_.get("transition")?y.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[A+1])&&(A=h(1),f(W[A]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||A)&&(A=h(-1),f(W[A]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),y.stop().fadeTo(_.get("fadeOut")||0,0,function(){y.hide(),v.hide(),u(he),I.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){y&&(y.stop(),t[Y].close(),y.stop(!1,!0).remove(),v.remove(),G=!1,y=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);
;/*})'"*/
;/*})'"*/
(function($){Drupal.behaviors.initColorbox={attach:function(context,settings){if(!$.isFunction($.colorbox)||typeof settings.colorbox==='undefined')return;if(settings.colorbox.mobiledetect&&window.matchMedia){var mq=window.matchMedia("(max-device-width: "+settings.colorbox.mobiledevicewidth+")");if(mq.matches)return};settings.colorbox.rel=function(){if($(this).data('colorbox-gallery')){return $(this).data('colorbox-gallery')}else return $(this).attr('rel')};$('.colorbox',context).once('init-colorbox').colorbox(settings.colorbox);$(context).bind('cbox_complete',function(){Drupal.attachBehaviors('#cboxLoadedContent')})}}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.initColorboxDefaultStyle={attach:function(context,settings){$(context).bind('cbox_complete',function(){if($('#cboxTitle:empty',context).length==false){$('#cboxLoadedContent img',context).bind('mouseover',function(){$('#cboxTitle',context).slideDown()});$('#cboxOverlay',context).bind('mouseover',function(){$('#cboxTitle',context).slideUp()})}else $('#cboxTitle',context).hide()})}}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.initColorboxLoad={attach:function(context,settings){if(!$.isFunction($.colorbox)||typeof settings.colorbox==='undefined')return;if(settings.colorbox.mobiledetect&&window.matchMedia){var mq=window.matchMedia("(max-device-width: "+settings.colorbox.mobiledevicewidth+")");if(mq.matches)return};$.urlParams=function(url){var p={},e,a=/\+/g,r=/([^&=]+)=?([^&]*)/g,d=function(s){return decodeURIComponent(s.replace(a,' '))},q=url.split('?');while(e=r.exec(q[1])){e[1]=d(e[1]);e[2]=d(e[2]);switch(e[2].toLowerCase()){case'true':case'yes':e[2]=true;break;case'false':case'no':e[2]=false;break};if(e[1]=='width')e[1]='innerWidth';if(e[1]=='height')e[1]='innerHeight';p[e[1]]=e[2]};return p};$('.colorbox-load',context).once('init-colorbox-load',function(){var params=$.urlParams($(this).attr('href'));$(this).colorbox($.extend({},settings.colorbox,params))})}}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.initColorboxInline={attach:function(context,settings){if(!$.isFunction($.colorbox)||typeof settings.colorbox==='undefined')return;if(settings.colorbox.mobiledetect&&window.matchMedia){var mq=window.matchMedia("(max-device-width: "+settings.colorbox.mobiledevicewidth+")");if(mq.matches)return};$.urlParam=function(name,url){if(name=='fragment'){var results=new RegExp('(#[^&#]*)').exec(url)}else var results=new RegExp('[\\?&]'+name+'=([^&#]*)').exec(url);if(!results)return'';return results[1]||''};$('.colorbox-inline',context).once('init-colorbox-inline').colorbox({transition:settings.colorbox.transition,speed:settings.colorbox.speed,opacity:settings.colorbox.opacity,slideshow:settings.colorbox.slideshow,slideshowAuto:settings.colorbox.slideshowAuto,slideshowSpeed:settings.colorbox.slideshowSpeed,slideshowStart:settings.colorbox.slideshowStart,slideshowStop:settings.colorbox.slideshowStop,current:settings.colorbox.current,previous:settings.colorbox.previous,next:settings.colorbox.next,close:settings.colorbox.close,overlayClose:settings.colorbox.overlayClose,maxWidth:settings.colorbox.maxWidth,maxHeight:settings.colorbox.maxHeight,innerWidth:function(){return $.urlParam('width',$(this).attr('href'))},innerHeight:function(){return $.urlParam('height',$(this).attr('href'))},title:function(){return decodeURIComponent($.urlParam('title',$(this).attr('href')))},iframe:function(){return $.urlParam('iframe',$(this).attr('href'))},inline:function(){return $.urlParam('inline',$(this).attr('href'))},href:function(){return $.urlParam('fragment',$(this).attr('href'))}})}}})(jQuery);;/*})'"*/
