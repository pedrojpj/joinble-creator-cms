import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ code, message, onBack }) => (
  <div className="wrapper-page">
    <div className="ex-page-content text-center">
      <h1 className="text-white">{code}!</h1>
      <h2 className="text-white">{message} </h2>
      <br />
      <a className="btn btn-info waves-effect waves-light" onClick={onBack}>
        Back to Dashboard
      </a>
    </div>
  </div>
);

Error.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
  onBack: PropTypes.func
};

export default Error;
