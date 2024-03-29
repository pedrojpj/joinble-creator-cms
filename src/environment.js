import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { LocalStorage, CustomError } from './utils';

function fetchQuery(operation, variables) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  };

  if (localStorage.getItem('AUTH_TOKEN')) {
    options.headers.Authorization = 'JWT ' + LocalStorage.get('AUTH_TOKEN');
  }

  if (localStorage.getItem('LANGUAGE')) {
    options.headers['Accept-Language'] = LocalStorage.get('LANGUAGE');
  }

  return fetch('http://localhost:8000/graphql', options)
    .then(response => {
      return response.json();
    })
    .catch(response => {
      const error = new CustomError(response);
      error.code = 503;
      throw error;
    });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
