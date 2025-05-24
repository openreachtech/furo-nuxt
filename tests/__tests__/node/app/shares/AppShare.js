import AppShare from '../../../../../app/shares/AppShare.js'
import FuroShare from '../../../../../lib/shares/FuroShare.js'

describe('AppShare', () => {
  describe('super class', () => {
    test('should be FuroShare', () => {
      const actual = AppShare.prototype

      expect(actual)
        .toBeInstanceOf(FuroShare)
    })
  })
})
