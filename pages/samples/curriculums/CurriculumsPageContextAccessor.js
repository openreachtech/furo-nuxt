import BaseFuroContextAccessor from '~/lib/contexts/BaseFuroContextAccessor.js'

/**
 * CurriculumsPageContextAccessor.
 *
 * @extends {BaseFuroContextAccessor<import('./CurriculumsPageContext.js').default>} - Base class.
 */
export default class CurriculumsPageContextAccessor extends BaseFuroContextAccessor {
  /**
   * get: capsuleRef.
   *
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.context
        .graphqlClient
        .capsuleRef
    )
  }

  /**
   * get: curriculums.
   *
   * @returns {import('../../../app/graphql/client/queries/curriculums/CurriculumsQueryGraphqlCapsule.js').CurriculumsQueryResponseContent['curriculums']['curriculums']} - Array of curriculum.
   */
  get curriculums () {
    return this.capsuleRef.value
      .curriculums
  }

  /**
   * get: isLoading.
   *
   * @returns {boolean} - Loading status.
   */
  get isLoading () {
    return this.context
      .statusReactive
      .isLoading
  }
}
