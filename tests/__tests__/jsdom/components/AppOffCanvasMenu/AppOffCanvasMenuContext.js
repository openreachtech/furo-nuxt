import AppOffCanvasMenuContext from '~/components/AppOffCanvasMenu/AppOffCanvasMenuContext.js'
import LinkItemContext from '~/components/AppOffCanvasMenu/LinkItemContext'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

describe('AppOffCanvasMenuContext', () => {
  describe('super class', () => {
    test('to extend BaseFuroContext', () => {
      const actual = AppOffCanvasMenuContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('AppOffCanvasMenuContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      const propsMock = {}
      const componentContextMock = {
        attrs: {},
        emit: () => {},
        expose: () => {},
        slots: {},
      }

      describe('#linkHash', () => {
        /**
         * @type {Array<{
         *   params: {
         *     linkHash: Record<string, Array<LinkItemContext>>
         *   }
         * }>}
         */
        const cases = [
          {
            params: {
              linkHash: {
                'GraphQL API': [
                  LinkItemContext.create({
                    text: 'Curriculums',
                    href: '/samples/curriculums',
                  }),
                  LinkItemContext.create({
                    text: 'Company Sponsors',
                    href: '/samples/company-sponsors',
                  }),
                ],
                Features: [
                  LinkItemContext.create({
                    text: 'Form Controls Inspector',
                    href: '/samples/form-controls-inspector',
                  }),
                  LinkItemContext.create({
                    text: 'Trigger Unlock Sample',
                    href: '/samples/trigger-unlock',
                  }),
                ],
              },
            },
          },
          {
            params: {
              linkHash: {
                Components: [
                  LinkItemContext.create({
                    text: '<FuroPagination>',
                    href: '/samples/components/furo-pagination',
                  }),
                  LinkItemContext.create({
                    text: '<FuroTabLayout>',
                    href: '/samples/components/furo-tab-layout',
                  }),
                ],
                'Vue Features': [
                  LinkItemContext.create({
                    text: 'computed() via Context',
                    href: '/samples/context/using-computed',
                  }),
                ],
              },
            },
          },
        ]

        test.each(cases)('props: $params.props', ({ params }) => {
          const args = {
            props: propsMock,
            componentContext: componentContextMock,
            linkHash: params.linkHash,
          }

          const context = new AppOffCanvasMenuContext(args)

          expect(context)
            .toHaveProperty('linkHash', params.linkHash)
        })
      })
    })
  })
})

describe('AppOffCanvasMenuContext', () => {
  describe('.create()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     linkHash: Record<string, Array<LinkItemContext>>
       *   }
       * }>}
       */
      const cases = [
        {
          params: {
            linkHash: {
              'GraphQL API': [
                LinkItemContext.create({
                  text: 'Curriculums',
                  href: '/samples/curriculums',
                }),
                LinkItemContext.create({
                  text: 'Company Sponsors',
                  href: '/samples/company-sponsors',
                }),
              ],
              Features: [
                LinkItemContext.create({
                  text: 'Form Controls Inspector',
                  href: '/samples/form-controls-inspector',
                }),
                LinkItemContext.create({
                  text: 'Trigger Unlock Sample',
                  href: '/samples/trigger-unlock',
                }),
              ],
            },
          },
        },
        {
          params: {
            linkHash: {
              Components: [
                LinkItemContext.create({
                  text: '<FuroPagination>',
                  href: '/samples/components/furo-pagination',
                }),
                LinkItemContext.create({
                  text: '<FuroTabLayout>',
                  href: '/samples/components/furo-tab-layout',
                }),
              ],
              'Vue Features': [
                LinkItemContext.create({
                  text: 'computed() via Context',
                  href: '/samples/context/using-computed',
                }),
              ],
            },
          },
        },
      ]

      test.each(cases)('props: $params.props', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          linkHash: params.linkHash,
        }

        const context = AppOffCanvasMenuContext.create(args)

        expect(context)
          .toBeInstanceOf(AppOffCanvasMenuContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     linkHash: Record<string, Array<LinkItemContext>>
       *   }
       * }>}
       */
      const cases = [
        {
          params: {
            linkHash: {
              'GraphQL API': [
                LinkItemContext.create({
                  text: 'Curriculums',
                  href: '/samples/curriculums',
                }),
                LinkItemContext.create({
                  text: 'Company Sponsors',
                  href: '/samples/company-sponsors',
                }),
              ],
              Features: [
                LinkItemContext.create({
                  text: 'Form Controls Inspector',
                  href: '/samples/form-controls-inspector',
                }),
                LinkItemContext.create({
                  text: 'Trigger Unlock Sample',
                  href: '/samples/trigger-unlock',
                }),
              ],
            },
          },
        },
        {
          params: {
            linkHash: {
              Components: [
                LinkItemContext.create({
                  text: '<FuroPagination>',
                  href: '/samples/components/furo-pagination',
                }),
                LinkItemContext.create({
                  text: '<FuroTabLayout>',
                  href: '/samples/components/furo-tab-layout',
                }),
              ],
              'Vue Features': [
                LinkItemContext.create({
                  text: 'computed() via Context',
                  href: '/samples/context/using-computed',
                }),
              ],
            },
          },
        },
      ]

      test.each(cases)('props: $params.props', ({ params }) => {
        const args = {
          props: propsMock,
          componentContext: componentContextMock,
          linkHash: params.linkHash,
        }

        const SpyClass = globalThis.constructorSpy.spyOn(AppOffCanvasMenuContext)

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('AppOffCanvasMenuContext', () => {
  describe('#extractLinkCategories()', () => {
    const propsMock = {}
    const componentContextMock = {
      attrs: {},
      emit: () => {},
      expose: () => {},
      slots: {},
    }

    /**
     * @type {Array<{
     *   params: {
     *     linkHash: Record<string, Array<LinkItemContext>>
     *   }
     *   expected: Array<{
     *     category: string
     *     links: Array<LinkItemContext>
     *   }>
     * }>}
     */
    const cases = [
      {
        params: {
          linkHash: {
            'GraphQL API': [
              LinkItemContext.create({
                text: 'Curriculums',
                href: '/samples/curriculums',
              }),
              LinkItemContext.create({
                text: 'Company Sponsors',
                href: '/samples/company-sponsors',
              }),
            ],
            Features: [
              LinkItemContext.create({
                text: 'Form Controls Inspector',
                href: '/samples/form-controls-inspector',
              }),
              LinkItemContext.create({
                text: 'Trigger Unlock Sample',
                href: '/samples/trigger-unlock',
              }),
            ],
          },
        },
        expected: [
          {
            category: 'GraphQL API',
            links: [
              LinkItemContext.create({
                text: 'Curriculums',
                href: '/samples/curriculums',
              }),
              LinkItemContext.create({
                text: 'Company Sponsors',
                href: '/samples/company-sponsors',
              }),
            ],
          },
          {
            category: 'Features',
            links: [
              LinkItemContext.create({
                text: 'Form Controls Inspector',
                href: '/samples/form-controls-inspector',
              }),
              LinkItemContext.create({
                text: 'Trigger Unlock Sample',
                href: '/samples/trigger-unlock',
              }),
            ],
          },
        ],
      },
      {
        params: {
          linkHash: {
            Components: [
              LinkItemContext.create({
                text: '<FuroPagination>',
                href: '/samples/components/furo-pagination',
              }),
              LinkItemContext.create({
                text: '<FuroTabLayout>',
                href: '/samples/components/furo-tab-layout',
              }),
            ],
            'Vue Features': [
              LinkItemContext.create({
                text: 'computed() via Context',
                href: '/samples/context/using-computed',
              }),
            ],
          },
        },
        expected: [
          {
            category: 'Components',
            links: [
              LinkItemContext.create({
                text: '<FuroPagination>',
                href: '/samples/components/furo-pagination',
              }),
              LinkItemContext.create({
                text: '<FuroTabLayout>',
                href: '/samples/components/furo-tab-layout',
              }),
            ],
          },
          {
            category: 'Vue Features',
            links: [
              LinkItemContext.create({
                text: 'computed() via Context',
                href: '/samples/context/using-computed',
              }),
            ],
          },
        ],
      },
    ]

    test.each(cases)('linkHash: $params.linkHash', ({ params, expected }) => {
      const context = AppOffCanvasMenuContext.create({
        props: propsMock,
        componentContext: componentContextMock,
        linkHash: params.linkHash,
      })

      const actual = context.extractLinkCategories()

      expect(actual)
        .toEqual(expected)
    })
  })
})
