import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('Squid NFT Game'),
    items: [
      {
        label:
          'NFT based survival game in the Solana metaverse. Follow the rules and survive all 6 rounds to claim the ultimate prize!',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Resources'),
    items: [
      {
        label: t('Home'),
        href: '/',
      },
      {
        label: t('Rules'),
        href: '/#rules',
      },
      {
        label: t('Roadmap'),
        href: '/#roadmap',
      },
      {
        label: t('Rarity Ranking'),
        href: '/rarityranking',
      },
      {
        label: t('FAQ'),
        href: '/#faq',
      },
      // {
      //   label: '—',
      // },
      // {
      //   label: t('Online Store'),
      //   href: 'https://pancakeswap.creator-spring.com/',
      //   isHighlighted: true,
      // },
    ],
  },
  // {
  //   label: t('Help'),
  //   items: [
  //     {
  //       label: t('Customer Support'),
  //       href: 'https://docs.pancakeswap.finance/contact-us/customer-support',
  //     },
  //     {
  //       label: t('Troubleshooting'),
  //       href: 'https://docs.pancakeswap.finance/help/troubleshooting',
  //     },
  //     {
  //       label: t('Guides'),
  //       href: 'https://docs.pancakeswap.finance/get-started',
  //     },
  //   ],
  // },
  // {
  //   label: t('Developers'),
  //   items: [
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/pancakeswap',
  //     },
  //     {
  //       label: t('Documentation'),
  //       href: 'https://docs.pancakeswap.finance',
  //     },
  //     {
  //       label: t('Bug Bounty'),
  //       href: 'https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty',
  //     },
  //     {
  //       label: t('Audits'),
  //       href: 'https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
  //     },
  //     {
  //       label: t('Careers'),
  //       href: 'https://docs.pancakeswap.finance/hiring/become-a-chef',
  //     },
  //   ],
  // },
]
