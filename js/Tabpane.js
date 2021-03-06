import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool
  };

  render() {
    const {classPrefix, className, isActive, children} = this.props;//这个className是DOM元素自带属性，不必在propTypes中声明。且此处是optional的。
    const classes = classnames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive
    });

    return (
      <div 
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}
      >
        {children}
      </div>
    );
  }
}

export default TabPane;