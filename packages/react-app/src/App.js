import React, { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

import { Body, Button, Header, Footer, Image, Link, NftList, ModalText, ModalTitle } from "./components";
import { CageContainer, CageImage, CageRightSideContainer, CageData, CageBid } from "./components";
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
    console.log("Let's create a cage for ",  {index});
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
  // console.log('Nfts ', {Nfts});
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


function CageContainerPage(props) {
  const Nfts = props.nftArray;
  return (
    <CageContainer>
      <CageImage src={props.status.image}></CageImage>
      <CageRightSideContainer>
        <CageData>
          <p>Contract: {props.status.contract}</p>
          <p>Name: {props.status.name}</p>
          <p>Auction Ends: {props.status.auctionEnds}</p>
          <p>Total Committed: {props.status.totalCommited}</p>
          <p>Cover Price: {props.status.coverPrice}</p>
        </CageData>
        <CageBid>
          <input></input>
          <button>Bid</button>
        </CageBid>
      </CageRightSideContainer>
    </CageContainer>
  )
}

async function retrieveAllCages(provider, setAllCages) {
  // TODO: retrieve cage list from the main contract
  const signer = provider.getSigner();
  
  // use dummy for now
  const retrievedCages =     
  [{
    index: 0,
    name: 'dummy 0',
    image_url : 'https://storage.googleapis.com/poapmedia/yam-heros-2020-logo-1597862089982.png'
  }, {
    index: 1,
    name: 'dummy 1',
    image_url : 'https://storage.googleapis.com/poapmedia/yam-heros-2020-logo-1597862089982.png'
  }]

  setAllCages(retrievedCages);

  return;
}

async function retrieveShownCage(provider, index, setShownCageStatus) {
  // const signer = provider.getSigner();
  // const addr = await signer.getAddress();

  const poapContract = new Contract(addresses.POAP, abis.erc721, provider);

  const tokenBigNum = await poapContract.tokenByIndex(2173);
  const tokenId = tokenBigNum.toNumber();
  const tokenUri = await poapContract.tokenURI(tokenId);
  const tokenMeta = await fetch(tokenUri).then(response => response.json());

  const dummyCage = {
    image: tokenMeta.image_url,
    contract: 'some contract',
    name: tokenMeta.name,
    auctionEnds: 'someday',
    totalCommited: 'some amount',
    coverPrice: 'the price'
  }

  setShownCageStatus(dummyCage);

  return;
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [modalMyNftsVisible, setModalMyNftsVisible] = useState(false);
  const [modalCageStatusVisible, setModalCageStatusVisible] = useState(false);
  const [allCages, setAllCages] = useState([]);
  const [shownCageStatus, setShownCageStatus] = useState([]);

  useEffect(() => {
    if (provider) {
      retrieveAllCages(provider, setAllCages);
    }
  }, [provider])

  // Cage status list
  // auction 종료 시점
  // 커밋된 토큰 수량 (totalCommited)
  // coverPrice()

  const cageClickHandler = (index) => {
    if (!provider) {
      alert("Connect a wallet first!")
    } else {
      console.log("Retrieve & show the status of ", {index});
      checkAndOpenModal();
      retrieveShownCage(provider, index, setShownCageStatus);
    }
  }

  const checkAndOpenModal = () => {
    if (!provider) {
      alert("Connect a wallet first!")
    } else {
      setModalCageStatusVisible(true)
    }
  }
  const closeModal = () => {
    setModalCageStatusVisible(false)
  }



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

        <NftListPage nftArray={allCages} clickHandler={cageClickHandler}/> 
        {
          <Modal
            // whichCage={}
            visible={modalCageStatusVisible}
            closable={false}
            maskClosable={true}
            onClose={closeModal}
            >
              <ModalTitle>Cage Status</ModalTitle>
              <CageContainerPage status={shownCageStatus}/>
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
