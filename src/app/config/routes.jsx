import React, { Component, Suspense, lazy } from 'react';
import Spinner from '../shared/Spinner';
import App from '../App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {validateToken} from '../auth/AuthActions';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import '../App.scss';
import '../Custom.scss'

import { createHashHistory } from 'history'
export const history = createHashHistory()

const SignIn         = lazy(() => import('../auth/SignIn'));
const Dashboard      = lazy(() => import('../dashboard/Dashboard'));

export class Routes extends Component {

  componentDidMount() {
    if(this.props.auth.user) {
      this.props.validateToken(this.props.auth.user.token)
    }
  }

  render() {
    const { auth } = this.props
    const rediretIfLogged = auth.user && auth.validToken ? <Redirect to="/"/> : ""
    return(
      <BrowserRouter>
        <Suspense fallback={<Spinner/>}>
          <Switch>
            <Redirect from="/" exact={true} to="/dashboard" />
            <Route path="/users">
              {rediretIfLogged}
              <Route path="/users/sign_in" component={SignIn} />
            </Route>
            <App history={history}>
              <Route exact={true} path="/dashboard" component={Dashboard} />
            </App>
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Routes)