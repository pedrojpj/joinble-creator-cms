/**
 * @flow
 * @relayHash 20e8aad41191482f0823968cbf999099
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LoginQueryVariables = {| |};
export type LoginQueryResponse = {|
  +translations: ?$ReadOnlyArray<?string>,
|};
*/


/*
query LoginQuery {
  translations
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "translations",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "LoginQuery",
  "id": null,
  "text": "query LoginQuery {\n  translations\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LoginQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "LoginQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node/*: any*/).hash = '6691e2ed7fd59468425da14800042fbd';
module.exports = node;
