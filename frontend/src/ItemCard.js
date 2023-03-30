import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

// Item component which renders a single item/product 
const ItemCard = ({ itemcard }) => {
  //If the item is out of stock, renders a small text with button "out of stock"
  const outOfStock = itemcard.numInStock === 0;
  return (
    <Wrapper>
      <Product to={`/items/${item._id}`}>
        <Img src={itemcard.imageSrc} />
        <Naming>
          <Name>{itemcard.name}</Name>
          <Price>{itemcard.price}</Price>
          {outOfStock && <OutOfStockBtn>Out of Stock</OutOfStockBtn>}
        </Naming>
      </Product>
    </Wrapper>
  );
};

export default ItemCard;

const OutOfStockBtn = styled.button`
  color: red;
  font-size: 14px;
`;

const Img = styled.img`
  height: 250px;
  width: 200px;
  object-fit: contain;
  align-self: center;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Name = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Naming = styled.div`
  margin-top: 10px;
`;

const Product = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  background-color: white;
  border-radius: 2px;
  padding: 20px;
  border: 1px gray solid;
  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  height: 100%;
`;

