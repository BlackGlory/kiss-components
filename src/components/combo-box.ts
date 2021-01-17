import { LitElement, html, property, query } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'
import { addStyleSheet, createClassname } from 'userstyle'

export class ComboBox extends LitElement {
  _datalistId = createClassname()

  @property()
  items: string[] = []

  @property({ attribute: true })
  name?: string

  @query('input')
  _inputElement!: HTMLInputElement

  get value(): string {
    return this._inputElement.value
  }

  set value(val: string) {
    this._inputElement.value = val
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <input
        name="${ifDefined(this.name)}"
        list="${this._datalistId}"
      />
      <datalist id="${this._datalistId}">
        ${this.items.map(item => html`
          <option value="${item}" />
        `)}
      </datalist>
    `
  }
}

addStyleSheet(`
  kiss-combo-box {
    display: inline-flex;
  }

  kiss-combo-box input {
    width: 100%;
  }
`)

customElements.define('kiss-combo-box', ComboBox)
