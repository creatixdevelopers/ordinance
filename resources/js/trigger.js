"use strict";

gsap.config({
  nullTargetWarn: false
});
var isloadTrig = false;
var canClicked = false;

function isIE() {
  var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object

  var msie = ua.indexOf('MSIE '); // IE 10 or older

  var trident = ua.indexOf('Trident/'); //IE 11

  if (msie > 0 || trident > 0) {
    document.body.classList.add('isIE11');
  }

  return msie > 0 || trident > 0;
}

var isIE11 = isIE(); // const isIE11 = true;
// document.body.classList.add('isIE11');

var isMobile = false;
var scrollElement = '.scroller-proxy';
var isHeaderLoaded = false;
var swiperLoaded = false;
var isDrawCircle = false;
var isCircleMotionPlayed = false;
var isCirclePlayed = false;
var triggers = [];

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
  scrollElement = document.body;
  document.body.classList.add('is-mobile');
}

var resetTextTrigger = function resetTextTrigger() {
  return;
  var rr = document.querySelectorAll('.swiper-slide');
  gsap.utils.toArray(rr).forEach(function (sl) {
    if (!sl.classList.contains('swiper-slide-active') && !sl.classList.contains('swiper-slide-duplicate-active')) {
      var all = sl.querySelectorAll('.align-item');
      gsap.killTweensOf(all);
      gsap.set(all, {
        clearProps: "xPercent"
      });
    }
  }); // gsap.utils.toArray(triggers).forEach(st => {
  //     ScrollTrigger.getById(st).kill(true)
  //     const elements = st.querySelectorAll('.masking-text')
  //     gsap.set(elements, {clearProps: true})
  //     triggers = [];
  // })
}; // deafult func


var buttonShop = document.querySelector('.button-shop');
var checkTween = false;

if (window.innerWidth > 768) {
  buttonShop.addEventListener('mouseenter', function () {
    if (!buttonShop.classList.contains('is-active')) {
      buttonShop.classList.add('is-active');
      buttonShopControll('show');
    }
  });
  buttonShop.addEventListener('mouseleave', function () {
    buttonShop.classList.remove('is-active');
    buttonShopControll('hide');
  });
} else {
  buttonShop.addEventListener('click', function () {
    if (checkTween) {
      return;
    }

    if (!buttonShop.classList.contains('is-active')) {
      buttonShop.classList.add('is-active');
      buttonShopControll('show');
    } else {
      buttonShop.classList.remove('is-active');
      buttonShopControll('hide');
    }
  });
}

var buttonShopControll = function buttonShopControll(state) {
  checkTween = true;
  var shop = document.querySelector('.shop-list');
  var shopList = shop.querySelectorAll('.masking-wrap');
  var bar = document.querySelector('.shop-list-bar');

  if (state == 'show') {
    gsap.killTweensOf(bar);
    gsap.set(bar, {
      x: "-102%"
    });
    gsap.killTweensOf(shop);
    gsap.killTweensOf(shopList);
    gsap.set(shop, {
      display: "block",
      height: "auto",
      opacity: 1
    });
    gsap.to(shopList, .5, {
      opacity: 1,
      ease: Power1.easeInOut,
      stagger: .05
    });
    gsap.to(shopList, .5, {
      y: "0%",
      ease: Power2.easeOut,
      stagger: .05,
      onComplete: function onComplete() {
        checkTween = false;
      }
    });
    gsap.to(bar, 1, {
      x: "0%",
      ease: Power1.easeInOut
    });
  } else {
    gsap.killTweensOf(bar, "x");
    gsap.killTweensOf(shop);
    gsap.killTweensOf(shopList);
    gsap.to(shopList, .4, {
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function onComplete() {
        gsap.set(shopList, {
          y: "100%"
        });
        gsap.set(shop, {
          display: "none"
        });
        gsap.set(bar, {
          x: "-102%"
        });
        checkTween = false;
      }
    });
    gsap.to(shop, .4, {
      opacity: 0,
      ease: Power2.easeOut
    }); // gsap.to(shopList, .5, {y: "0%", ease: Power2.easeOut, stagger: .05})
  }
}; // trigger


var commonTrigger = function commonTrigger() {
  var headerWhite = document.querySelectorAll('.header-white');
  var mobileBar = document.querySelectorAll('header .button-sub span');
  gsap.utils.toArray(headerWhite).forEach(function (element) {
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: element,
      start: "top-=30px top",
      onEnter: function onEnter() {
        document.body.classList.add('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.to('header .bar', .4, {
          backgroundColor: "#fff",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }
      },
      onEnterBack: function onEnterBack() {
        document.body.classList.add('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.to('header .bar', .4, {
          backgroundColor: "#fff",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }
      },
      onLeave: function onLeave() {
        document.body.classList.remove('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.to('header .bar', .4, {
          backgroundColor: "#000",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#000"
          });
        }
      },
      onLeaveBack: function onLeaveBack() {
        document.body.classList.remove('st-theme-white');
        gsap.to('header .bar', .4, {
          backgroundColor: "#000",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#000"
          });
        }
      }
    });
  });
  var visualTranslate = document.querySelectorAll('.x-visual-translate');
  gsap.utils.toArray(visualTranslate).forEach(function (loopElement) {
    var visual = loopElement.querySelectorAll('.visual-wrap');
    gsap.utils.toArray(visual).forEach(function (target) {
      var visualElement = target.querySelectorAll('img');
      gsap.utils.toArray(visualElement).forEach(function (img) {
        var targetNumber = img.getAttribute('data-num');
        gsap.to(img, {
          scrollTrigger: {
            scroller: scrollElement,
            trigger: target,
            start: "-20% 100%",
            end: "100% 40%",
            scrub: 1
          },
          // y: "-10%",
          y: "".concat(targetNumber, "%"),
          ease: Power2.easeOut
        });
      });
    });
  });
  var commonTitle = document.querySelectorAll('.content-title');
  gsap.utils.toArray(commonTitle).forEach(function (target) {
    if (target.classList.contains('title-except')) {
      return;
    }

    if (target.classList) gsap.to(target, {
      scrollTrigger: {
        // toggleActions: "play none none none"
        scroller: scrollElement,
        trigger: target,
        start: "center bottom",
        end: "center top",
        scrub: 1,
        // markers: true,
        delay: .2 // id: `${i} test`

      },
      opacity: 1,
      // scale: .8,
      ease: Power2.easeOut
    });
  });
  var feature = document.querySelectorAll('.feature-list');
  gsap.utils.toArray(feature).forEach(function (target) {
    if (!target.classList.contains('feature-ingredients')) {
      var title = target.querySelector('dt');
      var description = target.querySelectorAll('dd');
      var tlFeature = gsap.timeline({
        scrollTrigger: {
          scroller: scrollElement,
          trigger: target,
          start: "60% 100%",
          onEnter: function onEnter() {},
          onLeaveBack: function onLeaveBack(self) {
            return self.disable();
          }
        }
      });
      tlFeature.addLabel('start');
      tlFeature.to(title, .5, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .02
      }).addLabel('title').to(description, .7, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .1
      }, 'title-=.2').to(description, .7, {
        y: 0,
        ease: Power2.easeOut,
        stagger: .1
      }, 'title-=.2');
    } else {
      var list = target.querySelectorAll('.ingredients-list');
      var sub = target.querySelector('.text-sub-description');
      gsap.utils.toArray(list).forEach(function (el, i) {
        var elTrigger = el.querySelector('.visual-wrap');
        var elTriggerText = el.querySelector('.ingredients-title');
        var elTriggerText2 = el.querySelector('.ingredients-description');
        var tlFeature = gsap.timeline({
          scrollTrigger: {
            scroller: scrollElement,
            trigger: isMobile ? elTrigger : el,
            start: isMobile ? "50% 100%" : "80% 100%"
          },
          delay: i * .2
        });
        tlFeature.addLabel('start');
        tlFeature.to(elTrigger, .7, {
          opacity: 1,
          ease: Power1.easeInOut
        }, 'start').to(elTriggerText, .8, {
          opacity: 1,
          ease: Power1.easeInOut
        }, 'start+=.2').to(elTriggerText, .8, {
          y: 0,
          ease: Power2.easeOut
        }, 'start+=.2').to(elTriggerText2, .8, {
          opacity: 1,
          ease: Power1.easeInOut
        }, 'start+=.2').to(elTriggerText2, .8, {
          y: 0,
          ease: Power2.easeOut
        }, 'start+=.2').addLabel('end').to(sub, .8, {
          opacity: 1,
          ease: Power1.easeInOut
        }, 'end');
      });
    }
  });
  var textTranslate = document.querySelectorAll('.x-text-translate');
  gsap.utils.toArray(textTranslate).forEach(function (text) {
    var title = text.querySelector('.text-title span');
    var description = text.querySelectorAll('.description-list'); // })

    var tlText = gsap.timeline({
      scrollTrigger: {
        scroller: scrollElement,
        trigger: text,
        start: "top+=50% bottom",
        end: "bottom center",
        scrub: 1
      }
    });
    tlText.to(title, 1.2, {
      y: "0%",
      ease: Power2.easeout
    }).to(title, 1.3, {
      opacity: 1,
      ease: Power2.easeInOut
    }, '<').to(description, 4, {
      opacity: 1,
      ease: Power1.easeInOut,
      stagger: 1
    }).from(description, 4, {
      y: "50%",
      ease: Power2.easeOut,
      stagger: 1
    }, '<');
  });
  var productLists = document.querySelectorAll('.product-grid-list .product-list');
  gsap.utils.toArray(productLists).forEach(function (target) {
    var textTitle = target.querySelector('.text-title .masking-text');
    var textPrice = target.querySelector('.text-price');
    var textDescription = target.querySelector('.text-description');
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: target,
      start: "bottom bottom",
      onEnter: function onEnter() {
        gsap.to(textTitle, .7, {
          y: "0%",
          ease: Power2.easeInOut
        });
        gsap.to(textTitle, .8, {
          opacity: 1,
          ease: Power2.easeInOut
        });
        gsap.to(textDescription, 1, {
          opacity: 1,
          ease: Power2.easeInOut,
          delay: .2
        });

        if (textPrice) {
          gsap.to(textPrice, 1, {
            opacity: 1,
            ease: Power2.easeInOut,
            delay: .55
          });
        }
      },
      onLeaveBack: function onLeaveBack(self) {
        return self.disable();
      },
      onEnterBack: function onEnterBack(self) {
        return self.disable();
      }
    });
  });

  if (page == 'detail' || page == 'product') {
    var isTween = false;
    var ingredients = document.querySelector('.content-ingredients');
    var ingredientsList = document.querySelectorAll('.text-list');
    var ingredientsButton = document.querySelectorAll('.visual-button');
    var ingredientsNumber = document.querySelectorAll('.number');
    var textList = document.querySelectorAll('.text-description .select-list');
    var imageList = document.querySelectorAll('.visual-list-wrap .select-list'); // gsap.to(imageList, {
    //     scrollTrigger: {
    //         scroller: scrollElement,
    //         trigger: ingredients, 
    //         start: "-30% 100%",
    //         end: "80% 50%",
    //         scrub: 1,
    //     },
    //     scale: 1.1,
    // })
    // // }

    gsap.utils.toArray(ingredientsList).forEach(function (list, i) {
      var button = list.querySelectorAll('.button-hover');
      var numbers = ingredients.querySelectorAll('.number');
      var texts = ingredients.querySelectorAll('.text');
      var tlIngredients = gsap.timeline({
        scrollTrigger: {
          scroller: scrollElement,
          trigger: ingredients,
          start: "50% 100%" // scrub: 1,

        },
        delay: i * .25
      });
      tlIngredients.addLabel('list'); // ingredientsButton[0].querySelector('.button-hover').classList.add('is-enter')

      tlIngredients.to(button, .6, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .1,
        onComplete: function onComplete() {
          if (i == 1) {
            var bar = ingredientsButton[0].querySelector('.bar');
            gsap.set(bar, {
              opacity: 1
            });
            gsap.to(bar, .6, {
              x: "0%",
              ease: Power2.easeOut
            });
            gsap.to(textList[0], .7, {
              opacity: 1,
              ease: Power1.easeInOut,
              onComplete: function onComplete() {
                if (page == 'detail' || page == 'product') {
                  document.querySelector('.content-ingredients').setAttribute('data-load', true);
                }
              }
            });
            gsap.delayedCall(.1, function () {
              canClicked = true;
              gsap.to(numbers, .6, {
                opacity: 1,
                ease: Power1.easeInOut,
                stagger: .1
              });
              gsap.to(numbers, .6, {
                y: 0,
                ease: Power2.easeOut,
                stagger: .1
              });
              gsap.to(texts, .8, {
                opacity: 1,
                ease: Power1.easeInOut,
                stagger: .05,
                delay: .2,
                onComplete: function onComplete() {// ingredients.setAttribute('data-load', true)
                }
              });
            });
          }
        }
      }, 'list');
    });
  }

  if (document.querySelector('.content-typo')) {
    var typoElement = document.querySelector('.content-typo');
    var typoTitle = typoElement.querySelector('.content-title');
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: typoTitle,
      start: "100% 100%",
      onEnter: function onEnter() {
        gsap.to(typoTitle, 1, {
          opacity: 1,
          y: 0,
          ease: Power2.easeOut
        });
      },
      onLeaveBack: function onLeaveBack(self) {
        return self.disable();
      }
    });
  }
};

var introIndex = function introIndex() {
  var delayTime = 1;

  if (!isHeaderLoaded) {
    delayTime = 1.2;
  }

  gsap.delayedCall(delayTime, function () {
    if (page == 'index') {
      slideTextMotion(0);
      mainSwiper(); // circleMotion()
    }
  });
};

var logoTrigger = function logoTrigger() {};

var indexTrigger = function indexTrigger() {
  // ScrollTrigger.update()
  ScrollTrigger.refresh();
  commonTrigger();
  footerTrigger(); // logoTrigger()

  var logo = document.querySelector('.typo-logo');
  var logoTypo1 = logo.querySelectorAll('.typo-n1');
  var logoTypo2 = logo.querySelectorAll('.typo-n2');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: logo,
    start: "80% 100%",
    scrub: 1,
    onEnter: function onEnter() {
      var tlLogo = gsap.timeline();
      tlLogo.to(logoTypo1, 1.1, {
        y: "0%",
        ease: Power4.easeOut,
        stagger: .2
      }).addLabel('typo1').to('.typo-n3', .8, {
        y: "0%",
        ease: Power3.easeOut
      }, 'typo1-=1').addLabel('.typo2').to(logoTypo2, .5, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .3
      }, 'typo2-=1.5');
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    },
    onEnterBack: function onEnterBack(self) {
      return self.disable();
    }
  });
  var newArrivals = document.querySelector('.content-new-arrivals');
  var backgroundImages = newArrivals.querySelectorAll('.product-list');
  gsap.utils.toArray(backgroundImages).forEach(function (product) {
    var stTrigger = product.querySelector('.visual-translate');
    var background = stTrigger.querySelector('.background');
    var img = stTrigger.querySelectorAll('img');
    var titleTrigger = product.querySelector('.text-wrap');
    var title = product.querySelectorAll('.masking-text');
    var description = product.querySelector('.text-description');
    var button = product.querySelector('.text-button .button-text');
    var buttonBar = product.querySelector('.button-text .bar');
    var tlProduct = gsap.timeline();

    if (window.innerWidth > 768) {
      if (product.classList.contains('list-type1')) {
        ScrollTrigger.create({
          scroller: scrollElement,
          trigger: background,
          start: "35% 100%",
          onEnter: function onEnter() {
            tlProduct.addLabel('start').to(buttonBar, .4, {
              x: "0%",
              ease: Power2.easeOut
            }, '').to(background, .8, {
              x: '0%',
              ease: Power3.easeOut
            }, 'start').addLabel('bg').to(img, .75, {
              opacity: 1,
              ease: Power1.easeInOut
            }, 'bg-=.1').to(title, 1, {
              x: "0%",
              ease: Power3.easeOut,
              stagger: .25
            }, 'bg-=.1').to(title, 1, {
              opacity: 1,
              ease: Power2.easeOut,
              stagger: .25
            }, 'bg-=.1').addLabel('title').to(description, 1, {
              opacity: 1,
              ease: Power1.easeInOut
            }, 'title-=.6').to(button, 1, {
              opacity: 1,
              ease: Power1.easeInOut
            }, 'title-=.4');
          },
          onLeaveBack: function onLeaveBack(self) {
            return self.disable();
          },
          onEnterBack: function onEnterBack(self) {
            return self.disable();
          }
        });
      } else {
        ScrollTrigger.create({
          scroller: scrollElement,
          trigger: titleTrigger,
          start: "35% 100%",
          onEnter: function onEnter() {
            tlProduct.addLabel('start').to(title, 1, {
              x: "0%",
              ease: Power3.easeOut,
              stagger: .25
            }, 'start').to(title, 1, {
              opacity: 1,
              ease: Power2.easeOut,
              stagger: .25
            }, 'start').addLabel('title').to(description, 1, {
              opacity: 1,
              ease: Power1.easeInOut
            }, 'title-=.6').to(button, 1, {
              opacity: 1,
              ease: Power1.easeInOut
            }, 'title-=.4').to(buttonBar, .4, {
              x: "0%",
              ease: Power2.easeOut
            }, 'title-=.1').to(background, .8, {
              x: '0%',
              ease: Power3.easeOut
            }, 'title-=1').addLabel('bg').to(img, .8, {
              opacity: 1,
              ease: Power1.easeInOut
            }, 'bg-=1');
          },
          onLeaveBack: function onLeaveBack(self) {
            return self.disable();
          },
          onEnterBack: function onEnterBack(self) {
            return self.disable();
          }
        });
      }

      var targetImage = stTrigger.querySelectorAll('img.st-visible-pc');
      gsap.to(targetImage, {
        scrollTrigger: {
          scroller: scrollElement,
          trigger: stTrigger,
          start: "-10% 100%",
          end: "100% 10%",
          scrub: true
        },
        y: "-=39%"
      });
    } else {
      ScrollTrigger.create({
        scroller: scrollElement,
        trigger: background,
        start: "35% 100%",
        onEnter: function onEnter() {
          tlProduct.addLabel('start').to(background, .8, {
            x: '0%',
            ease: Power3.easeOut
          }, 'start').addLabel('bg').to(img, .8, {
            opacity: 1,
            ease: Power1.easeInOut
          }, 'bg-=.3');
        },
        onLeaveBack: function onLeaveBack(self) {
          return self.disable();
        }
      });
      ScrollTrigger.create({
        scroller: scrollElement,
        trigger: titleTrigger,
        start: "50% 100%",
        onEnter: function onEnter() {
          var tlProducts2 = gsap.timeline();
          tlProducts2.addLabel('start1').to(title, 1, {
            x: "0%",
            ease: Power3.easeOut,
            stagger: .25
          }, 'start1').to(title, 1, {
            opacity: 1,
            ease: Power2.easeOut,
            stagger: .25
          }, 'start1').addLabel('title1').to(description, 1, {
            opacity: 1,
            ease: Power1.easeInOut
          }, 'title1-=.6').to(button, 1, {
            opacity: 1,
            ease: Power1.easeInOut
          }, 'title1-=.4').to(buttonBar, .4, {
            x: "0%",
            ease: Power2.easeOut
          }, 'title1-=.1');
        },
        onLeaveBack: function onLeaveBack(self) {
          return self.disable();
        }
      });

      var _targetImage = stTrigger.querySelectorAll('img.st-visible-mobile');

      gsap.utils.toArray(_targetImage).forEach(function (img) {
        if (img.classList.contains('image-vertical')) {
          gsap.to(_targetImage, {
            scrollTrigger: {
              scroller: scrollElement,
              trigger: stTrigger,
              start: "-10% 100%",
              end: "100% 50%",
              scrub: 1
            },
            y: "-=10%"
          });
        } else {
          gsap.to(_targetImage, {
            scrollTrigger: {
              scroller: scrollElement,
              trigger: stTrigger,
              start: "-5% 100%",
              end: "100% 30%",
              scrub: 1
            },
            y: "-=20%"
          });
        }
      });
    } // gsap.from(text, {
    //     scrollTrigger: {
    //         scroller: scrollElement,
    //         trigger: text,
    //         start: "0% 100%",
    //         end: "100% 80%",
    //         scrub: true,
    //     },
    //     marginTop: 200
    // })

  });
  var viewElement = document.querySelectorAll('.content-view .grid-row');
  gsap.utils.toArray(viewElement).forEach(function (view) {
    var pinElement = view.querySelector('.grid-pin img');
    gsap.to(pinElement, {
      scrollTrigger: {
        scroller: scrollElement,
        trigger: pinElement,
        scrub: 1,
        start: "-10% 100%",
        end: "100% 60%"
      },
      scale: 1.15
    });
  });
  var viewScrubElement = document.querySelectorAll('.content-view .grid-text');
  gsap.utils.toArray(viewScrubElement).forEach(function (scrubEl) {
    var element = scrubEl.querySelector('.text-wrap');
    gsap.from(element, {
      scrollTrigger: {
        scroller: scrollElement,
        trigger: element,
        start: "-20% 100%",
        end: "100% 60%",
        scrub: 1
      },
      y: 100,
      opacity: 0
    });
  });
  var viewButton = document.querySelectorAll('.content-view .text-button');
  gsap.utils.toArray(viewButton).forEach(function (button) {
    var text = button.querySelector('.button-text');
    var bar = text.querySelector('.bar');
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: button,
      start: "80% 100%",
      onEnter: function onEnter() {
        gsap.to(text, .8, {
          y: "0%",
          ease: Power2.easeOut
        });
        gsap.to(bar, 1, {
          x: "0%",
          ease: Power2.easeOut,
          delay: .4
        });
      },
      onLeaveBack: function onLeaveBack(self) {
        return self.disable();
      }
    });
  });
  var newarrivals = document.querySelector(".content-new-arrivals .content-title");
  var newarrivalsText2 = newarrivals.querySelector('.title-n2'); // gsap.set(newarrivals_text1, {opacity: 0})

  gsap.set(newarrivalsText2, {
    width: 0,
    opacity: 0,
    y: 0
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: newarrivals,
    start: "100% 100%",
    onEnter: function onEnter() {
      gsap.to(newarrivalsText2, 1, {
        width: "auto",
        ease: Power2.easeOut
      });
      gsap.to(newarrivalsText2, 1.1, {
        opacity: 1,
        ease: Power2.easeInOut
      });
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    }
  });
  var marqueeElement = document.querySelector('.marquee-text');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: marqueeElement,
    start: "100% 100%",
    end: "100% 0%",
    onToggle: function onToggle(self) {
      if (self.isActive) {
        marqueeElement.classList.add('is-animate');
      } else {}
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: ".content-new-arrivals",
    start: "0% 0%",
    onToggle: function onToggle() {
      marqueeElement.classList.remove('is-animate');
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: ".content-slide",
    start: "0% 0%",
    end: "100% 50%",
    onToggle: function onToggle(self) {
      if (!swiperLoaded) {
        return;
      }

      if (self.isActive) {
        var check = swiper.autoplay.running;

        if (!check) {
          swiper.autoplay.start();
        }
      } else {
        swiper.autoplay.stop();

        if (ScrollTrigger.getById('triggers1')) {
          resetTextTrigger();
        }

        var slides = document.querySelectorAll('.swiper-slide');
        gsap.utils.toArray(slides).forEach(function (sl) {
          if (sl.querySelector('.marquee-shape')) {
            sl.classList.remove('is-animate');
          }
        });
      }
    }
  });
};

var swiperScTrigger = function swiperScTrigger(el) {
  return;

  if (page !== 'index') {
    return;
  }

  ScrollTrigger.refresh();
  ScrollTrigger.update();
  var swiperTitle = el.querySelectorAll('.text-title.st-visible-pc .align-item');

  if (window.innerWidth > 768) {
    gsap.utils.toArray(swiperTitle).forEach(function (line, i) {
      var el = line.querySelector('.masking-wrap');
      gsap.to(line, {
        scrollTrigger: {
          scroller: scrollElement,
          trigger: ".content-wrap",
          start: "top+=" + bodyScrollBar.scrollTop + "px",
          end: "+=" + 400 + "px",
          scrub: 1,
          id: "".concat(i, "strigger")
        },
        onEnter: function onEnter() {
          triggers.push("".concat(i, "strigger"));
          isloadTrig = true;
        },
        xPercent: i % 2 ? +15 : -15
      });
    });
  } else {}
};

var circleMotion = function circleMotion(element) {
  isCircleMotionPlayed = true;
  var tlCircle = gsap.timeline();
  var targetCircle = element.querySelector('.grp-circle');
  var circles = targetCircle.querySelectorAll('.circle-bar');

  if (!isDrawCircle) {
    isDrawCircle = true;
    gsap.set(targetCircle, {
      opacity: 1
    });
    targetCircle.classList.add('is-animate');
    tlCircle.from(circles, .6, {
      rotation: "0deg",
      ease: Power2.easeOut,
      stagger: .05
    }).to(circles, .7, {
      opacity: 1,
      ease: Power2.easeInOut,
      stagger: .05,
      onComplete: function onComplete() {
        gsap.set(circles, {
          opacity: 1
        });
      }
    }, '<');

    if (page == 'index') {
      var tlRotate = gsap.timeline();
      tlRotate.to(targetCircle, 4.8, {
        rotate: "720deg",
        ease: Power3.easeInOut
      }); // tlRotate.to(targetCircle, 2.7, {rotate: "360deg", ease: Power2.easeInOut})
      // tlRotate.to(targetCircle, 2.3, {rotate: "+=360deg", ease: Power2.easeInOut}, '>')
    }
  }
};

var introDetail = function introDetail(element) {
  var title = element.querySelectorAll('.content-product-main .text-title .masking-text');
  var shadow = element.querySelector('.product-shadow');
  var button = element.querySelector('.button-add');
  var setNum = '3.0769%';
  var delayTime = .8;

  if (!isHeaderLoaded) {
    delayTime = .5;
  }

  var tlIntro = gsap.timeline();
  gsap.delayedCall(delayTime, function () {
    gsap.set(title, {
      opacity: 1
    });
    tlIntro.addLabel('start');
    tlIntro.to(title, 1.6, {
      y: "0%",
      ease: Power4.easeOut,
      stagger: .5
    }, 'start') // tlIntro.to(title, 1.1, {opacity: 1, ease: Power1.easeInOut, stagger: .4}, 'start')
    .addLabel('titleEnd').to(button, .5, {
      y: 0,
      ease: Power2.easeOut
    }, 'titleEnd-=.8').to(shadow, 1, {
      x: setNum,
      y: setNum,
      ease: Power2.easeOut
    }, 'titleEnd-=1').to(shadow, 1, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'titleEnd-=1');
  });
};

var detailTrigger = function detailTrigger() {
  isCirclePlayed = false;
  isDrawCircle = false; // ScrollTrigger.update()

  ScrollTrigger.refresh();
  footerTrigger();
  var informationContent = document.querySelector('.product-information');
  var informationList = informationContent.querySelectorAll('div');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: informationContent,
    start: isMobile ? "50% 100%" : "20% 100%",
    onEnter: function onEnter() {
      gsap.to(informationList, .6, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .1
      });
      gsap.from(informationList, .6, {
        y: 40,
        ease: Power2.easeOut,
        stagger: .1
      });
    },
    onEnterBack: function onEnterBack(self) {
      return self.disable();
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    }
  });
  var fixedButton = document.querySelector('.button-add');
  var buttonTrigger = document.querySelector('.content-information');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: buttonTrigger,
    start: "top bottom",
    endTrigger: 'footer',
    end: "bottom+=10000 bottom",
    // markers: true,
    onToggle: function onToggle(self) {
      if (self.isActive) {
        gsap.killTweensOf(fixedButton);
        gsap.to(fixedButton, .4, {
          y: "100%",
          ease: Power2.easeOut
        });
      } else {
        gsap.killTweensOf(fixedButton);
        gsap.to(fixedButton, .5, {
          y: "0%",
          ease: Power2.easeInOut
        });
      }
    },
    onLeave: function onLeave() {}
  });
  var textureArea = document.querySelector('.content-texture');
  var textrueTypo = textureArea.querySelector('.visual-typo');
  var textureImage = textureArea.querySelector('.visual-texture img');
  var textureTitle = textureArea.querySelector('.visual-texture-text');
  var textureTitleSplit = new SplitText(textureTitle, {
    type: "words"
  });
  var textureDescription = textureArea.querySelector('.text-description');
  var tlTexture = gsap.timeline({
    scrollTrigger: {
      scroller: scrollElement,
      trigger: textureArea,
      start: "10% 100%",
      onLeaveBack: function onLeaveBack(self) {
        return self.disable();
      },
      onEnterBack: function onEnterBack(self) {
        return self.disable();
      }
    }
  });
  var checkAnimation = false;
  tlTexture.addLabel('start1').to(textureImage, 1, {
    opacity: 1,
    ease: Power0.easeNone,
    onComplete: function onComplete() {
      if (!checkAnimation) {
        tlTextureYoyo.play();
      }
    }
  }).addLabel('image').from(textureTitleSplit.words, .8, {
    opacity: 0,
    ease: Power1.easeInOut,
    stagger: .2
  }, 'start1+=.2').addLabel('title').to(textureDescription, .8, {
    opacity: 1,
    ease: Power1.easeInOut
  }, 'title-=.4');
  var tlTextureYoyo = gsap.timeline({
    paused: true
  });
  var type = textureImage.getAttribute('data-type');

  if (type == 'rotate') {
    tlTextureYoyo.addLabel('start');
    tlTextureYoyo.to(textureImage, 10, {
      rotation: "+=360",
      ease: Linear.easeNone,
      repeat: -1
    }, 'start');
    tlTextureYoyo.to(textureImage, 2, {
      scale: 1.1,
      ease: Linear.easeNone,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1
    }, 'start');
    tlTextureYoyo.fromTo(textureImage, 3, {
      opacity: .6
    }, {
      opacity: 1,
      ease: Linear.easeNone,
      repeat: -1,
      yoyo: true
    }, 'start');
  } else if (type == 'translate') {
    tlTextureYoyo.addLabel('start');
    tlTextureYoyo.to(textureImage, 10, {
      x: "+-20",
      ease: Linear.easeNone,
      repeat: -1
    }, 'start');
    tlTextureYoyo.to(textureImage, 2, {
      scale: 1.1,
      ease: Linear.easeNone,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1
    }, 'start');
    tlTextureYoyo.fromTo(textureImage, 3, {
      opacity: .6
    }, {
      opacity: 1,
      ease: Linear.easeNone,
      repeat: -1,
      yoyo: true
    }, 'start');
  }

  gsap.to(textrueTypo, {
    scrollTrigger: {
      scroller: scrollElement,
      trigger: textrueTypo,
      start: "30% 100%",
      end: "100% 50%",
      scrub: 1,
      invalidateOnRefresh: true
    },
    x: function x() {
      return "-".concat(window.innerWidth / 2);
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: textureImage,
    start: "0% 100%",
    end: "100% 0%",
    // overwrite: true,
    // markers: true,
    onToggle: function onToggle(self) {
      if (self.isActive) {
        checkAnimation = true;
      } else {
        tlTextureYoyo.pause();
      }
    }
  });
  var information = document.querySelectorAll('.information-wrap');
  gsap.utils.toArray(information).forEach(function (info) {
    gsap.to(info, {
      scrollTrigger: {
        scroller: scrollElement,
        trigger: info,
        start: '-20% 100%',
        end: '100% 60%',
        scrub: 1
      },
      opacity: 1
    });
    gsap.from(info, {
      scrollTrigger: {
        scroller: scrollElement,
        trigger: info,
        start: '-20% 100%',
        end: '100% 60%',
        scrub: 1
      },
      y: 80
    });
  });
  ScrollTrigger.refresh();
};

var introStory = function introStory(element) {
  var delayTime = 1;

  if (!isHeaderLoaded) {
    delayTime = 1;
  }

  var key = element.querySelector('.content-key');
  var keyVisual = key.querySelector('.visual-wrap img');
  var dotTitlte = element.querySelectorAll('.title-wrap .masking-text');
  var dots = key.querySelectorAll('.text-title .dot');
  var bars = key.querySelectorAll('.bar');
  var description = key.querySelector('.text-description');
  gsap.to(keyVisual, 1, {
    opacity: 1,
    ease: Linear.easeNone
  });
  gsap.delayedCall(delayTime, function () {
    var tlStory = gsap.timeline();
    gsap.set(bars, {
      opacity: 1
    });
    tlStory.addLabel('start').to(dotTitlte, 1.2, {
      opacity: 1,
      ease: Power2.easeOut,
      stagger: .25
    }, 'start').to(dotTitlte, 1.2, {
      y: "0%",
      ease: Power2.easeOut,
      stagger: .25
    }, 'start').addLabel('title').to(description, 1, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'title-=.6').addLabel('description').from(bars[0], 2, {
      width: 0,
      ease: Power1.easeOut,
      onComplete: function onComplete() {
        gsap.set(bars[0], {
          width: "calc(100% + 8.32vw)"
        });
      }
    }, 'start+=.8.05').to(bars[0], 2, {
      opacity: 1,
      ease: Power1.easeOut
    }, 'start+=.8.05').from(bars[1], 2, {
      height: 0,
      ease: Power1.easeOut,
      onComplete: function onComplete() {
        gsap.set(bars[1], {
          height: "100%"
        });
      }
    }, 'start+=1.05').to(bars[1], 2, {
      opacity: 1,
      ease: Power1.easeOut
    }, 'start+=1.05');
  });
};

var storyTrigger = function storyTrigger() {
  footerTrigger(); // backgroundParallax()

  var viewElement = document.querySelectorAll('.content-story-info');
  gsap.utils.toArray(viewElement).forEach(function (view) {
    var pinElement = view.querySelector('.visual-wrap');
    var pinVisual = pinElement.querySelector('img');
    gsap.from(pinElement, {
      scrollTrigger: {
        scroller: scrollElement,
        trigger: pinElement,
        scrub: 1,
        start: "-10% 100%",
        end: "50% 0%"
      },
      scale: .9
    });

    if (!view.classList.contains('story-section1')) {
      gsap.to(pinVisual, {
        scrollTrigger: {
          scroller: scrollElement,
          trigger: pinElement,
          scrub: 1,
          start: "-10% 100%",
          end: "50% 0%"
        },
        y: "-10%" // scale: 1.1

      });
    } else {
      if (window.innerWidth > 768) {
        gsap.to(pinVisual, {
          scrollTrigger: {
            scroller: scrollElement,
            trigger: pinElement,
            scrub: 1,
            start: "-10% 100%",
            end: "100% 0%"
          },
          y: "-30%" // scale: 1.1

        });
      }
    }

    var title = view.querySelector('.text-title');
    var titleWords = title.querySelectorAll('.masking-text');
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: title,
      start: "80% 100%",
      onEnter: function onEnter() {
        gsap.to(titleWords, 1.1, {
          y: "0%",
          ease: Power3.easeOut,
          stagger: .2
        });
      },
      onEnterBack: function onEnterBack(self) {
        return self.disable();
      },
      onLeaveBack: function onLeaveBack(self) {
        return self.disable();
      }
    });
  });
  var section2 = document.querySelector('.story-section2 .text-description');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: section2,
    start: "90% 100%",
    onToggle: function onToggle() {
      gsap.to(section2, .8, {
        opacity: 1,
        ease: Power1.easeInOut
      });
      gsap.to(section2, 1, {
        y: "0%",
        ease: Power2.easeOut
      });
    }
  });
  var marquee = document.querySelector('.content-logo');
  var marqueeTrigger = marquee.querySelector('.text-container');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: marqueeTrigger,
    start: "80% 100%",
    onEnter: function onEnter() {
      circleMotion(marqueeTrigger);
    },
    onEnterBack: function onEnterBack(self) {
      return self.disable();
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: ".content-story-slogan",
    start: "0% 100%",
    end: "100% 100%",
    onEnterBack: function onEnterBack() {
      document.querySelector('.marquee-wrap').classList.remove('is-animate');
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: marqueeTrigger,
    start: "80% 100%",
    onToggle: function onToggle() {
      document.querySelector('.marquee-wrap').classList.add('is-animate');
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: marquee,
    start: "-1% 100%",
    end: "102% 0%",
    onToggle: function onToggle(self) {
      if (self.isActive) {
        marquee.classList.add('is-animate');
      } else {
        marquee.classList.remove('is-animate');
      }
    }
  });
  var lastVisual = document.querySelector('.content-visual');
  var lastVisualImage = lastVisual.querySelector('img');
  gsap.to(lastVisualImage, {
    scrollTrigger: {
      scroller: scrollElement,
      trigger: lastVisual,
      start: "-10% 100%",
      end: "80% 80%",
      scrub: 1
    },
    scale: 1.2
  });
  var slogan = document.querySelector('.content-story-slogan');
  var sloganList = slogan.querySelectorAll('.slogan-list');
  gsap.utils.toArray(sloganList).forEach(function (slogan, i) {
    var description = slogan.querySelector('.list-description');
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: slogan,
      start: "50% 100%",
      delay: i * .4,
      onEnter: function onEnter() {
        if (slogan.querySelectorAll('.spacing')) {
          var titleSpacing = slogan.querySelectorAll('.spacing');
          gsap.to(titleSpacing, .9, {
            width: "auto",
            ease: Power2.easeOut
          });
          gsap.to(titleSpacing, .9, {
            opacity: 1,
            ease: Power2.easeOut
          });
          gsap.to(description, .7, {
            opacity: 1,
            ease: Power1.easeInOut,
            delay: .3
          });
        } else {
          gsap.to(description, .7, {
            opacity: 1,
            ease: Power1.easeInOut
          });
        }
      },
      onEnterBack: function onEnterBack(self) {
        return self.disable();
      },
      onLeaveBack: function onLeaveBack(self) {
        return self.disable();
      }
    });
  });
  ScrollTrigger.refresh();
};

var introProduct = function introProduct(element) {
  // productHoverFunc()
  var delayTime = .5;

  if (!isHeaderLoaded) {
    delayTime = .7;
  }

  var key = element.querySelector('.content-line-main');
  var keyVisual = key.querySelectorAll('.visual-wrap img');
  var titles = key.querySelectorAll('.text-title .masking-text');
  var description = key.querySelector('.text-description');
  gsap.delayedCall(delayTime, function () {
    var tlIntro = gsap.timeline();
    tlIntro.addLabel('visual').to(keyVisual, 1.4, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'visual').to(titles[0], .8, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'visual+=.2').to(titles[0], .9, {
      y: 0,
      ease: Power2.easeOut
    }, 'visual+=.2').addLabel('title2').to(titles[1], 1.6, {
      width: "auto",
      ease: Power3.easeInOut
    }, 'title2-=.5').addLabel('title3').to(description, .8, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'title3-=.55');
  });
};

var productTrigger = function productTrigger() {
  commonTrigger();
  footerTrigger();
  var ingrdientsWrap = document.querySelector('.content-line .content-ingredients-list');
  var ingredientsList = ingrdientsWrap.querySelectorAll('.ingredients-list .visual-wrap');
  var ingredientsList2 = ingrdientsWrap.querySelectorAll('.ingredients-list .text-wrap');
  var title = ingrdientsWrap.querySelector('.content-title');
  var ingredientsDescription = ingrdientsWrap.querySelector('.content-description');
  var descriptionSub = ingrdientsWrap.querySelector('.text-sub-description');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: ingrdientsWrap,
    start: "30% 100%",
    onEnter: function onEnter() {
      var tlList = gsap.timeline();
      tlList.addLabel('st').to(title, .7, {
        y: "0%",
        ease: Power2.easeOut
      }, 'st').to(title, .7, {
        opacity: 1,
        ease: Power2.easeOut
      }, 'st').addLabel('title').to(ingredientsList, .6, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .15
      }, 'title-=.4').to(ingredientsList2, .8, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .15
      }, 'title').to(ingredientsList2, .8, {
        y: "0%",
        ease: Power2.easeOut,
        stagger: .15
      }, 'title').addLabel('list').to(ingredientsDescription, .7, {
        opacity: 1,
        ease: Power0.easeNone
      }, 'list-=.2').addLabel('description').to(descriptionSub, 1, {
        y: 0,
        ease: Power2.easeOut
      }, 'description-=.2').to(descriptionSub, 1, {
        opacity: 1,
        ease: Power2.easeOut
      }, 'description-=.2');
    },
    onEnterBack: function onEnterBack(self) {
      return self.disable();
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    }
  });
  ScrollTrigger.refresh();
};

var introContact = function introContact(element) {
  var delayTime = .6;

  if (!isHeaderLoaded) {
    delayTime = .75;
  }

  var key = element.querySelector('.content-contact-info');
  var titles = key.querySelector('.text-title');
  var description = key.querySelector('.text-description');
  var contact = key.querySelector('.text-contact');
  var contactBar = contact.querySelector('.bar');
  gsap.delayedCall(delayTime, function () {
    var tlIntro = gsap.timeline();
    tlIntro.to(titles, 1, {
      opacity: 1,
      ease: Power0.easeNone
    }).addLabel('title').to(description, .9, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'title-=.7').to(description, .9, {
      y: 0,
      ease: Power2.easeOut
    }, 'title-=.7').addLabel('description').to(contact, .7, {
      opacity: 1,
      ease: Power1.easeInOut
    }, 'descripion-=.2').addLabel('contact').to(contactBar, .3, {
      x: "0%",
      ease: Power2.easeOut
    }, 'contact-=.43');
  });
};

var contactTrigger = function contactTrigger() {
  footerTrigger();
  ScrollTrigger.refresh();
  var store = document.querySelector('.content-store');
  var storeTitle = store.querySelector('.text-title .masking-text');
  var storeList = store.querySelectorAll('.store-list li');
  var storeInfoList = store.querySelectorAll('.store-info .store-info-list');
  var storeInfoListBar = store.querySelectorAll('.store-info .store-info-list .bar');
  var tlStore = gsap.timeline();
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: store,
    start: "30% 100%",
    onEnter: function onEnter() {
      tlStore.to(storeTitle, .8, {
        y: "0%",
        opacity: 1,
        ease: Power2.easeOut
      });
      tlStore.addLabel('title');
      tlStore.to(storeList, .7, {
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: .08,
        onComplete: function onComplete() {
          gsap.to(storeInfoListBar, .7, {
            x: "0%",
            ease: Power2.easeOut,
            stagger: .2
          });
        }
      }, 'title-=.5') // tlStore.to(storeInfoListBar, .7, {x: "0%", ease: Power2.easeOut, stagger: .08}, 'title+=.1')
      .addLabel('list1').to(storeInfoList, .9, {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut,
        stagger: .1
      }, 'list1-=.2');
    },
    onEnterBack: function onEnterBack(self) {
      return self.disable();
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    }
  });
  var storeVisual = store.querySelector('.visual-wrap img');
  gsap.to(storeVisual, {
    scrollTrigger: {
      scroller: scrollElement,
      trigger: storeVisual,
      start: "-20% 100%",
      end: "100% 80%",
      scrub: 1
    },
    scale: 1.1
  });
  var storeText = store.querySelector('.text-wrap');

  if (window.innerWidth > 768) {
    gsap.to(storeText, {
      scrollTrigger: {
        scroller: scrollElement,
        trigger: storeVisual,
        start: "-40% 100%",
        end: "100% 80%",
        scrub: 1
      },
      y: "10%"
    });
  }
};

var isClicked = false;

var resetMouseEvent = function resetMouseEvent() {
  var descriptionList = document.querySelectorAll('.button-hover');
  gsap.utils.toArray(descriptionList).forEach(function (button) {
    button.classList.remove('is-enter');
  });
  var allTextList = document.querySelectorAll('.content-ingredients .text-description .select-list');
  gsap.set(allTextList, {
    pointerEvents: "none"
  });
};

var prevSelectNum = 0;
var prevIndex = 1;

var selectFunc = function selectFunc(button, aa) {
  if (page == 'detail' || page == 'product') {
    // if(window.innerWidth > 768) {
    var patentButton = document.querySelector('.list-sub-description');

    if (patentButton.classList.contains('is-show')) {
      patentButton.classList.remove('is-show');
    } // }


    if (aa == true) {
      if (isClicked) {
        return;
      }
    }
  }

  var descriptionListBar = document.querySelectorAll('.button-hover .bar');
  var textList = document.querySelectorAll('.text-description .select-list');
  var textListElement = document.querySelectorAll('.text-description .select-list div');
  var imageList = document.querySelectorAll('.visual-list-wrap .select-list');
  var targetNum = button.getAttribute('data-num');
  var targetImage = imageList[targetNum];
  var targetText = textList[targetNum];

  if (!document.querySelector('.content-ingredients').hasAttribute('data-load')) {
    if (!document.querySelector('.content-ingredients')) {
      return;
    }

    var prevList = document.querySelectorAll('.text-list');
    var prevT = document.querySelectorAll('.text-description .select-list');
    var prevBar1 = document.querySelectorAll('.visual-button');
    var prevBar = document.querySelectorAll('.visual-button .bar');
    gsap.killTweensOf(prevList, "opacity");
    gsap.killTweensOf(prevBar, true);
    gsap.killTweensOf(prevT);
    gsap.to(prevT, .4, {
      display: "none",
      overwrite: "auto"
    });
  } else {}

  gsap.killTweensOf(textList);
  gsap.set(textList, {
    clearProps: "opacity"
  });

  if (targetNum == prevSelectNum) {
    var _bar = button.querySelectorAll('.bar');

    gsap.to(_bar, .4, {
      x: "0%",
      opacity: 1,
      ease: Power2.easeOut
    });
    button.classList.add('is-enter');
    return;
  }

  prevSelectNum = targetNum;
  resetMouseEvent();
  var bar = button.querySelectorAll('.bar');
  button.classList.add('is-enter');
  gsap.killTweensOf(targetText);
  gsap.utils.toArray(imageList).forEach(function (img, i) {
    if (i != targetNum) {
      gsap.to(img, .4, {
        opacity: 0,
        ease: Power2.easeOut
      });
    } else {
      gsap.to(img, .5, {
        opacity: 1,
        ease: Power1.easeNone
      });
    }
  });
  gsap.utils.toArray(textList).forEach(function (txt, i) {
    if (i != targetNum) {
      gsap.to(txt, .3, {
        opacity: 0,
        ease: Power2.easeOut
      });
    } else {
      gsap.set(txt, {
        display: "block",
        pointerEvents: "auto"
      });
      gsap.to(txt, .3, {
        opacity: 1,
        ease: Power2.easeOut
      });
    }
  });
  gsap.killTweensOf(descriptionListBar);
  gsap.to(descriptionListBar, .4, {
    opacity: 0,
    overwrite: "auto",
    ease: Power1.easeInOut,
    onComplete: function onComplete() {
      gsap.set(descriptionListBar, {
        x: "-100%"
      });
    }
  });
  gsap.killTweensOf(bar);
  gsap.to(bar, .4, {
    x: "0%",
    ease: Power2.easeOut
  });
  gsap.to(bar, .4, {
    opacity: 1,
    ease: Power2.easeOut
  });
};

var descriptionMouseEvent = function descriptionMouseEvent(element) {
  if (window.innerWidth <= 768) {
    var patentButton = element.querySelector('.list-sub-description');
    patentButton.addEventListener('click', function () {
      if (patentButton.classList.contains('is-show')) {
        patentButton.classList.remove('is-show');
      } else {
        patentButton.classList.add('is-show');
      }
    });
  }

  var descriptionList = element.querySelectorAll('.button-hover');
  prevSelectNum = 0;
  gsap.utils.toArray(descriptionList).forEach(function (button) {
    button.addEventListener('click', function () {
      isClicked = true;

      if (button.classList.contains('is-enter')) {
        return;
      }

      selectFunc(button);
    });
    button.addEventListener('mouseenter', function () {
      if (isMobile && window.innerWidth < 769) {
        return;
      }

      if (button.classList.contains('is-enter')) {
        return;
      }

      var descriptionListBar = element.querySelectorAll('.button-hover');
      gsap.utils.toArray(descriptionListBar).forEach(function (bb) {
        if (bb.classList.contains('is-enter')) {
          return;
        }

        var bbbar = bb.querySelectorAll('.bar');
        gsap.killTweensOf(bbbar);
        gsap.set(bbbar, {
          clearProps: "all"
        });
        gsap.to(bbbar, .3, {
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: function onComplete() {
            gsap.set(bbbar, {
              x: "-102%"
            });
          }
        });
      });
      var bar = button.querySelectorAll('.bar');
      gsap.killTweensOf(bar);
      gsap.set(bar, {
        clearProps: "all"
      });
      gsap.set(bar, {
        x: "-102%",
        opacity: 1
      });
      gsap.to(bar, .4, {
        x: "0%",
        ease: Power2.easeOut
      });

      if (!isClicked) {
        if (!canClicked) {
          return;
        }

        selectFunc(button, true);
      } else {
        return;
      }
    });

    if (window.innerWidth > 768) {
      button.addEventListener('mouseleave', function () {
        if (button.classList.contains('is-enter')) {
          return;
        }

        var bar = button.querySelector('.bar');
        gsap.to(bar, .4, {
          x: "102%",
          ease: Power2.easeOut
        });
      });
    }
  });
};

var footerTrigger = function footerTrigger() {
  ScrollTrigger.refresh();
  var footer = document.querySelector('.footer-wrap');
  var footerOpacity = footer.querySelector('.ft-01');
  var footerTransform = footer.querySelector('.ft-02');
  var footerLine = footer.querySelectorAll('.bar');
  var footerArrow = footer.querySelector('.icon-arrow');
  var footerInfoTitle = footer.querySelector('.footer-info'); // const footer_info_description = footer.querySelectorAll('.footer--info span:nth-of-type(2)')

  var footerSns = footer.querySelectorAll('.sns-wrap li');
  var footereCopyright = footer.querySelector('.footer-copyright');
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: footer,
    start: "40% 100%",
    onEnter: function onEnter() {
      if (window.innerWidth > 768) {
        gsap.to(footerOpacity, 1, {
          opacity: 1,
          ease: Power1.easeInOut
        });
        gsap.to(footerOpacity, .8, {
          x: 0,
          ease: Power2.easeOut
        });
        gsap.to(footerTransform, .8, {
          opacity: 1,
          ease: Power1.easeInOut,
          delay: .3
        });
        gsap.to(footerTransform, .8, {
          x: 0,
          ease: Power2.easeOut,
          delay: .3
        });
        gsap.delayedCall(.3, function () {
          gsap.to(footerArrow, .7, {
            x: 0,
            opacity: 1,
            ease: Power2.easeOut,
            delay: .3
          });
          gsap.delayedCall(.5, function () {
            gsap.to(footerLine, 1.2, {
              x: "0%",
              opacity: 1,
              ease: Power2.easeOut
            });
            gsap.to(footerInfoTitle, 1.4, {
              opacity: 1,
              ease: Power2.easeInOut,
              delay: .2
            });
            gsap.to(footereCopyright, .6, {
              y: 0,
              opacity: 1,
              ease: Power1.easeOut,
              delay: .7
            });
          });
        });
      } else {
        gsap.to(footerInfoTitle, .8, {
          opacity: 1,
          ease: Power1.easeInOut
        });
        gsap.to(footereCopyright, .6, {
          y: 0,
          opacity: 1,
          ease: Power1.easeInOut,
          delay: .4,
          onComplete: function onComplete() {
            gsap.set(footerOpacity, {
              x: 0,
              opacity: 1
            });
            gsap.set(footerTransform, {
              x: 0,
              opacity: 1
            });
            gsap.set(footerArrow, {
              x: 0,
              opacity: 1
            });
            gsap.set(footerLine, {
              x: "0%",
              opacity: 1
            });
          }
        });
      }
    },
    onLeaveBack: function onLeaveBack(self) {
      return self.disable();
    },
    onEnterBack: function onEnterBack(self) {
      return self.disable();
    }
  });
  ScrollTrigger.create({
    scroller: scrollElement,
    trigger: footer,
    start: "0% 100%",
    end: "120% 0%",
    onToggle: function onToggle(self) {
      if (self.isActive) {
        gsap.set(document.body, {
          backgroundColor: "#000"
        });
      } else {
        gsap.set(document.body, {
          clearProps: "backgroundColor"
        });
      }
    }
  });
};

var headerFunc = function headerFunc(state) {
  var subWrap = document.querySelector('.sub-list');
  var subList = subWrap.querySelectorAll('.list-text');
  var bar = document.querySelectorAll('header .button-sub span');
  var anchor = subWrap.querySelectorAll('a');

  if (state == 'hide') {
    document.body.classList.remove('is-header-active');
    gsap.killTweensOf(subWrap);
    gsap.killTweensOf(subList);
    gsap.killTweensOf(bar);
    gsap.to(subWrap, .5, {
      opacity: 0,
      ease: Power0.easeNone,
      onComplete: function onComplete() {
        gsap.set(subWrap, {
          display: "none"
        });
        gsap.set(subList, {
          y: "100%"
        });
      }
    });
    gsap.to(subList, .3, {
      opacity: 0,
      ease: Power1.easeInOut
    });
    gsap.to(bar[0], .4, {
      rotate: "0deg",
      ease: Power2.easeOut
    });
    gsap.to(bar[1], .4, {
      rotate: "0deg",
      marginTop: 0,
      ease: Power2.easeOut
    });

    if (!document.body.classList.contains('st-theme-white')) {
      gsap.to(bar, .3, {
        backgroundColor: "#000",
        ease: Power2.easeOut
      });
    }
  } else {
    document.body.classList.add('is-header-active');
    gsap.killTweensOf(subWrap);
    gsap.killTweensOf(subList);
    gsap.killTweensOf(bar);
    gsap.utils.toArray(anchor).forEach(function (anc) {
      if (anc.classList.contains('is-active')) {
        var innerbar = anc.querySelector('.bar');
        gsap.killTweensOf(innerbar, "all");
        gsap.set(innerbar, {
          x: "0%",
          opacity: 1
        });
      }
    });
    gsap.set(subWrap, {
      display: "flex"
    });
    gsap.set(bar, {
      backgroundColor: "#fff"
    });
    gsap.to(bar[0], .4, {
      rotate: "45deg",
      ease: Power2.easeOut
    });
    gsap.to(bar[1], .4, {
      rotate: "-45deg",
      marginTop: -5.5,
      ease: Power2.easeOut
    });
    gsap.to(subWrap, .5, {
      opacity: 1,
      ease: Power1.easeInOut,
      onComplete: function onComplete() {
        gsap.set(anchor, {
          pointerEvents: "auto"
        });
      }
    });
    gsap.to(subList, .5, {
      y: "0%",
      opacity: 1,
      ease: Power2.easeOut,
      stagger: .1,
      delay: .3
    }); // gsap.to(subList, .5, {opacity: 1, ease: Power2.easeOut, stagger: .1, delay: .3})
  }
};

var headerController = function headerController() {
  // if(window.innerWidth < 769) {
  var buttonSub = document.querySelector('.button-sub');
  buttonSub.addEventListener('click', function () {
    if (!document.body.classList.contains('is-header-active')) {
      headerFunc('show');
    } else {
      headerFunc('hide');
    }
  });
};

var resetHeader = function resetHeader() {
  if (!isHeaderLoaded) {
    return;
  }

  var lists = document.querySelectorAll('header .sub-list-depth1 li');
  gsap.utils.toArray(lists).forEach(function (list) {
    var anchor = list.querySelector('a');
    var bar = anchor.querySelector('.bar');
    anchor.classList.remove('is-active');
    gsap.to(bar, .5, {
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function onComplete() {
        gsap.set(bar, {
          x: "-102%",
          opacity: 1
        });
      }
    });
  });
};

var checkPage = function checkPage(e) {
  resetHeader(); // setStoreLink(e)

  var headerElement = document.querySelector('header');

  if (e.getAttribute('data-barba-namespace') == 'index') {
    return;
  }

  if (e.hasAttribute('data-depth1')) {
    var depth1 = e.getAttribute('data-depth1');
    var targetDepth1 = "[data-depth1=".concat(depth1, "]");
    var selectDepth1 = headerElement.querySelector(targetDepth1);
    var anchor = selectDepth1.querySelector('a');
    anchor.classList.add('is-active');

    if (depth1 == 'dermoringer') {
      var depth1Bar = anchor.querySelector('.bar');
      gsap.killTweensOf(depth1Bar, "x", "opacity");
      gsap.set(depth1Bar, {
        x: "-102%",
        opacity: 1
      });

      if (page == 'detail') {
        gsap.to(depth1Bar, .4, {
          backgroundColor: "#000",
          opacity: 1,
          x: "0%",
          ease: Power2.easeOut
        });
      } else {
        gsap.to(depth1Bar, .6, {
          backgroundColor: "#fff",
          opacity: 1,
          x: "0%",
          ease: Power2.easeOut
        });
      }
    } else {
      var _depth1Bar = selectDepth1.querySelector('.bar'); // gsap.killTweensOf(depth1Bar, "x")
      // gsap.to(depth1Bar, .4, {backgroundColor: "#fff"})

    }
  } else {
    var _depth = e.getAttribute('data-barba-namespace');

    var _targetDepth = "[data-depth1=".concat(_depth, "]");

    var _selectDepth = headerElement.querySelector(_targetDepth);

    var _anchor = _selectDepth.querySelector('a');

    _anchor.classList.add('is-active'); // if(depth1 == 'index') {return}


    var _depth1Bar2 = _anchor.querySelector('.bar');

    gsap.killTweensOf(_depth1Bar2, "x", "opacity");
    gsap.set(_depth1Bar2, {
      x: "-102%",
      opacity: 1
    });
    gsap.to(_depth1Bar2, .4, {
      x: "0%",
      opacity: 1,
      ease: Power2.easeOut,
      delay: .8
    });
  }
};

var ieCommonFunc = function ieCommonFunc() {
  var headerWhite = document.querySelectorAll('.header-white');
  var mobileBar = document.querySelectorAll('header .button-sub span');
  gsap.utils.toArray(headerWhite).forEach(function (element) {
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: element,
      start: "top-=30px top",
      onEnter: function onEnter() {
        document.body.classList.add('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.to('header .bar', .4, {
          backgroundColor: "#fff",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }
      },
      onEnterBack: function onEnterBack() {
        document.body.classList.add('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.to('header .bar', .4, {
          backgroundColor: "#fff",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#fff"
          });
        }
      },
      onLeave: function onLeave() {
        document.body.classList.remove('st-theme-white');
        gsap.killTweensOf('header .bar', "backgroundColor");
        gsap.to('header .bar', .4, {
          backgroundColor: "#000",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#000"
          });
        }
      },
      onLeaveBack: function onLeaveBack() {
        document.body.classList.remove('st-theme-white');
        gsap.to('header .bar', .4, {
          backgroundColor: "#000",
          ease: Power1.easeOut
        });

        if (window.innerWidth < 768) {
          gsap.set(mobileBar, {
            clearProps: "backgroundColor"
          });
          gsap.set(mobileBar, {
            backgroundColor: "#000"
          });
        }
      }
    });
  });
  var subList = document.querySelectorAll('.sub-list-depth1 li a');
  gsap.utils.toArray(subList).forEach(function (list) {
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
  });

  if (document.querySelector('main').getAttribute('data-barba-namespace') == 'detail') {
    var fixedButton = document.querySelector('.button-add');
    var buttonTrigger = document.querySelector('.content-information');
    ScrollTrigger.create({
      scroller: scrollElement,
      trigger: buttonTrigger,
      start: "top bottom",
      endTrigger: 'footer',
      end: "bottom+=10000 bottom",
      // markers: true,
      onToggle: function onToggle(self) {
        if (self.isActive) {
          gsap.killTweensOf(fixedButton);
          gsap.to(fixedButton, .4, {
            y: "100%",
            ease: Power2.easeOut
          });
        } else {
          gsap.killTweensOf(fixedButton);
          gsap.to(fixedButton, .3, {
            y: "0%",
            ease: Power2.easeInOut,
            delay: .1
          });
        }
      },
      onLeave: function onLeave() {}
    });
  }

  if (document.querySelector('.content-ingredients')) {
    var ingredientsButton = document.querySelector('.visual-button');
    var button = ingredientsButton.querySelector('.button-hover');
    var buttonBar = button.querySelector('.bar');
    var text = document.querySelector('.text-description .select-list');
    var textList = text.querySelectorAll('div');
    gsap.set(buttonBar, {
      opacity: 1,
      x: "0%"
    });
    gsap.set(text, {
      opacity: 1
    });
    gsap.set(textList, {
      opacity: 1
    });
  }
};

var swiper = null;
var initNum;
var targetNum;
var prevSlideNum = 0;

var mainSwiper = function mainSwiper() {
  swiper = new Swiper('.content-slide .swiper-container', {
    touchRatio: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        return '<span class="' + className + '"><span class="slide-index">' + (index + 1) + '<span class="bar"></span></span></span>';
      }
    },
    autoplay: {
      delay: 9000,
      // reverseDirection: false,
      disableOnInteraction: false
    },
    effect: 'fade',
    speed: 900,
    // parallax: true,
    loop: true,
    on: {
      init: function init() {
        targetNum = 0;
        var bar = document.querySelector('.bar-inner');
        var maxLength = document.querySelectorAll('.swiper-slide').length;
        var setWidth = 100 / (maxLength - 2);
        initNum = setWidth;
        gsap.set(bar, {
          width: "".concat(setWidth, "%")
        });
      }
    }
  });
  swiper.on('slideChange', function () {
    if (page !== 'index') {
      return;
    }

    var currentNum = this.activeIndex;
    var prevNum = this.previousIndex;
    var realIndex = this.realIndex;
    var bar = document.querySelector('.bar-inner');
    slideTextMotionReset(currentNum, prevNum);
    document.querySelector('#current-num').innerHTML = realIndex + 1;
    initNum = initNum / 2;

    if (realIndex == 1) {
      gsap.to(bar, .8, {
        left: "50%",
        x: "-50%",
        ease: Power2.easeOut
      });
    }

    if (realIndex == 2) {
      gsap.to(bar, .8, {
        left: "100%",
        x: "-100%",
        ease: Power2.easeOut
      });
    }

    if (realIndex == 0) {
      gsap.to(bar, .8, {
        left: "0%",
        x: "0%",
        ease: Power2.easeOut
      });
    }
  });
};

var slideTextMotionReset = function slideTextMotionReset(num, prevNum) {
  if (page !== 'index') {
    return;
  }

  var slide = document.querySelectorAll('.swiper-slide')[num];
  var prevAllSlide = document.querySelectorAll('.swiper-slide');
  gsap.utils.toArray(prevAllSlide).forEach(function (sl) {
    if (sl.getAttribute('data-num') !== num) {
      var prevSlideWrap = sl.querySelectorAll('.text-wrap');
      var prevSlideTitle = sl.querySelectorAll('.text-title .masking-text');
      var prevSlideText = sl.querySelectorAll('.text-description span');
      gsap.to(prevSlideWrap, .8, {
        opacity: 0,
        ease: Power1.easeInOut,
        onComplete: function onComplete() {
          gsap.set(prevSlideTitle, {
            y: "100%",
            opacity: 0
          });
          gsap.set(prevSlideText, {
            opacity: 0
          });

          if (sl.querySelector('.rect-bar')) {
            var rectBar = sl.querySelectorAll('.rect-bar');
            gsap.killTweensOf(rectBar);
            gsap.set(rectBar, {
              width: 0
            });
          }
        }
      });

      if (sl.querySelector('.marquee-shape')) {
        sl.classList.remove('is-animate');
      }

      if (sl.querySelector('.spacing')) {
        // document.body.style.border = '3px solid blue'
        var spacing = sl.querySelectorAll('.spacing'); // gsap.set(spacing, {border: '1px solid green'})

        gsap.killTweensOf(spacing);
        gsap.set(spacing, {
          width: "0",
          opacity: 0
        });
      }
    }
  }); // const prevElement = [prevSlideTitles]

  var titles = slide.querySelectorAll('.text-title .masking-text');

  if (window.innerWidth > 768) {
    titles = slide.querySelectorAll('.st-visible-mobile.text-title .masking-text');
  }

  var description = slide.querySelectorAll('.text-description span');

  if (slide.querySelector('.marquee-shape')) {
    isDrawCircle = false;
    gsap.set(".grp-circle", {
      clearProps: "all"
    });
    gsap.set('.circle-bar', {
      clearProps: "all"
    });
  } // gsap.set(slideText, {opacity: 1})
  // gsap.set(titles, {y: "100%", x: "0%", opacity: 0})
  // gsap.set(description, {opacity: 0})
  // gsap.to(prevSlideText, .5, {opacity: 0, ease: Power0.easeNone})


  gsap.delayedCall(.8, function () {
    slideTextMotion(num);
  });
  prevSlideNum = slide.getAttribute('data-num');
};

var slideTextMotion = function slideTextMotion(num) {
  if (page !== 'index') {
    return;
  }

  checkSlideResize();
  var slide = document.querySelectorAll('.swiper-slide')[num];
  var titles;

  if (window.innerWidth > 768) {
    titles = slide.querySelectorAll('.st-visible-pc.text-title .masking-text');
  } else {
    titles = slide.querySelectorAll('.st-visible-mobile.text-title .masking-text');
  }

  var description = slide.querySelectorAll('.text-description span');
  var slideText = slide.querySelector('.text-wrap');
  gsap.killTweensOf(slideText, "opacity");
  gsap.set(slideText, {
    opacity: 1
  });
  gsap.killTweensOf(titles);
  gsap.killTweensOf(description);
  gsap.utils.toArray(titles).forEach(function (title, i) {
    var tlText = gsap.timeline({
      delay: i * .25
    });

    if (!isIE11 && window.innerWidth > 768) {
      if (isloadTrig) {
        if (ScrollTrigger.getById('triggers1')) {// const all = document.querySelectorAll('.align-item')
          // gsap.killTweensOf(all)
          // gsap.set(all, {clearProps: "xPercent"})
        }

        resetTextTrigger();
      } // isloadTrig = true 

    }

    tlText.to(title, 1.2, {
      y: "0%",
      ease: Power4.easeOut,
      stagger: .15
    }, 'titleStart').to(title, 1.2, {
      opacity: 1,
      ease: Power2.easeOut,
      stagger: .15,
      onComplete: function onComplete() {
        var otherTitles = slide.querySelectorAll('.text-title .masking-text');
        gsap.set(otherTitles, {
          opacity: 1,
          y: "0%"
        });
      }
    }, '<').addLabel('titleEnd').to(description, .75, {
      opacity: 1,
      ease: Power1.easeInOut,
      onComplete: function onComplete() {}
    }, 'titleEnd-=.6').addLabel('description');

    if (title.querySelector('.rect-bar')) {
      var bar = title.querySelectorAll('.rect-bar'); // gsap.set(bar, {width: 0})
      // const spacing = title.querySelector('.spacing');

      tlText.to(bar[0], .8, {
        width: '3.6vw',
        ease: Power3.easeOut
      }, 'titleEnd-=.6');
      tlText.to(bar[1], .8, {
        width: '2rem',
        ease: Power3.easeOut
      }, 'titleEnd-=.6'); // tlText.to(spacing, .8, {opacity: 1, ease: Power2.easeOut}, 'titleEnd-=.6')
    } // ScrollTrigger.refresh()
    // swiperScTrigger(slide)


    gsap.delayedCall(1, function () {
      if (!swiperLoaded) {
        if (window.innerWidth > 768) {
          var slideIndex = document.querySelectorAll('.slide-index');
          var numElements = document.querySelectorAll('.progress-element');
          gsap.to(slideIndex, .6, {
            y: "0%",
            ease: Power2.easeInOut,
            stagger: .1,
            onComplete: function onComplete() {
              gsap.set(numElements, {
                y: "0%"
              });
            }
          });
          swiperLoaded = true;
        } else {
          var _numElements = document.querySelectorAll('.progress-element');

          var _slideIndex = document.querySelectorAll('.slide-index');

          gsap.to(_numElements, .6, {
            y: "0%",
            ease: Power2.easeOut,
            stagger: .15,
            onComplete: function onComplete() {
              gsap.set(_slideIndex, {
                y: "0%"
              });
            }
          });
        }
      }
    });
    gsap.delayedCall(.7, function () {
      if (slide.querySelector('.marquee-shape')) {
        slide.classList.add('is-animate');

        if (window.innerWidth < 769) {
          circleMotion(slide.querySelector('.marquee-shape.shape-mobile'));
          gsap.to('.marquee-shape.shape-pc .grp-circle', {
            opacity: 1
          });
        } else {
          circleMotion(slide.querySelector('.marquee-shape.shape-pc'));
          gsap.to('.marquee-shape.shape-mobile .grp-circle', {
            opacity: 1
          });
        }
      } else {
        slide.classList.remove('is-animate');
      }
    });
  });
};

var checkSlideResize = function checkSlideResize() {
  if (window.innerWidth > 768) {
    if (document.body.classList.contains('is-header-active')) {// headerFunc('hide')
    }

    if (isMobile) {
      var allText = document.querySelectorAll('.swiper-slide .text-title.st-visible-pc');
      gsap.utils.toArray(allText).forEach(function (t) {
        t.style.setProperty("display", "flex", "important");
      });
      var prevText = document.querySelectorAll('.swiper-slide .text-title.st-visible-mobile');
      gsap.utils.toArray(prevText).forEach(function (f) {
        f.style.setProperty("display", "none", "important");
      });
    } else {
      var _allText = document.querySelectorAll('.swiper-slide .text-title.st-visible-mobile');

      gsap.utils.toArray(_allText).forEach(function (t) {
        t.style.setProperty("display", "none", "important");
      });

      var _prevText = document.querySelectorAll('.swiper-slide .text-title.st-visible-pc');

      gsap.utils.toArray(_prevText).forEach(function (f) {
        f.style.setProperty("display", "flex", "important");
      });
    }
  } else {
    var _allText2 = document.querySelectorAll('.swiper-slide .text-title.st-visible-mobile');

    gsap.utils.toArray(_allText2).forEach(function (t) {
      t.style.setProperty("display", "flex", "important");
    });

    var _prevText2 = document.querySelectorAll('.swiper-slide .text-title.st-visible-pc');

    gsap.utils.toArray(_prevText2).forEach(function (f) {
      f.style.setProperty("display", "none", "important");
    });
  }
};

window.addEventListener('resize', function () {
  if (page == 'index') {
    checkSlideResize();
  }

  if (document.body.classList.contains('is-header-active')) {
    if (window.innerWidth > 768) {
      headerFunc('hide');
    }
  }

  if (window.innerWidth > 768) {
    var subWrap = document.querySelector('.sub-list');
    var list = document.querySelectorAll('header .sub-list a .list-text');
    gsap.killTweensOf(subWrap);
    gsap.killTweensOf(list); // gsap.killTweensOf(list, {opacity: 1})

    gsap.set(subWrap, {
      clearProps: "all"
    });
    gsap.set(list, {
      clearProps: "all"
    }); // gsap.set(subWrap, {display: "block"})

    gsap.set(list, {
      opacity: 1
    });
  }
});

var commerceLinkSet = function commerceLinkSet(data) {
  var linkLu42 = data.querySelector('.button-add');
  var lu42Link = 'https://www.lu42.co.kr/goods/goods_view.php?goodsNo=';
  var lu42Num;
  var target = data.getAttribute('data-product');

  if (target == 'b3light-toner') {
    lu42Num = '1000000190';
  }

  if (target == 'barrier-emulsion') {
    lu42Num = '1000000187';
  }

  if (target == 'fusimune-ampoule') {
    lu42Num = '1000000189';
  }

  if (target == 'rp-cream') {
    lu42Num = '1000000188';
  }

  var targetLink = lu42Link + lu42Num;
  linkLu42.setAttribute('href', targetLink);
};