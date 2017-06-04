import React from 'react';

const SPINNER_LOC = '/static/img/aerolith/blue_spinner.gif';

const Spinner = props => (
  <img
    role="presentation"
    src={SPINNER_LOC}
    style={{
      display: props.visible ? 'block' : 'none',
      position: 'fixed',
      left: '50%',
      top: '20%',
      zIndex: 10000,   // Default z-index for Bootstrap modal is 1050, need
                       // this higher than that.
    }}
  />
);

Spinner.propTypes = {
  visible: React.PropTypes.bool,
};

export default Spinner;
