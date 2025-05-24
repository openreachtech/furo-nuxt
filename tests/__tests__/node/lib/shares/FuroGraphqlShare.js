import {
  SubscriptionConnector,
} from '@openreachtech/furo'

import FuroGraphqlShare from '../../../../../lib/shares/FuroGraphqlShare.js'

describe('FuroGraphqlShare', () => {
  describe('constructor', () => {
    describe('to keep properties', () => {
      describe('#config', () => {
        /** @type {furo.Connector} */
        const websocketConnectorMock = /** @type {*} */ ({})

        const cases = [
          {
            params: {
              config: {
                ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
                WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
              },
            },
          },
          {
            params: {
              config: {
                ENDPOINT_URL: 'https://example.com/graphql-beta',
                WEBSOCKET_URL: 'wss://example.com/graphql-beta',
              },
            },
          },
        ]

        test.each(cases)('config: $params.config', ({ params }) => {
          const share = FuroGraphqlShare.create({
            config: params.config,
            websocketConnector: websocketConnectorMock,
          })

          expect(share)
            .toHaveProperty('config', params.config)
        })
      })

      describe('#websocketConnector', () => {
        /** @type {furo.WebSocketClient} */
        const websocketClientMock = /** @type {*} */ ({})

        const graphqlConfigMock = {
          ENDPOINT_URL: 'http://localhost:3900/graphql-user',
          WEBSOCKET_URL: 'ws://localhost:3900/graphql-user',
        }

        const cases = [
          {
            params: {
              websocketConnector: new SubscriptionConnector({
                websocketClient: websocketClientMock,
                eventTarget: new EventTarget(),
              }),
            },
          },
        ]

        test.each(cases)('websocketConnector: $params.websocketConnector', ({ params }) => {
          const share = FuroGraphqlShare.create({
            config: graphqlConfigMock,
            websocketConnector: params.websocketConnector,
          })

          expect(share)
            .toHaveProperty('websocketConnector', params.websocketConnector)
        })
      })
    })
  })
})

describe('FuroGraphqlShare', () => {
  describe('.create()', () => {
    /** @type {furo.WebSocketClient} */
    const websocketClientMock = /** @type {*} */ ({})

    describe('to be instance of own class', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
              WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
            },
            websocketConnector: new SubscriptionConnector({
              websocketClient: websocketClientMock,
              eventTarget: new EventTarget(),
            }),
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'https://example.com/graphql-beta',
              WEBSOCKET_URL: 'wss://example.com/graphql-beta',
            },
            websocketConnector: new SubscriptionConnector({
              websocketClient: websocketClientMock,
              eventTarget: new EventTarget(),
            }),
          },
        },
      ]

      test.each(cases)('config: $params.config', ({ params }) => {
        const actual = FuroGraphqlShare.create({
          config: params.config,
          websocketConnector: params.websocketConnector,
        })

        expect(actual)
          .toBeInstanceOf(FuroGraphqlShare)
      })
    })

    describe('to call constructor', () => {
      const cases = [
        {
          params: {
            config: {
              ENDPOINT_URL: 'http://localhost:3900/graphql-alpha',
              WEBSOCKET_URL: 'ws://localhost:3900/graphql-alpha',
            },
            websocketConnector: new SubscriptionConnector({
              websocketClient: websocketClientMock,
              eventTarget: new EventTarget(),
            }),
          },
        },
        {
          params: {
            config: {
              ENDPOINT_URL: 'https://example.com/graphql-beta',
              WEBSOCKET_URL: 'wss://example.com/graphql-beta',
            },
            websocketConnector: new SubscriptionConnector({
              websocketClient: websocketClientMock,
              eventTarget: new EventTarget(),
            }),
          },
        },
      ]

      test.each(cases)('config: $params.config', ({ params }) => {
        const SpyClass = globalThis.constructorSpy.spyOn(FuroGraphqlShare)

        const args = {
          config: params.config,
          websocketConnector: params.websocketConnector,
        }

        SpyClass.create(args)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})
