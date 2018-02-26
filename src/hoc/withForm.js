import { createFactory, Component } from 'react';

export const withForm = input => BaseComponent => {
  const factory = createFactory(BaseComponent);

  class WithForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        form: input
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

    render() {
      const form = this.state.form;

      return factory({
        ...this.props,
        form,
        updateForm: this.updateForm
      });
    }
  }
  return WithForm;
};
