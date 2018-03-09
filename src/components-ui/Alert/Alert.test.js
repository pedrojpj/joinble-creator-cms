import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Alert from './Alert';

Enzyme.configure({ adapter: new Adapter() });

describe('Alert Component UI', () => {
  it('render without crashing', () => {
    shallow(<Alert />);
  });
});
