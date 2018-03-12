import { compose, withState, withStateHandlers, lifecycle, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withQuery, withAnimation, withMutation } from '../../hoc';
import ChangePassword from '../../components/ChangePassword';
import { animationAuth } from '../../utils';

export default compose(
  withQuery(
    graphql`
      query ChangePasswordQuery($token: String!) {
        checkRecoverPasswordToken(token: $token) {
          status
        }
      }
    `,
    ({ routeParams }) => ({ token: routeParams.token })
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.checkRecoverPasswordToken.status) {
        this.props.router.push('/auth/login');
      }
    }
  }),
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withStateHandlers(
    ({ translations }) => ({
      advice: true,
      adviceMessage: translations.ADVICE_CHANGE_PASSWORD
    }),
    {
      hideAdvice: ({ advice }) => () => ({ advice: false }),
      showAdvice: ({ advice }) => () => ({ advice: true }),
      setAdvice: ({ adviceMessage }) => value => ({ adviceMessage: value })
    }
  ),
  withAnimation(animationAuth, { transform: 'translateY(-10em)' }),
  withForm(
    {
      newPassword: {
        value: '',
        required: true,
        pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'
      },
      repeatNewPassword: {
        value: '',
        required: true,
        pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'
      }
    },
    ({
      router,
      routeParams,
      errorMessage,
      setErrorMessage,
      resetForm,
      formSetError,
      showAdvice,
      setAdvice,
      translations
    }) => form => {
      if (form.newPassword !== form.repeatNewPassword) {
        setTimeout(() => {
          formSetError('repeatNewPassword');
          setErrorMessage(translations.TWO_PASSWORD_MUST_MATCH);
        }, 0);
      } else {
        withMutation(
          graphql`
            mutation ChangePasswordMutation($token: String!, $password: String!) {
              changePassword(token: $token, password: $password) {
                status
                errors {
                  key
                  value
                }
              }
            }
          `,
          { password: form.newPassword, token: routeParams.token }
        ).then(({ changePassword: data }) => {
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
            setAdvice(translations.CHANGE_PASSWORD_OK);
            showAdvice(true);
            resetForm();
          }
        });
      }
    }
  ),
  pure
)(ChangePassword);
