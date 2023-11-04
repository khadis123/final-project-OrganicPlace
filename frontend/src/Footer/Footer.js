import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
    AiOutlineYoutube,
    AiOutlineFacebook,
    AiOutlineInstagram,
    AiOutlineTwitter,
  } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {

    return (
        <>
         <Wrapper>
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
    </Wrapper>
        </>
    )
}

export default Footer;

const Link = styled(NavLink)`
  color: black;
`;
const Wrapper = styled.div`
  padding: 40px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;