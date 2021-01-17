import { ComboBox } from '@components/combo-box'
import { getBySelector, getAllBySelector } from 'extra-dom'
// import { waitForSelectorAttached } from '@blackglory/wait-for'
// import {} from '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'

describe('kiss-combo-box', () => {
  describe.skip('set items', () => {
    it('set option elements in internal datalist element', async () => {
      const element = document.createElement('kiss-combo-box') as ComboBox

      element.items = [['name', 'value']]

      const internalDatalist = getBySelector('datalist') as HTMLSelectElement
      expect(getAllBySelector.call(internalDatalist, 'option').length).toBe(1)
    })
  })
})
