import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { TbLoader3 } from "react-icons/tb";


//ItemDetails component that renders information about an item when the user clicks on one.
const ItemDetails = ({ itemFetching }) => {
    const { _id } = useParams();
    const [product, setProduct] = useState(null);
    const [users, setUsers] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
  
    //Fetching data according to the item._id that the user clicked on Homepage
    const productFetch = () => {
      fetch(`/getItem/${_id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct([data.data]);
        });
    };
  
    //Fetchinig a specific item
    useEffect(() => {
      fetch(`/getItem/${_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 400 || data.status === 500) {
            throw new Error("Error");
          }
          setProduct([data.data]);
          setQuantity(data.data.numInStock);
          const _id = data.data.userId; //insted of companyId
  
          fetch(`/users/${_id}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 400 || data.status === 500) {
                throw new Error("Error");
              }
              setUsers([data.data]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    //adds the product to the cart when the user clicks the "Add to Cart" button.
    //if successful, the request updates the state variables product, quantity, and isClicked, and calls the itemFetching
    const handleClick = (event) => {
      event.preventDefault();
      setIsClicked(true);
      fetch("/add-item-to-cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product[0].name,
          price: product[0].price,
          category: product[0].category,
          _id: product[0]._id,
          imageSrc: product[0].imageSrc,
          quantity: 1,
          userId: product[0].userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          productFetch();
          setQuantity((current) => {
            return current - 1;
          });
          if (data.status === 400 || data.status === 500) {
            throw new Error("Error");
          }
          itemFetching(); // In app.js - calling it in so that the cart icon changes the number according to the items in the cart
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    //When the user clicks on "back", it navigates him to the previous page he was on.
    const handleBackClick = () => {
      window.history.back();
    };
    return (
      <VH>
        {!product || !users ? (
          <StyledLoaderIcon>
            <TbLoader3 />
          </StyledLoaderIcon>
        ) : (
          <Wrapper>
            {product.map((item) => {
              return (
                <Container key={item._id}>
                  <StyledImg src={item.imageSrc} />
                  <Info>
                    {users.map((user) => {
                      return (
                        <Link key={user._id} to={user.url}>
                          {user.name}
                        </Link>
                      );
                    })}
                    {/* <Name>{item.name}</Name>
                    <p>{item.price}</p>
                    <p>{item.description}</p> */}
                    <StyledName>{item.name} {": $ "}{item.price} {"CAD"}</StyledName>
          <StyledPrice></StyledPrice>
          <StyledDesciption>{item.description}</StyledDesciption>
                    <Divider>
                      <Quantity>Quantity available: {quantity}</Quantity>
                      <Button
                        disabled={quantity === 0}
                        onClick={handleClick}
                        isClicked={isClicked}
                      >
                        {isClicked
                          ? "Added to cart!"
                          : item.numInStock === 0
                          ? "Out of stock"
                          : "Add to cart"}
                      </Button>
                      <StyledBackLink onClick={handleBackClick}><text>&#x276E;&#x276E;&#x276E; </text> BACK TO HOMEPAGE</StyledBackLink>

                    </Divider>
                  </Info>
                </Container>
              );
            })}
          </Wrapper>
        )}
      </VH>
    );
  };


  export default ItemDetails;
  
  const Link = styled(NavLink)`
    color: #333;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    font-family: var(--font-heading);
  
    &:hover {
      color: #444444;
    }
  `;
  
  const StyledName = styled.p`
    font-weight: bold;
    font-size: 24px;
    font-family: var(--font-body);
  `;
  
const StyledDesciption = styled.p`
font-size: 18px;
`

  const VH = styled.div``;
  
  const Button = styled.button`
    width: 250px;
    background-color: #FFCB3C;
    &:disabled {
      cursor: not-allowed;
      opacity: 30%;
    }
    &:hover {
      background-color: #B3E55E;
    }
  `;
  
  const Divider = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 140px;
  `;
  
  const Quantity = styled.div`
    padding-bottom: 10px;
    color: #51AF5B;
    font-size: 14px;
    font-family: var(--font-body);
  `;
  
  const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 100px;
    justify-content: flex-end;

  `;
  
  const StyledImg = styled.img`
    height: 100%;
    width: 250px;
    margin: 50px 150px 50px 200px;
    border-radius: 7px;
  `;
  
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
  `;
  
  const Wrapper = styled.div`
    width: 100%;
    margin: 0px 0px 0px 0px;
    /* border: 1px solid gray;
  border-radius: 7px; */
  `;
  
  const StyledBackLink = styled(Link)`
    margin: 20px 0 20px 0;
    text-decoration: underline;
    font-size: 12px;
    cursor: pointer;
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

const StyledDescription = styled.div`
  font-size: 14px;
`
const StyledPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
`;