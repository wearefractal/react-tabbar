'use strict';

var React = require('react/addons');
var cx = React.addons.classSet;
var DOM = React.DOM;
var PropTypes = React.PropTypes;
var each = require('lodash.foreach');

var tabbar = React.createClass({
  displayName: 'TabBar',
  propTypes: {
    defaultTab: PropTypes.string,
    // TODO: validate tabs in proptypes
    tabs: PropTypes.object.isRequired,
    onTabChange: PropTypes.func
    // TODO: option to destroy not hide on active switch
    // TODO: animation options
  },

  getInitialState: function(){
    return {
      activeTab: this.props.defaultTab
    };
  },

  handleTabClick: function(tabName){
    // already active, ignore click
    if (this.state.activeTab === tabName) {
      return;
    }
    this.setState({
      activeTab: tabName
    });

    if (typeof this.props.onTabChange === 'function') {
      this.props.onTabChange(tabName, this.props.tabs[tabName]);
    }
  },

  render: function(){
    var tabs = this.getTabs();

    return DOM.div({
      className: 'tabbar'
    },
      DOM.div({
        className: 'tabbar-main'
      }, tabs.views),
      DOM.div({
        className: 'tabbar-bar'
      }, tabs.tabs)
    );
  },

  getTabs: function(){
    var views = [];
    var tabs = [];

    each(this.props.tabs, function(tab, tabName){
      var tabNode = [];
      var viewNode;
      var isActiveTab = (this.state.activeTab === tabName);

      // make sure the view is valid before we do anything else
      if (typeof tab.view !== 'function') {
        throw new Error('Invalid view attribute for tab ' + tabName);
      }

      // render the view given and wrap it, thats the viewNode
      viewNode = DOM.div({
        key: tabName+'-view',
        className: cx({
          'tabbar-view': true,
          active: isActiveTab
        })
      }, tab.view());

      // if they specified a custom el just use that
      if (typeof tab.el !== 'undefined') {
        tabNode = tab.el;
      }

      if (tab.icon) {
        // icon is a className
        if (typeof tab.icon === 'string') {
          tabNode.push(DOM.i({
            key: tabName + '-tab-icon',
            className: 'tabbar-icon ' + tab.icon
          }));
        // icon is a renderable
        } else {
          tabNode.push(tab.icon);
        }
      }

      if (tab.label) {
        // label is text
        if (typeof tab.label === 'string') {
          tabNode.push(DOM.span({
            key: tabName + '-tab-label',
            className: 'tabbar-label'
          }, tab.label));
        // label is a renderable
        } else {
          tabNode.push(tab.label);
        }
      }

      // wrap what we ended up with in a div
      tabNode = DOM.div({
        key: tabName+'-tab',
        className: cx({
          'tabbar-tab': true,
          active: isActiveTab
        }),
        'data-tabname': tabName,
        onClick: this.handleTabClick.bind(this, tabName)
      }, tabNode);

      tabs.push(tabNode);
      views.push(viewNode);
    }, this);

    return {
      views: views,
      tabs: tabs
    };
  }
});

module.exports = tabbar;
