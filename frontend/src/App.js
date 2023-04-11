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
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./SignUp";
import { useContext } from "react";
import { UserContext } from "./CurrentUserContext";

function App() {

  const { user, setUser } = useContext(UserContext);

    // Lifted the state for the countItem to provide access to this variable in Header, Cart, ItemCard, and ItemDetails
    const [countItem, setCountItem] = useState(null);
  
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // //Fetching the cart data to see what items is in the cart.
    // const theCartFetch = () => {
    //   if (user) {
    //   fetch(`/users/${user._id}/cart`)
    //     .then((res) => res.json())
    //     .then((parsedData) => {
    //       setCartItems(parsedData.data);
    //       setLoading(true);
    //     });
    //   }
    // };
  // console.log(user)
  //     //When the page renders, we're calling theCartFetch function above.
  //     useEffect(() => {
  //       theCartFetch();
  //     }, []);
  

  // //fetches the data from the cart based on userId to know what items a user has in the cart
  const itemFetching = () => {
    if (user) {
    fetch(`/users/${user._id}/cart`) 
      .then((res) => res.json())
      .then((data) => {
        setCountItem(data.data);
      });
    }
  };

  // //when the page renders, we're calling the itemFetching function.
  useEffect(() => {
    itemFetching();
  }, []);

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header cartItems={cartItems}/>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users/:userId/cart" element={<Cart itemFetching={itemFetching} />} />
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
          <Route path="/items/:_id" element={<ItemDetails itemFetching={itemFetching}/>} />
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
