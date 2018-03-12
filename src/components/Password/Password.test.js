import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Password from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Password Component', () => {
  it('render without crashing', () => {
    shallow(<Password />);
  });
});
