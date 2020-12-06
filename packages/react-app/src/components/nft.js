import React from 'react'
import styled from 'styled-components'

const NftContainer = styled.div`
  position: relative;
  flex-basis: 100%;
  flex-basis: calc(33.333% - 20px);
  margin: 10px;
  cursor: pointer;
  transition: 0.5s all ease-in;
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
`;

const NftName = styled.p`
  display: flex;
  font-size: calc(10px + 2vmin);
  justify-content: center;
`;
 
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