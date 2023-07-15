import { Routes, Route } from "react-router-dom";
import TableUsers from '../components/TableUsers';
import Home from '../components/Home';
import Login from '../components/login';
import PrivateRoute from "./PrivateRoutes";
import NotFound from "./NotFound" ;

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/users"
                    element={
                        <PrivateRoute>

                            <TableUsers />
                        </PrivateRoute>

                    }
                />
                <Route path="*" element={<NotFound/>} />
            </Routes>

        </>
    )
}

export default AppRoutes;
