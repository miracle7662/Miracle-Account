import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name: 'मराठी' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-switcher dropdown">
      <button
        className="btn btn-sm btn-outline-primary dropdown-toggle"
        type="button"
        onClick={toggleOptions}
        aria-haspopup="true"
        aria-expanded={showOptions}
      >
        {currentLanguage.name}
      </button>
      <div className={`dropdown-menu ${showOptions ? 'show' : ''}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            className="dropdown-item"
            type="button"
            onClick={() => changeLanguage(language.code)}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
