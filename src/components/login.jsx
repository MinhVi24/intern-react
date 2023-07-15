import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi } from '../services/UserService';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '../redux/actions/userAction';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)


    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required');
            return;
        }
        dispatch(handleLoginRedux(email, password));
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const handlePressEnter = async (event) => {
        if (event && event.key === 'Enter') {
            await handleLogin();
        }

    }

    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/")
        }
    }, [account])
    return (
        <>
            <h1 className="d-flex justify-content-center">Login</h1>
            <div className="d-flex justify-content-center  ">
                <div>
                    <Form.Group className="w-100 " controlId="formBasicEmail">
                        <Form.Label>Email address (eve.holt@reqres.in)</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <div className="input-2">
                        <Form.Group className="w-100" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={isShowPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onKeyDown={(event) => handlePressEnter(event)}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <i
                                className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            ></i>
                        </Form.Group>
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-4 w-100"
                        id={email && password ? 'active' : ''}
                        disabled={!email || !password}
                        onClick={handleLogin}
                    >
                        {isLoading ? <i className="fa-solid fa-sync fa-spin"></i> : null} &nbsp;Login
                    </Button>
                </div>
            </div>
            <div className="back d-flex justify-content-center">
                <i className="fa-solid fa-angles-left mt-5" onClick={handleGoBack}>
                    <span>Go back</span>
                </i>
            </div>
        </>
    );
};

export default Login;
