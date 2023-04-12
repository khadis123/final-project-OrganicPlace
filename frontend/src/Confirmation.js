import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Confirmation = () => {

    return (
        <>
        <Wrapper>
        <StyledH1>Confirmation Page</StyledH1>

        <StyledBackToProfileSection>

        <StyledH3>
                Thank You For Buying
            </StyledH3>
            <StyledH3>
                Your Order Details:
            </StyledH3>
        </StyledBackToProfileSection>
        </Wrapper>
        </>
    )
}

export default Confirmation;

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