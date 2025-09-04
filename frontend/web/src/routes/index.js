import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import EquipmentManagement from '../pages/EquipmentManagement';

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/equipment" component={EquipmentManagement} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;