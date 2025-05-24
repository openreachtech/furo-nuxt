import {
  SubscriptionConnector,
} from '@openreachtech/furo'

import FuroShare from '../../../../../lib/shares/FuroShare.js'
import FuroGraphqlShare from '../../../../../lib/shares/FuroGraphqlShare.js'

describe('FuroShare', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#graphqlShare', () => {
        /** @type {furo.Connector} */
        const websocketConnectorMock = /** @type {*} */ ({})

        const cases = [
          {
            params: {
              graphqlShare: new FuroGraphqlShare({
                config: {
                  ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
                  WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
                },
                websocketConnector: websocketConnectorMock,
              }),
            },
          },
          {
            params: {
              graphqlShare: new FuroGraphqlShare({
                config: {
                  ENDPOINT_URL: 'https://example.com/graphql-beta',
                  WEBSOCKET_URL: 'wss://example.com/graphql-beta',
                },
                websocketConnector: websocketConnectorMock,
              }),
            },
          },
        ]

        test.each(cases)('graphqlConfig: $params.graphqlShare.config', ({ params }) => {
          const share = FuroShare.create({
            graphqlShare: params.graphqlShare,
          })

          expect(share)
            .toHaveProperty('graphqlShare', params.graphqlShare)
        })
      })
    })
  })
})

describe('FuroShare', () => {
  describe('.create()', () => {
    /** @type {furo.Connector} */
    const websocketConnectorMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          graphqlShare: new FuroGraphqlShare({
            config: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
              WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
            },
            websocketConnector: websocketConnectorMock,
          }),
        },
      },
      {
        params: {
          graphqlShare: new FuroGraphqlShare({
            config: {
              ENDPOINT_URL: 'https://example.com/graphql-beta',
              WEBSOCKET_URL: 'wss://example.com/graphql-beta',
            },
            websocketConnector: websocketConnectorMock,
          }),
        },
      },
    ]

    describe('to be instance of own class', () => {
      test.each(cases)('graphqlConfig: $params.graphqlShare.config', ({ params }) => {
        const actual = FuroShare.create({
          graphqlShare: params.graphqlShare,
        })

        expect(actual)
          .toBeInstanceOf(FuroShare)
      })
    })

    describe('to call constructor', () => {
      test.each(cases)('graphqlConfig: $params.graphqlShare.config', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroShare)

        const args = {
          graphqlShare: params.graphqlShare,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('FuroShare', () => {
  describe('#get:graphqlConfig', () => {
    /** @type {furo.Connector} */
    const websocketConnectorMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          graphqlShare: new FuroGraphqlShare({
            config: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
              WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
            },
            websocketConnector: websocketConnectorMock,
          }),
        },
        expected: {
          ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
          WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
        },
      },
      {
        params: {
          graphqlShare: new FuroGraphqlShare({
            config: {
              ENDPOINT_URL: 'https://example.com/graphql-beta',
              WEBSOCKET_URL: 'wss://example.com/graphql-beta',
            },
            websocketConnector: websocketConnectorMock,
          }),
        },
        expected: {
          ENDPOINT_URL: 'https://example.com/graphql-beta',
          WEBSOCKET_URL: 'wss://example.com/graphql-beta',
        },
      },
    ]

    test.each(cases)('graphqlConfig: $params.graphqlShare.config', ({ params, expected }) => {
      const share = FuroShare.create({
        graphqlShare: params.graphqlShare,
      })

      const actual = share.graphqlConfig

      expect(actual)
        .toEqual(expected)
    })
  })
})

describe('FuroShare', () => {
  describe('#get:websocketConnector', () => {
    /** @type {furo.WebSocketClient} */
    const websocketClientMock = /** @type {*} */ ({})

    const cases = [
      {
        params: {
          graphqlShare: new FuroGraphqlShare({
            config: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-user',
              WEBSOCKET_URL: 'ws://localhost:3900/graphql-user',
            },
            websocketConnector: new SubscriptionConnector({
              websocketClient: websocketClientMock,
              eventTarget: new EventTarget(),
            }),
          }),
        },
      },
      {
        params: {
          graphqlShare: new FuroGraphqlShare({
            config: {
              ENDPOINT_URL: 'https://example.com/graphql-beta',
              WEBSOCKET_URL: 'wss://example.com/graphql-beta',
            },
            websocketConnector: new SubscriptionConnector({
              websocketClient: websocketClientMock,
              eventTarget: new EventTarget(),
            }),
          }),
        },
      },
    ]

    test.each(cases)('GraphQL config: $params.graphqlShare.config', ({ params }) => {
      const share = FuroShare.create({
        graphqlShare: params.graphqlShare,
      })

      const actual = share.websocketConnector

      expect(actual)
        .toBe(params.graphqlShare.websocketConnector) // same reference
    })
  })
})
