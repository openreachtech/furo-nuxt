/**
 * Advisories `npm run audit:npm` lets through, as a stopgap until a release fixes them.
 *
 * Each entry carries its reason and the condition for removing it,
 * and an entry whose advisory is no longer reported fails the audit,
 * so this list cannot outlive the reasons it was written for.
 *
 * @type {Array<NpmAuditType.IgnoredAdvisory>}
 */
const IGNORED_ADVISORIES = [
  {
    id: 'GHSA-gcqx-w48m-w2h4',
    package: 'deepmerge',
    path: 'jest > @jest/core > jest-config > deepmerge | nuxt > @nuxt/nitro-server > nitropack > @rollup/plugin-node-resolve > deepmerge',
    reason: 'No patched release: the advisory covers deepmerge >=4.2.0 <=4.3.1, and 4.3.1 is the latest. The flaw is prototype poisoning through mergeObject() when a source object carries malicious keys. deepmerge is reached by jest-config and by the Rollup node-resolve plugin of nitropack alone, tools that run over this repository\'s own configuration on a developer machine or in CI, so it is not shipped and nothing it merges comes from outside.',
    removeWhen: 'deepmerge publishes a release outside <=4.3.1, or jest-config and @rollup/plugin-node-resolve stop depending on deepmerge',
  },
  {
    id: 'GHSA-3g3m-2fjr-6pw4',
    package: 'glob',
    path: 'nuxt > @nuxt/nitro-server > nitropack > @vercel/nft > glob',
    reason: 'Patched in glob 14.0.2, but @vercel/nft 1.11.1 pins glob ^13.0.0. The fix needs @vercel/nft 1.11.2 (published 2026-11-13, glob ^14.0.6) and glob 14.0.6 (published 2026-11-12), and both are younger than the 7 day min-release-age, so a lockfile refresh cannot install them yet. The range ^1.11.0 that nitropack declares for @vercel/nft already admits 1.11.2.',
    removeWhen: 'npm update @vercel/nft glob resolves @vercel/nft 1.11.2 and glob 14.0.6 under min-release-age (from 2026-11-20), or the Module Development Lead installs them earlier with --min-release-age-exclude',
  },
  {
    id: 'GHSA-g3hv-75wg-m249',
    package: 'minimatch',
    path: 'nuxt > @nuxt/nitro-server > nitropack > @vercel/nft > glob > minimatch | @openreachtech/eslint-config > @openreachtech/eslint-rules-default > @stylistic/eslint-plugin > @stylistic/eslint-plugin-ts > @typescript-eslint/utils > @typescript-eslint/typescript-estree > minimatch',
    reason: 'Patched in minimatch 11.0.1. The nitropack path is cleared by the glob 14.0.6 update of the entry above, which brings minimatch ^11.0.5. The other path is typescript-estree 8.72.1, which pins minimatch ^10.2.2 inside the lint toolchain of this repository, so it never reaches a consumer.',
    removeWhen: 'the glob 14.0.6 update lands and @typescript-eslint/typescript-estree releases a version that depends on minimatch >=11.0.1',
  },
]

export default IGNORED_ADVISORIES
