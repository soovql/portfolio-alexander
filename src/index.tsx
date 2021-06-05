import * as React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, withRouter, BrowserRouter} from 'react-router-dom';
import { Nature } from './pages/Nature';
import { Order } from './pages/Order';
import { City } from './pages/City';
import { MainPage } from './pages/MainPage';
import './components/Cursor/style.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import 'normalize.css';
import 'reset-css-complete/reset.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import "swiper/components/navigation/navigation.min.css";
import 'swiper/swiper.scss';
import './style.scss';

function isTouchDevice() {
  return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
}

const isMobile = isTouchDevice();

if (isMobile) {document.body.className = 'mobile';}

const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup className={"wrapper"}>
      <CSSTransition key={location.key} classNames="slide" timeout={1000}>
          <Switch location={location}>
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
      </CSSTransition>
    </TransitionGroup>
));

const App = () => (
      <BrowserRouter>
          <AnimatedSwitch />
      </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
