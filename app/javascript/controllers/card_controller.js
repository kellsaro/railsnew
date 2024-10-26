import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="card"
export default class extends Controller {
  static targets = [ "check", "label", "database", "output", "icon", "cardContent" ]

  connect() {
  }

  initialize() {
  }

  expandCollapse() {
    this.#toggleCardContent();
  }

  check() {
    if (this.checkTarget.checked) {
      // set selectedOption value that already has the radio button component
      this.#syncOutputTarget()
      this.#disableRadios(false)

      // show the card-content if it is hidden
      this.#showCardIfHidden()
    }
    else {
      // set the output value to blank
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

  #showCardIfHidden() {
    if (this.cardContentTarget.classList.contains("is-hidden")) {
      this.#toggle(this.cardContentTarget, "is-hidden")
    }
    this.#syncIcon()
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

