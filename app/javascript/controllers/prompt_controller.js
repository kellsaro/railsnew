import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="prompt"
export default class extends Controller {
  static targets = [ "command" ]
  static values = { database: String }

  initialize () {
    this.commandTarget.textContent = "rails new app"
  }

  updateDatabase({ detail: { content } }) {
    this.databaseValue = content
  }

  databaseValueChanged () {
    let options = [ this.databaseValue ].join(" ")
    this.commandTarget.textContent = `rails new app ${options}`
  }

}
