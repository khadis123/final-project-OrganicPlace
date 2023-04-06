import styled from "styled-components";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
// console.log(currentUser);
  // useEffect(() => {
  //   // Fetch the user data from the API ()
  //   fetch("/user")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === 400 || data.status === 500)
  //         throw new Error(data.message);
  //       else {
  //         // When the data is received, update currentUser.
  //         setUser(data);
  //         // Also, set `status` to `idle`
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default CurrentUserProvider;
