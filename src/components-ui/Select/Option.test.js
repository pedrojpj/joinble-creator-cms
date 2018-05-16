import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Option from './Option';

Enzyme.configure({ adapter: new Adapter() });

describe('Option Component UI', () => {
  it('render without crashing', () => {
    shallow(<Option value="1">Example</Option>);
  });

  it('should emit value and children props when click in component', () => {
    const onChange = jest.fn();

    const wrapper = shallow(
      <Option value="1" onClick={onChange}>
        Example
      </Option>
    );

    wrapper.find('div').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toBeCalledWith('1', 'Example');
  });

  it('should mark the option as selected', () => {
    const wrapper = shallow(
      <Option value="1" selected>
        Example
      </Option>
    );

    expect(wrapper.find('div').prop('aria-selected')).toBeTruthy();
  });
});
