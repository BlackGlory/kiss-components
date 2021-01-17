import { LitElement, customElement, html, property, query } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'
import { addStyleSheet, createClassname } from 'userstyle'

enum Item {
  Name = 0
, Value = 1
}

addStyleSheet(`
  kiss-combo-box {
    display: inline-flex;
  }

  kiss-combo-box input {
    width: 100%;
  }
`)

@customElement('kiss-combo-box')
export class ComboBox extends LitElement {
  _datalistId = createClassname()

  @property()
  items: Array<[string, string]> = []

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
          <option value="${item[Item.Value]}">${item[Item.Name]}</option>
        `)}
      </datalist>
    `
  }
}
