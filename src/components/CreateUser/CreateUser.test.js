import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateUser from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Create User Component', () => {
  it('render without crashing', () => {
    shallow(<CreateUser />);
  });
});
