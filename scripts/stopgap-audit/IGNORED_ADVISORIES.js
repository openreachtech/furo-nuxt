/**
 * Advisories `npm run audit:npm` lets through until the lockfile no longer reports them.
 *
 * @type {Array<NpmAuditType.IgnoredAdvisory>}
 */
const IGNORED_ADVISORIES = [
  {
    id: 'GHSA-gcqx-w48m-w2h4',
    package: 'deepmerge',
    path: '@openreachtech/eslint-config > @openreachtech/eslint-rules-default-jest > eslint-plugin-jest > jest > @jest/core > jest-config > deepmerge | @openreachtech/eslint-config > @openreachtech/eslint-rules-default-jest > eslint-plugin-jest > jest > jest-cli > @jest/core > jest-config > deepmerge | @openreachtech/eslint-config > @openreachtech/eslint-rules-default-jest > eslint-plugin-jest > jest > jest-cli > create-jest > jest-config > deepmerge | @openreachtech/eslint-config > @openreachtech/eslint-rules-default-jest > eslint-plugin-jest > jest > jest-cli > jest-config > deepmerge | @vue/vue3-jest > jest > @jest/core > jest-config > deepmerge | @vue/vue3-jest > jest > jest-cli > @jest/core > jest-config > deepmerge | @vue/vue3-jest > jest > jest-cli > create-jest > jest-config > deepmerge | @vue/vue3-jest > jest > jest-cli > jest-config > deepmerge | jest > @jest/core > jest-config > deepmerge | jest > jest-cli > @jest/core > jest-config > deepmerge | jest > jest-cli > create-jest > jest-config > deepmerge | jest > jest-cli > jest-config > deepmerge | nuxt > @nuxt/nitro-server > nitropack > @rollup/plugin-node-resolve > deepmerge',
    reason: 'No patched release: the advisory covers deepmerge >=4.2.0 <=4.3.1, and 4.3.1 is the latest. The flaw is prototype poisoning through mergeObject() when a source object carries malicious keys. deepmerge is reached by jest-config and by the Rollup node-resolve plugin of nitropack alone, tools that run over this repository\'s own configuration on a developer machine or in CI, so it is not shipped and nothing it merges comes from outside.',
    removeWhen: 'npm audit on this lockfile no longer reports GHSA-gcqx-w48m-w2h4, after a dependency update brings deepmerge outside <=4.3.1 or drops it from both parents',
  },
  {
    id: 'GHSA-3g3m-2fjr-6pw4',
    package: 'glob',
    path: '@vue/test-utils > js-beautify > glob | nuxt > @nuxt/nitro-server > nitropack > @vercel/nft > glob',
    reason: 'Patched in glob 14.0.2, but both paths lock glob 13.0.7. @vercel/nft 1.11.1 pins glob ^13.0.0; @vercel/nft 1.11.2 (published 2026-11-13, glob ^14.0.6) clears that path once it passes the 7 day min-release-age. js-beautify 2.0.3, the latest, pins glob ^13.0.6, so the test-utils path stays until js-beautify moves to glob 14. Both paths sit in the peer and test toolchain installed for this repository, not in the dependencies of the package.',
    removeWhen: 'npm audit on this lockfile no longer reports GHSA-3g3m-2fjr-6pw4, which needs both @vercel/nft and js-beautify on glob >=14.0.2',
  },
  {
    id: 'GHSA-g3hv-75wg-m249',
    package: 'minimatch',
    path: '@openreachtech/eslint-config > @openreachtech/eslint-rules-default > @stylistic/eslint-plugin > @stylistic/eslint-plugin-ts > @typescript-eslint/utils > @typescript-eslint/typescript-estree > minimatch | @openreachtech/eslint-config > @openreachtech/eslint-rules-default-jest > eslint-plugin-jest > @typescript-eslint/utils > @typescript-eslint/typescript-estree > minimatch | @vue/test-utils > js-beautify > editorconfig > minimatch | @vue/test-utils > js-beautify > glob > minimatch | nuxt > @nuxt/nitro-server > nitropack > @vercel/nft > glob > minimatch | nuxt > @nuxt/nitro-server > nitropack > archiver > readdir-glob > minimatch',
    reason: 'Patched in minimatch 11.0.1, but the lockfile holds minimatch 10.2.6 for four parents: glob 13 (see the entry above), readdir-glob 3.0.0 under the archiver of nitropack (readdir-glob 4.0.0 depends on minimatch ^11.0.1), the editorconfig of js-beautify, and typescript-estree 8.72.1 in the lint toolchain (minimatch ^10.2.2). The nitropack paths reach a consumer only through its own nuxt install, never through the dependencies of this package.',
    removeWhen: 'npm audit on this lockfile no longer reports GHSA-g3hv-75wg-m249, which needs every parent above on minimatch >=11.0.1',
  },
]

export default IGNORED_ADVISORIES
