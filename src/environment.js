import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { LocalStorage } from './utils';

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

  return fetch('http://localhost:8000/graphql', options)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

export default environment;
