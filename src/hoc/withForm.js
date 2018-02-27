import { createFactory, Component } from 'react';

export const withForm = (input, handlers) => BaseComponent => {
  const factory = createFactory(BaseComponent);

  class WithForm extends Component {
    constructor(props) {
      super(props);

      const form = {};
      Object.keys(input).forEach((key, name) => {
        form[key] = input[key].value;
      });

      this.handlers = typeof handlers === 'function' ? handlers(props) : handlers;

      this.state = {
        form,
        formError: false
      };
    }

    updateForm = event => {
      let name = event.target.name;
      let value = event.target.value;

      if (!name) {
        console.warn('The name attribute is required to be able to update the value');
      }

      this.setState(prevState => ({ form: { ...prevState.form, [name]: value } }));
    };

    submitForm = event => {
      let error = false;

      Object.keys(input).forEach((key, name) => {
        if (input[key].required) {
          if (!this.state.form[key]) {
            error = true;
          }
        }
      });

      if (!error) {
        this.handlers(this.state.form);
        this.setState(prevState => ({
          formError: false
        }));
      } else {
        this.setState(prevState => ({
          formError: true
        }));
      }

      event.preventDefault();
    };

    render() {
      const { form, formError } = this.state;

      return factory({
        ...this.props,
        form,
        formError,
        updateForm: this.updateForm,
        submitForm: this.submitForm
      });
    }
  }
  return WithForm;
};
