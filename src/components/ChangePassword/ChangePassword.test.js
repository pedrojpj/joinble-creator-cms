import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChangePassword from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('ChangePassword Component', () => {
  it('render without crashing', () => {
    shallow(<ChangePassword />);
  });
});
