import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {validateToken, logout} from './auth/AuthActions';
import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  componentDidMount() {
    if(this.props.auth.user) {
      this.props.validateToken(this.props.auth.user.token)
    }
  }
  render () {
    const { auth } = this.props
    const rediretIfLogged = auth.user && auth.validToken ? <Redirect to="/"/> : <Redirect to="/users/sign_in" />
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Redirect from="/" exact={true} to="/dashboard" />
          <Route path="/users">
            {rediretIfLogged}
            <Route path="/users/sign_in" component={Login} />
            <Route path="/user/register" component={ Register1 } />
          </Route>
          <Route exact path="/dashboard" component={ Dashboard } />

        </Switch>
      </Suspense>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken, logout },
  dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes)