/* global window */

'use strict';
var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var DOM = require('react/lib/ReactDOM');
var PropTypes = require('react/lib/ReactPropTypes');

var types = {
};

var tabbar = ReactCompositeComponent.createClass({

  displayName: 'TabBar',
  propTypes: types,

  componentWillReceiveProps: function(props){
    return props;
  },

  componentWillUnmount: function(){
  },

  handleTabClick: function(tab){

    this.refs[this.current].getDOMNode().classList.remove('active');
    this.refs[tab].getDOMNode().classList.add('active');

    this.refs[this.current+'View'].getDOMNode().classList.remove('active');
    this.refs[tab+'View'].getDOMNode().classList.add('active');

    this.current = tab;
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

        tabNode.push(DOM.i({className: currentTab.icon}));

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

    return DOM.div({},


      DOM.div({className: 'tabbar-main'},
        views
      ),

      DOM.div({className: 'tabbar-bar'},
        tabs
      )

    );

  }
});

module.exports = tabbar;
