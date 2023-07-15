
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import {  useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';
import Footer from './components/Footer';







function App() {

 const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch((handleRefresh()))
    }
  }, [])


  return (
    <>

      <div className="App">

        <Header />
        <Container>
          <AppRoutes />
        </Container>
        <Footer/>
       
     


      </div>
      {/* hiên thị thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
