import jest from 'jest';

//jest.unmock('../js/Tabs.js');

import React from 'react';
import ReactDOM from 'react-dom';
import {ReactTestUtils as TestUtils} from 'react-dom/test-utils';
import Tabs from '../js/Tabs';

describe('Tab', () => {
  it('render the tab content', () => {
    const tab = TestUtils.renderIntoDocument(
      <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="ui-tabs">
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
    );
    const tabNode = ReactDOM.findDOMNode(tab);

    expect(tab.querySelectorAll('.tabs-tab').length).toEqual(3);
    expect(tab.querySelectorAll('.tabs-tab')[0].classList.contains('tab-active')).toBe(true);
  })
});