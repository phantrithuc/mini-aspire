import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/less/index.less';
import App from './App';
import { initMockAxios } from 'testUtils/mockAxios';
initMockAxios();
ReactDOM.render(<App />, document.getElementById('root'));
