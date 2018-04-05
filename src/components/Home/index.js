import React from 'react';

import { Combo, ComboItem } from '../../components-ui';

const Home = props => (
  <div>
    <Combo
      label="Select Item"
      value="1"
      onChange={value => {
        console.log(value);
      }}
    >
      <ComboItem value="1">1</ComboItem>
      <ComboItem value="2">2</ComboItem>
    </Combo>
  </div>
);

export default Home;
