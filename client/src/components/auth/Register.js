import React, {useContext, useState, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = (props) => {
    const authContext = useContext(AuthContext);
    const {register, error, isAuthenticated, clearErrors} = authContext;

    useEffect(()=>{
        if(error!==null && typeof error !== 'undefined'){
            setAlert(error, 'danger');
            clearErrors();
        }
        if(isAuthenticated){
            props.history.push('/home');
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const alertContext = useContext(AlertContext);

    const {setAlert} = alertContext;

    const [input, setInput] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name, email, password, password2} =input;


    const onChange = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email ==='' || password === ''){
            setAlert('Please enter all fields', 'danger');
        }else if(password !== password2){
            setAlert('Password do not match','danger');
        }else{
            register({
                name,
                email,
                password
            });
        }
    };

  return (
    <div className="container bg-light p-3 mt-4">
        <form onSubmit={onSubmit}>
        <p className="h2 mb-3 text-center">Account <span className="text-primary">Register</span></p>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    minLength="6"
                    required
                    name="name"
                    value={name}
                    onChange={onChange}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input
                    minLength="6"
                    required
                    type="email"
                    value={email}
                    name="email"
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    minLength="6"
                    required 
                    type="password"
                    value={password}
                    name="password"
                    onChange={onChange} 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    minLength="6"
                    required 
                    type="password"
                    value={password2}
                    name="password2"
                    onChange={onChange} 
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-success btn-sm">Register</button>
        </form>
    </div>
  )
}

export default Register
