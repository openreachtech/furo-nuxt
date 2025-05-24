import {
  BaseGraphqlPayload,
} from '@openreachtech/furo'

import SignUpMutationGraphqlPayload from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlPayload'

describe('SignUpMutationGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = SignUpMutationGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('SignUpMutationGraphqlPayload', () => {
  describe('.get:document', () => {
    const expected = /* GraphQL */ `
      mutation SignUpMutation ($input: SignUpInput!) {
        signUp (input: $input) {
          sentTo
        }
      }
    `

    test('to be fixed string', () => {
      const actual = SignUpMutationGraphqlPayload.document

      expect(actual)
        .toBe(expected)
    })
  })
})
