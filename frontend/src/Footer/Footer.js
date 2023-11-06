import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import {
    AiOutlineYoutube,
    AiOutlineFacebook,
    AiOutlineInstagram,
    AiOutlineTwitter,
  } from "react-icons/ai";
import { 
    RiTwitterXLine 
} from "react-icons/ri";

const Footer = () => {

    return (
        <>
         <Wrapper>
            <FirstColumn>
                <FooterHeadings>
                    <h5>About Us</h5>
                        </FooterHeadings>
      <Link to="#">
        <AiOutlineYoutube />
      </Link>
      <Link to="#">
        <AiOutlineFacebook />
      </Link>
      <Link to="#">
        <AiOutlineInstagram />
      </Link>
      <Link to="#">
        {/* <RiTwitterXLine /> */}
      </Link>
      </FirstColumn>

      <SecondColumn>
      <Link to="#">
        <AiOutlineYoutube />
      </Link>
      <Link to="#">
        <AiOutlineFacebook />
      </Link>
      <Link to="#">
        <AiOutlineInstagram />
      </Link>
      <Link to="#">
        {/* <RiTwitterXLine /> */}
      </Link>
      </SecondColumn>

      <ThirdColumn>
      <Link to="#">
        <AiOutlineYoutube />
      </Link>
      <Link to="#">
        <AiOutlineFacebook />
      </Link>
      <Link to="#">
        <AiOutlineInstagram />
      </Link>
      <Link to="#">
        {/* <RiTwitterXLine /> */}
      </Link>
      </ThirdColumn>

      <FourthColumn>
      <Link to="#">
        <AiOutlineYoutube />
      </Link>
      <Link to="#">
        <AiOutlineFacebook />
      </Link>
      <Link to="#">
        <AiOutlineInstagram />
      </Link>
      <Link to="#">
        {/* <RiTwitterXLine /> */}
      </Link>
      </FourthColumn>
    </Wrapper>
        </>
    )
}

export default Footer;

const Link = styled(NavLink)`
  color: black;
`;

const Wrapper = styled.div`
  /* padding: 20px 20px;
  width: 1440px;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: var(--color-main); */
  font-family: "Montserrat", sans-serif;

  padding: 20px 0px;
  width: 1440;
  margin-left: auto;
  margin-right: auto; /* Center the container by setting left and right margins to auto */
  margin-top: 40px;
  /* display: flex; */

  /* flex-direction: column; */
  justify-content: center; /* Adjust this based on your layout requirements */
  background: var(--color-main);

  display: grid;
  grid-template-columns: repeat(4,minmax(0,1fr));
  column-gap: 35px;
`;

const FirstColumn = styled.div`
  padding: 0px;
  box-sizing: border-box;
  @media (min-width: 950px)
`;

const SecondColumn = styled.div`
padding: 0px;
  box-sizing: border-box;
  @media (min-width: 950px)
`;

const ThirdColumn = styled.div`
padding: 0px;
  box-sizing: border-box;
  @media (min-width: 950px)
`;

const FourthColumn = styled.div`
padding: 0px;
  box-sizing: border-box;
  @media (min-width: 950px)
`;

const FooterHeadings = styled.h5`
font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-bottom: 10px;
`;