import BaseFuroContextAccessor from '~/lib/contexts/BaseFuroContextAccessor.js'

/**
 * CompanySponsorsPageContextAccessor.
 *
 * @extends {BaseFuroContextAccessor<import('./CompanySponsorsPageContext.js').default>} - Base class.
 */
export default class CompanySponsorsPageContextAccessor extends BaseFuroContextAccessor {
  /**
   * get: capsuleRef.
   *
   * @returns {import('vue').Ref<import('../../../app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule.js').default>} - Capsule reference.
   */
  get capsuleRef () {
    return /** @type {*} */ (
      this.context
        .graphqlClient
        .capsuleRef
    )
  }

  /**
   * get: companySponsors.
   *
   * @returns {import('../../../app/graphql/client/queries/companySponsors/CompanySponsorsQueryGraphqlCapsule.js').CompanySponsorsQueryResponseContent['companySponsors']['companySponsors']} - Company sponsors.
   */
  get companySponsors () {
    return this.capsuleRef.value
      .companySponsors
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
