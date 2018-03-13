import { createFactory, Component } from 'react';

import { LocalStorage } from '../utils';

export const withTranslations = () => BaseComponent => {
  const factory = createFactory(BaseComponent);

  class WithTranslations extends Component {
    constructor(props) {
      super(props);

      this.state = {
        translationsLoad: false,
        translations: [],
        currentLanguage:
          LocalStorage.get('LANGUAGE') || navigator.language || navigator.userLanguage
      };

      import(`../translations/${this.state.currentLanguage}`).then(data => {
        this.setState(() => ({
          translationsLoad: true,
          translations: data.translations
        }));
      });
    }

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
