import { LitElement, html, property, query } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'
import { addStyleSheet } from 'userstyle'

enum Item {
  Name = 0
, Value = 1
}

export class ComboBox extends LitElement {
  @property()
  items: Array<[string, string]> = []

  @property({ attribute: true })
  name?: string

  @query('select')
  _selectElement!: HTMLSelectElement

  get selectedIndex(): number {
    return this._selectElement.selectedIndex
  }

  set selectedIndex(val: number) {
    this._selectElement.selectedIndex = val
  }

  get value(): string {
    return this._selectElement.value
  }

  set value(val: string) {
    this._selectElement.value = val
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <select
        name="${ ifDefined(this.name) }"
        @change="${ this.dispatchEvent(new Event('change')) }"
      >
        ${this.items.map((item, i) => html`
          <option
            value="${item[Item.Value]}"
            ?selected="${ i === this.selectedIndex }"
          >${item[Item.Name]}</option>
        `)}
      </select>
    `
  }
}

addStyleSheet(`
  kiss-combo-box {
    display: inline-flex;
  }

  kiss-combo-box select {
    width: 100%;
  }
`)

customElements.define('kiss-combo-box', ComboBox)
