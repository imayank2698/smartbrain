import React,{Component} from 'react';

class Signin extends Component{
    
    constructor(props){
    
        super(props);
        this.state = {  
                        signinEmail:"",
                        signinPassword:"",

                    }
    }

    onEmailChange = (event) =>{
        this.setState({signinEmail:event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({signinPassword:event.target.value});
    }

    onSigninSubmit = (event) =>{
        //console.log(this.state.signinEmail,this.state.signinPassword);
        fetch("https://powerful-dusk-13127.herokuapp.com/signin",
                {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email:this.state.signinEmail,
                        password:this.state.signinPassword
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.id){
                        this.props.loadUser(data);
                        this.props.onRouteChange("home");
                    }
                })
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <article className="br2 ba dark-gray b--black-10 mv4 w-200 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange = {this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange = {this.onPasswordChange}
                                     />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit"
                                value="Sign in"
                                onClick = {this.onSigninSubmit} />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick = {() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article> 
            
        );


    }
    
}

export default Signin;