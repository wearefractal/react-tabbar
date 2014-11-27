/* globals window, document*/
'use strict';

var TabBar = require('../../../src');
var React = require('react');
window.React = React; // for dev
var DOM = React.DOM;

// FRIENDS

var FriendsView = React.createClass({
  render: function(){
    return  DOM.div({}, 'FRIENDS');
  }
});


// FAVORITES

var FavoritesView = React.createClass({
  getInitialState: function(){
    return {foo: true}
  },

  handleFavorite: function() {
    this.setState({foo: !this.state.foo});
  },
  render: function(){

    return DOM.div({}, 'FAVORITES', DOM.button({onClick: this.handleFavorite}, 'favorte'), DOM.div({}, this.state.foo.toString()));
  }
});

// APP

var App = React.createClass({
  displayName: 'demo',
  render: function(){

    return TabBar({

      'default': 'favorites',

      tabs: {
        friends: {
          label: 'Friends',
          icon: 'fa-friends',
          displayLabel: true,
          view: React.createFactory(FriendsView)
        },
        favorites: {
          label: 'Favorites',
          icon: 'fa-favorite',
          displayLabel: true,
          view: React.createFactory(FavoritesView)
        }
      }
    });
  }
});

React.renderComponent(App(), document.body);
