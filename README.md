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
  items: Array<[name: string, value: string]> = []

  // pass-through properties
  get value(): string
  set value(val: string)

  // events
  change(): void
}
```

### DropDownList

```ts
// kiss-dropdrop-list
interface DropdownList {
  // attribute
  name?: string

  // property
  items: Array<[name: string, value: string]> = []

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
// kiss-list-box
interface ListBox {
  // attribute
  name?: string
  size: number = 2

  // property
  items: Array<[name: string, value: string]> = []

  // pass-through properties
  get selectedIndex(): number
  set selectedIndex(val: number)

  get value(): string
  set value(val: string)

  // events
  change(): void
}
```
