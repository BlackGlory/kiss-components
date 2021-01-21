import { LitElement, html, property, query } from 'lit-element'
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

export class ComboBox extends LitElement {
  @property()
  items: Array<[name: string, value: string]> = []

  @property({ attribute: true })
  name?: string

  private _datalistId = createClassname()

  @query('input')
  private _inputElement!: HTMLInputElement

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
        @change="${() => this.dispatchEvent(new Event('change'))}"
      />
      <datalist id="${this._datalistId}">
        ${this.items.map(item => html`
          <option value="${item[Item.Value]}">${item[Item.Name]}</option>
        `)}
      </datalist>
    `
  }
}
