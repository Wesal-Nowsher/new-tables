import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppBreadcrumb
} from '@coreui/react';
// sidebar nav config
// routes config
import routes from '../../routes';
import img from '../..//assets/loader.gif';

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center"><img src={img} className="small-pic"/></div>


  render() {
    return (
      <div className="app">
        
        <div className="app-body">
          
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect />
                </Switch>
              </Suspense>
            </Container>
          </main>

        </div>
      </div>
    );
  }
}

export default DefaultLayout;
