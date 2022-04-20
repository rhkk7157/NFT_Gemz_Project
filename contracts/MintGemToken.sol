// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintGemToken is ERC721Enumerable, Ownable {
  string uri;
  constructor(string memory _name, string memory _symbol, string memory _uri) ERC721(_name, _symbol) {
    uri = _uri;
  }

  struct GemData {
    uint gemRank;
    uint gemType;
  }

  mapping (uint => GemData) public gemData; 

  // 1 klay
  uint gemPrice = 1000000000000000000; // PEB

  function tokenURI(uint _tokenId) override public view returns (string memory){
    string memory gemRank = Strings.toString(gemData[_tokenId].gemRank);
    string memory gemType = Strings.toString(gemData[_tokenId].gemType);

    return string (
      abi.encodePacked(uri, '/', gemRank,'/', gemType,'.json')
    );
  }

  function mintGemToken() public payable {
    require(gemPrice <= msg.value, "Not enough Klay.");
    uint tokenId = totalSupply() + 1;  
    uint randomNonce = tokenId;

    uint gemRank;
    uint gemType;

    uint randomRank = uint(keccak256(abi.encodePacked(blockhash(block.timestamp), msg.sender, randomNonce))) % 10;
    randomNonce ++;
    uint randomType = uint(keccak256(abi.encodePacked(blockhash(block.timestamp), msg.sender, randomNonce))) % 10;

    if(randomRank < 4) {
      gemRank = 1;
    } else if (randomRank < 7) {
      gemRank = 2;
    } else if (randomRank < 9) {
      gemRank = 3;
    } else {
      gemRank = 4;
    }

    if(randomType < 4) {
      gemType = 1;
    } else if (randomType < 7) {
      gemType = 2;
    } else if (randomType < 9) {
      gemType = 3;
    } else {
      gemType = 4;
    }

    payable(owner()).transfer(msg.value);

    gemData[tokenId] = GemData(gemRank, gemType); 
    _mint(msg.sender,tokenId);
  }
}