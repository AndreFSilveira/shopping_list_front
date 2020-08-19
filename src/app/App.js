import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {validateToken, logout} from './auth/AuthActions';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';

class App extends Component {
  componentDidMount() {
    if(this.props.auth.user) {
      this.props.validateToken(this.props.auth.user.token)
    }
  }

  render(){
    const { auth, children } = this.props
    if(auth.user && auth.user.token)
      axios.defaults.headers.common['authorization'] = auth.user.token
    if(auth.validToken) {
      let navbarComponent = <Navbar/>
      let sidebarComponent = <Sidebar {...this.props} />
      let footerComponent = <Footer/>
      return (
        <div className="container-scroller">
          { sidebarComponent }
          <div className="container-fluid page-body-wrapper">
            { navbarComponent }
            <div className="main-panel">
              <div className="content-wrapper">
                {children}
              </div>
              { footerComponent }
            </div>
          </div>
        </div>
      )
    } else if(!auth.user) {
      return <Redirect to="/users/sign_in" />
    } else {
      return false
    }
  }

}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken, logout },
  dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)
