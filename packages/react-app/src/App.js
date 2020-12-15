import React, { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";

import { Body, Button, Header, Footer, BodyButtonsContainer, NftList, ModalText, ModalTitle } from "./components";
import { CageContainer, CageImage, CageRightSideContainer, CageData, CageBid, CageUpperButtonsContainer, Input } from "./components";
import Modal from "./components/modal";
import Nft from "./components/nft"

import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";

// UPDATE THIS ID FOR DEMO
const testEnsTokenId = '105257655820778448609140579597948018071519181885792033363672081782919444410835'

let cageAddress
// let cageAddress = '0x86d9df4531a0BF816Bcd1382B5fFb789FD4bD19c'

const yBtnBackgroundColor = '#FED53A'
const yBtnTextColor = '#282c34'
const rBtnBackgroundColor = '#EB3F33'
const rBtnTextColor = 'white'
const bBtnBackgroundColor = '#0360DC'
const bBtnTextColor = 'white'

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

    // only for Demo!!
    tempNfts = [{
      index: 0,
      name: 'Axie',
      image_url: 'https://miro.medium.com/max/480/1*OGfTUWooSC2NMqw8x6nn4w@2x.png'
    }, {
      index: 1,
      name: 'Andre Lisa',
      image_url: 'https://lh3.googleusercontent.com/2xJeZ0VPtKp1TB00F_-OMAZLY7cBF-9r8QU5oKTJPQfWJZf82TGfDyyZQfaDC0tZmLnYG4eVq5MduBer2dLZ_s8=s250'
    }, {
      index: 2,
      name: 'peggie.eth',
      image_url: 'https://dashboard.snapcraft.io/site_media/appmedia/2018/03/terminal-parrot_icon.png'
    }]

    /// Doesn't use below codes for demo
    
    // const poapContract = new Contract(addresses.POAP, abis.erc721, provider);
    // const tokenBalance = await poapContract.balanceOf(addr);

    // for (var i=0; i<tokenBalance; i++) {
    //   let tokenBigNum = await poapContract.tokenOfOwnerByIndex(addr, i);
    //   let tokenId = tokenBigNum.toNumber();
    //   let tokenUri = await poapContract.tokenURI(tokenId);
    //   let tokenMeta = await fetch(tokenUri).then(response => response.json());

    //   let nft = {
    //     index: i,
    //     name: tokenMeta.name,
    //     image_url : tokenMeta.image_url
    //   }
    //   tempNfts.push(nft);
    // }

    setMyNfts(tempNfts);
    
    return (
      console.log(myNfts)
    );
  }

  const myNftClickHandler = async (index) => {
    
    if (index !== 2) {
      alert("click peggie.eth for demo :)");
    } else {
      console.log("Let's create a cage for ",  {index});
      const signer = provider.getSigner();

      const rainforestCont = new Contract(addresses.Rainforest, abis.rainforest, signer);

      const createCageResult = await rainforestCont.newCage(
        addresses.ENSGoerli,
        testEnsTokenId,
        { // overrides
          gasLimit: 1000000,
          gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
        })

        console.log("Cage Deployed tx hash: ", createCageResult.hash);
    }
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


function CageContainerPage(props) {
  return (
    <CageContainer>
      <CageImage src={props.status.image}></CageImage>
      <CageRightSideContainer>
        <CageData>
          <p>Cage Address: {props.status.cageAddress}</p>
          <p>Name: {props.status.name}</p>
          <p>Commit Period Ends At: {props.status.commitPeriodEndsAt}</p>
          <p>Total Committed: {props.status.totalCommitted}</p>
          <p>Cover Price: {props.status.coverPrice}</p>
          <p>Latest Commit Price: {props.status.latestPrice}</p>
        </CageData>
        <CageBid>
          <InputSpace placeholder='Enter Commit Price' setCommitPrice={props.setCommitPrice}></InputSpace>
          <Button 
            backGroundColor={rBtnBackgroundColor}
            textColor={rBtnTextColor}
            onClick={() => {approveFakeDai(props.provider)}}>
            Approve
          </Button>
          <Button 
            backGroundColor={rBtnBackgroundColor}
            textColor={rBtnTextColor}
            onClick={() => {commitHandler(props.provider, props.commitPrice)}}>
            Commit Fake DAI
          </Button>
        </CageBid>
      </CageRightSideContainer>
    </CageContainer>
  )
}


async function updateCageList(provider, setAllCages) {
  if (!provider) {
    alert("Connect a wallet first!")
    return;
  }

  const signer = provider.getSigner();

  const rainforestCont = new Contract(addresses.Rainforest, abis.rainforest, signer);

  cageAddress = await rainforestCont.getCage(
      addresses.ENSGoerli,
      testEnsTokenId
    )
  console.log("CAGE: ", cageAddress)

  // use dummy for demo
  const retrievedCages =     
  [{
    index: 0,
    name: 'peggie.eth',
    image_url: 'https://dashboard.snapcraft.io/site_media/appmedia/2018/03/terminal-parrot_icon.png'
  }, {
    index: 1,
    name: 'YAM',
    image_url : 'https://storage.googleapis.com/poapmedia/yam-heros-2020-logo-1597862089982.png'
  }, {
    index: 2,
    name: 'Few',
    image_url : 'https://miro.medium.com/max/321/1*qqF4glHew6OcbcMYJer3FQ.jpeg'
  }]

  setAllCages(retrievedCages);

}

async function approveNft(provider) {
  const signer = provider.getSigner();

  const ensCont = new Contract(addresses.ENSGoerli, abis.erc721, signer);

  const approvalResult = await ensCont.approve(
    cageAddress,
    testEnsTokenId,
    { // overrides
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
    }
  )

  console.log("NFT approval tx: ", approvalResult);
}

async function stakeNft(provider) {
  const signer = provider.getSigner();

  const cageCont = new Contract(cageAddress, abis.cage, signer);

  const stakeResult = await cageCont.stake(
    "20", // 20 blocks = 5 minutes
    { // overrides
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
    }
  )

  console.log("NFT stake tx: ", stakeResult);
}

async function retrieveShownCage(provider, index, setShownCageStatus) {
  if (!cageAddress) {
    alert('cage is not created!');
    return;
  }

  const signer = provider.getSigner();
  const cageCont = new Contract(cageAddress, abis.cage, signer);

  let commitPeriodEndsAt = await cageCont.period();
  let totalCommitted = await cageCont.totalCommited();
  let coverPrice = await cageCont.coverPrice();
  let latestPrice = await cageCont.latestPrice();

  commitPeriodEndsAt = commitPeriodEndsAt.toNumber();
  totalCommitted = ethers.utils.formatUnits(totalCommitted, 'ether')
  coverPrice = ethers.utils.formatUnits(coverPrice, 'ether')
  latestPrice = ethers.utils.formatUnits(latestPrice, 'ether')
  

  const cage = {
    image: 'https://dashboard.snapcraft.io/site_media/appmedia/2018/03/terminal-parrot_icon.png',
    cageAddress: cageAddress,
    name: 'peggie.eth',
    commitPeriodEndsAt: commitPeriodEndsAt + ' block',
    totalCommitted: totalCommitted,
    coverPrice: coverPrice,
    latestPrice: latestPrice
  }

  setShownCageStatus(cage);

  return;
}

function InputSpace(props) {
  const onChange = (e) => {
    props.setCommitPrice(e.target.value)
  }

  return (
    <Input placeholder={props.placeholder} onChange={onChange}></Input>
  )
}


async function approveFakeDai(provider) {
  const signer = provider.getSigner();

  const daiCont = new Contract(addresses.fakeDai, abis.erc20, signer);

  const approvalResult = await daiCont.approve(
    cageAddress,
    ethers.utils.parseUnits('9999999', 'ether'),
    { // overrides
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
    }
  )

  console.log("DAI approval tx: ", approvalResult);
}



async function commitHandler (provider, commitPrice) {
  const signer = provider.getSigner();

  const cageCont = new Contract(cageAddress, abis.cage, signer);

  console.log(commitPrice);

  let commitPriceParsed = ethers.utils.parseUnits(commitPrice, 'ether')
  console.log(commitPriceParsed);

  const commitResult = await cageCont.commit(
    commitPriceParsed,
    { // overrides
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
    }
  )

  console.log("commit tx: ", commitResult);
}

async function finishCommitPeriod(provider) {
  const signer = provider.getSigner();

  const cageCont = new Contract(cageAddress, abis.cage, signer);

  const finishResult = await cageCont.finish(
    { // overrides
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
    }
  )

  console.log("finishCommitPeriod tx: ", finishResult);
}

async function depositCoverFee(provider) {
  const signer = provider.getSigner();

  const cageCont = new Contract(cageAddress, abis.cage, signer);

  const depositResult = await cageCont.depositCover(
    "20", // 20 blocks = 5 minutes
    { // overrides
      gasLimit: 1000000,
      gasPrice: ethers.utils.parseUnits('7.0', 'gwei')
    }
  )

  console.log("depositCoverFee tx: ", depositResult);
}



function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [modalMyNftsVisible, setModalMyNftsVisible] = useState(false);
  const [modalCageStatusVisible, setModalCageStatusVisible] = useState(false);
  const [allCages, setAllCages] = useState([]);
  const [shownCageStatus, setShownCageStatus] = useState([]);
  const [commitPrice, setCommitPrice] = useState('');


  const cageClickHandler = (index) => {
    if (!provider) {
      alert("Connect a wallet first!")
    } else {
      if (index !== 0) {
        alert("Click peggie.eth for demo :)")
        return;
      }
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
        <BodyButtonsContainer>
          <RegisterNftButton
            provider={provider}
            modalMyNftsVisible={modalMyNftsVisible} setModalMyNftsVisible={setModalMyNftsVisible}
          />
          <Button
            backGroundColor={yBtnBackgroundColor}
            textColor={yBtnTextColor}
            onClick={() => updateCageList(provider, setAllCages)}>
              Load Cages
          </Button>
        </BodyButtonsContainer>

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
              <CageUpperButtonsContainer>
                <Button
                backGroundColor={yBtnBackgroundColor}
                textColor={yBtnTextColor}
                onClick={() => approveNft(provider)}>
                  Approve NFT
                </Button>
                <Button
                backGroundColor={yBtnBackgroundColor}
                textColor={yBtnTextColor}
                onClick={() => stakeNft(provider)}>
                  Stake NFT
                </Button>
                <Button
                backGroundColor={yBtnBackgroundColor}
                textColor={yBtnTextColor}
                 onClick={() => finishCommitPeriod(provider)}
                >
                  Finish the commit
                </Button>
                <Button
                backGroundColor={yBtnBackgroundColor}
                textColor={yBtnTextColor}
                 onClick={() => depositCoverFee(provider)}
                >
                  Deposit cover fee
                </Button>
              </CageUpperButtonsContainer>
              <CageContainerPage
                provider={provider}
                status={shownCageStatus}
                commitPrice={commitPrice}
                setCommitPrice={setCommitPrice}/>
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
