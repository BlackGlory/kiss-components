import { LitElement, customElement, html, property, query } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'
import { addStyleSheet } from 'userstyle'

enum Item {
  Name = 0
, Value = 1
}

addStyleSheet(`
  kiss-list-box {
    display: inline-flex;
  }

  kiss-list-box select {
    width: 100%;
  }
`)

export class ListBox extends LitElement {
  @property()
  items: Array<[name: string, value: string]> = []

  @property({ attribute: true })
  name?: string

  @property({ attribute: true })
  size: number = 2

  @query('select')
  private _selectElement!: HTMLSelectElement

  get selectedIndex(): number {
    if (!this._selectElement) return -1
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
        name="${ifDefined(this.name)}"
        size="${this.size}"
        @change="${() => this.dispatchEvent(new Event('change'))}"
      >
        ${this.items.map((item, i) => html`
          <option
            value="${item[Item.Value]}"
            ?selected="${i === this.selectedIndex}"
          >${item[Item.Name]}</option>
        `)}
      </select>
    `
  }
}
