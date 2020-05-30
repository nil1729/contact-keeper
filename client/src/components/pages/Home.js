import React, {useContext, useEffect} from 'react'
// Context
import AuthContext from '../../context/auth/authContext';

// Componenets
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
const Home = () => {

  const authContext = useContext(AuthContext);
  const {loadUser} = authContext;
  useEffect(()=>{
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
           <ContactForm/>
        </div>
        <div className="col-md-6">
           <Contacts/>
        </div>
      </div>
    </div>
  )
}

export default Home
