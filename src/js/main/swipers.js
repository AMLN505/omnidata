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
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
    1620: {
      slidesPerView: 6,
    },
  }
})
