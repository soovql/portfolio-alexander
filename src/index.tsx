import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, withRouter, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Nature } from './pages/Nature';
import { Order } from './pages/Order';
import { City } from './pages/City';
import { MainPage } from './pages/MainPage';
import { ParallaxProvider } from "react-scroll-parallax";
import './components/Cursor/style.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'normalize.css';
import 'reset-css-complete/reset.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/swiper.scss';
import './style.scss';


function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

const isMobile = isTouchDevice();

if (isMobile) {
    document.body.className = 'mobile';
}

const AnimatedSwitch = withRouter(({ }) => {
    interface CustomizedState {
        from: string
    }
    const location = useLocation();
    const state = location.state as CustomizedState;
    const { from } = state;
    const to = location.pathname;

    // логика показа слайдов сверху или снизу в зависимости от порядка показа
    // не могу придумать нормальный роутинг
    const animationClassNames = () => {
        if (to == '/') {
            return "slide-backward";
        } else if (to == "/order") {
            return "slide-forward";
        } else if (from == "/") {
            return "slide-forward";
        } else if (to == "/city" && from == "/nature") {
            return "slide-forward";
        } else if (to == "/nature" && from == "/city") {
            return "slide-backward";
        } else if (to == "/city" && from == "/") {
            return "slide-forward";
        }
        else {
            return "slide-backward";
        }
    };

    return (

    <TransitionGroup
        className={'wrapper'}
        childFactory={child =>
            React.cloneElement(child, {
                classNames: animationClassNames()
            })
        }
    >
        <CSSTransition
            key={location.key}
            classNames={"slide"}
            timeout={1500}
        >
            <Switch location={location}>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route exact path="/nature">
                    <Nature />
                </Route>
                <Route exact path="/city">
                    <City />
                </Route>
                <Route exact path="/order">
                    <Order />
                </Route>
            </Switch>
        </CSSTransition>
    </TransitionGroup>
    );
})

const App = () => (
    <ParallaxProvider>
        <Router>
            <AnimatedSwitch/>
        </Router>
    </ParallaxProvider>
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
