<!-- TOC -->

## Table of Contents

* [React Basics](#react-basics)

  * [React Essentials and Tips](#react-essentials-and-tips)
  * [JSX](#jsx)
    * [JSX Represents Objects](#jsx-represents-objects)
  * [Rendering Elements](#rendering-elements)
    * [Root DOM Node](#root-dom-node)
    * [Updating the Rendered Element](#updating-the-rendered-element)
    * [React Only Updates What’s Necessary](#react-only-updates-what's-necessary)
  * [Component and Props](#components-and-props)
    * [Functional and Class Components](#functional-and-class-components)
    * [Rendering a Component](#rendering-a-component)
    * [Props are Read-Only](props-are-read-only)
  * [State and Lifecycle](#state-and-lifecycle)
    * [Converting a Function to a Class](#converting-a-function-to-a-class)
    * [Adding Local State to a Class](#adding-local-state-to-a-class)
    * [Adding Lifecyle methods to a Class](#adding-lifecycle-methods-to-a-class)
    * [Using State Correctly](#using-state-correctly)
      * [Do Not Modify State Directly](#do-not-modify-state-directly)
      * [State Updates May Be Asynchronous](#state-updates-may-be-asynchronous)
      * [State Updates are Merged](#state-updates-are-merged)
    * [The Data Flows Down](#the-data-flows-down)

* [Redux Basics](#redux-basics)

  * [The Three Principles](#the-three-principles)
  * [Actions](#actions)
    * [Action Creators](#action-creators)
  * [Reducers](#reducers)
    * [Designing the State Shape](#designing-the-state-shape)
    * [Handling Actions](#handling-actions)
    * [Handling More Actions](#handling-more-actions)
    * [Splitting Reducers](#splitting-reducers)
  * [Store](#store)
  * [Data Flow](#data-flow)
  * [Usage with React](#usage-with-react)
  * [Example To-Do List](#example-to-do-list)

* [Express Basics](#express-basics)

  * [Basic Routing](#basic-routing)
  * [Routing](#routing)
    * [Route Methods](#route-methods)
    * [Route Paths](#route-paths)
      * [Route Parameters](#route-parameters)
    * [Route Handlers](#route-handlers)
    * [Response Methods](#response-methods)
    * [app.route()](<#app.route()>)
    * [express.Router](#express.router)
  * [Writing Middleware](#writing-middleware)
  * [Using Middleware](#using-middleware)
    * [Application-level Middleware](#application-level-middleware)
    * [Router-level Middleware](#router-level-middleware)
    * [Error-handling Middleware](#error-handling-middleware)
    * [Built-in Middleware](#built-in-middleware)
    * [Third Party Middleware](#third-party-middleware)

* [Mongoose Basics](#mongoose-basics)

  * [Getting Started](#getting-started)
  * [Schemas](#schemas)
    * [Defining Your Schema](#defining-your-schema)
    * [Creating a Model](#creating-a-model)
    * [Instance Methods](#instance-methods)
    * [Statics](#statics)
    * [Query Helpers](#query-helpers)
    * [Indexes](#indexes)
    * [Virtuals](#virtuals)
      * [Aliases](#aliases)
    * [Options](#options)
      * [Option: autoIndex](#option:-autoindex)
      * [Option: bufferCommands](#option:-buffercommands)
      * [Option: capped](#option:-capped)
      * [Option: collection](#option:-collection)
      * [Option: id](#option:-id)
      * [Option: \_id](#option:-_id)
      * [Option: minimize](#option:-minimize)
      * [Option: read](#option:-read)
      * [Option: shardKey](#option:-shardkey)
      * [Option: strict](#option:-strict)
      * [Option: strictQuery](#option:-strictquery)
      * [Option: toJSON](#option:-tojson)
      * [Option: toObject](#option:-toobject)
      * [Option: typeKey](#option:-typekey)
      * [Option: validateBeforeSave](#option:-validatebeforesave)
      * [Option: versionKey](#option:-versionkey)
      * [Option: collation](#option:-collation)
      * [Option: skipVersioning](#option:-skipversioning)
      * [Option: timestamps](#option:-timestamps)
      * [Option: useNestedStrict](#option:-usenestedstrict)

* [Axios Basics](#axios-basics)

  * [Example](#example)

* [Material UI Basics](#material-ui-basics)


    <!-- /TOC -->

# React Basics

React is a component based JavaScript library for building user interfaces

#### React Essentials and Tips

**A Note on This**

> 1.  First, know that all functions in JavaScript have properties, just as objects have properties. And when a function executes, it gets the this property—a variable with the value of the object that invokes the function where this is used.
> 2.  The this reference ALWAYS refers to (and holds the value of) an object—a singular object—and it is usually used inside a function or a method, although it can be used outside a function in the global scope. Note that when we use strict mode, this holds the value of undefined in global functions and in anonymous functions that are not bound to any object.
> 3.  this is used inside a function (let’s say function A) and it contains the value of the object that invokes function A. We need this to access methods and properties of the object that invokes function A, especially since we don’t always know the name of the invoking object, and sometimes there is no name to use to refer to the invoking object. Indeed, this is really just a shortcut reference for the “antecedent object”—the invoking object.

## JSX

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. **This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:** You can embed any JavaScript expression in JSX by wrapping it in curly braces.

* You may use quotes to specify string literals as attributes:

```
const element = <div tabIndex="0"></div>;
```

* You may also use curly braces to embed a JavaScript expression in an attribute:

```
const element = <img src={user.avatarUrl}></img>;
```

* If a tag is empty, you may close it immediately with />, like XML:

```
const element = <img src={user.avatarUrl} />;
```

#### JSX Represents Objects

Babel compiles JSX down to React.createElement() calls.

These two examples are identical:

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```
const element = React.createElement(
'h1',
{className: 'greeting'},
'Hello, world!'
);
```

`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

These objects are called “React elements”. You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

## Rendering Elements

An element describes what you want to see on the screen:

```
const element = <h1>Hello, world</h1>;
```

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

> **One might confuse elements with a more widely known concept of “components”. Elements are what components are “made of”**

#### Root DOM Node

Let’s say there is a `<div>` somewhere in your HTML file:

```
<div id="root"></div>
```

We call this a “root” DOM node because everything inside it will be managed by React DOM.

Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like.

To render a React element into a root DOM node, pass both to ReactDOM.render():

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

#### Updating the Rendered Element

> **React elements are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time**

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `ReactDOM.render()`.

Consider this ticking clock example:

```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);
```

It calls `ReactDOM.render()` every second from a setInterval() callback.

#### React Only Updates What’s Necessary

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

## Components and Props

#### Functional and Class Components

The simplest way to define a component is to write a JavaScript function:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

This function is a valid React component because it accepts a single **"props"** (which stands for properties) object argument with data and returns a React element. We call such components “functional” because they are literally JavaScript functions.

You can also use an ES6 class to define a component:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The above two components are equivalent from React’s point of view.

#### Rendering a Component

Previously, we only encountered React elements that represent DOM tags:

```
const element = <div />;
```

However, elements can also represent user-defined components:

```
const element = <Welcome name="Sara" />;
```

When React sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. We call this object **props**.
The following code will render "Hello, Sara" on the page.

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

#### Extracting Components

Consider this Comment component:

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

This can be broken up into smaller components. First, we will extract Avatar:

```
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}
```

The Avatar doesn’t need to know that it is being rendered inside a Comment. This is why we have given its prop a more generic name: user rather than author.

> **React recommends naming props from the component’s own point of view rather than the context in which it is being used.**

Now comment looks like this

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a UserInfo component that renders an Avatar next to the user’s name:

```
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

This lets use simplify Comment even further

```
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

#### Props are Read-Only

Whether you declare a component as a function or a class, it must never modify its own props. Consider this sum function:

```
function sum(a, b) {
  return a + b;
}
```

Such functions are called **"pure"** because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

> **All React components must act like pure functions with respect to their props.**

## State and Lifecycle

So far we have only learned one way to update the UI.

We call `ReactDOM.render()` to change the rendered output:

```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
```

In this section, we will learn how to make the Clock component truly reusable and encapsulated. It will set up its own timer and update itself every second.

We can start by encapsulating how the clock looks:

```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);
```

However, it misses a crucial requirement: the fact that the Clock sets up a timer and updates the UI every second should be an implementation detail of the Clock.

Ideally we want to write this once and have the Clock update itself:

```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

#### Converting a Function to a Class

To implement this, we need to add “state” to the Clock component.

State is similar to props, but it is private and fully controlled by the component.

Components defined as classes have some additional features. Local state is exactly that: a feature available only to classes.

1.  You can convert a functional component like Clock to a class in five steps:

2.  Create an ES6 class, with the same name, that extends React.Component.

3.  Add a single empty method to it called `render()`.

4.  Move the body of the function into the `render()` method.

5.  Replace props with `this.props` in the `render()` body.

6.  Delete the remaining empty function declaration.

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock is now defined as a class rather than a function.

This lets us use additional features such as local state and lifecycle hooks.

#### Adding Local State to a Class

We will move the date from props to state in three steps:

Replace `this.props.date` with `this.state.date` in the render() method:

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Add a class constructor that assigns the initial `this.state`:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Note how we pass props to the base constructor:

```
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Class components should always call the base constructor with props.

Remove the date prop from the `<Clock />` element:

```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

The result looks like this:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
```

#### Adding Lifecycle Methods to a Class

In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called **“mounting”** in React.

We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called **“unmounting”** in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

These methods are called **“lifecycle hooks”**.

The `componentDidMount()` hook runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Note how we save the timer ID right on this.

While `this.props` is set up by React itself and this.state has a special meaning, you are free to add additional fields to the class manually if you need to store something that is not used for the visual output.

If you don’t use something in `render()`, it shouldn’t be in the state.

We will tear down the timer in the `componentWillUnmount()` lifecycle hook:

```
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Finally, we will implement a method called `tick()` that the Clock component will run every second.

It will use `this.setState()` to schedule updates to the component local state:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Let’s quickly recap what’s going on and the order in which the methods are called:

1.  When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the Clock component. Since Clock needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.

2.  React then calls the Clock component’s `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the Clock’s render output.

3.  When the Clock output is inserted in the DOM, React calls the `componentDidMount()` lifecycle hook. Inside it, the Clock component asks the browser to set up a timer to call the component’s `tick()` method once a second.

4.  Every second the browser calls the `tick()` method. Inside it, the Clock component schedules a UI update by calling setState() with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

5.  If the Clock component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle hook so the timer is stopped.

## Using State Correctly

There are three things to know about `setState()`

#### Do Not Modify State Directly

For example, this will not re-render a component:

```
// Wrong
this.state.comment = 'Hello';
```

Instead, use `setState()`:

```
// Correct
this.setState({comment: 'Hello'});
```

The only place where you can assign `this.state` is the constructor.

#### State Updates May Be Asychronous

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
We used an arrow function above, but it also works with regular functions:
```

```
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

#### State Updates are Merged

When you call `setState()`, React merges the object you provide into the current state.

For example, your state may contain several independent variables:

```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Then you can update them independently with separate `setState()` calls:

```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

#### The Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```
<FormattedDate date={this.state.date} />
```

The FormattedDate component would receive the date in its props and wouldn’t know whether it came from the Clock’s state, from the Clock’s props, or was typed by hand:

```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.

If you imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an App component that renders three <Clock>s:

```
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Each Clock sets up its own timer and updates independently.

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.

# Redux Basics

Redux is a predictable state container for JavaScript apps. There are three fundamental principles of Redux.

## The Three Principles

**Single source of truth**

> The **state** of your whole application is stored in an object tree within a single store.

This makes it easy to create universal apps, as the state from your server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application; it also enables you to persist your app's state in development, for a faster development cycle. Some functionality which has been traditionally difficult to implement - Undo/Redo, for example - can suddenly become trivial to implement, if all of your state is stored in a single tree.

**State is read-only**

> The only way to change the **state** is to emit an action, an object describing what happened.

This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they express an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for. As actions are just plain objects, they can be logged, serialized, stored, and later replayed for debugging or testing purposes.

**Changes are made with pure functions**

> To specify how the state tree is transformed by actions, you write pure **reducers**.

**Reducers** are just pure functions that take the previous state and an action, and return the next state. Remember to return new state objects, instead of mutating the previous state. You can start with a single reducer, and as your app grows, split it off into smaller reducers that manage specific parts of the state tree. Because reducers are just functions, you can control the order in which they are called, pass additional data, or even make reusable reducers for common tasks such as pagination.

## Actions

First, let's define some actions.

**Actions** are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`

**Actions** are plain JavaScript objects. Actions must have a **type** property that indicates the type of action being performed. Types should typically be defined as string constants. Once your app is large enough, you may want to move them into a separate module.

#### Action Creators

Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

In Redux, action creators simply return an action:

```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

To actually initiate a dispatch, pass the result to the `dispatch()` function:

```
dispatch(addTodo(text))
dispatch(completeTodo(index))
```

Alternatively, you can create a bound action creator that automatically dispatches:

```
const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))
```

Now you'll be able to call them directly:

```
boundAddTodo(text)
boundCompleteTodo(index)
```

The dispatch() function can be accessed directly from the store as `store.dispatch()`, but more likely you'll access it using a helper like react-redux's `connect()`. You can use `bindActionCreators()` to automatically bind many action creators to a `dispatch()` function.

Action creators can also be asynchronous and have side-effects.

## Reducers

**Reducers** specify how the application's state changes in response to actions sent to the store. Remember that actions only describe the fact that something happened, but don't describe how the application's state changes

#### Designing the State Shape

In Redux, all the application state is stored as a single object.

In a more complex app, you're going to want different entities to reference each other. We suggest that you keep your state as normalized as possible, without any nesting. Keep every entity in an object stored with an ID as a key, and use IDs to reference it from other entities, or lists. Think of the app's state as a database.

#### Handling Actions

Now that we've decided what our state object looks like, we're ready to write a reducer for it. The reducer is a pure function that takes the previous state and an action, and returns the next state.

```
(previousState, action) => newState
```

It's called a reducer because it's the type of function you would pass to `Array.prototype.reduce(reducer, ?initialValue)`. It's very important that the reducer stays pure. Things you should never do inside a reducer:

1.  Mutate its arguments;

2.  Perform side effects like API calls and routing transitions;

3.  Call non-pure functions, e.g. `Date.now(`) or `Math.random()`

Remember that the reducer must be pure. Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.

start by specifying the initial state. Redux will call our reducer with an undefined state for the first time. This is our chance to return the initial state of our app:

```
import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
```

One neat trick is to use the ES6 default arguments syntax to write this in a more compact way:

```
function todoApp(state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
```

Now let's handle `SET_VISIBILITY_FILTER`. All it needs to do is to change visibilityFilter on the state. Easy:

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

**Note**

> We don't mutate the state. We create a copy with `Object.assign()`. `Object.assign(state, { visibilityFilter: action.filter })` is also wrong: it will mutate the first argument. You must supply an empty object as the first parameter. You can also enable the object spread operator proposal to write `{ ...state, ...newState }` instead.

> We return the previous state in the default case. It's important to return the previous state for any unknown action.

**Note on Object.assign**

> `Object.assign()` is a part of ES6, and is not supported by older browsers.

#### Handling More Actions

We have two more actions to handle! Just like we did with `SET_VISIBILITY_FILTER`, we'll import the `ADD_TODO` and `TOGGLE_TODO` actions and then extend our reducer to handle ADD_TODO.

```
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

...

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```

Just like before, we never write directly to state or its fields, and instead we return new objects. The new todos is equal to the old todos concatenated with a single new item at the end. The fresh todo was constructed using the data from the action.

Finally, the implementation of the `TOGGLE_TODO` handler shouldn't come as a complete surprise:

```
case TOGGLE_TODO:
  return Object.assign({}, state, {
    todos: state.todos.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  })
```

Because we want to update a specific item in the array without resorting to mutations, we have to create a new array with the same items except the item at the index.

#### Splitting Reducers

Splitting Reducers
Here is our code so far. It is rather verbose:

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}
```

Is there a way to make it easier to comprehend? It seems like todos and visibilityFilter are updated completely independently. Sometimes state fields depend on one another and more consideration is required, but in our case we can easily split updating todos into a separate function:

```
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state
  }
}
```

Note that todos also accepts state—but it's an array! Now todoApp just gives it the slice of the state to manage, and todos knows how to update just that slice. This is called reducer composition, and it's the fundamental pattern of building Redux apps.

Let's explore reducer composition more. Can we also extract a reducer managing just `visibilityFilter`? We can.

Below our imports, let's use ES6 Object Destructuring to declare `SHOW_ALL`:

```
const { SHOW_ALL } = VisibilityFilters
```

Then:

```
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
```

Now we can rewrite the main reducer as a function that calls the reducers managing parts of the state, and combines them into a single object. It also doesn't need to know the complete initial state anymore. It's enough that the child reducers return their initial state when given undefined at first.

```
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

Note that each of these reducers is managing its own part of the global state. The state parameter is different for every reducer, and corresponds to the part of the state it manages.

This is already looking good! When the app is larger, we can split the reducers into separate files and keep them completely independent and managing different data domains.

Finally, Redux provides a utility called `combineReducers()` that does the same boilerplate logic that the todoApp above currently does. With its help, we can rewrite todoApp like this:

```
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

Note that this is equivalent to:

```
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

You could also give them different keys, or call functions differently. These two ways to write a combined reducer are equivalent:

```
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

All `combineReducers()` does is generate a function that calls your reducers with the slices of state selected according to their keys, and combining their results into a single object again. It's not magic. And like other reducers, `combineReducers()` does not create a new object if all of the reducers provided to it do not change state.

# Express Basics

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Basic Routing

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

```
app.METHOD(PATH, HANDLER)
```

Where:

app is an instance of express.
METHOD is an HTTP request method, in lowercase.
PATH is a path on the server.
HANDLER is the function executed when the route is matched.
This tutorial assumes that an instance of express named app is created and the server is running. If you are not familiar with creating an app and starting it, see the Hello world example.

The following examples illustrate defining simple routes.

Respond with Hello World! on the homepage:

```
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

Respond to POST request on the root route (/), the application’s home page:

```
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```

Respond to a PUT request to the /user route:

```
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```

Respond to a DELETE request to the /user route:

```
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```

## Routing

Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.

You define routing using methods of the Express app object that correspond to HTTP methods; for example, `app.get()` to handle GET requests and app.post to handle POST requests. For a full list, see `app.METHOD`. You can also use `app.all()` to handle all HTTP methods and `app.use()` to specify middleware as the callback function (See Using middleware for details).

These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.

The following code is an example of a very basic route.

```
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
```

#### Route Methods

A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.

The following code is an example of routes that are defined for the GET and the POST methods to the root of the app.

```
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
```

Express supports methods that correspond to all HTTP request methods: get, post, and so on.

There is a special routing method, `app.all()`, used to load middleware functions at a path for all HTTP request methods. For example, the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the http module.

app.all('/secret', function (req, res, next) {
console.log('Accessing the secret section ...')
next() // pass control to the next handler
} )

#### Route Paths

Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.

The characters ?, +, \*, and () are subsets of their regular expression counterparts. The hyphen (-) and the dot (.) are interpreted literally by string-based paths.

If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ]). For example, the path string for requests at “/data/$book”, would be “/data/([\$])book”.

Here are some examples of route paths based on strings.

This route path will match requests to the root route, /.

```
app.get('/', function (req, res) {
  res.send('root')
})
```

This route path will match requests to /about.

```
app.get('/about', function (req, res) {
  res.send('about')
})
```

This route path will match requests to /random.text.

```
app.get('/random.text', function (req, res) {
  res.send('random.text')
})
```

Here are some examples of route paths based on string patterns.

This route path will match acd and abcd.

```
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})
```

This route path will match abcd, abbcd, abbbcd, and so on.

```
app.get('/ab+cd', function (req, res) {
  res.send('ab+cd')
})
```

This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.

```
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})
```

This route path will match /abe and /abcde.

```
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})
```

Examples of route paths based on regular expressions:

This route path will match anything with an “a” in it.

```
app.get(/a/, function (req, res) {
  res.send('/a/')
})
```

This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.

```
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})
```

###### Route Parameters

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```

Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

#### Route Handlers

You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.

A single callback function can handle a route. For example:

```
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```

More than one callback function can handle a route (make sure you specify the next object). For example:

```
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

An array of callback functions can handle a route. For example:

```
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

A combination of independent functions and arrays of functions can handle a route. For example:

```
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

#### Response Methods

The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

Method-Description
res.download() Prompt a file to be downloaded.
res.end() End the response process.
res.json() Send a JSON response.
res.jsonp() Send a JSON response with JSONP support.
res.redirect() Redirect a request.
res.render() Render a view template.
res.send() Send a response of various types.
res.sendFile() Send a file as an octet stream.
res.sendStatus() Set the response status code and send its string representation as the response body.

#### app.route()

You can create chainable route handlers for a route path by using app.route(). Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos.

Here is an example of chained route handlers that are defined by using app.route().

```
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

#### express.Router

Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

Create a router file named birds.js in the app directory, with the following content:

```
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

Then, load the router module in the app:

```
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

The app will now be able to handle requests to /birds and /birds/about, as well as call the timeLog middleware function that is specific to the route.

## Writing Middleware

Middleware functions are functions that have access to the request object `(req)`, the response object `(res)`, and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware in the stack.
If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
```

Here is a simple example of a middleware function called “myLogger”. This function just prints “LOGGED” when a request to the app passes through it. The middleware function is assigned to a variable named myLogger.

```
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

Notice the call above to `next()`. Calling this function invokes the next middleware function in the app. The `next()` function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function. The next() function could be named anything, but by convention it is always named “next”. To avoid confusion, always use this convention.

To load the middleware function, call `app.use()`, specifying the middleware function. For example, the following code loads the myLogger middleware function before the route to the root path (/).

```
var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
```

Every time the app receives a request, it prints the message “LOGGED” to the terminal.

The order of middleware loading is important: middleware functions that are loaded first are also executed first.

If myLogger is loaded after the route to the root path, the request never reaches it and the app doesn’t print “LOGGED”, because the route handler of the root path terminates the request-response cycle.

The middleware function myLogger simply prints a message, then passes on the request to the next middleware function in the stack by calling the next() function.

```
var requestTime = function (req, res, next) {
req.requestTime = Date.now()
next()
}
```

The app now uses the requestTime middleware function. Also, the callback function of the root path route uses the property that the middleware function adds to req (the request object).

```
var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
req.requestTime = Date.now()
next()
}

app.use(requestTime)

app.get('/', function (req, res) {
var responseText = 'Hello World!<br>'
responseText += '<small>Requested at: ' + req.requestTime + '</small>'
res.send(responseText)
})

app.listen(3000)
```

When you make a request to the root of the app, the app now displays the timestamp of your request in the browser.

Because you have access to the request object, the response object, the next middleware function in the stack, and the whole Node.js API, the possibilities with middleware functions are endless.

For more information about Express middleware, see: Using Express middleware.

Configurable middleware
If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

File: my-middleware.js

```
module.exports = function(options) {
return function(req, res, next) {
// Implement the middleware function based on the options object
next()
  }
}
```

The middleware can now be used as shown below.

```
var mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

## Using Middleware

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

Application-level middleware
Router-level middleware
Error-handling middleware
Built-in middleware
Third-party middleware

You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

#### Application-level middleware

Bind application-level middleware to an instance of the app object by using the `app.use()` and `app.METHOD()` functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

```
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

This example shows a middleware function mounted on the /user/:id path. The function is executed for any type of HTTP request on the /user/:id path.

```
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

This example shows a route and its handler function (middleware system). The function handles GET requests to the /user/:id path.

```
app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
```

Here is an example of loading a series of middleware functions at a mount point, with a mount path. It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the /user/:id path.

```
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

Route handlers enable you to define multiple routes for a path. The example below defines two routes for GET requests to the /user/:id path. The second route will not cause any problems, but it will never get called because the first route ends the request-response cycle.

This example shows a middleware sub-stack that handles GET requests to the /user/:id path.

```
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
```

To skip the rest of the middleware functions from a router middleware stack, call `next('route')` to pass control to the next route. NOTE: next('route') will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions.

This example shows a middleware sub-stack that handles GET requests to the /user/:id path.

app.get('/user/:id', function (req, res, next) {
// if the user ID is 0, skip to the next route
if (req.params.id === '0') next('route')
// otherwise pass the control to the next middleware function in this stack
else next()
}, function (req, res, next) {
// render a regular page
res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
res.render('special')
})

#### Router-level middleware

Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().

```
var router = express.Router()
```

Load router-level middleware by using the `router.use()` and `router.METHOD()` functions.

The following example code replicates the middleware system that is shown above for application-level middleware, by using router-level middleware:

```
var app = express()
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

To skip the rest of the router’s middleware functions, call next('router') to pass control back out of the router instance.

This example shows a middleware sub-stack that handles GET requests to the /user/:id path.

```
var app = express()
var router = express.Router()

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', function (req, res) {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  res.sendStatus(401)
})
```

#### Error-handling middleware

Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):

```
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

For details about error-handling middleware, see: Error handling.

#### Built-in middleware

Starting with version 4.x, Express no longer depends on Connect. The middleware functions that were previously included with Express are now in separate modules; see the list of middleware functions.

Express has the following built-in middleware functions:

express.static serves static assets such as HTML files, images, and so on.
express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+

#### Third-party middleware

Use third-party middleware to add functionality to Express apps.

Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level.

The following example illustrates installing and loading the cookie-parsing middleware function cookie-parser.

```
$ npm install cookie-parser
```

```
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

# Mongoose Basics

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Getting Started

With Mongoose, everything is derived from a Schema. Let's get a reference to it and define our kittens.

```
var kittySchema = mongoose.Schema({
  name: String
});
```

So far so good. We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.

```
var Kitten = mongoose.model('Kitten', kittySchema);
```

A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:

```
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'
```

Kittens can meow, so let's take a look at how to add "speak" functionality to our documents:

```
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
```

Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:

```
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
```

We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occured.

```
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
```

Say time goes by and we want to display all the kittens we've seen. We can access all of the kitten documents through our Kitten model.

```
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
```

We just logged all of the kittens in our db to the console. If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.

```
Kitten.find({ name: /^fluff/ }, callback);
```

This performs a search for all documents with a name property that begins with "Fluff" and returns the result as an array of kittens to the callback.

## Schemas

Everything in Mongoose starts with a Schema.

#### Defining Your Schema

Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

```
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```

If you want to add additional keys later, use the `Schema#add` method.

Each key in our code blogSchema defines a property in our documents which will be cast to its associated SchemaType. For example, we've defined a property title which will be cast to the String SchemaType and property date which will be cast to a Date SchemaType. Keys may also be assigned nested objects containing further key/type definitions like the meta property above.

The permitted SchemaTypes are:

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Read more about SchemaTypes here.

Schemas not only define the structure of your document and casting of properties, they also define document instance methods, static Model methods, compound indexes, and document lifecycle hooks called middleware.

#### Creating a Model

To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

```
  var Blog = mongoose.model('Blog', blogSchema);
  // ready to go!
```

#### Instance Methods

Instance methods
Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.

```
  // define a schema
  var animalSchema = new Schema({ name: String, type: String });

  // assign a function to the "methods" object of our animalSchema
  animalSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Animal').find({ type: this.type }, cb);
  };
```

Now all of our animal instances have a findSimilarTypes method available to them.

```
  var Animal = mongoose.model('Animal', animalSchema);
  var dog = new Animal({ type: 'dog' });

  dog.findSimilarTypes(function(err, dogs) {
    console.log(dogs); // woof
  });
```

Overwriting a default mongoose document method may lead to unpredictable results. See this for more details.
Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.

#### Statics

Adding static methods to a Model is simple as well. Continuing with our animalSchema:

```
  // assign a function to the "statics" object of our animalSchema
  animalSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
  };

  var Animal = mongoose.model('Animal', animalSchema);
  Animal.findByName('fido', function(err, animals) {
    console.log(animals);
  });
```

Do not declare statics using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so the above examples will not work because of the value of this.

#### Query Helpers

You can also add query helper functions, which are like instance methods but for mongoose queries. Query helper methods let you extend mongoose's chainable query builder API.

```
  animalSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
  };

  var Animal = mongoose.model('Animal', animalSchema);
  Animal.find().byName('fido').exec(function(err, animals) {
    console.log(animals);
  });
```

#### Indexes

MongoDB supports secondary indexes. With mongoose, we define these indexes within our Schema at the path level or the schema level. Defining indexes at the schema level is necessary when creating compound indexes.

```
  var animalSchema = new Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
  });

  animalSchema.index({ name: 1, type: -1 }); // schema level
```

When your application starts up, Mongoose automatically calls createIndex for each defined index in your schema. Mongoose will call createIndex for each index sequentially, and emit an 'index' event on the model when all the createIndex calls succeeded or when there was an error. While nice for development, it is recommended this behavior be disabled in production since index creation can cause a significant performance impact. Disable the behavior by setting the autoIndex option of your schema to false, or globally on the connection by setting the option autoIndex to false.

```
  mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
  mongoose.createConnection('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
  animalSchema.set('autoIndex', false);
  // or
  new Schema({..}, { autoIndex: false });
```

Mongoose will emit an index event on the model when indexes are done building or an error occurred.

```
  // Will cause an error because mongodb has an _id index by default that
  // is not sparse
  animalSchema.index({ _id: 1 }, { sparse: true });
  var Animal = mongoose.model('Animal', animalSchema);

  Animal.on('index', function(error) {
    // "_id index cannot be sparse"
    console.log(error.message);
  });
```

#### Virtuals

Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.

```
  // define a schema
  var personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  });

  // compile our model
  var Person = mongoose.model('Person', personSchema);

  // create a document
  var axl = new Person({
    name: { first: 'Axl', last: 'Rose' }
  });
```

Suppose you want to print out the person's full name. You could do it yourself:

```
console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose
```

But concatenating the first and last name every time can get cumbersome. And what if you want to do some extra processing on the name, like removing diacritics? A virtual property getter lets you define a fullName property that won't get persisted to MongoDB.

```
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});
```

Now, mongoose will call your getter function every time you access the fullName property:

```
console.log(axl.fullName); // Axl Rose
```

If you use toJSON() or toObject() (or use JSON.stringify() on a mongoose document) mongoose will not include virtuals by default. Pass { virtuals: true } to either toObject() or toJSON().

You can also add a custom setter to your virtual that will let you set both first name and last name via the fullName virtual.

```
personSchema.virtual('fullName').
  get(function() { return this.name.first + ' ' + this.name.last; }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

axl.fullName = 'William Rose'; // Now `axl.name.first` is "William"
```

Virtual property setters are applied before other validation. So the example above would still work even if the first and last name fields were required.

Only non-virtual properties work as part of queries and for field selection. Since virtuals are not stored in MongoDB, you can't query with them.

###### Aliases

Aliases are a particular type of virtual where the getter and setter seamlessly get and set another property. This is handy for saving network bandwidth, so you can convert a short property name stored in the database into a longer name for code readability.

```
var personSchema = new Schema({
  n: {
    type: String,
    // Now accessing `name` will get you the value of `n`, and setting `n` will set the value of `name`
    alias: 'name'
  }
});

// Setting `name` will propagate to `n`
var person = new Person({ name: 'Val' });
console.log(person); // { n: 'Val' }
console.log(person.toObject({ virtuals: true })); // { n: 'Val', name: 'Val' }
console.log(person.name); // "Val"

person.name = 'Not Val';
console.log(person); // { n: 'Not Val' }
```

#### Options

Schemas have a few configurable options which can be passed to the constructor or set directly:

```
new Schema({..}, options);

// or

var schema = new Schema({..});
schema.set(option, value);
Valid options:
```

autoIndex
bufferCommands
capped
collection
id
\_id
minimize
read
shardKey
strict
strictQuery
toJSON
toObject  
typeKey
validateBeforeSave
versionKey
collation
skipVersioning
timestamps

[Options List](http://mongoosejs.com/docs/guide.html)

###### Option: autoIndex

###### Option: bufferCommands

###### Option: capped

###### Option: collection

###### Option: id

###### Option: \_id

###### Option: minimize

###### Option: read

###### Option: shardKey

###### Option: strict

###### Option: strictQuery

###### Option: toJSON

###### Option: toObject

###### Option: typeKey

###### Option: validateBeforeSave

###### Option: versionKey

###### Option: collation

###### Option: skipVersioning

###### Option: timestamps

###### Option: useNestedStrict

#### Pluggable

# Axios Basics

## Example

Performing a GET request

```
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

> NOTE: async/await is part of ECMAScript 2017 and is not supported in Internet Explorer and older browsers, so use with caution.

Performing a POST request

```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

Performing multiple concurrent requests

```
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

## Axios API

Requests can be made by passing the relevant config to axios.

axios(config)

```
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

```
// GET request for remote image
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```

axios(url[, config])

```
// Send a GET request (default method)
axios('/user/12345');
```

## Creating an Instance

You can create a new instance of axios with a custom config.

```
axios.create([config])
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```
