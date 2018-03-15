import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Component, { Notifications } from './Notifications';

Enzyme.configure({ adapter: new Adapter() });

describe('Notifications Component UI', () => {
  it('render without crashing', () => {
    shallow(<Component />);
  });
});
