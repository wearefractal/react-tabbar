## Information

<table>
<tr>
<td>Package</td><td>react-tabbar</td>
</tr>
<tr>
<td>Description</td>
<td>TabBar component</td>
</tr>
<tr>
<td>Browser Version</td>
<td>>= IE6*</td>
</tr>
</table>

## Usage

- defaultTab
  - optional
  - string
  - must be a key from `props.tabs`
- tabs
  - required
  - object where the key is a unique tab name, and the value is a tab descriptor
  - *tab descriptor attributes*
    - label
      - optional, will add a label element if provided
      - can be a string with text or a renderable node
    - icon
      - optional, will add an icon element if provided
      - can be a string with the class name or a renderable node
    - view
      - required
      - must be a renderable

```js
var App = React.createClass({
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
});
```