import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="card"
export default class extends Controller {
  static targets = [ "label", "database", "output", "icon", "cardContent" ]
  static values = { checked: Number, iconStatus: Number }

  expandCollapse() {
    this.iconStatusValue = (this.iconStatusValue + 1) % 2;

    this.#toggleCardContent();
    this.#syncIcon()
  }

  check() {
    this.checkedValue = (this.checkedValue + 1) % 2;
  }

  checkedValueChanged () {
    this.#syncOutputTarget()
    this.#disableRadios(this.checkedValue % 2 == 0)
    this.#syncIcon()

    if (this.checkedValue % 2 == 1) {
      this.#showCardContent()
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

  iconStatusChanged() {
    this.#toggleCardContent()
    this.#syncIcon()
  }

  #syncOutputTarget() {
    this.outputTarget.textContent = ""
    if (this.checkedValue % 2 == 1) {
      this.databaseTargets.forEach((element, index) => {
          if(element.checked) {
            this.outputTarget.textContent = `--database=${element.value}`
          }
        }
      )
    }
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
  }

  #toggle(element, className) {
    element.classList.toggle(className)
  }

  #showCardContent() {
    this.cardContentTarget.classList.remove("is-hidden")
  }

  #syncIcon () {
    this.iconTarget.classList.remove("fa-angle-up", "fa-angle-down")
    this.iconTarget.classList.add(this.iconStatusValue == 0 ? "fa-angle-down" : "fa-angle-up")
  }
}

