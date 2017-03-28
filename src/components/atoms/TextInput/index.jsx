import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TextInput = (props) => {
  const {
    as,
    className,
    children,
  } = props;

  const classNames = classnames(
    className
  );

  const Element = as;

  return (
    <Element className={classNames}>
      {children}
    </Element>
  );
};

TextInput.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

TextInput.defaultProps = {
  as: 'h1',
};

export default TextInput;
