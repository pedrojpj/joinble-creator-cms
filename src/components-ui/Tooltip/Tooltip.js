import { cloneElement } from 'react';
import { compose, withProps, lifecycle, pure } from 'recompose';
import PropTypes from 'prop-types';
import Tooltipjs from 'tooltip.js';

import { RefsStore } from '../../utils';
import styles from './styles.css';

const templateTooltip = `<div class="${
  styles.tooltip
}" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner ${
  styles.tooltipContent
}"></div></div>`;

export const Tooltip = ({ message, children, refs }) =>
  cloneElement(children, { ref: r => refs.store('children', r) });

Tooltip.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
  refs: PropTypes.shape({})
};

export default compose(
  withProps({ refs: RefsStore }),
  lifecycle({
    componentDidMount() {
      new Tooltipjs(this.props.refs.get('children'), {
        title: this.props.message,
        template: templateTooltip,
        placement: 'top'
      });
    }
  }),
  pure
)(Tooltip);
