import React, { Component } from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Combo from './Combo';
import ComboItem from './ComboItem';

Enzyme.configure({ adapter: new Adapter() });

describe('Combo Component UI', () => {
  it('render without crashing', () => {
    shallow(<Combo />);
  });

  it('should render with two items', () => {
    const wrapper = mount(
      <Combo>
        <ComboItem value="1">1</ComboItem>
        <ComboItem value="2">2</ComboItem>
      </Combo>
    );

    expect(wrapper.find('div[role="option"]')).toHaveLength(2);
  });

  it('should click to option and emit change event', () => {
    const onChangeEvent = jest.fn();

    const wrapper = mount(
      <Combo onChange={onChangeEvent}>
        <ComboItem value="1">1</ComboItem>
        <ComboItem value="2">2</ComboItem>
      </Combo>
    );

    wrapper
      .find('div[role="option"]')
      .first()
      .simulate('click');

    expect(onChangeEvent.mock.calls.length).toBe(1);
    expect(
      wrapper
        .find('div[role="option"]')
        .first()
        .prop('aria-selected')
    ).toBeTruthy();
  });

  it('should emit multiples values', () => {
    class TestComponent extends Component {
      constructor(props) {
        super(props);

        this.state = {
          value: []
        };
      }

      onChange = value => {
        this.setState(() => ({
          value
        }));
      };

      render() {
        return (
          <Combo multiple value={this.state.value} onChange={this.onChange}>
            <ComboItem value={1}>1</ComboItem>
            <ComboItem value={2}>2</ComboItem>
          </Combo>
        );
      }
    }

    const wrapper = mount(<TestComponent />);

    wrapper
      .find('div[role="option"]')
      .first()
      .simulate('click');

    expect(wrapper.state().value).toContain(1);

    wrapper
      .find('div[role="option"]')
      .last()
      .simulate('click');

    expect(wrapper.state().value).toContain(2, 1);
  });
});
