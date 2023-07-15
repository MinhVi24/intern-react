import React from 'react';
import { navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @function  UserContext
const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: '', auth: false });

  const loginContext = (email ,token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);  
   
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("email"); 
    setUser((user) => ({
      email: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};





export { UserContext, UserProvider };
