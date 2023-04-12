import { useEffect, useState } from "react";
import styled from "styled-components";
import { TbLoader3 } from "react-icons/tb";

//CartItem component containing the logic of increasing, decreasing and removing the item from the cart.
const CartItem = ({ cartItem, theCartFetch, itemFetching }) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [item, setItem] = useState(null);

  console.log("user: ", user)
  console.log("users: ", users)
  console.log("item: ", item)
  console.log("quantity: ", quantity)




  let userName = "";
  let click = 1;
  let total = Number(cartItem.price) * quantity;

  //Find the company that has the same coompanyId as the item
  if (user) {
    userName = users.find(
      (user) => cartItem.userId === user._id
    );
  }

  //fetching all the item in the cart according to a specific _id
  const itemFetch = () => {
//     fetch(`/getItem/${cartItem.item}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setItem(data.data);
//       });
  };

  //When the click variable changes, we're fetching all the users
  //We're also calling itemFetch that comes from App.js in order to make the number of item appears in the cart icon.
//   useEffect(() => {
//     console.log("here")
//     fetch(`/users`)
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data.data);
//       });
//     itemFetch();
//   }, [click]);

// useEffect(() => {
//         console.log("here")
//         fetch(`users/${user._id}`)
//           .then((res) => res.json())
//           .then((data) => {
//             setUsers(data.data);
//           });
//         itemFetch();
//       }, []);
  //At the end of the PATCH, using the res.body to update the quantity between two buttons

  //If the user clicks on the "-", we decrease the quantity of the item in the cart.
  const handleClick = (ev) => {
//     ev.preventDefault();

//     if (ev.target.value === "-") {
//       click = -1;
//     }

    //Fetching the updated cart, after the user adds or removes items.
    //We're also calling itemFetch that comes from App.js in order to make the number of item appears in the cart icon.
    //Adjusting the quantity
//     fetch("/update-cart", {
//       method: "PATCH",
//       body: JSON.stringify({
//         ...cartItem,
//         quantity: click,
//       }),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((parsedData) => {
//         setQuantity(quantity + click);
//         itemFetch();
//       });
  };

  //When the user clicks on delete, it removes the item from the cart.
  //We're also calling itemFetch that comes from App.js in order to make the number of item appear in the cart icon.
  //We're also calling theCartFetch function from Cart.js that will fetch the new cart.
  const handleDelete = (ev) => {
//     ev.preventDefault();

//     fetch(`/delete-item/${cartItem._id}`, {
//       method: "DELETE",
//       body: JSON.stringify({ quantity: quantity }),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }).then(() => {
//       theCartFetch();
//       itemFetching();
//     });
  };

  return (
    <>
      {!cartItem  ? (
        <StyledLoaderIcon>
          <TbLoader3 />
        </StyledLoaderIcon>
      ) : (
        <Wrapper>
          <Col>
            <Img src={cartItem.imageSrc} />
          </Col>
          <Col>
            <>{cartItem.name}</>
            {/* <>{user.name}</> */}
            <Row>
              <QtySelection>
                <QuantityButton
                  disabled={quantity <= 1}
                  onClick={(ev) => handleClick(ev)}
                  value={"-"}
                >
                  -
                </QuantityButton>
                <Quantity>{quantity}</Quantity>
                <QuantityButton
                //   disabled={item.numInStock <= 0}
                  onClick={(ev) => handleClick(ev)}
                  value={"+"}
                >
                  +
                </QuantityButton>
              </QtySelection>
            </Row>
            <Row>
              <Totaldiv>
                <Price>Total: ${total.toFixed(2)}</Price>
                <DeleteLink onClick={(ev) => handleDelete(ev)}>
                  Remove from cart
                </DeleteLink>
              </Totaldiv>
            </Row>
          </Col>
        </Wrapper>
      )}
    </>
  );
};

export default CartItem;

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


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: auto;
  border: 1px solid gray;
  border-radius: 7px;
  margin: 20px;
  padding: 10px 5px 10px 5px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  height: 120px;
  object-fit: contain;
  margin: 0 25px 0 10px;
`;
const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Totaldiv = styled.div`
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QtySelection = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QuantityButton = styled.button`
  /* background-color: white; */
  border: gray 1px solid;
  display: flex;
  justify-content: center;
  margin-right: 5px;
  opacity: ${(props) => props.disabled && "0.5"};
  background-color: #51AF5B;
`;

const Quantity = styled.p`
  padding: 0 15px;
`;

const DeleteLink = styled.a`
  text-decoration: underline;
  padding-left: 50px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 150px;
`;
