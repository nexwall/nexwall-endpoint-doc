import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const baseUrl = process.env.BASE_URL || '/nexwall-endpoint-doc/'

const config: Config = {
  title: 'Nexwall Endpoint Documentation',
  tagline: 'Design and technology of Nexwall Endpoint',
  favicon: 'img/favicon.svg',
  url: 'https://nexwall.github.io',
  baseUrl,
  organizationName: 'nexwall',
  projectName: 'nexwall-endpoint-doc',
  onBrokenLinks: 'throw',
  markdown: { mermaid: true, hooks: { onBrokenMarkdownLinks: 'throw' } },
  themes: ['@docusaurus/theme-mermaid'],
  future: { v4: true, faster: true },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: { routeBasePath: 'docs', sidebarPath: './sidebars.ts' },
        blog: false,
        theme: { customCss: './src/css/custom.css' }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
    navbar: {
      title: 'NEXWALL',
      items: [
        { type: 'docSidebar', sidebarId: 'design', position: 'left', label: 'Endpoint design' },
        { href: 'https://github.com/nexwall/nexwall-endpoint-releasenotes', label: 'Release notes', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Endpoint design',
          items: [
            { label: 'Overview', to: '/docs/design/overview' },
            { label: 'Architecture', to: '/docs/design/architecture' },
            { label: 'Components', to: '/docs/design/components' },
            { label: 'Status', to: '/docs/design/status' }
          ]
        },
        {
          title: 'Nexwall',
          items: [{ label: 'Website', href: 'https://nexwall.com.br' }]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nexwall. Documentation licensed under CC BY-NC 4.0.`
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula, additionalLanguages: ['bash', 'json'] }
  } satisfies Preset.ThemeConfig
}

export default config
