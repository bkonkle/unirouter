# unirouter

[![Version][version-svg]][package-url]
[![Build Status][travis-svg]][travis-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A minimal and universal routing engine using [redux][redux],
[uniloc][uniloc], and the HTML5 history api. Inspired by
[@james_k_nelson][james-k-nelson]'s
[Simple Routing with Redux and React][redux-routing] and
[@agamennon][guilherme]'s [redux-tiny-router][redux-tiny-router].

It treats routing as simple state, stored in Redux and made available to
components via Redux's `connect()` wrapper. Manage your components however you
want using the route data generated by [uniloc][uniloc]. Use the included
`<Link/>` component to generate urls from route names and options (often
referred to as "reverse lookup"), and trigger routing events when users click
your links.

## Installation

```sh
npm install --save unirouter redux
```

Redux is the only hard peer dependency, but if you want to use the `<Link/>`
component you'll need to install React as well:

```sh
# Optional
npm install --save react
```

## Initialization

Before you can use unirouter, you'll need to include the provided reducer in
your combined redux reducer:

```js
import {combineReducers, createStore} from 'redux'
import {reducer as unirouterReducer} from 'unirouter'
import myReducer from '../path/to/my/reducer'

const reducer = combineReducers({
  router: unirouterReducer,
  myStuff: myReducer,
})

let store = createStore(reducer)
```

You'll also need to call the `init()` function to set up your initial routing
information and establish event hooks for the HTML5 history api:

```js
import {init as unirouterInit} from 'unirouter'
import getMyStore from '../path/to/my/store'

const store = getMyStore()

const routes = {
  listContacts: 'GET /contacts',
  postContact: 'POST /contacts',
  editContact: 'GET /contacts/:id',
}

const aliases = {
  'GET /': 'listContacts',
}

unirouterInit(store, routes, aliases)
```

This is best done in your init script on the front end, or in your render
middleware on the server.

## Usage

### Route State

If the user were to come in with the url `/contacts/13/edit?details=true`, the
following state would be available using whatever key you passed to the
`combineReducers()` call mentioned above:

```js
{
  url: '/contacts/13/edit?details=true',
  route: {name: 'editContact', options: {id: 13, details: true},
}
```

Use this in your top level component to determine which components should be
rendered based on the current route information.

### Link Component

To link directly to a route name, use the included `<Link/>` React component:

```js
import {Link} from 'unirouter'

export class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>Edit Your Contacts</h1>
        <Link href="#edit-contacts" name="editContacts" options={{id: 13, details: true}}/>
      </div>
    )
  }
}
```

When the user clicks on the link a NAVIGATE event will be fired, and the user's
url will be updated to `/contacts/13/edit?details=true` because that's what
`uniloc` generated from the name and options.

## API Reference

### init: function

`init(store, [routes], [aliases])`

Initializes the router, fires an initial `NAVIGATE` event, and attaches a
popstate event handler.

#### Arguments

* `store` \(*Object*): The Redux store object, just as is passed to `<Provider>`
  with `react-redux`.

* [`routes`] \(*Object*): The [uniloc][uniloc] routes object, passed to the
  `uniloc()` function documented [here][uniloc-api].

* [`aliases`] \(*Object*): The [uniloc][uniloc] aliases object, passed to the
  `uniloc()` function documented [here][uniloc-api].

### navigate: function

`navigate({url, [source], [push = false], [replace = false]})`

Creates a navigate event, which updates the route information in the state. It
also optionally pushes a history entry using pushState, or replaces the current
one using replaceState. The event must be dispatched using your store.

#### Payload

The payload can have the following properties:

* `url` \(*String*): The url (including the querystring) to navigate to.

* [`source`] \(*String*): The source of the event. Currently not used by the
  reducer, but may be in the future.

* [`push`] \(*Boolean*): Whether the browser url should be updated with
  pushState, adding a new history entry for the user.

* [`replace`] \(*Boolean*): Whether the browser url should be updated silently
  with replaceState, which doesn't add a new history entry.

### reducer: function

`reducer()`

Unirouter's reducer, which needs to be combined with the rest of your reducers.

### Link: React.Component

`<Link href={string} name={string} options={object} [...]/>`

A React component to provide links that will initiate navigation when clicked.

#### Props

* `href` \(*String*): The href to use for the `<a>` element.

* `name` \(*String*): The `uniloc` route name, which is passed to the
  `generate()` function documented [here][uniloc-api].

* [`options`] \(*Object*): The `uniloc` route options, which are passed to the
  `generate()` function documented [here][uniloc-api].

## License

The MIT License (MIT)

Copyright (c) 2015 Brainspace Corporation

[downloads-image]: https://img.shields.io/npm/dm/unirouter.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=unirouter
[guilherme]: https://github.com/Agamennon
[james-k-nelson]: https://twitter.com/james_k_nelson
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[package-url]: https://npmjs.org/package/unirouter
[redux-routing]: http://jamesknelson.com/simple-routing-redux-react/
[redux-tiny-router]: https://github.com/Agamennon/redux-tiny-router
[redux]: https://github.com/rackt/redux
[travis-svg]: https://img.shields.io/travis/bkonkle/unirouter/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bkonkle/unirouter
[uniloc]: http://unicornstandard.com/packages/uniloc.html
[uniloc-api]: https://github.com/unicorn-standard/uniloc#api
[version-svg]: https://img.shields.io/npm/v/unirouter.svg?style=flat-square
