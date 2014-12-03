'use strict';
var React = require('react');
var DOM = React.DOM;
var PropTypes = React.PropTypes;

var tabbar = React.createClass({
  displayName: 'TabBar',

  shouldComponentUpdate: function(){
    return false;
  },

  handleTabClick: function(tab){
    this.refs[this.current].getDOMNode().classList.remove('active');
    this.refs[tab].getDOMNode().classList.add('active');

    this.refs[this.current+'View'].getDOMNode().classList.remove('active');
    this.refs[tab+'View'].getDOMNode().classList.add('active');

    this.current = tab;

    if (this.props.onTabChange != null) {
      this.props.onTabChange(tab, this.props.tabs[tab]);
    }
  },

  render: function(){
    var self = this;
    var tabs = [];
    var views = [];
    
    this.current = this.props.default;

    // iterate over TABS
    Object.keys(this.props.tabs).forEach(function(tab){
      var currentTab = self.props.tabs[tab];
      var tabNode, viewNode;

      // element specified 
      if (currentTab.el !== undefined) {
        tabNode = el;
      }

      // icon specified 
      else if (currentTab.icon !== undefined) {
        tabNode = []

        tabNode.push(DOM.span({className: currentTab.icon}));

        if (currentTab.displayLabel) {
          tabNode.push(DOM.span(null, currentTab.label))
        }
      }

      // just use label
      else {
        tabNode = DOM.span(null, currentTab.label);
      }

      // set active tab
      var claz = 'tabbar-tab';
      if (tab === self.current) {
        claz += ' active'
      }

      tabNode = DOM.div({
        className: claz, 
        ref: tab,
        onClick: self.handleTabClick.bind(null, tab)
      }, tabNode);

      var viewClaz = 'tabbar-view'
      if (tab === self.current) {
        viewClaz += ' active'
      }

      viewNode = DOM.div({
        className: viewClaz,
        ref: tab+'View'
      }, self.props.tabs[tab].view());

      tabs.push(tabNode);
      views.push(viewNode);
    });

    return DOM.div(null,
      DOM.div({
        className: 'tabbar-main'
      }, views),
      DOM.div({
        className: 'tabbar-bar'
      }, tabs)
    );
  }
});

module.exports = tabbar;
