import { createFactory, Component } from 'react';

import { LocalStorage } from '../utils';

export const withTranslations = () => BaseComponent => {
  const factory = createFactory(BaseComponent);

  class WithTranslations extends Component {
    constructor(props) {
      super(props);

      this.availableLanguages = ['es', 'en'];

      this.state = {
        translationsLoad: false,
        translations: [],
        currentLanguage: this.currentLanguage()
      };

      import(`../translations/${this.state.currentLanguage}`).then(data => {
        this.setState(() => ({
          translationsLoad: true,
          translations: data.translations
        }));
      });
    }

    currentLanguage = () => {
      if (LocalStorage.get('LANGUAGE')) {
        return LocalStorage.get('LANGUAGE');
      } else {
        if (this.availableLanguages.includes(navigator.language)) {
          return navigator.language;
        } else {
          return this.availableLanguages[0];
        }
      }
    };

    changeLanguage = language => {
      import(`../translations/${language}`).then(data => {
        LocalStorage.set('LANGUAGE', language);

        this.setState(() => ({
          currentLanguage: language,
          translations: data.translations
        }));
      });
    };

    render() {
      return (
        this.state.translationsLoad &&
        factory({
          ...this.props,
          translations: this.state.translations,
          currentLanguage: this.state.currentLanguage,
          changeLanguage: this.changeLanguage
        })
      );
    }
  }

  return WithTranslations;
};
