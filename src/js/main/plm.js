function createTippy(triggerButton, content, position, offset) {
  const circle = document.querySelector('.plm-illustration__circle');
  const button = document.querySelector(triggerButton)
  const currentTarget = Number(button.dataset.target)
  const tooltipContent = document.querySelector(content)
  const buttonHeading = button.querySelector('.plm-illustration__button-heading');
  const circleSector = document.querySelector(`${triggerButton} ~ .plm-illustration__sector-part > .plm-illustration__sector-path`)

  buttonHeading.innerHTML = tooltipContent.querySelector('.plm-tooltip__heading').innerHTML

  const tippyItem = tippy(triggerButton, {
    content: tooltipContent.innerHTML,
    allowHTML: true,
    placement: position,
    trigger: 'click',
    interactive: true,
    hideOnClick: false,
    maxWidth: 'none',
    offset: [offset, 20],
    onShow: () => {
      const prevShown = document.querySelector('.plm-illustration__button.active')
      let prevTarget
      if (prevShown) {
        prevTarget = Number(prevShown.dataset.target)
      }

      tippy.hideAll()

      for (const button of document.querySelectorAll('.plm-illustration__button')) {
        button.classList.remove('active')
        button.querySelector('.plm-illustration__button-heading').style.display = 'block'
      }

      buttonHeading.style.display = 'none'

      const turnCounter = Number(circle.dataset.turn)
      let circleDuration

      if (currentTarget < prevTarget) {
        circle.dataset.turn = turnCounter + 1
        circleDuration = 0.3 * Math.abs(6 - prevTarget + currentTarget)
      }

      if (currentTarget > prevTarget || !prevShown) {
        circleDuration = 0.3 * Math.abs(currentTarget - prevTarget)
      }

      gsap.to(circle, {
        rotation: 360 * Number(circle.dataset.turn) + (currentTarget - 1) * 60,
        duration: circleDuration,
      })

      button.classList.add('active')
    }
  });

  circleSector.addEventListener('click', () => {
    button._tippy.show()
    circle.classList.remove('active')
  })
}

createTippy('#tooltip-button-1', '#tooltip-content-1', 'top-start', 10)
document.getElementById('tooltip-button-1')._tippy.show()
createTippy('#tooltip-button-2', '#tooltip-content-2', 'top-start', 10)
createTippy('#tooltip-button-3', '#tooltip-content-3', 'top-start', 10)
createTippy('#tooltip-button-4', '#tooltip-content-4', 'top-end', -8)
createTippy('#tooltip-button-5', '#tooltip-content-5', 'top-end', -8)
createTippy('#tooltip-button-6', '#tooltip-content-6', 'top-end', -8)


function createCircleInterval() {
  function startCircleInterval() {
    let circleCounter = 1

    const intervalId = setInterval(() => {
      circleCounter++
      const button = document.querySelector(`#tooltip-button-${circleCounter}`)
      button._tippy.show()
      if (circleCounter === 6) {
        clearInterval(intervalId)
      }
    }, 3000)

    function clearIntervalByClick(selector) {
      for (const el of document.querySelectorAll(selector)) {
        el.addEventListener('click', ()=> clearInterval(intervalId))
      }
    }

    clearIntervalByClick('.plm-illustration__sector-path')
    clearIntervalByClick('.plm-illustration__button')
  }

  function observerCallback(entries, observer) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        startCircleInterval()
        observer.unobserve(entry.target)
      }
    }
  }

  const observer = new IntersectionObserver(observerCallback)
  const circle = document.querySelector('.plm-illustration__circle');
  observer.observe(circle)
}

createCircleInterval()


