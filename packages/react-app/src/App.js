import React, { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

import { Body, Button, Header, Footer, Image, Link, NftList, ModalText, ModalTitle } from "./components";
import Modal from "./components/modal";
import Nft from "./components/nft"

import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";

const yBtnBackgroundColor = '#FED53A'
const yBtnTextColor = '#282c34'
const rBtnBackgroundColor = '#EB3F33'
const rBtnTextColor = 'white'
const bBtnBackgroundColor = '#0360DC'
const bBtnTextColor = 'white'

async function readOnChainData() {
  // TODO: support WalletConnect, etc.
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();

  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const poapContract = new Contract(addresses.POAP, abis.erc721, provider);

  const tokenBalance = await poapContract.balanceOf(signer.getAddress());
  console.log({addr: await signer.getAddress()});
  console.log({ tokenBalance: tokenBalance.toString() });
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      backGroundColor={bBtnBackgroundColor}
      textColor={bBtnTextColor}
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

// 0. [DONE] Show modal
// 1. [partially DONE] Select NFT contract
// 2. [DONE] Show NFT list in the contract owned by the signer
// 3. register when a NFT is clicked

function RegisterNftButton(props) {
  const [myNfts, setMyNfts] = useState([]);
  const provider = props.provider;
  let tempNfts = [];

  const checkAndOpenModal = () => {
    if (!provider) {
      alert("Connect a wallet first!")
    } else {
      props.setModalMyNftsVisible(true)
    }
  }
  const closeModal = () => {
    props.setModalMyNftsVisible(false)
  }


  const retrieveMyNfts = async () => {
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
  
    const poapContract = new Contract(addresses.POAP, abis.erc721, provider);
  
    const tokenBalance = await poapContract.balanceOf(addr);

    for (var i=0; i<tokenBalance; i++) {
      let tokenBigNum = await poapContract.tokenOfOwnerByIndex(addr, i);
      let tokenId = tokenBigNum.toNumber();
      let tokenUri = await poapContract.tokenURI(tokenId);
      let tokenMeta = await fetch(tokenUri).then(response => response.json());

      let nft = {
        index: i,
        name: tokenMeta.name,
        image_url : tokenMeta.image_url
      }
      tempNfts.push(nft);
    }

    setMyNfts(tempNfts);
    
    return (
      console.log(myNfts)
    );
  }

  const myNftClickHandler = (index) => {
    console.log({index}, "clicked!!!");
    //TODO: call startAuction() on Cage contract
  }
  
  return(
    <>
      <Button
        backGroundColor={yBtnBackgroundColor}
        textColor={yBtnTextColor}
        onClick={() => checkAndOpenModal()}>
          Register My NFT
      </Button>
      {
        <Modal
          visible={props.modalMyNftsVisible}
          closable={false}
          maskClosable={true}
          onClose={closeModal}>
            <ModalTitle>Register NFT</ModalTitle>
            {/* <ModalText>1. Click Load tokens button <br/> 2. Click a NFT to register</ModalText> */}
            <Button 
              backGroundColor={rBtnBackgroundColor}
              textColor={rBtnTextColor}
              onClick={retrieveMyNfts}>
                Load tokens
            </Button>
            <NftListPage nftArray={myNfts} clickHandler={myNftClickHandler} />
        </Modal>
      }
    </>
  );
}

function NftListPage(props) {
  const Nfts = props.nftArray;
  return (
      <NftList className="list_nftview">
        {Nfts &&
          Nfts.map(nft => {
            return (
              <div 
                key={nft.index}
                onClick={() => props.clickHandler(nft.index)}>
                <Nft
                  name={nft.name}
                  image={nft.image_url}
                />
              </div>
            );
          })
        }
      </NftList>
  )
}

async function retrieveCages(provider) {
  // TODO: 
  // 1) retrieve cage list from the main contract
  // 2) retrieve cage status from each cage contract
  // 3) show the cage status on UI
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [modalMyNftsVisible, setModalMyNftsVisible] = useState(false);
  const [modalCageStatusVisible, setModalCageStatusVisible] = useState(false);

  const [registeredNfts, setRegisteredNfts] = useState([]);

  // setRegisteredNfts(retrieveCages(provider));


  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <h1>Peggie🦜</h1>

        <RegisterNftButton
          provider={provider}
          modalMyNftsVisible={modalMyNftsVisible} setModalMyNftsVisible={setModalMyNftsVisible}
        />
        
        {/*TODO: 
          1) Show cages
          2) Show details with modal when clicked */}

        <NftListPage nftArray={registeredNfts} /> 
        {
          <Modal
            // whichCage={}
            visible={modalCageStatusVisible}
            closable={false}
            maskClosable={true}
            // onClose={closeModal}
            >
          </Modal>
        }

      </Body>
      <Footer>
        Made by NewLayer Ventures with 🦜
      </Footer>
    </div>
  );
}

export default App;
