import styled from "styled-components";

// In this component user/seller can add, modify, or delete a product
const AddItemAsSeller = () => {

    return (<>
    <StyledPageH1>Here you can add, modify, or delete a product</StyledPageH1>

    </>
    )
}

export default AddItemAsSeller;

const Wrapper = styled.div`
display: flex;
flex-wrap: nowrap;
width: 900px;
`
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