import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabNav extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    onTabClick: PropTypes.func,
    panels: PropTypes.node,
    activeIndex: PropTypes.number
  }

  getTabs() {
    const {classPrefix, panels,activeIndex} = this.props;

    return React.Children.map(panels, (panel) => {
      if(!panel) {
        return;
      }
      const order = parseInt(panel.props.order,10);

      let classes = classnames({
        [`${classPrefix}-tab`]: true,
        [`${classPrefix}-active`]:activeIndex === order,
        [`${classPrefix}-disabled`]:panel.props.disabled
      });

      let events = {};
      if(!panel.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order) //那么onTabClick执行时等于是执行onTabClick(order)
        }
      }

      const ref = {};
      if(activeIndex === order) {
        ref.ref = 'activeTab';
      }

      return (
        <li 
          role="tab"
          aria-disabled={panel.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order ? 'true' : false}
          {...events}
          className={classes}
          key={order}
          {...ref}
        >
          {panel.props.tab} {/*这里传入的是Tab的内容*/}
        </li>
      )

    })

  }
  render() {
    const { classPrefix } = this.props;
    const rootClasses = classnames({
      [`${classPrefix}-bar`]: true
    });
    const classes = classnames({
      [`${classPrefix}-nav`]: true
    });

    return (
      <div className = {rootClasses} role="tablist">
        <ul className={classes} >
          {this.getTabs()}
        </ul>
      </div>
    )
  }
} 

export default TabNav;