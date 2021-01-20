import '@define/list-box'
import { ListBox } from '@components/list-box'
import { getBySelector as $, getAllBySelector as $$ } from 'extra-dom'
import { act } from '@test/utils'

describe('kiss-list-box', () => {
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

  describe('set name', () => {
    it('pass-through to internal select element', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-list-box name="test"></kiss-list-box>'
      })

      $('kiss-list-box select[name="test"]')
    })
  })

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
