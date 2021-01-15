# kiss-components

Keep web components simple, stupid:
- No ShadowDOM
- No slots
- No nested elements

## Install

```sh
npm install --save kiss-components
# or
yarn add kiss-components
```

## Components

### ComboBox

```ts
// kiss-combo-box
interface ComboBox {
  // attribute
  name?: string

  // property
  items: Array<[string, string]> = [] // Array<[name, value]>

  // pass-through properties
  get selectedIndex(): number
  set selectedIndex(val: number)

  get value(): string
  set value(val: string)

  // events
  change(): void
}
```
