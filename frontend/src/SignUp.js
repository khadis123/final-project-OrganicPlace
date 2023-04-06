import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
 
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

      //onSubmit handler
  //When the user clicks on "Sign up", the data goes to server and mongo db 
  const handleSubmit = (e) => {
    e.preventDefault();
console.log("Submitt btn clicked");
console.log(formData);
    fetch("/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // From user input: fname, lname, phone, address, email, price, etc.
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        address: formData.address,
        userAvatar: formData.userAvatar,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        _id: formData.email
      }),
    })
      //sends the data to the server
      .then((res) => res.json())
      //receives the data back from the server
      .then((data) => {
        // after pressing Sign Up button navigates the user to the Homepage
        navigate(`/login`);
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
    <WrapperSignUp>
      <>
      <StyledPageH1>Sign Up</StyledPageH1>
        <StyledSubDivForCard>
          <StyledDivForFormContent onSubmit={handleSubmit}>
            <SectionContact>Contact Information</SectionContact>
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

              <div>
                <label htmlFor="email"></label>
                <StyledInput
                  placeholder="Email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>

            </StyledRowsForForm>
            <SectionShip>Your Address (for shipping and pickup)</SectionShip>
            <StyledRowsForForm>
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

              <div>
                <label htmlFor="address"></label>
                <StyledInput
                  placeholder="Full Address"
                  type="text"
                  id="address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="userAvatar"></label>
                <StyledInput
                  placeholder="User avatar img (put link)"
                  type="text"
                  id="userAvatar"
                  onChange={handleChange}
                  required
                />
              </div>

            </StyledRowsForForm>

            <StyledRowsForForm>
            <div>
                <label htmlFor="password"></label>
                <StyledInput
                  placeholder="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword"></label>
                <StyledInput
                  placeholder="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>

            </StyledRowsForForm>


            <StyledSignUpBtn >Sign Up</StyledSignUpBtn>
          </StyledDivForFormContent>
        </StyledSubDivForCard>
      </>

      <>
        <StyledRightColumn>

        </StyledRightColumn>
      </>
    </WrapperSignUp>
    </>
    )
}

export default SignUp;

const StyledPageH1 = styled.h1`
  margin: 30px;
  text-align: center;
`;
const WrapperSignUp = styled.div`
  display: flex;
  flex-direction: column;
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
  border-radius: 7px;
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
const StyledSignUpBtn = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  border-radius: 7px;
  width: 250px;
  cursor: pointer;
  font-weight: bold;
  background-color: #51AF5B;
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
  width: 160px;
  margin: 5px;
`;
