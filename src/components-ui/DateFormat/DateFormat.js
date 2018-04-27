import { createElement } from 'react';
import PropTypes from 'prop-types';
import { compose, withPropsOnChange, pure } from 'recompose';
import localeEs from 'date-fns/locale/es';
import { distanceInWordsToNow, format, isValid } from 'date-fns';

function validDate(date) {
  return isValid(new Date(date));
}

function formatDate(props) {
  if (!props.date) {
    return null;
  }

  const date = new Date(props.date);

  if (!validDate(date)) {
    return null;
  }

  const formatInDate = props.format || 'MM/DD/YYYY';

  if (props.fromNow) {
    return distanceInWordsToNow(date, {
      addSuffix: true,
      locale: localeEs
    }).replace('alrededor de', '');
  }

  return format(date, formatInDate, { locale: localeEs });
}

const DateFormat = ({ date, text, element, className }) =>
  createElement(element, { className: className }, text + ' ' + date);

DateFormat.propTypes = {
  element: PropTypes.oneOf(['div', 'span', 'p']),
  date: PropTypes.string,
  text: PropTypes.string
};

DateFormat.defaultProps = {
  element: 'span',
  text: ''
};

export default compose(
  withPropsOnChange(['children'], props => ({
    date: formatDate(props),
    error: validDate(props.date)
  })),
  pure
)(DateFormat);
