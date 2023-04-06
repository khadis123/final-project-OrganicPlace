import { Link } from "react-router-dom";
import styled from "styled-components";
import { CgShoppingCart } from "react-icons/cg";
import { useContext, useState } from "react";
import { UserContext } from "../src/CurrentUserContext"



const Header = () => {
  // const [user, setUser] = useContext(user);
  const { user, setUser } = useContext(UserContext);


  return (
    <Wrapper>
      <header>
        <StyledLogoLink to="/">OrganicPlace</StyledLogoLink>
      </header>

      <header>          <HeaderCartButton >
            <CgShoppingCart />
            { (
              <Number>{}</Number>
            )}
          </HeaderCartButton>
          {!user ? <StyledLink to="/login">Login</StyledLink> 
          : <StyledLink onClick={()=>setUser(null)} to="/">Logout</StyledLink>}
          {user && <StyledLink to="/userprofile/:userId">Profile</StyledLink>}
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
font-family: 'Montserrat', sans-serif;
`;


const StyledLink = styled(Link)`
color: #51AF5B;
text-decoration: none;
margin: 1rem;
`; 

const StyledLogoLink = styled(Link)`
color: #51AF5B;
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
  color: #51AF5B;
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
  color: #51AF5B;

  @media (max-width: 1400px) {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// --color-main: #51AF5B;
// --color-secondary: #B3E55E;
// --color-third-golden: #FFCB3C;