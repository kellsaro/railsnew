import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="prompt"
export default class extends Controller {
  static targets = [ "command" ]
  static values = { name: String, database: String }

  initialize () {
    this.commandTarget.textContent = `rails new ${this.#options()}`
  }

  updateDatabase({ detail: { content } }) {
    this.databaseValue = content
  }

  databaseValueChanged () {
    this.commandTarget.textContent = `rails new ${this.#options()}`
  }

  #options () {
    return [
      this.nameValue,
      this.databaseValue
    ].join(" ")
  }

}
