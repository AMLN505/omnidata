const productsSwiper = new Swiper('.hero__swiper', {
  centeredSlides: true,
  loop: true,
  loopAdditionalSlides: 1,
  freeMode: false,
  grabCursor: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  speed: 1000,
  pagination: {
    el: ".hero__swiper-pagination"
  },
  effect: "creative",

  breakpoints: {
    375: {
      creativeEffect: {
        prev: {
          translate: ["-104%", 0, 0],
        },
        next: {
          translate: ["104%", 0, 0],
        },
      },
    },

    1000: {
      creativeEffect: {
        prev: {
          translate: ["-150%", "25%", -500],
        },
        next: {
          translate: ["150%", "25%", -500],
        },
      },
    }
  }
})

const clientsSwiper = new Swiper('.clients__swiper', {
  allowTouchMove: false,
  slidesPerView: 2,
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
  },
  speed: 4000,
  centeredSlides: true,

  breakpoints: {
    375: {
      slidesPerView: 2,
    },
    700: {
      slidesPerView: 4,
    },
    // потом поставить 6, когда увеличится кол-во клиентов
    1280: {
      slidesPerView: 5,
    },
    // включит, когда станет более 8 клиентов
    // 1600: {
    //   slidesPerView: 8,
    // }
  }
})
