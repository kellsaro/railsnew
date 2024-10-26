import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="card"
export default class extends Controller {
  static targets = [ "check", "label", "database", "output", "icon", "cardContent" ]

  expandCollapse() {
    this.#toggleCardContent();
  }

  check() {
    if (this.checkTarget.checked) {
      this.#syncOutputTarget()
      this.#disableRadios(false)
      this.#showCardContentIfHidden()
      this.#syncIcon()
    }
    else {
      this.outputTarget.textContent = ""
      this.#disableRadios(true)
    }
  }

  selectSqlite() {
    this.#syncOutputTarget()
  }

  selectPostgresql() {
    this.#syncOutputTarget()
  }

  selectMysql() {
    this.#syncOutputTarget()
  }

  selectTrilogy() {
    this.#syncOutputTarget()
  }

  #syncOutputTarget() {
    this.databaseTargets.forEach((element, index) => {
        if(element.checked) {
          this.outputTarget.textContent = `--database=${element.value}`
        }
      }
    )
  }

  #disableRadios(disabled) {
    this.labelTargets.forEach((element, index) => {
        if (disabled) {
          element.setAttribute('disabled', '')
        }
        else {
          element.removeAttribute('disabled')
        }
      }
    )

    this.databaseTargets.forEach((element, index) => {
        element.disabled = disabled
      }
    )
  }

  #toggleCardContent() {
    this.#toggle(this.cardContentTarget, "is-hidden")
    this.#syncIcon()
  }

  #toggle(element, className) {
    element.classList.toggle(className)
  }

  #showCardContentIfHidden() {
    if (this.cardContentTarget.classList.contains("is-hidden")) {
      this.#toggle(this.cardContentTarget, "is-hidden")
    }
  }

  #syncIcon () {
    if (this.iconTarget.classList.contains("fa-angle-up")) {
      this.iconTarget.classList.toggle("fa-angle-up")
    }

    if (this.iconTarget.classList.contains("fa-angle-down")) {
      this.iconTarget.classList.toggle("fa-angle-down")
    }

    let hidden = this.cardContentTarget.classList.contains("is-hidden")

    if (hidden) {
      this.iconTarget.classList.toggle("fa-angle-down")
    }
    else {
      this.iconTarget.classList.toggle("fa-angle-up")
    }
  }
}

