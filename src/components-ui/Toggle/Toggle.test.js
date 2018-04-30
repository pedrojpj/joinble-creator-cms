import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toggle from './Toggle';

Enzyme.configure({ adapter: new Adapter() });

describe('Toggle Component UI', () => {
  it('render without crashing', () => {
    shallow(<Toggle />);
  });
});
