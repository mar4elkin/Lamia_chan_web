import React from 'react';
import './Auth.css'
import {apiWorker} from '../Api/apiWorker'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import getUser from '../Api/userAPI';
import imageLight from '../../images/loginLight.png';
import imageDark from '../../images/loginDark.png';

class Auth extends React.Component{
    constructor(){
        super()
        this.state = {
          username: '',
          password: '',
          userData: '',
          redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    _isMounted = false;

    async componentDidMount(){
      this._isMounted = true;
      await getUser(this.props.userLink).then(data =>{
        this.setState({ userData: data })
      })
    }

    async authUser(userName, password){
        let body = { username: userName, password: password }
        await apiWorker(this.props.tokenGetter, 'post', body).then(response => {this.setState({userArr : response})})
        console.log(this.state.userArr);

        let userAnswer = this.state.userArr;

        //TODO we need to render server answer
        //https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36/
        //and make checks on all pages to understand when user logged
        console.log(userAnswer.access)
        if ( 'refresh' in userAnswer &&  'access' in userAnswer ){
            window.localStorage.setItem('token-access', userAnswer.access);
            window.localStorage.setItem('token-refresh', userAnswer.refresh);
            console.log("Token saved successfully!")
            
            //DO redirect
            this.setState({
              redirect: true
            })
        } else {
            console.log('plz check server answer array');
        }
        
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
    
    //Redirect function
    renderRedirect = () => {
      if (this.state.redirect) {
          return <Redirect to={'/userpage/'+ this.state.userData.username} />
      }
    }
    //Need change: We don't need state for this purpose!
    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    handleSubmit(){
        // TODO we need to check user data 
        var userName = this.state.username;
        var password = this.state.password;
        this.authUser(userName, password);
    }

    //Render picture depends on color theme
    pictRender(props){
        if(this.props.mainColor.color == "#B52556"){
            return(
                <img src={imageDark} className="pict"></img>
            )
        }
        else{
            return(
                <img src={imageLight} className="pict"></img>
            )
        }
    }


    render(){
        return(
        <div className="modal fade bd-example-modal-xl" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
                <div class="modal-body px-0 pt-0" style={{background: this.props.mainColor.smallBack}}>
                        <div className="MainForm">
                            <div className="forms_container">
                                <div className="forms">
                                <h1 className="forms_header" style={{color: this.props.mainColor.textColor}}>Авторизация</h1>
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Enter user name" 
                                            className="forms_form"
                                            name="username"
                                            style={{borderColor: this.props.mainColor.color}}
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password"
                                        className="forms_form"
                                        name="password"
                                        style={{borderColor: this.props.mainColor.color, borderColor: this.props.mainColor.color}}
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" 
                                    className="forms_button"
                                    onClick={this.handleSubmit}
                                    style={{background: this.props.mainColor.color}}
                                >
                                    Войти
                                </Button>
                                {/* This thing will make redirect? don't touch it! */}
                                {this.renderRedirect()}
                                <Link to="/registration">
                                    <Button variant="primary" type="submit" 
                                        className="forms_button mr-0"
                                        onClick={this.handleSubmit}
                                        style={{background: this.props.mainColor.color, borderColor: this.props.mainColor.color}}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </Link>
                                </div>
                            </div>
                            <div className="links">
                                <a className="links_link google" style={{borderColor: this.props.mainColor.color}} href="#"><i class="fa fa-google"></i></a>
                                <a className="links_link facebook" style={{borderColor: this.props.mainColor.color}} href="#"><i className="fa fa-facebook-f"></i></a>
                                <a className="links_link twitter" style={{borderColor: this.props.mainColor.color}} href="#"><i className="fa fa-twitter"></i></a>
                                <a className="links_link vk" style={{borderColor: this.props.mainColor.color}} href="#"><i className="fa fa-vk"></i></a>
                            </div>
                        </div>
                        {this.pictRender()}
                </div>
            </div>
            </div>
        </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
      tokenGetter: state.apiLinks.tokenGetter,
      userLink: state.apiLinks.userInfo,
      mainColor: state.mainColor
    }
  }
  
export default connect(mapStateToProps) (Auth);