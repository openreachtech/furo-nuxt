import FuroAccessControlLayoutContext from '~/lib/contexts/concretes/FuroAccessControlLayoutContext.js'

import BaseFuroContext from '~/lib/contexts/BaseFuroContext.js'

const componentContextMock = {
  attrs: {},
  emit: () => {},
  expose: () => {},
  slots: {},
}

describe('FuroAccessControlLayoutContext', () => {
  describe('super class', () => {
    test('to extend BaseFuroContext', () => {
      const actual = FuroAccessControlLayoutContext.prototype

      expect(actual)
        .toBeInstanceOf(BaseFuroContext)
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#props', () => {
        /**
         * @type {Array<{
         *  params: {
         *    props: FuroAccessControlLayoutContext['props']
         *    componentContext: FuroAccessControlLayoutContext['componentContext']
         *  }
         * }>}
         */
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
              componentContext: componentContextMock,
            },
          },
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [],
              },
              componentContext: componentContextMock,
            },
          },
        ]

        test.each(cases)('props: $params.props', ({ params }) => {
          const context = new FuroAccessControlLayoutContext(params)

          expect(context)
            .toHaveProperty('props', params.props)
        })
      })
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('.create()', () => {
    describe('to be instance of own class', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: FuroAccessControlLayoutContext['props']
       *     componentContext: FuroAccessControlLayoutContext['componentContext']
       *   }
       * }>}
       */
      const cases = [
        {
          params: {
            props: {
              role: 'admin',
              allowed: [
                'admin',
                'user',
              ],
              kicked: [
                'guest',
              ],
            },
            componentContext: componentContextMock,
          },
        },
        {
          params: {
            props: {
              role: null,
              allowed: [],
              kicked: [],
            },
            componentContext: componentContextMock,
          },
        },
      ]

      test.each(cases)('props: $params.props', ({ params }) => {
        const context = FuroAccessControlLayoutContext.create(params)

        expect(context)
          .toBeInstanceOf(FuroAccessControlLayoutContext)
      })
    })

    describe('to call constructor', () => {
      /**
       * @type {Array<{
       *   params: {
       *     props: FuroAccessControlLayoutContext['props']
       *     componentContext: FuroAccessControlLayoutContext['componentContext']
       *   }
       * }>}
       */
      const cases = [
        {
          params: {
            props: {
              role: 'admin',
              allowed: [
                'admin',
                'user',
              ],
              kicked: [
                'guest',
              ],
            },
            componentContext: componentContextMock,
          },
        },
        {
          params: {
            props: {
              role: null,
              allowed: [],
              kicked: [],
            },
            componentContext: componentContextMock,
          },
        },
      ]

      test.each(cases)('props: $params.props', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroAccessControlLayoutContext)

        SpyClass.create(params)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(params)
      })
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#get:role', () => {
    const cases = [
      {
        params: {
          props: {
            role: 'admin',
            allowed: [
              'admin',
              'user',
            ],
            kicked: [
              'guest',
            ],
          },
        },
        expected: 'admin',
      },
      {
        params: {
          props: {
            role: 'user',
            allowed: [
              'admin',
              'user',
            ],
            kicked: [
              'guest',
            ],
          },
        },
        expected: 'user',
      },
      {
        params: {
          props: {
            role: null,
            allowed: [
              'admin',
              'user',
            ],
            kicked: [
              'guest',
            ],
          },
        },
        expected: null,
      },
    ]

    test.each(cases)('role: $params.props.role', ({ params, expected }) => {
      const context = FuroAccessControlLayoutContext.create({
        props: params.props,
        componentContext: componentContextMock,
      })

      const actual = context.role

      expect(actual)
        .toBe(expected)
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#get:allowedRoles', () => {
    const cases = [
      {
        params: {
          props: {
            role: 'admin',
            allowed: [
              'admin',
              'user',
            ],
            kicked: [
              'guest',
            ],
          },
        },
        expected: ['admin', 'user'],
      },
      {
        params: {
          props: {
            role: 'user',
            allowed: [
              'manager',
              'developer',
            ],
            kicked: [
              'guest',
            ],
          },
        },
        expected: ['manager', 'developer'],
      },
      {
        params: {
          props: {
            role: null,
            allowed: [],
            kicked: [
              'guest',
            ],
          },
        },
        expected: [],
      },
    ]

    test.each(cases)('allowedRoles: $expected', ({ params, expected }) => {
      const context = FuroAccessControlLayoutContext.create({
        props: params.props,
        componentContext: componentContextMock,
      })

      const actual = context.allowedRoles

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#get:kickedRoles', () => {
    const cases = [
      {
        params: {
          props: {
            role: 'admin',
            allowed: [
              'admin',
              'user',
            ],
            kicked: [
              'guest',
            ],
          },
        },
        expected: ['guest'],
      },
      {
        params: {
          props: {
            role: 'user',
            allowed: [
              'admin',
              'user',
            ],
            kicked: [
              'guest',
              'anonymous',
            ],
          },
        },
        expected: ['guest', 'anonymous'],
      },
      {
        params: {
          props: {
            role: null,
            allowed: [
              'admin',
              'user',
            ],
            kicked: [],
          },
        },
        expected: [],
      },
    ]

    test.each(cases)('kickedRoles: $expected', ({ params, expected }) => {
      const context = FuroAccessControlLayoutContext.create({
        props: params.props,
        componentContext: componentContextMock,
      })

      const actual = context.kickedRoles

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#setupComponent()', () => {
    describe('to return own instance for method chaining', () => {
      const cases = [
        {
          params: {
            props: {
              role: 'admin',
              allowed: [
                'admin',
                'user',
              ],
              kicked: [
                'guest',
              ],
            },
          },
        },
        {
          params: {
            props: {
              role: null,
              allowed: [],
              kicked: [],
            },
          },
        },
      ]

      test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
        const context = FuroAccessControlLayoutContext.create({
          props: params.props,
          componentContext: componentContextMock,
        })

        const actual = context.setupComponent()

        expect(actual)
          .toBe(context) // same reference
      })
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#isKicked()', () => {
    describe('with allowed only', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('with kicked only', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'anonymous',
                allowed: [],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('with allowed and kicked', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'anonymous',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('without allowed and kicked', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isKicked()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#isAllowed()', () => {
    describe('with allowed only', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('with kicked only', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('with allowed and kicked', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'anonymous',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('without allowed and kicked', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.isAllowed()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('FuroAccessControlLayoutContext', () => {
  describe('#canShowContent()', () => {
    describe('with allowed only', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('with kicked only', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'anonymous',
                allowed: [],
                kicked: [
                  'guest',
                  'anonymous',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('with allowed and kicked', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'guest',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
          {
            params: {
              props: {
                role: 'developer',
                allowed: [
                  'admin',
                  'user',
                ],
                kicked: [
                  'guest',
                ],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role, allowed: $params.props.allowed, kicked: $params.props.kicked', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeFalsy()
        })
      })
    })

    describe('without allowed and kicked', () => {
      describe('to be truthy', () => {
        const cases = [
          {
            params: {
              props: {
                role: 'admin',
                allowed: [],
                kicked: [],
              },
            },
          },
          {
            params: {
              props: {
                role: 'user',
                allowed: [],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeTruthy()
        })
      })

      describe('to be falsy', () => {
        const cases = [
          {
            params: {
              props: {
                role: null,
                allowed: [],
                kicked: [],
              },
            },
          },
        ]

        test.each(cases)('role: $params.props.role', ({ params }) => {
          const context = FuroAccessControlLayoutContext.create({
            props: params.props,
            componentContext: componentContextMock,
          })

          const actual = context.canShowContent()

          expect(actual)
            .toBeFalsy()
        })
      })
    })
  })
})
