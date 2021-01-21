import React from "react";
import PropTypes from "prop-types";
const Pageloader = (props) => {
  return (
    <div className={`Pageloader ${props.className}`}>
      <div className="Pageloader__content">
        <div className="Pageloader__spinner" />
        <h5 className="Pageloader__heading primary-text-color">{props.title}</h5>
        <p className="Pageloader__text">{props.message}</p>
      </div>
    </div>
  );
};

Pageloader.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

Pageloader.defaultProps = {
  message: "loading...",
  title: "",
  className: "",
};

export default Pageloader;
