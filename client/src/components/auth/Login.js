import React, {useState, useEffect, useContext} from 'react'

// Context
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = (props) => {

    const authContext = useContext(AuthContext);
    const {login, error, isAuthenticated, clearErrors} = authContext;

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
        email:'',
        password:''
    });

    const {email, password} =input;


    const onChange = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(email ==='' || password === ''){
            setAlert('Please enter all fields', 'danger');
        }else{
            login({
                email,
                password
            });
        }
    };

  return (
    <div className="container bg-light p-3 mt-4">
        <form onSubmit={onSubmit}>
        <p className="h2 mb-3 text-center">Account <span className="text-primary">Login</span></p>
            <div className="form-group">
                <label>Email address</label>
                <input
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
            <button type="submit" className="btn btn-success btn-sm">Login</button>
        </form>
    </div>
  )
}

export default Login
