import React from 'react';

export const AppItem = () => (
  <div className="col-sm-6 col-lg-3">
    <div className="panel text-center">
      <div className="panel-heading">
        <h4 className="panel-title text-muted font-light">
          Total Subscription
        </h4>
      </div>
      <div className="panel-body p-t-10">
        <h2 className="m-t-0 m-b-15">
          <i className="mdi mdi-arrow-down text-danger m-r-10" />
          <b>8952</b>
        </h2>
        <p className="text-muted m-b-0 m-t-20">
          <b>48%</b> From Last 24 Hours
        </p>
      </div>
    </div>
  </div>
);
