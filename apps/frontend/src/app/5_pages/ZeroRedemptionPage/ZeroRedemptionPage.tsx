import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { SupportedTokens } from '@sovryn/contracts';
import {
  AmountInput,
  Button,
  ButtonStyle,
  ButtonType,
  Heading,
  Paragraph,
  ParagraphSize,
  Select,
  SelectOption,
} from '@sovryn/ui';

import { AssetRenderer } from '../../2_molecules/AssetRenderer/AssetRenderer';
import { useAccount } from '../../../hooks/useAccount';
import { useWeiAmountInput } from '../../../hooks/useWeiAmountInput';
import { translations } from '../../../locales/i18n';
import { smartRouter } from '../ConvertPage/ConvertPage.types';
import { redeemableStableCoins, smartRoute } from './ZeroRdemptionPage.types';

const commonTranslations = translations.common;
const pageTranslations = translations.zeroRedemptionPage;

const ZeroRedemptionPage: FC = () => {
  const { account } = useAccount();
  const [searchParams, setSearchParams] = useSearchParams();
  const fromToken = searchParams.get('from');

  const [amount, setAmount] = useWeiAmountInput('');

  const [tokenOptions, setTokenOptions] = useState<
    SelectOption<SupportedTokens>[]
  >([]);

  const defaultSourceToken = useMemo(() => {
    if (fromToken) {
      const key = redeemableStableCoins.find(
        key => SupportedTokens[key] === fromToken,
      );

      if (key) {
        return SupportedTokens[key];
      }
    }
    return SupportedTokens.dllr;
  }, [fromToken]);

  const [sourceToken, setSourceToken] =
    useState<SupportedTokens>(defaultSourceToken);

  const maximunAmountToRedeem = '1000'; // TODO: remove this hardcoded value

  const isValidAmount = useMemo(
    () => Number(amount) <= Number(maximunAmountToRedeem),
    [amount, maximunAmountToRedeem],
  );

  const onSourceTokenChange = useCallback(
    (value: SupportedTokens) => {
      setSourceToken(value);
      setAmount('');
    },
    [setAmount],
  );

  const tokensToOptions = (
    addresses: string[],
    callback: (options: SelectOption<SupportedTokens>[]) => void,
  ) =>
    Promise.all(
      addresses.map(address => smartRouter.getTokenDetails(address)),
    ).then(tokens =>
      callback(
        tokens.map(token => ({
          value: token.symbol,
          label: (
            <AssetRenderer
              showAssetLogo
              asset={token.symbol}
              assetClassName="font-medium"
            />
          ),
        })),
      ),
    );

  const getAssetRenderer = useCallback(
    (token: SupportedTokens) => (
      <AssetRenderer showAssetLogo asset={token} assetClassName="font-medium" />
    ),
    [],
  );
  useEffect(() => {
    smartRoute
      .getEntries()
      .then(tokens => tokensToOptions(tokens, setTokenOptions));
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams();

    if (sourceToken) {
      urlParams.set('from', sourceToken);
    } else {
      urlParams.delete('from');
    }

    setSearchParams(new URLSearchParams(urlParams));
  }, [sourceToken, setSearchParams]);

  return (
    <>
      <Helmet>
        <title>{t(pageTranslations.meta.title)}</title>
      </Helmet>
      <div className="w-full flex flex-col items-center text-gray-10 mt-9 sm:mt-24">
        <Heading className="text-base sm:text-2xl font-medium">
          {t(pageTranslations.title)}
        </Heading>
        <Paragraph
          size={ParagraphSize.base}
          className="mt-2.5 sm:mt-4 sm:text-base font-medium"
        >
          {t(translations.zeroRedemptionPage.subtitle)}
        </Paragraph>

        <div className="mt-12 w-full p-0 sm:border sm:border-gray-50. sm:rounded sm:w-[28rem] sm:p-6 sm:big-gray-90">
          <div className="bg-gray-80 rounded p-6">
            <div className="w-full flex flex-row justify-between items-center">
              <Paragraph size={ParagraphSize.base} className="">
                {t(pageTranslations.form.redeemFrom)}
              </Paragraph>
            </div>

            <div className="w-full flex flex-row justify-between items-center gap-3 mt-3.5">
              <AmountInput
                value={amount}
                onChangeText={setAmount}
                label={t(commonTranslations.amount)}
                min={0}
                invalid={!isValidAmount}
                disabled={!account}
                className="w-full flex-grow-0 flex-shrink"
                dataAttribute="redeem-from-amount"
                placeholder="0"
              />
              <Select
                value={sourceToken}
                onChange={onSourceTokenChange}
                options={tokenOptions}
                labelRenderer={() => getAssetRenderer(sourceToken)}
                className="min-w-[6.7rem]"
                menuClassName="max-h-[10rem] sm:max-h-[20rem]"
                dataAttribute="redeem-from-asset"
              />
            </div>
          </div>

          <Button
            type={ButtonType.reset}
            style={ButtonStyle.primary}
            text={t(commonTranslations.buttons.confirm)}
            className="w-full mt-8"
            // disabled={isSubmitButtonDisabled}
            // onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ZeroRedemptionPage;
