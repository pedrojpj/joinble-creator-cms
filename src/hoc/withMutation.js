import { commitMutation } from 'react-relay';

import environment from '../environment';

export const withMutation = (mutation, variables, optimisticResponse, optimisticUpdater, updater) =>
  new Promise((res, rej) => {
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (result, errors) => {
        if (errors) {
          return rej(errors);
        }

        res(result);
      },
      onError: rej,
      optimisticResponse,
      optimisticUpdater,
      updater
    });
  });
