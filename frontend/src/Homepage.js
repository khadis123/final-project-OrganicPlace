import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { TbLoader3 } from "react-icons/tb";


const Homepage = () => {
    const [items, setItems] = useState();

    //Fetching to get all the items.
    useEffect(() => {
      fetch(`/getTwelveItems`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          console.log(data)
          console.log(data.data)
        })
        .catch((error) => {
        //   console.log(error);
        });
    }, []);



    return (
<>
<GlobalStyles />
{/* <h1>Homepage</h1> */}
{!items ? (
        <StyledLoaderIcon>
          <TbLoader3 />
        </StyledLoaderIcon>
      ) : (
        <>
          <Wrapper>
          <StyledItemCardsGrid> 
            
            {items.map((item) => {
              return (
                <>
                  <ItemCard key={item._id} item={item} />
                </>
              );
            })}
          </StyledItemCardsGrid>

          </Wrapper>

        </>
      )}
</>
    );
}

export default Homepage;

const StyledItemCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;
  /* padding: 20px 80px 20px 80px; */
  width: 1280;
  max-width: 100vw;
  margin: 0 auto;
  align-content: space-between;
`;

// const StyledItemCardsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-gap: 40px;
//   padding: 100px 150px 100px 150px;
//   width: 100%;
//   max-width: 100vw;
//   margin: 0 auto;
// `;

const Wrapper = styled.div`
width: 1280px;
/* display: flex;
flex-direction: row; */
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

