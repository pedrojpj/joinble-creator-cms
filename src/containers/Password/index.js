import { compose, withState, withStateHandlers, getContext, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';
import PropTypes from 'prop-types';

import { withMutation, withAnimation } from '../../hoc';
import Password from '../../components/Password';
import { animationAuth } from '../../utils';

export default compose(
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withStateHandlers(
    ({ translations }) => ({ advice: true, adviceMessage: translations.ADVICE_PASSWORD }),
    {
      hideAdvice: ({ advice }) => () => ({ advice: false }),
      showAdvice: ({ advice }) => () => ({ advice: true }),
      setAdvice: ({ adviceMessage }) => value => ({ adviceMessage: value })
    }
  ),
  getContext({ addNotification: PropTypes.func }),
  withAnimation(animationAuth, { transform: 'translateY(-10em)' }),
  withForm(
    {
      email: {
        value: '',
        required: true,
        type: 'email'
      }
    },
    ({
      router,
      errorMessage,
      setErrorMessage,
      resetForm,
      formSetError,
      hideAdvice,
      setAdvice,
      translations,
      addNotification
    }) => form => {
      withMutation(
        graphql`
          mutation PasswordMutation($email: String!) {
            forgetPassword(email: $email) {
              status
              errors {
                key
                value
              }
            }
          }
        `,
        { email: form.email }
      )
        .then(({ forgetPassword: data }) => {
          let newError = translations.ERROR_FORM + '<br />';
          if (data.errors) {
            data.errors.map(error => {
              newError += `- ${error.key}: ${error.value}`;
              formSetError(error.key);
              return error;
            });

            setErrorMessage(newError);
          }

          if (data.status) {
            addNotification({ message: translations.PASSWORD_OK, type: 'info' }, 3000);
            hideAdvice();
            resetForm();
          }
        })
        .catch(error => {
          router.push({ pathname: '/error', state: { error } });
        });
    }
  ),
  pure
)(Password);
