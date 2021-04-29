import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/global.scss';
import { GlobalNav } from './common/components';
import { WebsocketProvider } from './common/context';
import { About, Home } from './pages';

export const App = () => (
  <WebsocketProvider>
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
  </WebsocketProvider>
);

export default App;
