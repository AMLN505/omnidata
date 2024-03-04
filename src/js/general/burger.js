function openBurgerMenu() {
  const footer = document.querySelector('.footer__container')
  footer.classList.add('active')
  gsap.to(footer, {
    x: '100%',
    duration: 0.3,
    onComplete: () => {
      document.body.classList.add('disable-visible')
    }
  })
}

function closeBurgerMenu() {
  const footer = document.querySelector('.footer__container')
  document.body.classList.remove('disable-visible')
  gsap.to(footer, {
    x: '0',
    duration: 0.3,
    onComplete: () => {
      footer.classList.remove('active')
    }
  })
}

document.querySelector('.header__burger').addEventListener('click', () => {
  openBurgerMenu()
})

document.querySelector('.footer__close-button').addEventListener('click', () => {
  closeBurgerMenu();
})

window.addEventListener('resize', () => {
  const footer = document.querySelector('.footer__container')
  const width= document.body.clientWidth;

  if (footer.classList.contains('active') && width >= 1200) {
    closeBurgerMenu();
  }
})

function highlightCurrentUrl() {
  const path = window.location.pathname
  console.log(path)

  const headerLink = document.querySelector(`[href='.${path}']`)
  
  if (headerLink.classList.contains('menu__link')) {
    headerLink.classList.add('active')
  }
}

highlightCurrentUrl()
