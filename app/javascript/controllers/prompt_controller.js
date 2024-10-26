import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="prompt"
export default class extends Controller {
  static targets = ["command"]

  connect() {
    console.log("Hello, Stimulus!", this.element)
  }

}
