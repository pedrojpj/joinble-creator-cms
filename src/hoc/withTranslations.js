import { createFactory, Component } from 'react';
import { LocalStorage } from '../utils';

const withTranslations = () => BaseComponent => {
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

      this.getIconCurrentLanguage();

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
          LocalStorage.set('LANGUAGE', navigator.language);
          return navigator.language;
        } else {
          LocalStorage.set('LANGUAGE', this.availableLanguages[0]);
          return this.availableLanguages[0];
        }
      }
    };

    getIconCurrentLanguage = () => {
      const icon = this.currentLanguage() === 'en' ? 'gb' : this.currentLanguage();

      return import('svg-country-flags/svg/' + icon + '.svg').then(icon => {
        this.setState({
          iconCurrentLanguage: icon
        });
      });
    };

    changeLanguage = language => {
      import(`../translations/${language}`).then(data => {
        LocalStorage.set('LANGUAGE', language);

        this.getIconCurrentLanguage();

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
          iconCurrentLanguage: this.state.iconCurrentLanguage,
          changeLanguage: this.changeLanguage
        })
      );
    }
  }

  return WithTranslations;
};

export default withTranslations;
