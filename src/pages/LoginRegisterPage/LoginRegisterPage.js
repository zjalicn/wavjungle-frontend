import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { userActions } from '../../actions';
import { connect } from 'react-redux';

class LoginRegisterPage extends Component {
  
  constructor(props) {
    super(props);
    this.props.logout(); //reset status
    this.state = {
        username: '',
        password: '',
        submitted: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
        <Container>
            <Row>
            <Col md={4}></Col>
            <Col md={4} className="login-card">
                <h1>Login</h1>
                <hr />
            <Form onSubmit={this.handleSubmit}>
                <p>Username</p>
                <input 
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                {submitted && !username &&
                  <div className="help-block">Username is required</div>
                }
                <p>Password</p>
                <input 
                  type="text"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  ></input>
                {submitted && !password &&
                  <div className="help-block">Password is required</div>
                }
                <br/>
                <button variant="success">Submit</button>
              </Form>
            </Col>
            </Row>
        </Container>
    );
  }
}

function mapState(state){
  const { loggingIn } = state.authenticate;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

export default connect(mapState, actionCreators)(LoginRegisterPage);
