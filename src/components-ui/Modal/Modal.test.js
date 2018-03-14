import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from './Alert';

Enzyme.configure({ adapter: new Adapter() });

describe('Modal Component UI', () => {
  it('render without crashing', () => {
    shallow(<Modal />);
  });
});
