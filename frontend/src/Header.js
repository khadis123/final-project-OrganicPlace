import { Link } from "react-router-dom";
import styled from "styled-components";


const Header = () => {
  return (
    <Wrapper>
      <header>
        <StyledLogoLink to="/">OrganicPlace</StyledLogoLink>
      </header>

      <header>
        <StyledLink to="/">Login</StyledLink>
        <StyledLink to="/about">SignUp</StyledLink>
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
padding: 20px 60px; 
font-family: 'Montserrat', sans-serif;
`;


const StyledLink = styled(Link)`
color: blue;
text-decoration: none;
margin: 1rem;
`; 

const StyledLogoLink = styled(Link)`
color: black;
text-decoration: none;
font-size: 36px;
font-weight: 700;
margin: 1rem;
`; 