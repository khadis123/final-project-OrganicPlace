import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "./CurrentUserContext";
import { useContext } from "react";


const AddItemAsSeller = () => {
 const linkForEmail = useParams();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    if (user) {
    //   console.log(user._id)
    }


        // logic/handler for BACK TO PROFILE button (along with useNavigate() hook)
        const routeChange = () =>{ 
            let path = `/userprofile/${user._id}`; // should I change here for ${_id} or ${data._id}?
            navigate(path);
          }

      //onSubmit handler
  //When the user clicks on "Sign up", the data goes to server and mongo db 
  const handleSubmit = (e) => {
    e.preventDefault();
console.log("Submitt btn clicked");
console.log(formData);
    fetch("/users/additemasseller", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // From user input: name, description, price, category, etc.
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        imageSrc: formData.imageSrc,
        numInStock: formData.numInStock,
        userId: linkForEmail.userId
      }),
    })
      //sends the data to the server
      .then((res) => res.json())
      //receives the data back from the server
      .then((data) => {
        // after pressing Sign Up button navigates the user to the Homepage
        // navigate(`/`);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Everytime that the user will add information in the input, it will update the formData according to the value.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

    return (

    <>
    <Wrapper>
      <>
      <StyledPageH1>Seller's Product Profile</StyledPageH1>
        <StyledSubDivForCard>
          <StyledDivForFormContent onSubmit={handleSubmit}>
            <SectionH3>Here you can add new products</SectionH3>
            <SectionContact></SectionContact>
            <SectionContact>All fields are required</SectionContact>

            <StyledRowsForForm>
              <div>
                <label htmlFor="name"> </label>
                <StyledInput
                  placeholder="Product name"
                  type="text"
                  id="name"
                  onChange={handleChange}
                  required
                />
              </div>
              </StyledRowsForForm>

              <StyledRowsForForm>
              <div>
                <label htmlFor="description"> </label>
                <StyledInput
                  placeholder="Product description"
                  type="text"
                  id="description"
                  onChange={handleChange}
                  required
                />
              </div>
              </StyledRowsForForm>

              <StyledRowsForForm>
              <div>
                <label htmlFor="price"> </label>
                <StyledInput
                  placeholder="Price"
                  type="text"
                  id="price"
                  onChange={handleChange}
                  required
                />
              </div>
              </StyledRowsForForm>

              <StyledRowsForForm>
              <div>
                <label htmlFor="category"> </label>
                {/* <StyledInput */}
                <label>
                  <select name="category" id="category" onChange={handleChange}>
                      <option value="">Please choose a category------------------</option>
                      <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                      <option value="Dairy & Eggs">Dairy & Eggs</option>
                      <option value="Meat & Fish">Meat & Fish</option>
                      <option value="Drinks & Beverages">Drinks & Beverages</option>
                      <option value="Bakery & Pastry">Bakery & Pastry</option>
                      <option value="Other">Other</option>
                  </select>
                </label>
                {/* /> */}
              </div>
              </StyledRowsForForm>

              <StyledRowsForForm>
              <div>
                <label htmlFor="imageSrc"> </label>
                <StyledInput
                  placeholder="Put product image (link)"
                  type="text"
                  id="imageSrc"
                  onChange={handleChange}
                  required
                />
              </div>
              </StyledRowsForForm>

              <StyledRowsForForm>
              <div>
                <label htmlFor="numInStock"> </label>
                <StyledInput
                  placeholder="Quantity"
                  type="text"
                  id="numInStock"
                  onChange={handleChange}
                  required
                />
              </div>
              </StyledRowsForForm>
             
            <StyledSignUpBtn >ADD A PRODUCT AS SELLER</StyledSignUpBtn>

          </StyledDivForFormContent>
        </StyledSubDivForCard>
      </>

    

      <>
      <StyledBackToProfileSection>
      <StyledAddNewProductBtn onClick={routeChange}>BACK TO PROFILE</StyledAddNewProductBtn>
      </StyledBackToProfileSection>
      </>

      <>
      <StyledSubDivForCard2>
      <SectionH3>Here you can modify or delete your products</SectionH3>

      <StyledModifyProductBtn to={`/userprofile/:userId/addproduct`}>MODIFY PRODUCT</StyledModifyProductBtn>
        <StyledAddNewProductBtn to={`/userprofile/:userId/addproduct`}>DELETE PRODUCT</StyledAddNewProductBtn>
      </StyledSubDivForCard2>
      </>
    </Wrapper>
    </>
    )
}

export default AddItemAsSeller;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const SectionContact = styled.h6`
  margin-bottom: 5px;
`;

const SectionH3 = styled.h4`
  margin-bottom: 5px;

`

const SectionShip = styled.h6`
  margin-top: 30px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 250px;
`;

const StyledSubDivForCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 7px;
  padding: 24px;
  width: 800px;
  justify-content: center;
  background-color: ---color-main-background;
`;

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

const StyledSubDivForCard2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 7px;
  padding: 24px;
  width: 800px;
  justify-content: center;
  background-color: ---color-main-background;
`;

const StyledDivForFormContent = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  justify-content: left;
  align-items: flex-start;
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 250px;
  height: fit-content;
  padding: 20px;
  margin-right: 30px;
  margin-top: 20px;
  align-items: center;
`;
const StyledSignUpBtn = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  border-radius: 7px;
  width: 300px;
  cursor: pointer;
  font-weight: bold;
  background-color: #51AF5B;
  text-align: center;

  :hover {
    background-color: #FFCB3C;
  }
`;

const StyledAddNewProductBtn = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 30px;
  border-radius: 7px;
  width: 300px;
  cursor: pointer;
  font-weight: bold;
  background-color: #FFCB3C;
  text-align: center;

  :hover {
    background-color: #FFCB3C;
  }
`;


const StyledModifyProductBtn = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 30px;
  border-radius: 7px;
  width: 300px;
  cursor: pointer;
  font-weight: bold;
  background-color: #B3E55E;
  text-align: center;

  :hover {
    background-color: #FFCB3C;
  }
`;

// const Button = styled.button`
//   margin-top: 10px;
//   width: 250px;
// `;
const StyledRowsForForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 650px;
  height: fit-content;
`;

const StyledInput = styled.input`
  width: 250px;
  margin: 5px;
`;


// const Wrapper = styled.div`
// display: flex;
// flex-wrap: nowrap;
// width: 900px;
// `
const LeftColumn = styled.div`
width: 600px;
`
const RightColumn = styled.div`
width: 300px;
`

const ModifyProduct = styled.button`

`

const DeleteProduct = styled.button`

`
const AddProduct = styled.button`

`

const StyledPageH1 = styled.h1`
  margin: 30px;
  text-align: center;
`;