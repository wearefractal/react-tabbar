/* globals window, document*/
'use strict';

var React = require('react');
window.React = React; // for dev
var DOM = React.DOM;
var TabBar = React.createFactory(require('../../../src'));

// FRIENDS

var FriendsView = React.createFactory(React.createClass({
  render: function(){
    return DOM.div({}, 'FRIENDS');
  }
}));


// FAVORITES

var FavoritesView = React.createFactory(React.createClass({
  getInitialState: function(){
    return {foo: true}
  },

  handleFavorite: function() {
    this.setState({foo: !this.state.foo});
  },
  render: function(){

    return DOM.div({}, 'FAVORITES', DOM.button({onClick: this.handleFavorite}, 'favorte'), DOM.div({}, this.state.foo.toString()));
  }
}));

// APP

var App = React.createFactory(React.createClass({
  displayName: 'demo',
  render: function(){

    return TabBar({
      defaultTab: 'favorites',
      tabs: {
        friends: {
          label: 'Friends',
          icon: 'fa-friends',
          view: FriendsView
        },
        favorites: {
          label: 'Favorites',
          icon: 'fa-favorite',
          view: FavoritesView
        }
      },
      onTabChange: function(tabName, tab){
        console.log('tab changed', tabName, tab);
      }
    });
  }
}));

React.render(App(), document.body);
