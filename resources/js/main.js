"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// check same page
var links = document.querySelectorAll('a[href]');

function check_page(e) {
  if (e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();

    if (isMobile) {
      headerFunc('hide');
    }
  }
}

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', check_page);
}

var page;
var isTriggerLoaded = false;
var introDelay = .5;

function initTrigger() {
  if (isTriggerLoaded) {
    return;
  }

  isTriggerLoaded = true;
  var pageList = ['index', 'product', 'detail', 'story', 'contact'];
  var pageNum = pageList.indexOf(page);
  var triggerList = [indexTrigger, productTrigger, detailTrigger, storyTrigger, contactTrigger];
  setTimeout(function () {
    triggerList[pageNum]();
    commonTrigger();
  }, 100);
}

function makeScrollProxy(scroller, init) {
  if (!isMobile) {
    var scrollPositionX = 0;
    var scrollPositionY = 0;
    var damping_num = 0.1;
    var bodyScrollBar = Scrollbar.init(scroller, {
      damping: damping_num,
      delegateTo: document
    });
    bodyScrollBar.addListener(function (_ref) {
      var offset = _ref.offset;
      scrollPositionX = offset.x;
      scrollPositionY = offset.y;
    });
    bodyScrollBar.setPosition(0, 0);
    bodyScrollBar.track.xAxis.element.remove();
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop: function scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value;
        }

        return bodyScrollBar.scrollTop;
      }
    });

    if (init) {
      isTriggerLoaded = false;
      bodyScrollBar.addListener(initTrigger);
    }

    bodyScrollBar.addListener(ScrollTrigger.update);
    gsap.registerPlugin(ScrollTrigger);
  } else {
    if (init) {
      isTriggerLoaded = false;
      initTrigger();
    }
  }
}

function exitDefault(e) {
  var elements = e.querySelector('.main-inner');
  document.querySelector('.button-shop').classList.remove('is-active');
  buttonShopControll('hide');
  gsap.set(document.body, {
    clearProps: "backgroundColor"
  });
  gsap.delayedCall(.3, function () {
    if (document.body.classList.contains('is-header-active')) {
      headerFunc('hide');
    }
  });
  return gsap.to(elements, .5, {
    opacity: 0,
    ease: Power2.easeInOut,
    onComplete: function onComplete() {
      gsap.to(window, .1, {
        scrollTo: {
          x: 0
        }
      });
    }
  });
}

function enterDefault(e) {
  var elements = e.querySelector('.main-inner');
  var scroller = elements.querySelector('.scroller-proxy');
  document.body.classList.add('is-loading');
  gsap.to(document.body, .5, {
    overflow: 'hidden'
  });
  gsap.from(elements, .9, {
    opacity: 0,
    delay: .5,
    ease: Power2.easeInOut,
    onComplete: function onComplete() {
      document.body.classList.remove('is-loading');
      gsap.set(document.body, {
        clearProps: "overflow"
      }); // header_motion()
    }
  });
  checkPage(e);
  gsap.delayedCall(.5, function () {
    ScrollTrigger.getAll().forEach(function (st) {
      return st.kill();
    });

    if (!isHeaderLoaded) {
      headerInit();
    }

    if (isMobile) {
      gsap.set(window, {
        scrollTo: {
          y: 0
        }
      });
    }

    makeScrollProxy(scroller, true);
  });
}

if (!isIE11) {
  barba.init({
    debug: false,
    transitions: [{
      name: 'default',
      sync: true,
      beforeLeave: function beforeLeave(e) {},
      leave: function leave(e) {
        var current = e.current;
        return exitDefault(current.container);
      },
      beforeOnce: function beforeOnce(e) {},
      once: function once(e) {
        if (!isHeaderLoaded) {
          headerController();
        }

        var next = e.next;
        page = next.namespace;
        return enterDefault(next.container);
      },
      beforeEnter: function beforeEnter(e) {},
      afterOnce: function afterOnce(e) {},
      enter: function enter(e) {
        var next = e.next;
        page = next.namespace;
        return enterDefault(next.container);
      },
      afterEnter: function afterEnter() {}
    }],
    views: [{
      namespace: 'index',
      beforeEnter: function beforeEnter(data) {
        swiperLoaded = false;
        document.body.classList.add('page-index');
        document.body.classList.add('st-theme-white');

        if (window.innerWidth < 768) {
          var mobileBar = document.querySelectorAll('header .button-sub span');
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }

        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.set('header .bar', {
          backgroundColor: "#fff"
        });
        var maxLength = document.querySelectorAll('.swiper-slide').length;
        document.querySelector('#max-num').innerHTML = maxLength;
        var percent = 1 / maxLength * 100;
        var bar = document.querySelector('.bar-inner');
        gsap.to(bar, .4, {
          width: "".concat(percent, "%"),
          ease: Power2.easeOut
        });
        document.querySelector('#current-num').innerHTML = 1;
        introIndex();
      },
      beforeLeave: function beforeLeave(data) {
        document.body.classList.remove('page-index'); // destroy();
        // mySwiper = undefined;

        isloadTrig = false;
      },
      afterLeave: function afterLeave(data) {
        isDrawCircle = false;
        swiper.destroy(true, true);
        swiper = null;

        if (isloadTrig) {
          ScrollTrigger.getById('strigger').kill(true);
          isloadTrig = false;
        }
      }
    }, {
      namespace: 'story',
      beforeEnter: function beforeEnter(data) {
        document.body.classList.add('page-story');
        document.body.classList.add('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.set('header .bar', {
          backgroundColor: "#fff"
        });

        if (window.innerWidth < 768) {
          var mobileBar = document.querySelectorAll('header .button-sub span');
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }

        isDrawCircle = false;
        introStory(data.next.container);
      },
      beforeLeave: function beforeLeave(data) {
        document.body.classList.remove('page-story');
      }
    }, {
      namespace: 'product',
      beforeEnter: function beforeEnter(data) {
        document.body.classList.add('page-product');
        document.body.classList.add('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.set('header .bar', {
          backgroundColor: "#fff"
        });

        if (window.innerWidth < 768) {
          var mobileBar = document.querySelectorAll('header .button-sub span');
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }

        isClicked = false;
        introProduct(data.next.container);
        gsap.delayedCall(.5, function () {
          descriptionMouseEvent(data.next.container);
        }); // productHoverFunc(data.next.container)
      },
      beforeLeave: function beforeLeave(data) {
        document.body.classList.remove('page-product');
      }
    }, {
      namespace: 'detail',
      beforeEnter: function beforeEnter(data) {
        document.body.classList.add('page-detail');
        document.body.classList.remove('st-theme-white');
        commerceLinkSet(data.next.container);
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.set('header .bar', {
          backgroundColor: "#000"
        });

        if (window.innerWidth < 768) {
          var mobileBar = document.querySelectorAll('header .button-sub span');
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#000"
          });
        }

        isClicked = false;
        introDetail(data.next.container);
        gsap.delayedCall(.5, function () {
          descriptionMouseEvent(data.next.container);
        });
      },
      beforeLeave: function beforeLeave(data) {
        document.body.classList.remove('page-detail');
      }
    }, {
      namespace: 'contact',
      beforeEnter: function beforeEnter(data) {
        document.body.classList.add('page-contact');
        document.body.classList.remove('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.set('header .bar', {
          backgroundColor: "#000"
        });

        if (window.innerWidth < 768) {
          var mobileBar = document.querySelectorAll('header .button-sub span');
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#000"
          });
        }

        introContact(data.next.container);
      },
      beforeLeave: function beforeLeave(data) {
        document.body.classList.remove('page-contact'); // do something before leaving the current `index` namespace
      }
    }]
  });
} else {
  headerController();
  checkPage(document.querySelector('main'));
  var main = document.querySelector('main').getAttribute('data-barba-namespace');
  ieCommonFunc();

  if (main == 'index') {
    page = 'index';
    swiperLoaded = false;
    document.body.classList.add('st-theme-white');
    slideTextMotion(0);
    mainSwiper();
  }

  if (main == 'story') {
    document.body.classList.add('st-theme-white');
  }

  if (main == 'product') {
    page == 'product';
    isClicked = false;
    document.querySelector('.content-ingredients').setAttribute('data-load', 'true');
    descriptionMouseEvent(document);
  }

  if (main == 'detail') {
    page == 'detail';
    isClicked = false;
    document.querySelector('.content-ingredients').setAttribute('data-load', 'true');
    commerceLinkSet(document.querySelector('main'));
    descriptionMouseEvent(document);
  }
}

var headerInit = function headerInit() {
  if (isHeaderLoaded) {
    return;
  }

  isHeaderLoaded = true;
  gsap.to('header', .8, {
    opacity: 1,
    ease: Power2.easeInOut
  });
  var subList = document.querySelectorAll('.sub-list-depth1 li a');

  _toConsumableArray(subList).forEach(function (list) {
    if (isMobile) {
      list.addEventListener('click', function (e) {
        var bar = e.target.querySelector('.bar');
        gsap.set(bar, {
          clearProps: "all"
        });
        gsap.killTweensOf(bar, "opacity", "x");
        gsap.to(bar, .4, {
          x: "0%",
          opacity: 1,
          overwrite: "auto",
          ease: Power2.easeOut
        });
      });
    } else {
      list.addEventListener('mouseenter', function () {
        if (list.classList.contains('is-active')) {
          return;
        }

        var bar = list.querySelector('.bar');
        gsap.set(bar, {
          x: "-102%"
        });
        gsap.to(bar, .4, {
          x: "0%",
          ease: Power2.easeOut
        });
      });
      list.addEventListener('mouseleave', function () {
        if (list.classList.contains('is-active')) {
          return;
        }

        var bar = list.querySelector('.bar');
        gsap.to(bar, .4, {
          x: "102%",
          ease: Power2.easeOut
        });
      });
    }
  });
};