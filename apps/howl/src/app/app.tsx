import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/global.scss';
import { GlobalNav } from './common/components';
import { DarkModeProvider, WebsocketProvider } from './common/context';
import { About, Home } from './pages';

export const App = () => (
  <DarkModeProvider>
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
  </DarkModeProvider>
);

export default App;
