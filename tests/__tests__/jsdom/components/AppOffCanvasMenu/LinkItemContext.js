import LinkItemContext from '../../../../../components/AppOffCanvasMenu/LinkItemContext.js'

describe('LinkItemContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#text', () => {
        const cases = [
          {
            params: {
              text: 'Alpha Link',
              href: '/alpha-page',
              iconUrl: 'https://example.com/icon.png',
            },
          },
          {
            params: {
              text: 'Beta Link',
              href: '/beta-page',
              iconUrl: null,
            },
          },
        ]

        test.each(cases)('text: $params.text', ({ params }) => {
          const context = new LinkItemContext(params)

          expect(context)
            .toHaveProperty('text', params.text)
        })
      })

      describe('#href', () => {
        const cases = [
          {
            params: {
              text: 'Alpha Link',
              href: '/alpha-page',
              iconUrl: 'https://example.com/icon.png',
            },
          },
          {
            params: {
              text: 'Beta Link',
              href: '/beta-page',
              iconUrl: null,
            },
          },
        ]

        test.each(cases)('href: $params.href', ({ params }) => {
          const context = new LinkItemContext(params)

          expect(context)
            .toHaveProperty('href', params.href)
        })
      })

      describe('#iconUrl', () => {
        const cases = [
          {
            params: {
              text: 'Alpha Link',
              href: '/alpha-page',
              iconUrl: 'https://example.com/icon.png',
            },
          },
          {
            params: {
              text: 'Beta Link',
              href: '/beta-page',
              iconUrl: null,
            },
          },
        ]

        test.each(cases)('iconUrl: $params.iconUrl', ({ params }) => {
          const context = new LinkItemContext(params)

          expect(context)
            .toHaveProperty('iconUrl', params.iconUrl)
        })
      })
    })
  })
})

describe('LinkItemContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            text: 'Alpha Link',
            href: '/alpha-page',
            iconUrl: 'https://example.com/icon.png',
          },
        },
        {
          params: {
            text: 'Beta Link',
            href: '/beta-page',
            iconUrl: null,
          },
        },
        {
          params: {
            text: 'Gamma Link',
            href: '/gamma-page',
            // iconUrl: undefined,
          },
        },
      ]

      test.each(cases)('text: $params.text', ({ params }) => {
        const context = LinkItemContext.create(params)

        expect(context)
          .toBeInstanceOf(LinkItemContext)
      })
    })

    describe('to call constructor', () => {
      describe('with actual value', () => {
        const cases = [
          {
            params: {
              text: 'Alpha Link',
              href: '/alpha-page',
              iconUrl: 'https://example.com/icon.png',
            },
          },
          {
            params: {
              text: 'Beta Link',
              href: '/beta-page',
              iconUrl: null,
            },
          },
        ]

        test.each(cases)('text: $params.text', ({ params }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(LinkItemContext)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(params)
        })
      })

      describe('without given value', () => {
        const cases = [
          {
            params: {
              text: 'Alpha Link',
              href: '/alpha-page',
              // iconUrl: undefined,
            },
          },
          {
            params: {
              text: 'Beta Link',
              href: '/beta-page',
              // iconUrl: undefined,
            },
          },
        ]

        test.each(cases)('text: $params.text', ({ params }) => {
          const expected = {
            text: params.text,
            href: params.href,
            iconUrl: null,
          }

          const SpyClass = globalThis.constructorSpy.spyOn(LinkItemContext)

          SpyClass.create(params)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})
