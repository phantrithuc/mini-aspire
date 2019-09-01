This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with [React App Wired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra)

# Development Environment

Node v10.15.2

## Local Development with Mock Axios

Mock data is in src/testUtils

Run App

```
npm start
```

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

# User Stories

## Authentication

### 1. Login

As a user, I want to login
