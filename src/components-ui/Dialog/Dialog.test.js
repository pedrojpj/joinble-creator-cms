import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DialogComponent, { Dialog } from './Dialog';

global.SVGElement = global.Element;

Enzyme.configure({ adapter: new Adapter() });

const DialogItems = [
  {
    name: 'Example1'
  },
  {
    name: 'Example2'
  }
];

const DialogItemsWithSeparator = [
  {
    name: 'Example1'
  },
  {
    name: 'Example2',
    separator: true
  }
];

describe('Dialog Component UI', () => {
  it('render without crashing', () => {
    shallow(<DialogComponent />);
  });

  it('should click on the button and toggle the open state', () => {
    const wrapper = mount(
      <DialogComponent items={DialogItems}>
        <span>Button</span>
      </DialogComponent>
    );
    wrapper.find('span').simulate('click');
    expect(wrapper.find(Dialog).props().open).toBeTruthy();
    wrapper.find('span').simulate('click');
    expect(wrapper.find(Dialog).props().open).toBeFalsy();
  });

  it('should show two items when clicking on the button', () => {
    const wrapper = mount(
      <DialogComponent items={DialogItems}>
        <span>Button</span>
      </DialogComponent>
    );
    wrapper.find('span').simulate('click');
    expect(wrapper.find(Dialog).props().open).toBeTruthy();
    expect(wrapper.find('li').length).toBe(2);
  });

  it('should add a separator between items', () => {
    const wrapper = mount(
      <DialogComponent items={DialogItemsWithSeparator}>
        <span>Button</span>
      </DialogComponent>
    );
    wrapper.find('span').simulate('click');
    expect(wrapper.find('li.divider').exists()).toBeTruthy();
    expect(
      wrapper
        .find('li')
        .at(1)
        .hasClass('divider')
    ).toBeTruthy();
  });
});
