import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import { HomePage, SamplePage, NotFoundPage, DoublyList, MusicApp } from 'components';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/sample" component={SamplePage} />
    <Route path="/dll" component={DoublyList} />
    <Route path="/music" component={MusicApp} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
