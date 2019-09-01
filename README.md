This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with [React App Wired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra)

# Development Environment

Node v10.15.2

## Local Development with Mock Axios

Mock data is in src/testUtils

Run App

```
npm start
```

## Demo Input

Notes:

- Enter demo values of username and password in Login Form to login
- Enter demo values of create loan form to get success otherwise mock axios return error

# Folder Structure

```
📦src
 ┣ 📂assets //store less,css,img files
 ┃ ┗ 📂less
 ┣ 📂components //share components that are moved from features
 ┣ 📂const
 ┣ 📂features // based on domains(e.g auth, layout, admin etc), a folder contains component, container or styled component
 ┣ 📂services // services calls to external services( e.g backend api, localstorage, etc) to return data to features or store
 ┣ 📂store // redux store
 ┃ ┗ 📂ducks // a duck folder contains actions, reducers, actions types, thunks or sagas of a domain.
 ┣ 📂styles // share styles
 ┣ 📂testUtils // create mock data
 ┗ 📂utils // pure functions

```

# Coding Conventions

## Filename Postfix

Prefer postfix of filename instead of child folder:

### 1. Component

React Component that has no connect to Redux Store

### 2. Container

React Component that connects to Redux Store

### 3. Styled

The Component or Container that are styled using [styled-components](https://www.styled-components.com/).
