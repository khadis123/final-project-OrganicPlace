import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({});

      //onSubmit handler
  //When the user clicks on "Place your order", we're fetching the confirmation in order to POST it to the confirmation page, where the user will be navigated
  //We also set the CountItem to null because he just ordered, so we want an empty cart.
  const handleClick = (e) => {
    e.preventDefault();

    fetch("/confirmation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // fname, lname, phone, address, email, price, and item.
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        apartment: formData.apartment,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalcode,
        country: formData.country,
        phone: formData.phone,
      }),
    })
      //sends the data to the server
      .then((res) => res.json())
      //receives the data back from the server
      .then((data) => {
        // setCountItem(null);
        // navigate(`/confirmation/${data.orderId}`);
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
    <WrapperCheckout>
      <>
      <StyledPageH1>Login</StyledPageH1>
        <StyledSubDivForCard>
          <StyledDivForFormContent>
            <SectionContact>Contact Information</SectionContact>
            <StyledRowsForForm>
              <div>
                <label htmlFor="email"></label>
                <StyledInput
                  placeholder="Email"
                  type="text"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>
            <SectionShip>Your Address (for shipping and pickup)</SectionShip>
            <StyledRowsForForm>
              <div>
                <label htmlFor="firstName"> </label>
                <StyledInput
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName"></label>
                <StyledInput
                  placeholder="Last Name"
                  type="text"
                  id="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="address"></label>
                <StyledInput
                  placeholder="Address"
                  type="text"
                  id="address"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="apartment"></label>
                <StyledInput
                  placeholder="Apartment"
                  type="text"
                  id="apartment"
                  onChange={handleChange}
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="city"></label>
                <StyledInput
                  placeholder="City"
                  type="text"
                  id="city"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="province"></label>
                <StyledInput
                  placeholder="Province"
                  type="text"
                  id="province"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="postalcode"></label>
                <StyledInput
                  placeholder="Postal code"
                  type="text"
                  id="postalcode"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="country"></label>
                <StyledInput
                  placeholder="Country"
                  type="text"
                  id="country"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone"></label>
                <StyledInput
                  placeholder="Phone number"
                  type="phone"
                  id="phone"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledCartLink to="/cart">Back to cart</StyledCartLink>
          </StyledDivForFormContent>
        </StyledSubDivForCard>
      </>

      <>
        <StyledRightColumn>

        </StyledRightColumn>
      </>
    </WrapperCheckout>
    </>
    )
}

export default Login;

const StyledPageH1 = styled.h1`
  margin: 30px;
  text-align: center;
`;
const WrapperCheckout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 50px;
`;

const SectionContact = styled.h6`
  margin-bottom: 5px;
`;

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
  border-radius: 2px;
  padding: 24px;
  max-width: 600px;
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
const StyledCartLink = styled(Link)`
  margin-top: 20px;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;
const StyledRowsForForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 650px;
  height: fit-content;
`;

const StyledInput = styled.input`
  width: 160px;
  margin: 5px;
`;
