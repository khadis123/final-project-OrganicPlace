import logo from "./logo.svg";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Cart from "./Cart";
import AboutUs from "./AboutUs";
import CartItem from "./CartItem";
import Category from "./Category";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import ContactUs from "./ContactUs";
import FollowUs from "./FollowUs";
import Footer from "./Footer";
import Homepage from "./Homepage";
import ItemCard from "./ItemCard";
import ItemDetails from "./ItemDetails";
import Items from "./Items";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import AddItemAsSeller from "./AddItemAsSeller";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  // const { isLoading, error, user } = useAuth0();
  // console.log(user)

  // {error && <p>Authentication error</p>}
  // {!error && isLoading && <p>Loading</p>}
  // {!error && !isLoading && (
  //   <>
  //    <LoginButton />
  //     <LogoutButton />
  //     <Profile />
  //   </>
  // )}
  // //Fetching the data from the cart to know what we have in the cart
  // const itemFetching = () => {
  //   fetch("/cart")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountItem(data.data);
  //     });
  // };

  // //when the page render, we're calling the itemFetching function.
  // useEffect(() => {
  //   itemFetching();
  // }, []);

  // Lifted the state for the countItem in order to have access to this variable in Header, Cart, ItemCard, and ItemDetails
  const [countItem, setCountItem] = useState(null);

  //Fetching the data from the cart to see the items in the cart
  // const itemFetching = () => {
  //   fetch("/cart")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountItem(data.data);
  //     });
  // };

  //when the page renders, we're calling the itemFetching function.
  useEffect(() => {
    // itemFetching();
  }, []);

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        {/* <main>
          {error && <p>Authentication error</p>}
          {!error && isLoading && <p>Loading</p>}
          {!error && !isLoading && (
            <>
              <LoginButton />
              <LogoutButton />
              <Profile />
            </>
          )}
        </main> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/cart" element={<Cart itemFetching={itemFetching} />} /> */}
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={< Login/>} />
          
          <Route path="/checkout"
            element={<Checkout setCountItem={setCountItem} />}
          />
          <Route path="/confirmation/:orderId" element={<Confirmation />} />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:_id" element={<ItemDetails />} />
          <Route path="/categories/:category" element={<Category />} />
          {/* <Route path="/userprofile/:userId" element={<UserProfile />} /> */}
          <Route path="/userprofile/:userId/addproduct" element={<AddItemAsSeller />}
            
          />
          {/* <Route path="" /> */}
          <Route path="" element={<h1>404: Something went wrong!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
