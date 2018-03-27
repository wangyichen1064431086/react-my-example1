
jest.unmock('../js/Tabs');
jest.unmock('../js/TabPane')

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Tabs from '../js/Tabs';
import TabPane from '../js/TabPane';

describe('Tab', () => {
  it('render the tab content', () => {
    const tab = ReactTestUtils.renderIntoDocument(
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

    expect(tabNode.querySelectorAll('.tabs-tab').length).toEqual(3);
    expect(tabNode.querySelectorAll('.tabs-tab')[0].classList.contains('tabs-active')).toBe(true);
  });

  describe('Tab', () => {
    it('changes active tab after click', () => {
      const tab = ReactTestUtils.renderIntoDocument(
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

      ReactTestUtils.Simulate.click(
        tabNode.querySelectorAll('.tabs-tab')[1]
      );

      expect(tabNode.querySelectorAll('.tabs-tab')[0].classList.contains('tabs-active')).toBe(false);
      expect(tabNode.querySelectorAll('.tabs-active')[1].classList.contains('tabs-active')).toBe(true);
    })
  })
});