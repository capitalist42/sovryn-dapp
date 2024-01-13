import React, { FC } from 'react';

import { t } from 'i18next';
import { Helmet } from 'react-helmet-async';

import { translations } from '../../../locales/i18n';

type ZeroRedemptionPageProps = {};

const ZeroRedemptionPage: FC<ZeroRedemptionPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>{t(translations.zeroRedemptionPage.meta.title)}</title>
      </Helmet>
      <div className="container"></div>
    </>
  );
};

export default ZeroRedemptionPage;
