import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

const WidgetContainer = ({ children }) => <div>{children}</div>;

export default SortableContainer(WidgetContainer);
