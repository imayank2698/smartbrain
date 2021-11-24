import React,{Component} from 'react';


class Register extends Component{

    constructor(props){
    
        super(props);
        this.state = {  
                        name:"",
                        email:"",
                        password:"",

                    }
    }

    onNameChange = (event) =>{
        this.setState({name:event.target.value});
    }
    onEmailChange = (event) =>{
        this.setState({email:event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password:event.target.value});
    }

    onRegister = (event) =>{
        fetch("https://powerful-dusk-13127.herokuapp.com/register",
                {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        name:this.state.name,
                        email:this.state.email,
                        password:this.state.password
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
        return(
            <article className="br2 ba dark-gray b--black-10 mv4 w-200 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlfor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150"
                                    type="name" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150"
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                     />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150"
                                    type="password"
                                    name="password"
                                    id="password" 
                                    onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                                onClick={this.onRegister}/>
                        </div>
                    </div>
                </main>
            </article>
            
            
        );

    }
    
    
}

export default Register;