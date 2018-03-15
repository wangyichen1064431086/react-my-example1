import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './Tabs.js';
import TabNav from './TabNav.js';
import TabContent from './TabContent.js';
import TabPane from './TabPane.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex:0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState{
      activeIndex: e.target.value;//NOTE:target就是option元素
    }
  }

  render() {
    return (
      <div>
        <div className="operator">
          <span>切换Tab:</span>
          <select 
            value={this.state.activeIndex}
            onChange={this.handleChange}
            >
            <option value="0">Tab 1</option>
            <option value="1">Tab 2</option>
            <option value="2">Tab 3</option>
          </select>
        </div>

        <Tabs defaultActiveIndex={this.state.activeIndex} className="tabs-bar">
          <TabPane order="0" tab="Tab 1">
            第一个Tab里的内容
          </TabPane>
          <TabPane order="1" tab="Tab 2">
            第二个Tab里的内容
          </TabPane>
          <TabPane order="2" tab="Tab 3">
            第三个Tab里的内容
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));