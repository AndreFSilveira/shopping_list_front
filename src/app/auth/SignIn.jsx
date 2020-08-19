import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {validateToken, login} from './AuthActions';
import Logo from "../../assets/images/logo.svg"

export class Login extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    if(e) e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    this.props.login({user: {email, password}}, this.props.history)
  }

  render() {
    return (
      this.props.auth.validToken ?
        <Redirect to='/'></Redirect> :
        <div>
          <div className="d-flex align-items-stretch auth auth-img-bg h-100">
            <div className="row flex-grow">
              <div className="col-lg-6 d-flex align-items-center justify-content-center">
                <div className="auth-form-transparent text-left p-3">
                  <div className="brand-logo">
                    <img src={Logo} alt="logo" />
                  </div>
                  <h4>Seja bem-vindo novamente!</h4>
                  <h6 className="font-weight-light">Ficamos felizes em vê-lo de volta.</h6>
                  <form onSubmit={this.onSubmit} className="pt-3">
                    <div className="form-group">
                      <label>E-mail</label>
                      <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="mdi mdi-account-outline text-primary"></i>
                        </span>
                        </div>
                        <input required type="email" className="form-control form-control-lg border-left-0" id="exampleInputEmail" placeholder="E-mail" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Senha</label>
                      <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="mdi mdi-lock-outline text-primary"></i>
                        </span>
                        </div>
                        <input required type="password" className="form-control form-control-lg border-left-0" id="exampleInputPassword" placeholder="Senha" />
                      </div>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <Link to="/users/forgot_password" className="auth-link text-black">Esqueceu sua senha?</Link>
                    </div>
                    <div className="my-3">
                      <input type="submit" className="btn btn-block btn-primary btn-lg font-weight-semibold auth-form-btn" value="Entrar" />
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Ainda não tem uma conta? <Link to="/users/sign_up" className="text-primary">Crie já!</Link>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 login-half-bg d-flex flex-row">
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ login, validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Login)