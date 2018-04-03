import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DropImage from './DropImage';

Enzyme.configure({ adapter: new Adapter() });

describe('DropImage Component UI', () => {
  it('render without crashing', () => {
    shallow(<DropImage />);
  });

  it('should add className', () => {
    const wrapper = mount(<DropImage className="drop" />);
    expect(wrapper.find('label').hasClass('drop')).toBeTruthy();
  });

  it('should add placeholder', () => {
    const placeholder = 'drop image';
    const wrapper = mount(<DropImage placeholder={placeholder} />);
    expect(wrapper.find('span').text()).toBe(placeholder);
  });
});
