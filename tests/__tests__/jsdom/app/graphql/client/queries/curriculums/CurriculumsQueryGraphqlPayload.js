import {
  BaseGraphqlPayload,
} from '@openreachtech/furo'

import CurriculumsQueryGraphqlPayload from '~/app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlPayload'

describe('CurriculumsQueryGraphqlPayload', () => {
  describe('super class', () => {
    test('to be derived class of BaseGraphqlPayload', () => {
      const actual = CurriculumsQueryGraphqlPayload.prototype

      expect(actual)
        .toBeInstanceOf(BaseGraphqlPayload)
    })
  })
})

describe('CurriculumsQueryGraphqlPayload', () => {
  describe('.get:document', () => {
    const expected = /* GraphQL */ `
      query CurriculumsQuery ($input: CurriculumsSearchInput!) {
        curriculums (input: $input) {
          curriculums {
            id
            title
            description
            thumbnailUrl
            postedAt
          }
          pagination {
            limit
            offset
            sort {
              targetColumn
              orderBy
            }
            totalRecords
          }
        }
      }
    `

    test('to be fixed string', () => {
      const actual = CurriculumsQueryGraphqlPayload.document

      expect(actual)
        .toBe(expected)
    })
  })
})
