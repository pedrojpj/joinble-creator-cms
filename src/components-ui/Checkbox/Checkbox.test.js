import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Checkbox from './Checkbox';

Enzyme.configure({ adapter: new Adapter() });

describe('Checkbox Component UI', () => {
  it('render without crashing', () => {
    shallow(<Checkbox />);
  });
});
