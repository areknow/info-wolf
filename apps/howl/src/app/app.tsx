import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/global.scss';
import GlobalNav from './common/components/global-nav';
import About from './pages/about';
import Home from './pages/home';

export const App = () => (
  <Router>
    <GlobalNav />
    <div className="content">
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
