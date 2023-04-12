import styled from "styled-components";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import GlobalStyles from "./GlobalStyles";
import { TbLoader3 } from "react-icons/tb";
import { useContext } from "react";
import { UserContext } from "./CurrentUserContext";


//Cart component containing information about the items in the cart.
const Checkout = () => {

    const { user, setUser } = useContext(UserContext);


  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("cartItems", cartItems)

  //Fetching the cart data to display what items are in the cart.
  const theCartFetch = () => {
    fetch(`/users/${user._id}/cart`)
      .then((res) => res.json())
      .then((parsedData) => {
        setCartItems(parsedData.data);
        // setLoading(true);
      });
  };

  //When the page renders, we're calling theCartFetch function above.
  useEffect(() => {
    theCartFetch();
  }, []);

  //When the user clicks on "checkout", it navigates him to the /checkout page.
  if (user) {
  }
  const handleClick = () => {
    navigate(`/users/${user._id}/checkout`);
  };

  //When the user clicks on "back", it navigates him to the previous page he was on.
  const handleBackClick = () => {
    window.history.back();
  };




    return (
        <>
        <Wrapper>
        <StyledH1>Checkout</StyledH1>

        <StyledBackToProfileSection>
            <StyledH3>
                Your Order Details:
            </StyledH3>
        </StyledBackToProfileSection>
        </Wrapper>
        </>
    )
}

export default Checkout;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`

const StyledBackToProfileSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 7px;
  padding: 10px;
  width: 800px;
  align-items: center;
  justify-content: center;
  background-color: ---color-main-background;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledH1 = styled.h1`
text-align: left;
padding: 0 100px;
padding-top: 20px;
padding-bottom: 30px;
`
const StyledH3 = styled.h3`
text-align: left;
padding: 0 100px;
padding-bottom: 30px;
`