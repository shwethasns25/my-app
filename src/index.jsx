import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from 'routes';
import musicPlayer from './reducers';

const root = document.getElementById('app');
const history = useRouterHistory(createHistory)({ basename: process.env.PUBLIC_PATH });
const store = createStore(
  musicPlayer
);

const renderApp = () => (
  <AppContainer>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </AppContainer>
);

render(renderApp(), root);

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes');
    render(renderApp(), root);
  });
}
