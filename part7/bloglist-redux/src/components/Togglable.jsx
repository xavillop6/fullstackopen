import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="pb-2">
      <div style={hideWhenVisible}>
        <Button className="btn btn-light" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Button className="btn btn-danger mb-2" onClick={toggleVisibility}>Cancel</Button>
        {props.children}
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
