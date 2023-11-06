import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import {
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLinkedin
} from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <FirstColumn>
          <FooterHeadings>
            <h5>About Us</h5>
          </FooterHeadings>

          <SubHeadingsWrapper>
            <SubHeadingsNav to={`/aboutus`}>About Us</SubHeadingsNav>
            <SubHeadingsNav to={`/contactus`}>Contact Us</SubHeadingsNav>
            <SubHeadingsNav to={`/helpcenter`}>Help-Center</SubHeadingsNav>
            <SubHeadingsNav to={`/career`}>Career</SubHeadingsNav>
            <SubHeadingsNav to={`/blog`}>Blog</SubHeadingsNav>
          </SubHeadingsWrapper>
        </FirstColumn>

        <SecondColumn>
          <FooterHeadings>
            <h5>For Buyers</h5>
          </FooterHeadings>

          <SubHeadingsWrapper>
            <SubHeadingsNav to={`/howitworksbuyers`}>
              How it works
            </SubHeadingsNav>
            <SubHeadingsNav to={`/helpcenter/faqforbuyers`}>FAQ</SubHeadingsNav>
            <SubHeadingsNav to={`/guidebookbuyers`}>Guidebook</SubHeadingsNav>
            <SubHeadingsNav to={`/helpcenter`}>Help-Center</SubHeadingsNav>
            <SubHeadingsNav to={`/contactus`}>Contact Us</SubHeadingsNav>
          </SubHeadingsWrapper>
        </SecondColumn>

        <ThirdColumn>
          <FooterHeadings>
            <h5>For Sellers</h5>
          </FooterHeadings>

          <SubHeadingsWrapper>
            <SubHeadingsNav to={`/howitworksbuyers`}>
              How it works
            </SubHeadingsNav>
            <SubHeadingsNav to={`/helpcenter/faqforbuyers`}>FAQ</SubHeadingsNav>
            <SubHeadingsNav to={`/guidebookbuyers`}>Guidebook</SubHeadingsNav>
            <SubHeadingsNav to={`/helpcenter`}>Help-Center</SubHeadingsNav>
            <SubHeadingsNav to={`/contactus`}>Contact Us</SubHeadingsNav>
          </SubHeadingsWrapper>
        </ThirdColumn>

        <FourthColumn>
          <FooterHeadings>
            <h5>Follow Us</h5>
          </FooterHeadings>
          <SubHeadingsWrapper>
            {/* <SubHeadingsNav to="#">
            <SocialIcon>YouTube</SocialIcon>
            <AiOutlineYoutube />
          </SubHeadingsNav> */}
            <SubHeadingsNav to="#">
              <SocialIcon>
                <AiOutlineYoutube />
              </SocialIcon>
              YouTube
            </SubHeadingsNav>

            <SubHeadingsNav to="#">
              <SocialIcon>
                <AiOutlineFacebook />
              </SocialIcon>
              Facebook
            </SubHeadingsNav>
            <SubHeadingsNav to="#">
              <SocialIcon>
                <AiOutlineInstagram />
              </SocialIcon>
              Instagram
            </SubHeadingsNav>
            <SubHeadingsNav to="#">
              <SocialIcon>
                <AiOutlineTwitter />
              </SocialIcon>
              X / Twitter
            </SubHeadingsNav>
            <SubHeadingsNav to="#">
              <SocialIcon>
                <AiOutlineLinkedin />
              </SocialIcon>
              LinkedIn
            </SubHeadingsNav>
          </SubHeadingsWrapper>
        </FourthColumn>
      </Wrapper>
      <CopyrightsSection>© 2023, Khadis, All Rights Reserved </CopyrightsSection>

    </>
  );
};

export default Footer;

const Link = styled(NavLink)`
  color: black;
`;

const Wrapper = styled.div`
  font-family: "Montserrat", sans-serif;
  padding: 20px 0px;
  width: 1440;
  margin-left: auto;
  margin-right: auto; 
  margin-top: 40px;
  justify-content: center; 
  background: var(--color-main);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 35px;
`;

const FirstColumn = styled.div`
  padding-left: 8px;
  box-sizing: border-box;
  @media (min-width: 950px);
`;

const SecondColumn = styled.div`
padding-left: 8px;
  box-sizing: border-box;
  @media (min-width: 950px);
`;

const ThirdColumn = styled.div`
padding-left: 8px;
  box-sizing: border-box;
  @media (min-width: 950px);
`;

const FourthColumn = styled.div`
padding-left: 8px;
  box-sizing: border-box;
  @media (min-width: 950px);
`;

const FooterHeadings = styled.h5`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-bottom: 10px;
`;

const SubHeadingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  flex-grow: 1;
`;

const SubHeadingsNav = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-family: var(--font-heading);
  font-size: 18px;
  padding: 0 0px;
  cursor: pointer;

  /* a:hover {
    color: #444444;
  } */
  a:hover: {
    color: var(--color-third-golden);
  }

  @media (max-width: 1500px) {
    font-size: 14px;
    padding: 0 0px;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 0 5px;
  }
`;

const SocialIcon = styled.div`
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
`;

const CopyrightsSection = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
align-content: center;
padding: 15px;
font-size: 14px;
align-items: center; 
  background: var(--color-main);
  border-top: 1px solid var(--color-third-golden); /* Adjust color and thickness as needed */
`;