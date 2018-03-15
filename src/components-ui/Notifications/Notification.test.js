import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Notification } from './Notification';

Enzyme.configure({ adapter: new Adapter() });

describe('Notification Component UI', () => {
  it('render without crashing', () => {
    shallow(<Notification />);
  });
});
