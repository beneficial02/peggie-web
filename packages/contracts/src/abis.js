import erc20Abi from "./abis/erc20.json";
import erc721Abi from "./abis/erc721.json";
import ownableAbi from "./abis/ownable.json";
import rainforestAbi from "./abis/rainforest.json";
import cageAbi from "./abis/cage.json";
import houseAbi from "./abis/house.json";

const abis = {
  erc20: erc20Abi,
  // ABIs for erc721 are retrieved from one of the OpenSea github repositories.
  // https://github.com/ProjectOpenSea/opensea-js/tree/master/lib/abi
  // TODO: need to check relevantness.
  erc721: erc721Abi,
  ownable: ownableAbi,
  rainforest: rainforestAbi,
  cage: cageAbi,
  house: houseAbi
};

export default abis;
