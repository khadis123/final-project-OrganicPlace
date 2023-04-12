import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem";
import GlobalStyles from "./GlobalStyles";
import { TbLoader3 } from "react-icons/tb";
import { useContext } from "react";
import { UserContext } from "./CurrentUserContext";


//Cart component containing information about the items in the cart.
const Cart = ({ itemFetching }) => {

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
    <Wrapper>
      <GlobalStyles />
      {loading ? (
        <StyledLoaderIcon>
          <TbLoader3 />
        </StyledLoaderIcon>
      ) : (
        <>
          <Left>
            {cartItems.length === 0 ? (
              <p>Your shopping cart is empty</p>
            ) : (
              <Styledh3>Your shopping cart</Styledh3>
            )}

            {cartItems.map((cartItem) => (
              <CartItem
                theCartFetch={theCartFetch}
                cartItem={cartItem}
                itemFetching={itemFetching}
              />
            ))}
          </Left>
        </>
      )}
      <Right>
        <p></p>
        <ButtonsWrapper>
          <Button onClick={handleBackClick}>Back to HOMEPAGE</Button>
          <StyledCheckoutBtn disabled={cartItems.length === 0} onClick={handleClick}>
            Checkout
          </StyledCheckoutBtn>
        </ButtonsWrapper>
      </Right>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  height: 100%;
  border-radius: 7px;
`;

const Styledh3 = styled.h3`
text-align: left;
padding: 0 100px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  justify-content: flex-start;
  padding: 10px 20px;

`;
const Button = styled.button`
  margin: 0 20px 0 0;
  background-color: #51AF5B;
  border-radius: 7px;
`;

const StyledCheckoutBtn = styled.button`
  opacity: ${(props) => props.disabled && "0.5"};
  background-color: #FFCB3C;
`;
const StyledLoaderIcon = styled(TbLoader3)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 7vh;
  width: 7vw;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
