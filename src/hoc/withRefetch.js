import { createRefetchContainer } from 'react-relay';

export const withRefetch = (renderVariables, query) => Component =>
  createRefetchContainer(Component, renderVariables, query);
