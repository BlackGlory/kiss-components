import '@define/list-box'
import { ListBox } from '@components/list-box'
import { getBySelector as $, getAllBySelector as $$ } from 'extra-dom'
import { act } from '@test/utils'

describe('kiss-list-box', () => {
  describe('items(property)', () => {
    describe('set items', () => {
      it('set option elements in internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box></kiss-list-box>'
        })

        await act(() => {
          $<ListBox>('kiss-list-box').items = [['name', 'value']]
        })

        expect($$('kiss-list-box select option').length).toBe(1)
      })
    })
  })

  describe('name(attribute)', () => {
    describe('set name', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box name="test"></kiss-list-box>'
        })

        $('kiss-list-box select[name="test"]')
      })
    })
  })

  describe('size(attribute)', () => {
    describe('set size', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box size="3"></kiss-list-box>'
        })

        $('kiss-list-box select[size="3"]')
      })
    })
  })

  describe('value(pass-through property)', () => {
    describe('set value', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box></kiss-list-box>'
          $<ListBox>('kiss-list-box').items = [['name1', 'value1'], ['name2', 'value2']]
        })

        await act(() => {
          $<ListBox>('kiss-list-box').value = 'value2'
        })

        expect($<HTMLSelectElement>('kiss-list-box select').value).toBe('value2')
      })
    })

    describe('set value to internal select element', () => {
      it('reflect to component', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box></kiss-list-box>'
          $<ListBox>('kiss-list-box').items = [['name1', 'value1'], ['name2', 'value2']]
        })

        $<HTMLSelectElement>('kiss-list-box select').value = 'value2'

        expect($<ListBox>('kiss-list-box').value).toBe('value2')
      })
    })
  })

  describe('selectIndex(pass-through property)', () => {
    describe('set selectIndex', () => {
      it('pass-through to internal select element', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box></kiss-list-box>'
          $<ListBox>('kiss-list-box').items = [['name1', 'value1'], ['name2', 'value2']]
        })

        await act(() => {
          $<ListBox>('kiss-list-box').selectedIndex = 1
        })

        expect($<HTMLSelectElement>('kiss-list-box select').selectedIndex).toBe(1)
        expect($<HTMLSelectElement>('kiss-list-box select').value).toBe('value2')
      })
    })

    // wait for jest

    // describe('set selectedIndex to internal select element', () => {
    //   it('reflect to component', async () => {
    //     await act(() => {
    //       document.body.innerHTML = '<kiss-list-box></kiss-list-box>'
    //       $<ListBox>('kiss-list-box').items = [['name1', 'value1'], ['name2', 'value2']]
    //     })

    //     $<HTMLSelectElement>('kiss-list-box select').selectedIndex = 1

    //     expect($<ListBox>('kiss-list-box').selectedIndex).toBe(1)
    //     expect($<ListBox>('kiss-list-box')).toBe('value2')
    //   })
    // })
  })

  describe('change(event)', () => {
    describe('fire change in internal select element', () => {
      it('trigger change event', async () => {
        await act(() => {
          document.body.innerHTML = '<kiss-list-box></kiss-list-box>'
        })

        const listener = jest.fn()
        $<ListBox>('kiss-list-box').addEventListener('change', listener)
        $<HTMLSelectElement>('kiss-list-box select').dispatchEvent(new Event('change'))

        expect(listener).toBeCalledTimes(1)
      })
    })
  })
})
