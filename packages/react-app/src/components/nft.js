import React from 'react'
import styled from 'styled-components'

const NftContainer = styled.div`
  height: 330px;
  width: 250px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 10px solid;
  border-radius: 5px;
  border-color: #FED53A;
  background-color: #FED53A;
  // flex-basis: 100%;
  // flex-basis: calc(33.333% - 20px);

  cursor: pointer;
  transition: 0.5s all ease-in;
  // justify-content: center;
`;
 
const NftIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-right: 20px;
 
  svg {
    margin-right: 10px;
  }
`;
 
const NftMeta = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
 
  ${NftContainer}:hover & {
    display: flex !important;
  }
`;
 
const NftImage = styled.img`
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin: 10px;
  border: 5px solid;
  border-radius: 10px;
  border-color: white;
`;

const NftName = styled.p`
  margin: 10px;  
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: #333333;
  justify-content: center;
  align-self: center;
  max-width: 200px;
  height: 100px;
  text-align: center;
`;

// const NftElement = styled.li`
//   display:inline-block;
// `;
 
function Nft({ name, image }) {
  return (
    <NftContainer>
      <NftImage src={image} />
      <NftName>{name}</NftName>
      <NftMeta>
        <NftIcons>
          {/* {image.likes} */}
        </NftIcons>
      </NftMeta>
    </NftContainer>
  );
}
 
export default Nft;