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
  items: string[] = [] // value[]

  // pass-through properties
  get value(): string
  set value(val: string)

  // events
  change(): void
}
```

### DropDownList

```ts
// kiss-drop-down-list
interface DropDownList {
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

### ListBox

```ts
// kiss-drop-down-list
interface DropDownList {
  // attribute
  name?: string
  size: number = 2

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
