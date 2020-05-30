import React, {useContext} from 'react'

import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
  return (
      alertContext.alerts.length>0 && alertContext.alerts.map(alert => (
          <div className="container mt-3"
            key={alert.id}
          >
            <div className={`alert alert-${alert.type} d-flex`} role="alert">
                <i className="fas fa-info-circle mr-3" style={{fontSize:'1.5em'}}></i>
                {alert.msg}
            </div>
        </div>
      ))
  )
}

export default Alert
