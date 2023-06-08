import { NavLink, useParams } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";


// Item component which renders a single item/product 
const ItemCard = ({ item }) => {
  //If the item is out of stock, renders a small text with button "out of stock"
  const outOfStock = item.numInStock === 0;
  return (
    <Wrapper>
      <StyledItemCard to={`/items/${item._id}`}>
        <ItemImg src={item.imageSrc} />
        <Naming>
          <StyledName>{item.name} {": $ "}{item.price} {"CAD"}</StyledName>
          <StyledPrice></StyledPrice>
          <StyledDescription>{item.description}</StyledDescription>
          {outOfStock && <OutOfStockBtn>Out of Stock</OutOfStockBtn>}
        </Naming>
      </StyledItemCard>
    </Wrapper>
  );
};

export default ItemCard;

const OutOfStockBtn = styled.button`
  color: red;
  font-size: 14px;
`;

const ItemImg = styled.img`
display: flex;
flex-direction: column;
  height: 286px;
  width: 286px;
border-radius: 7px;
/* border-top-right-radius: 7px;
border-top-left-radius: 7px; */

  object-fit: contain;
  align-self: center;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const StyledName = styled.div`
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledDescription = styled.div`
  font-size: 14px;
`

const Naming = styled.div`
  padding: 5px;
  

`;

const StyledItemCard = styled(NavLink)`
  display: flex;
  flex-direction: column;
  /* justify-content: normal; */
  height: 420px;
  width: 288px;

  background-color: white;
  border-radius: 7px;
  /* padding: 20px; */
  border: 1px gray solid;
  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`

  height: 100%;
`;


// const OutOfStockBtn = styled.button`
//   color: red;
//   font-size: 14px;
// `;

// const ItemImg = styled.img`
//   height: 250px;
//   width: 200px;
//   object-fit: contain;
//   align-self: center;
//   transition: transform 0.1s ease-in-out;
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const Price = styled.div`
//   font-size: 16px;
//   font-weight: 600;
// `;

// const Name = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   color: inherit;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Naming = styled.div`
//   margin-top: 10px;
// `;

// const Product = styled(NavLink)`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 300px;
//   background-color: white;
//   border-radius: 2px;
//   padding: 20px;
//   border: 1px gray solid;
//   text-decoration: none;
//   color: inherit;
//   box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const Wrapper = styled.div`
//   height: 100%;
// `;
