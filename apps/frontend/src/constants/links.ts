import { Environments } from '../types/global';

export const SOCIAL_LINKS = {
  DISCORD: 'https://discord.gg/kBTNx4zjRf',
  TELEGRAM: 'https://t.me/SovrynBitcoin',
  TWITTER: ' https://twitter.com/SovrynBTC',
};

export const GITHUB_LINKS = {
  ORGANIZATION: 'https://github.com/DistributedCollective',
  DAPP: 'https://github.com/DistributedCollective/sovryn-dapp',
};

export const WEBSITE_LINKS = {
  ROOT: 'https://sovryn.com',
  BLOG: 'https://sovryn.com/all-things-sovryn',
};

export const ALPHA_LINKS = {
  [Environments.Mainnet]: 'https://alpha.sovryn.app/',
  [Environments.Testnet]: 'https://alpha-test.sovryn.app',
  STAGING: 'https://alpha-staging.sovryn.app',
};

export const STAGING_LINK = 'https://staging.sovryn.com';

export const WIKI_LINKS = {
  ROOT: 'https://wiki.sovryn.com',
  STABILITY_POOL:
    'https://wiki.sovryn.com/sovryn-dapp/using-zero#earn-in-the-stability-pool',
  AMM_POOL: 'https://wiki.sovryn.com/sovryn-dapp/market-making',
  LEND: 'https://wiki.sovryn.com/sovryn-dapp/lending',
  TRADE: 'https://wiki.sovryn.com/sovryn-dapp/trading',
  BRIDGE:
    'https://babelfish.gitbook.io/the-babelfish-gitbook/tutorials-and-guides/bridges',
  NOTIFICATIONS:
    'https://wiki.sovryn.com/sovryn-dapp/using-zero#set-notifications',
  SECURITY: 'https://wiki.sovryn.com/technical-documents#security',
  FEES: 'https://wiki.sovryn.com/sovryn-dapp/fees#zero-borrowing',
};

export const HELPDESK_LINK = 'https://help.sovryn.app/';