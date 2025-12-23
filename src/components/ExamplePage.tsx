import React from 'react';
import { useTranslation } from 'react-i18next';

const ExamplePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('login.title')}</h1>
      <form>
        <label>{t('common.customer_name')}</label>
        <input type="text" placeholder={t('common.customer_name')} />
        <label>{t('common.password')}</label>
        <input type="password" placeholder={t('common.password')} />
        <button type="submit">{t('common.submit')}</button>
      </form>
    </div>
  );
};

export default ExamplePage;
