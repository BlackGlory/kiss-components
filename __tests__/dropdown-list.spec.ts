import '@define/dropdown-list'
import { DropdownList } from '@components/dropdown-list'
import { getBySelector as $, getAllBySelector as $$ } from 'extra-dom'
import { act } from '@test/utils'

describe('kiss-dropdown-list', () => {
  describe('items(property)', () => {
    describe('set items', () => {
      it('set option elements in internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-dropdown-list></kiss-dropdown-list>'
        })

        await act(() => {
          $<DropdownList>('kiss-dropdown-list').items = [['name', 'value']]
        })

        expect($$('kiss-dropdown-list select option').length).toBe(1)
      })
    })
  })

  describe('name(attribute)', () => {
    describe('set name', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-dropdown-list name="test"></kiss-dropdown-list>'
        })

        $('kiss-dropdown-list select[name="test"]')
      })
    })
  })

  describe('value(pass-through property)', () => {
    describe('set value', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-dropdown-list></kiss-dropdown-list>'
          $<DropdownList>('kiss-dropdown-list').items = [['name1', 'value1'], ['name2', 'value2']]
        })

        await act(() => {
          $<DropdownList>('kiss-dropdown-list').value = 'value2'
        })

        expect($<HTMLSelectElement>('kiss-dropdown-list select').value).toBe('value2')
        expect($<HTMLSelectElement>('kiss-dropdown-list select').selectedIndex).toBe(1)
      })
    })

    describe('set value to internal select element', () => {
      it('reflect to component', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-dropdown-list></kiss-dropdown-list>'
          $<DropdownList>('kiss-dropdown-list').items = [['name1', 'value1'], ['name2', 'value2']]
        })

        $<HTMLSelectElement>('kiss-dropdown-list select').value = 'value2'

        expect($<DropdownList>('kiss-dropdown-list').value).toBe('value2')
        expect($<DropdownList>('kiss-dropdown-list').selectedIndex).toBe(1)
      })
    })
  })

  describe('selectIndex(pass-through property)', () => {
    describe('set selectIndex', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-dropdown-list></kiss-dropdown-list>'
          $<DropdownList>('kiss-dropdown-list').items = [['name1', 'value1'], ['name2', 'value2']]
        })

        await act(() => {
          $<DropdownList>('kiss-dropdown-list').selectedIndex = 1
        })

        expect($<HTMLSelectElement>('kiss-dropdown-list select').selectedIndex).toBe(1)
        expect($<HTMLSelectElement>('kiss-dropdown-list select').value).toBe('value2')
      })
    })

    // wait for jest v27.0.0-next.3

    // describe('set selectedIndex to internal select element', () => {
    //   it('reflect to component', async () => {
    //     await act(() => {
    //       document.body.innerHTML = '<kiss-dropdown-list></kiss-dropdown-list>'
    //       $<DropdownList>('kiss-dropdown-list').items = [['name1', 'value1'], ['name2', 'value2']]
    //     })

    //     $<HTMLSelectElement>('kiss-dropdown-list select').selectedIndex = 1

    //     expect($<DropdownList>('kiss-dropdown-list').selectedIndex).toBe(1)
    //     expect($<DropdownList>('kiss-dropdown-list')).toBe('value2')
    //   })
    // })
  })

  describe('change(event)', () => {
    describe('fire change in internal select element', () => {
      it('trigger change event', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-dropdown-list></kiss-dropdown-list>'
        })

        const listener = jest.fn()
        $<DropdownList>('kiss-dropdown-list').addEventListener('change', listener)
        $<HTMLSelectElement>('kiss-dropdown-list select').dispatchEvent(new Event('change'))

        expect(listener).toBeCalledTimes(1)
      })
    })
  })
})
