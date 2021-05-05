import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nature } from './pages/Nature';
import { Order } from './pages/Order';
import { City } from './pages/City';
import { MainPage } from './pages/MainPage';
import { Cursor } from './components/Cursor';
import 'normalize.css';
import 'reset-css-complete/reset.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './style.scss';

const App = () => (
  <>
    <Router>
      <>
        <Switch>
          <Route path="/nature">
            <Nature />
          </Route>
          <Route path="/city">
            <City />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </>
    </Router>
    {/*<Cursor />*/}
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
