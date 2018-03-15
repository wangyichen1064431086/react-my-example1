import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabContent extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels:PropTypes.node,
    activeIndex: PropTypes.number
  }

  getTabPanes() {
    const {classPrefix, panels, activeIndex} = this.props;

    return React.Children.map(panels, (panel) => {
      if (!panel) {
        return;
      }

      const order = parseInt(panel.props.order, 10);
      const isActive = activeIndex === order;

      return React.cloneElement(panel, {
        classPrefix,
        isActive,
        children:panel.props.children,
        key:`tabpane-${order}`
      });

    });
  }

  render() {
    const {classPrefix} = this.props;
    const classes = classnames({
      [`${classPrefix}-content`]: true
    });
    return (
      <div className={classes}>
        {this.getTabPanes()}
      </div>
    )
  }
}