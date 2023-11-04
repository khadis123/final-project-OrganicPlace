import { Link } from "react-router-dom";
import styled from "styled-components";
import { CgShoppingCart } from "react-icons/cg";
import { useContext, useState } from "react";
import { UserContext } from "../CurrentUserContext";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";


const Header = ({ cartItems }) => {
  // const [user, setUser] = useContext(user);
  const { user, setUser } = useContext(UserContext);
  if (user) {
    console.log(user._id);
  }

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   //Fetching the cart data to see what items is in the cart.
//   const theCartFetch = () => {
//     if (user) {
//     fetch(`/users/${user._id}/cart`)
//       .then((res) => res.json())
//       .then((parsedData) => {
//         setCartItems(parsedData.data);
//         setLoading(true);
//       });
//     }
//   };
// console.log(user)
//     //When the page renders, we're calling theCartFetch function above.
//     useEffect(() => {
//       theCartFetch();
//     }, []);

  return (
    <Wrapper>
      <header>
        <StyledLogoLink to="/">OrganicPlace</StyledLogoLink>
      </header>

      <header>{user && (
        <HeaderCartButton as={NavLink} to={`/users/${user._id}/cart`}>
          <>
                      <CgShoppingCart />

            <Number>{user.cart.length}</Number>
            </>
         
        </HeaderCartButton> 
        )}
        {!user ? (
          <StyledLink to="/login">Login</StyledLink>
        ) : (
          <StyledLink
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
            }}
            to="/"
          >
            Logout
          </StyledLink>
        )}
        {user && (
          <StyledLink to={`/userprofile/${user._id}`}>Profile</StyledLink>
        )}
        <StyledLink to="/signup">SignUp</StyledLink>
      </header>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  font-family: "Montserrat", sans-serif;
`;

const StyledLink = styled(Link)`
  color: #51af5b;
  text-decoration: none;
  margin: 1rem;
`;

const StyledLogoLink = styled(Link)`
  color: #51af5b;
  text-decoration: none;
  font-size: 36px;
  font-weight: 700;
  /* margin: 1rem; */
  font-style: italic;
`;

const HeaderCartButton = styled.a`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #51af5b;
  cursor: pointer;
  margin-left: 30px;
  flex-grow: 0;

  @media (max-width: 1400px) {
    font-size: 25px;
  }
`;

const Number = styled.span`
  position: relative;
  font-weight: bold;
  padding: 5px;
  border-radius: 10px;
  top: -20px;
  right: 5px;
  font-size: 20px;
  color: #51af5b;

  @media (max-width: 1400px) {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-family: var(--font-heading);
  font-size: 18px;
  padding: 0 15px;
  cursor: pointer;

  @media (max-width: 1500px) {
    font-size: 14px;
    padding: 0 10px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 0 5px;
  }
`;

// --color-main: #51AF5B;
// --color-secondary: #B3E55E;
// --color-third-golden: #FFCB3C;
