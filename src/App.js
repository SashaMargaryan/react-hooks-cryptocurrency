import React from 'react';
import Header from './components/common/Header';
import { Switch, Route, withRouter, Router } from 'react-router-dom';
import List from './components/list/List';
import Detail from './components/detali/Detail';


const App = (props) => {
    const {location} = props;
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route  path={location.pathname === '/' ? '/' : '/page/:id'}   component={List} />
                <Route path="/currency/:id"  component={Detail} />
            </Switch>
        </div>
    )
};

export default withRouter(App);