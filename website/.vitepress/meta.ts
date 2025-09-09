// noinspection ES6PreferShortImport: IntelliJ IDE hint to avoid warning to use `~/contributors`, will fail on build if changed

/* Texts */
export const projectName = 'Sem Bozhyk'
export const projectShortName = 'Sem Bozhyk'
export const projectDescription
  = 'Software developer'

/* CDN fonts and styles */
export const googleapis = 'https://fonts.googleapis.com'
export const gstatic = 'https://fonts.gstatic.com'
export const font = `${googleapis}/css2?family=Inter:wght@100..900&display=swap`

/* vitepress head */
export const ogUrl = 'https://github.com/sbozhook/caster/'
export const ogImage = `${ogUrl}og.jpg`

/* Legacy Radix Vue */
export const legacyVersion = 'Radix Vue v1.9.x'
export const legacyLink = 'https://radix-vue.com/'

/* GitHub and social links */
export const github = 'https://github.com/sbozhook/caster'
export const releases = 'https://github.com/sbozhook/caster/releases'
export const contributing = 'https://github.com/sbozhook/caster/blob/main/CONTRIBUTING.md'
export const discord = 'https://github.com/sbozhook/caster'
// export const mastodon = "https://elk.zone/m.webtoo.ls/@vitest";
// export const twitter = "https://twitter.com/vitest_dev";

/* Avatar/Image/Sponsors servers */
export const sponsor = 'https://github.com/sponsors/zernonia'
export const preconnectLinks = [googleapis, gstatic]
export const preconnectHomeLinks = [googleapis, gstatic]

/* PWA runtime caching urlPattern regular expressions */
export const pwaFontsRegex = new RegExp(`^${googleapis}/.*`, 'i')
export const pwaFontStylesRegex = new RegExp(`^${gstatic}/.*`, 'i')
// eslint-disable-next-line prefer-regex-literals
export const githubusercontentRegex = new RegExp(
  '^https://((i.ibb.co)|((raw|user-images).githubusercontent.com))/.*',
  'i',
)
