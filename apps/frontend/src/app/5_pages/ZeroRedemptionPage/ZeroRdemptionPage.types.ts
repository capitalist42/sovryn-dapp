import { SupportedTokens } from '@sovryn/contracts';
import { getProvider } from '@sovryn/ethers-provider';
import { SmartRouter, smartRoutes } from '@sovryn/sdk';

const provider = getProvider();

export const redeemableStableCoins = [
  SupportedTokens.zusd,
  SupportedTokens.dllr,
];

export const smartRoute = new SmartRouter(provider, [
  smartRoutes.zeroRedemptionSwapRoute,
]);
