import { MenuEntry } from 'yogi-uikit_rc';

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: `${process.env.REACT_APP_EXCHANGE}`,
        external: true,
      },
      {
        label: 'Liquidity',
        href: `${process.env.REACT_APP_POOLS}`,
        external: true,
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Github',
    icon: 'GithubIcon',
    href: 'https://github.com/yogi-fi',
    external: true,
  },
  {
    label: 'Blog',
    icon: 'MediumIcon',
    href: 'https://medium.com/yogi-fi',
    external: true,
  },
  {
    label: 'Audit',
    icon: 'AuditIcon',
    external: true,
    href: 'https://docs.yogi.fi/core-concepts/security/audits',
  },
];

export default config;
