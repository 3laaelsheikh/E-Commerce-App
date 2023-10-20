import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    
    
    if(localStorage.getItem("tkn")){
        return<>
        { props.children }
        </>
    }
    else{
        return (<>
            <Navigate to="/login" /> 
            </>
        ); 
    }
    
};

export default ProtectedRoute;
