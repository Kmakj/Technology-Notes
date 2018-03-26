# Technology Readme

This is a basic readme which will be a brief on all technology used in the project.

# React

React is a component based method for rending UI using javascript. Javascript expression can be toggled by putting everything in {} brackets, which will allow any javascript to be run from within.

## JSX

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:

You may use quotes to specify string literals as attributes:

```
const element = <div tabIndex="0"></div>;
```

You may also use curly braces to embed a JavaScript expression in an attribute:

```
const element = <img src={user.avatarUrl}></img>;
```

If a tag is empty, you may close it immediately with />, like XML:

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
