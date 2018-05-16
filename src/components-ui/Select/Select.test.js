import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelectComponent, { Select } from './Select';
import Option from './Option';

const options = [
  {
    name: 'Example',
    value: 1
  },
  {
    name: 'Example 2',
    value: 2
  }
];

Enzyme.configure({ adapter: new Adapter() });

describe('Select Component UI', () => {
  it('render without crashing', () => {
    shallow(<SelectComponent />);
  });

  it('should render options', () => {
    const wrapper = mount(
      <SelectComponent name="example">
        {options.map(option => (
          <Option value={option.value} key={option.value}>
            {option.name}
          </Option>
        ))}
      </SelectComponent>
    );

    expect(wrapper.find(Select).props().options).toHaveLength(2);
  });

  it('should be marked as active', () => {
    const wrapper = mount(<SelectComponent label="Example" />);
    wrapper.find('div').simulate('click');
    expect(wrapper.find(Select).props().show).toBeTruthy();
  });

  it('should show two active elements in a select multiple', () => {
    const wrapper = mount(
      <SelectComponent name="example" multiple values={[1, 2]}>
        {options.map(option => (
          <Option value={option.value} key={option.value}>
            {option.name}
          </Option>
        ))}
      </SelectComponent>
    );

    expect(wrapper.find(Select).props().optionsSelected).toHaveLength(2);
  });
});
