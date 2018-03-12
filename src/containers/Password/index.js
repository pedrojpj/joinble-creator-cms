import { compose, withState, withStateHandlers, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withMutation, withAnimation } from '../../hoc';
import Password from '../../components/Password';
import { animationAuth } from '../../utils';

const errorText = 'There are errors in the form';

export default compose(
  withState('errorMessage', 'setErrorMessage', errorText),
  withStateHandlers(
    { advice: true, adviceMessage: 'Enter your Email and instructions will be sent to you!' },
    {
      hideAdvice: ({ advice }) => () => ({ advice: false }),
      showAdvice: ({ advice }) => () => ({ advice: true }),
      setAdvice: ({ adviceMessage }) => value => ({ adviceMessage: value })
    }
  ),
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
      showAdvice,
      setAdvice
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
      ).then(({ forgetPassword: data }) => {
        let newError = errorText + '<br />';
        if (data.errors) {
          data.errors.map(error => {
            newError += `- ${error.key}: ${error.value}`;
            formSetError(error.key);
            return error;
          });

          setErrorMessage(newError);
        }

        if (data.status) {
          setAdvice('We have sent you an email with instructions to reset your password');
          showAdvice(true);
          resetForm();
        }
      });
    }
  ),
  pure
)(Password);
