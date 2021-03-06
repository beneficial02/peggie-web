import styled from 'styled-components'

export const Header = styled.header`
  background-color: #EB3F33;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export const Body = styled.body`
  align-items: center;
  background-color: #EB3F33;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 70px);
`;

export const Footer = styled.footer`
  background-color: #FED53A;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: black;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;

export const BodyButtonsContainer = styled.div`
  display: row;
  flex-direction: column;
  justify-content: center;
  // align-items: 
  align-content: center;
`

// export const BlueButton = styled.button`
//   background-color: #0360DC;
//   border: none;
//   border-radius: 8px;
//   color: white;
//   cursor: pointer;
//   font-size: 16px;
//   text-align: center;
//   text-decoration: none;
//   margin: 0px 20px;
//   padding: 12px 24px;

//   ${props => props.hidden && "hidden"} :focus {
//     border: none;
//     outline: none;
//   }
// `;

// export const RedButton = styled.button`
//   background-color: #EB3F33;
//   border: none;
//   border-radius: 8px;
//   color: white;
//   cursor: pointer;
//   font-size: 16px;
//   text-align: center;
//   text-decoration: none;
//   margin: 0px 20px;
//   padding: 12px 24px;

//   ${props => props.hidden && "hidden"} :focus {
//     border: none;
//     outline: none;
//   }
// `;

// export const YellowButton = styled.button`
//   background-color: #FED53A;
//   border: none;
//   border-radius: 8px;
//   color: #282c34;
//   cursor: pointer;
//   font-size: 16px;
//   text-align: center;
//   text-decoration: none;
//   margin: 0px 20px;
//   padding: 12px 24px;

//   ${props => props.hidden && "hidden"} :focus {
//     border: none;
//     outline: none;
//   }
// `;

export const Button = styled.button`
  background-color: ${props => props.backGroundColor};
  border: none;
  border-radius: 8px;
  color: ${props => props.textColor};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const NftList = styled.div`
  padding: 24px 24px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;

`;

export const ModalText = styled.p`
  padding: 0px 24px;
  font-size: 16px;
  text-align: center;
`

export const ModalTitle = styled.div`
  padding: 18px 36px 24px;
  // font-size: 24px;
  font-size: 2vw;
  color: white;
  text-align: center;
`

export const CageContainer = styled.div`
  background-color: #FED53A;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
`

export const CageImage = styled.img`
  cursor: pointer;
  width: 500px;
  height: 500px;
  margin: 30px;
  border: 5px solid;
  border-radius: 10px;
  border-color: white;
`;

export const CageRightSideContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: 
  align-content: center;
`

export const CageData= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: 
  align-content: center;
  max-width: 400px;
  font-size: 24px;
  word-break: break-all;
`

export const CageBid = styled.div`

`

export const CageUpperButtonsContainer = styled.div`
  display: row;
  flex-direction: column;
  justify-content: center;
  // align-items: 
  align-content: center;
  margin: 0 0 30px 0;
`

export const Input = styled.input`
  height: 40px;
  font-size: 18px;
`
