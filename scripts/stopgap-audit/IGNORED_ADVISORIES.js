/**
 * Advisories `npm run audit:npm` lets through, as a stopgap until a release fixes them.
 *
 * Each entry carries its reason and the condition for removing it.
 * The reason names the code of the dependency that was read to confirm the path is not reached.
 * An entry whose advisory is no longer reported fails the audit,
 * so this list cannot outlive the reasons it was written for.
 *
 * @type {Array<NpmAuditType.IgnoredAdvisory>}
 * @example
 * const IGNORED_ADVISORIES = [
 *   {
 *     id: 'GHSA-xxxx-xxxx-xxxx',
 *     package: 'example-package',
 *     path: 'example-parent > example-package',
 *     reason: 'No patched release exists, and the vulnerable code path is not reached from this repository.',
 *     removeWhen: 'example-package publishes a release outside the affected range, or the advisory is withdrawn',
 *   },
 * ]
 */
const IGNORED_ADVISORIES = [
  {
    id: 'GHSA-fc5q-39xc-vjpf',
    package: 'picomatch',
    path: '@openreachtech/eslint-config > @openreachtech/eslint-rules-default > @stylistic/eslint-plugin > picomatch | babel-jest > @jest/transform > micromatch > picomatch | jest-environment-jsdom > jest-util > picomatch | nuxt > picomatch',
    reason: 'No patched release: the advisory covers picomatch <=4.0.7, and 4.0.7 is the latest. The flaw is ReDoS when a glob pattern with repeated extglobs is compiled. picomatch is not in the dependencies of this package, so it is not shipped. Its four direct parents hand it patterns from configuration alone: shouldInstrument.js of @jest/transform passes forceCoverageMatch, globsToMatcher.js of jest-util is called with the globs of the Jest config by SearchSource and HasteFS, jsx-pascal-case.js of @stylistic/eslint-plugin passes the ignore option of its rule, and dist/index.mjs of nuxt passes the pages pattern and the pattern of a components directory. They run over this repository\'s own configuration on a developer machine or in CI, and no pattern comes from outside. The other consumers of the same copy sit under the build tooling of nuxt, which this review did not read.',
    removeWhen: 'npm audit on this lockfile no longer reports GHSA-fc5q-39xc-vjpf, after a picomatch release outside <=4.0.7 brings every copy outside it. Look at it again by 2026-12-18, and by then re-read the call sites above and the build tooling of nuxt',
  },
]

export default IGNORED_ADVISORIES
