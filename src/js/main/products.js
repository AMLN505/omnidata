const productsSwiper = new Swiper('.products__swiper', {
  allowTouchMove: false,
})

const productsContentArr = [
  {
    name: 'food',
    plmDescr: 'Ведите реестр собственных торговых марок с&nbsp;возможностями отслеживания статусов и&nbsp;централизованным хранилищем документов',
    plmImg: '../images/svg/plm_bottle.svg',
    plmTooltips: [
      {
        heading: 'Заголовок 1',
        text: 'Текст тултипа 1',
      },
      {
        heading: 'Заголовок 2',
        text: 'Текст тултипа 2',
      },
      {
        heading: 'Заголовок 3',
        text: 'Текст тултипа 3',
      },
      {
        heading: 'Заголовок 4',
        text: 'Текст тултипа 4',
      },
      {
        heading: 'Заголовок 5',
        text: 'Текст тултипа 5',
      },
      {
        heading: 'Заголовок 6',
        text: 'Текст тултипа 6',
      },
    ],
    srmDescr: 'Автоматизация коммерческих товарных закупок для крупного ритейла и&nbsp;производства',
    mdmDescr: 'Центр управления мастер-данными по&nbsp;принципу &laquo;единого источника правды&raquo; о&nbsp;товарах, продукции, контрагентах',
  },
  {
    name: 'fashion',
    plmDescr: 'fashion plm descr',
    plmImg: '../images/svg/plm_tshirt.svg',
    plmTooltips: [
      {
        heading: 'Заголовок 1 fashion',
        text: 'Текст тултипа 1 fashion',
      },
      {
        heading: 'Заголовок 2 fashion',
        text: 'Текст тултипа 2 fashion',
      },
      {
        heading: 'Заголовок 3 fashion',
        text: 'Текст тултипа 3 fashion',
      },
      {
        heading: 'Заголовок 4 fashion',
        text: 'Текст тултипа 4 fashion',
      },
      {
        heading: 'Заголовок 5 fashion',
        text: 'Текст тултипа 5 fashion',
      },
      {
        heading: 'Заголовок 6 fashion',
        text: 'Текст тултипа 6 fashion',
      },
    ],
    srmDescr: 'fashion srm descr',
    mdmDescr: 'fashion mdm descr',
  },
  {
    name: 'diy',
    plmDescr: 'diy plm descr',
    plmImg: '../images/svg/plm_hummer.svg',
    plmTooltips: [
      {
        heading: 'Заголовок 1 diy',
        text: 'Текст тултипа 1 diy',
      },
      {
        heading: 'Заголовок 2 diy',
        text: 'Текст тултипа 2 diy',
      },
      {
        heading: 'Заголовок 3 diy',
        text: 'Текст тултипа 3 diy',
      },
      {
        heading: 'Заголовок 4 diy',
        text: 'Текст тултипа 4 diy',
      },
      {
        heading: 'Заголовок 5 diy',
        text: 'Текст тултипа 5 diy',
      },
      {
        heading: 'Заголовок 6 diy',
        text: 'Текст тултипа 6 diy',
      },
    ],
    srmDescr: 'diy srm descr',
    mdmDescr: 'diy mdm descr',
  }
]


function addSwitchers() {
  function switchProduct(number) {
    productsSwiper.slideTo(number, 700, false)

    if (productsContentArr[number]) {
      const plmDescr = document.querySelector('.plm__descr')
      plmDescr.innerHTML = productsContentArr[number].plmDescr

      const plmImg = document.getElementById('plm-image')
      plmImg.style.backgroundImage = `url(${productsContentArr[number].plmImg})`

      const tooltipArr = document.querySelectorAll('.plm-illustration__tooltip')
      for (let i = 0; i < tooltipArr.length; i++) {
        const tooltip = tooltipArr[i]
        const tooltipButton = document.getElementById(`tooltip-button-${i + 1}`)
        const tooltipContent = document.getElementById(`tooltip-content-${i + 1}`)
        const tooltipHeading = tooltipContent.querySelector('.plm-tooltip__heading')
        const tooltipDescr = tooltipContent.querySelector('.plm-tooltip__descr')
        const buttonHeading = tooltipButton.querySelector('.plm-illustration__button-heading')

        tooltipHeading.innerHTML = productsContentArr[number].plmTooltips[i].heading
        tooltipDescr.innerHTML = productsContentArr[number].plmTooltips[i].text
        tooltipButton._tippy.setContent(tooltipContent.innerHTML)
        buttonHeading.innerHTML = productsContentArr[number].plmTooltips[i].heading
      }

      const srmDescr = document.querySelector('.srm__descr')
      srmDescr.innerHTML = productsContentArr[number].srmDescr

      const mdmDescr = document.querySelector('.mdm__descr')
      mdmDescr.innerHTML = productsContentArr[number].mdmDescr
    }
  }


  for (const switcher of document.querySelectorAll('.products__control-button')) {
    const slideNumber = Number(switcher.dataset.slideTarget)

    switcher.addEventListener('click', () => {
      for (const button of document.querySelectorAll('.products__control-button')) {
        button.classList.remove('active')
      }
      switcher.classList.add('active')
      switchProduct(slideNumber)
    })
  }
}

addSwitchers()
