import SignUpMutationGraphqlLauncher from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlLauncher'
import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SignUpMutationGraphqlPayload from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlPayload'
import SignUpMutationGraphqlCapsule from '~/app/graphql/client/mutations/signUp/SignUpMutationGraphqlCapsule'

describe('SignUpMutationGraphqlLauncher', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlCapsule', () => {
      const actual = SignUpMutationGraphqlLauncher.prototype

      expect(actual)
        .toBeInstanceOf(BaseAppGraphqlLauncher)
    })
  })
})

describe('SignUpMutationGraphqlLauncher', () => {
  describe('.get:Payload', () => {
    test('to be SignUpMutationGraphqlPayload', () => {
      const actual = SignUpMutationGraphqlLauncher.Payload

      expect(actual)
        .toBe(SignUpMutationGraphqlPayload) // same reference
    })
  })
})

describe('SignUpMutationGraphqlLauncher', () => {
  describe('.get:Capsule', () => {
    test('to be SignUpMutationGraphqlCapsule', () => {
      const actual = SignUpMutationGraphqlLauncher.Capsule

      expect(actual)
        .toBe(SignUpMutationGraphqlCapsule) // same reference
    })
  })
})
