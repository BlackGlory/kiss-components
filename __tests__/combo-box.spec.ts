import '@define/combo-box'
import { ComboBox } from '@components/combo-box'
import { getBySelector as $, getAllBySelector as $$ } from 'extra-dom'
import { act } from '@test/utils'

describe('kiss-combo-box', () => {
  describe('set items', () => {
    it('set option elements in internal datalist element', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-combo-box></kiss-combo-box>'
      })

      await act(() => {
        $<ComboBox>('kiss-combo-box').items = [['name', 'value']]
      })

      expect($$('kiss-combo-box datalist option').length).toBe(1)
    })
  })

  describe('set name', () => {
    it('pass-through to internal input element', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-combo-box name="test"></kiss-combo-box>'
      })

      $('kiss-combo-box input[name="test"]')
    })
  })

  describe('set value', () => {
    it('pass-through to internal input element', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-combo-box></kiss-combo-box>'
        $<ComboBox>('kiss-combo-box').items = [['name1', 'value1'], ['name2', 'value2']]
      })

      await act(() => {
        $<ComboBox>('kiss-combo-box').value = 'value2'
      })

      expect($<HTMLInputElement>('kiss-combo-box input').value).toBe('value2')
    })
  })

  describe('set value to internal input element', () => {
    it('reflect to component', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-combo-box></kiss-combo-box>'
        $<ComboBox>('kiss-combo-box').items = [['name1', 'value1'], ['name2', 'value2']]
      })

      $<HTMLInputElement>('kiss-combo-box input').value = 'value2'

      expect($<ComboBox>('kiss-combo-box').value).toBe('value2')
    })
  })

  describe('fire change in internal input element', () => {
    it('trigger change event', async () => {
      await act(() => {
        document.body.innerHTML = '<kiss-combo-box></kiss-combo-box>'
      })

      const listener = jest.fn()
      $<ComboBox>('kiss-combo-box').addEventListener('change', listener)
      $<HTMLInputElement>('kiss-combo-box input').dispatchEvent(new Event('change'))

      expect(listener).toBeCalledTimes(1)
    })
  })
})
