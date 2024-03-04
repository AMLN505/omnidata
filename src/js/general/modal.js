class Modal {
  constructor(modal) {
    this.modal = modal
    this.dataModal = modal.dataset.modal
    this.closeButton = modal.querySelector('[data-action="close"]')
    this.triggersArr = document.querySelectorAll(`[data-trigger="${this.dataModal}"]`)

    for (const trigger of this.triggersArr) {
      trigger.addEventListener('click', () => {
        this.openModal()
      })
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.closeModal()
      }
    })

    this.closeButton.addEventListener('click', () => {
      this.closeModal()
    })

    this.modal.addEventListener('keydown', (e) => {
      if (e.code === "Escape") {
        e.preventDefault()
        this.closeModal()
      }
    })
  }

  openModal() {
    document.body.classList.add('disable-scroll')
    this.modal.showModal()
    gsap.to(this.modal, {
      duration: 0.3,
      opacity: 1,
      boxShadow: '0 0 0 100vw rgba(0, 0, 0, 0.7)',
    })
  }

  closeModal() {
    document.body.classList.remove('disable-scroll')
    gsap.to(this.modal, {
      duration: 0.3,
      opacity: 0,
      boxShadow: '0 0 0 100vw rgba(0, 0, 0, 0)',
      onComplete: () => {
        this.modal.close()
      }
    })

  }

}

for (const modalItem of document.querySelectorAll('dialog')) {
  new Modal(modalItem)
}
