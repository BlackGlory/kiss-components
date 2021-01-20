import '@define/dropdown-list'
import { DropdownList } from '@components/dropdown-list'
import { getBySelector as $, getAllBySelector as $$ } from 'extra-dom'
import { act } from '@test/utils'

describe('kiss-dropdown-list', () => {
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

  describe('set name', () => {
    it('pass-through to internal select element', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-dropdown-list name="test"></kiss-dropdown-list>'
      })

      $('kiss-dropdown-list select[name="test"]')
    })
  })

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
    })
  })

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
