import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from "react-redux";


const PrivateRoute = (props) => {

    const user =useSelector(state => state.user.account);
    if (user && !user.auth) {
        return <>

            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>

                    Please log in to continue.


                </p>

            </Alert>
        </>

    }

    return (<>

        {props.children}

    </>)

}

export default PrivateRoute;