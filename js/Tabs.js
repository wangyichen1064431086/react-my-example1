import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';//A simple javascript utility for conditionally joining classNames together.
import styles from '../css/style.scss';



class Tabs extends React.Component {
  static propTypes = {
    className:PropTypes.string,
    classPrefix:PropTypes.string,
    children:PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    defaultActiveIndex:PropTypes.number,
    activeIndex:PropTypes.number,
    onChange:PropTypes.func

  };

  static defaultProps = {//默认props,组件的props是来自于 默认属性 或 从父组件传递而来
    classPrefix:'tabs', //class前缀，对于组件来说，定义一个统一的class前缀，对样式与交互分离起了非常重要的作用
    onChange:() => {}//当切换tab时，外组件需要知道组件内部的信息。
  };

  constructor(props) {
    super(props);

    const currProps = this.props;

    let activeIndex;
    if ('activeIndex' in currProps) { //该prop需要外部更新。切换tab标签时，可以看作是组件外部在传入具体的索引。即这里是 木偶组件 思想
      activeIndex = currProps.activeIndex;
    } else if ('defaultActiveIndex' in currProps) { //该prop需要内部更新。切换tab标签时，可以看作是组件内部的交互行为，被选择后通过事件处理程序返回具体的索引。即这里是 智能组件 思想。
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex
    };
    
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    /**
     * NOTE:
     * 这是数据更新过程的生命周期函数。
     * 如果组件是由父组件更新props而更新，那么在shouldComponentUpdate之前会先执行componentWillReceiveProps方法。
     * 此方法是一个进行setState的机会。用于在props更新后再次传入后、render之前进行setState。
     * MARK：
     * 如果Tabs组件的activeIndex由外部组件来更新，那么就是这样做到的
     */
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex:nextProps.activeIndex;
      })
    }
  }
  handleTabClick(activeIndex) {
    /**
     * 用于TabNav的点击事件
     * @param {} activeIndex:传入的activeIndx
     */
    const prevIndex = this.state.activeIndex;

    if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {//如果当前的state.activeIndex与传入的activeIndex不等，且props有内部的defaultActiveIndex,更新state.activeIndx为外部传入的activeIndex
      this.setState({
        activeIndex,
        prevIndex
      });
      this.props.onChange({activeIndex, prevIndex});//来自于defaultProps
      /**
       * NOTE:这是es6的模拟命名参数
       */
    }
  }

  renderTabNav() {
    const {classPrefix, children} = this.props;
    //NOTE：props.children:用特殊的"children" prop将children elements直接传递到组件的输出中。这可以让其他组件通过嵌套JSX来传递任意children元素。所以这样可以在外面调用Tabs的时候写children:<Tabs><ChildDiv/></Tabs>

    return (
      <TabNav 
        key="tabBar" //NOTE:“key"是创建elements列表时需要包含的一个特殊字符串属性。key帮助React识别哪个items已经被改变，被添加，或者被移走
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children} //NOTE:这个children是Tabs的children
        activeIndex={this.state.activeIndex}
      />
    )
  }

  renderTabContent() {
    const {classPrefix, children} = this.props;

    return (
      <TabContent
        key="tabContent"
        classPrefix={classPrefix}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    );
  }

  render() {
    const {className} = this.props;//提取props.className的值
    const classes = classnames(className, 'ui-tabs');

    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}

export default Tabs;