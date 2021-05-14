import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import UserScreen from './pages/UserScreen';
import LocationScreen from './pages/LocationScreen';
import IDScreen from './pages/IDScreen';
import IDDetailScreen from './pages/IDDetailScreen';
import SKUDetailScreen from './pages/SKUDetailScreen';

function App() {
  return (
    <React.Fragment>
      <main className="w-full h-full" style={{ minHeight: "100vh" }}>
        <Switch>
          <Redirect from="/" exact to="/user" />
          <Route path="/user" component={UserScreen} />
          <Route path="/location" component={LocationScreen} />
          <Route path="/id" component={IDScreen} />
          <Route path="/iddetail" component={IDDetailScreen} />
          <Route path="/sku" component={SKUDetailScreen} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
