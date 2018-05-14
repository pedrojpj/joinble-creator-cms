import React from 'react';

import {
  Combo,
  ComboItem,
  Spinner,
  Checkbox,
  Toggle,
  Tabs,
  Tab,
  TabContent,
  Select,
  Option
} from '../../components-ui';

const Home = props => (
  <div>
    <Combo
      label="Select Item"
      value={[1]}
      multiple
      onChange={value => {
        console.log(value);
      }}
    >
      <ComboItem value={1}>1</ComboItem>
      <ComboItem value={2}>2</ComboItem>
    </Combo>

    <br />

    <Checkbox />

    <br />

    <Spinner />

    <br />
    <Toggle>Active?</Toggle>

    <br />
    <Tabs activeTab={1}>
      <Tab>Link 1</Tab>
      <Tab>Link 2</Tab>
      <TabContent>Content 1</TabContent>
      <TabContent>Content 2</TabContent>
    </Tabs>
    <br />
    <Select label="Paid">
      <Option value="proccessing">proccessing</Option>
      <Option value="example">Example</Option>
      <Option value="example2">Example2</Option>
    </Select>

    <Select label="Paid" multiple>
      <Option value="proccessing">proccessing</Option>
      <Option value="example">Example</Option>
      <Option value="example2">Example2</Option>
    </Select>
  </div>
);

export default Home;
