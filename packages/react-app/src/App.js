import React, { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Footer, Image, Link, NftList } from "./components";
import Modal from "./components/modal";
import Nft from "./components/nft"

import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

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

// 0. Show modal
// 1. Select NFT contract
// 2. Show NFT list in the contract owned by the signer
// 3. register when a NFT is clicked

function RegisterNftButton(props) {
  const [myNfts, setMyNfts] = useState([]);

  let tempNfts = [];

  const checkAndOpenModal = () => {
    if (!props.provider) {
      alert("Connect a wallet first!")
    } else {
      props.setModalVisible(true)
    }
  }
  const closeModal = () => {
    props.setModalVisible(false)
  }


  const getTokens = async () => {
    console.log("load token clicked!!")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
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
  
  return(
    <>
      <Button onClick={checkAndOpenModal}> Register My NFT </Button>
      {
        <Modal
          visible={props.modalVisible}
          closable={false}
          maskClosable={true}
          onClose={closeModal}>
            <Button onClick={getTokens}>Load tokens</Button>
            <NftListPage nftArray={myNfts} />
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
              <Nft
                key={nft.index}
                name={nft.name}
                image={nft.image_url}
              />
            );
          })
        }
      </NftList>
  )
}

function App() {
  // const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <h1>Peggie🦜</h1>

        <RegisterNftButton provider={provider} modalVisible={modal1Visible} setModalVisible={setModal1Visible}/>
        
        
        <Button onClick={() => readOnChainData()}>
          Read On-Chain Balance
        </Button>

        <Link href="https://ethereum.org/developers/#getting-started" style={{ marginTop: "8px" }}>
          Learn Ethereum
        </Link>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://thegraph.com/docs/quick-start">Learn The Graph</Link>
      </Body>
      <Footer>
        Made by NewLayer Ventures with 🦜
      </Footer>
    </div>
  );
}

export default App;
