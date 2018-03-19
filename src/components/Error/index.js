import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ code, message, error, onBack, translations }) => (
  <div className="wrapper-page">
    <div className="ex-page-content text-center">
      <h1 className="text-white">{code}!</h1>

      {error &&
        process.env.NODE_ENV === 'development' && (
          <div className="alert alert-danger">
            {error.message}
            <p>
              <i>{error.stack}</i>
            </p>
          </div>
        )}

      <h2 className="text-white">{message} </h2>
      <br />
      <a className="btn btn-info waves-effect waves-light" onClick={onBack}>
        {translations.BACK_TO_DASHBOARD}
      </a>
    </div>
  </div>
);

Error.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
  error: PropTypes.any,
  onBack: PropTypes.func,
  translations: PropTypes.shape({})
};

export default Error;
