// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WRACertificate
 * @dev World Royal Academy NFT Certificate Contract
 * 왕립 인증서를 NFT로 발행하는 스마트 컨트랙트
 */
contract WRACertificate is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    // Certificate data stored on-chain
    struct Certificate {
        string certType;       // e.g. "K-Royal Warrant", "K-Heritage Guide"
        string recipientName;
        uint256 issuedAt;
        bool revoked;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256[]) public holderTokens;

    event CertificateIssued(uint256 indexed tokenId, address indexed recipient, string certType, string recipientName);
    event CertificateRevoked(uint256 indexed tokenId);

    constructor() ERC721("WRA Certificate", "WRAC") Ownable(msg.sender) {}

    /**
     * @dev Issue a new certificate NFT
     * @param to Recipient wallet address
     * @param tokenURI_ IPFS URI for certificate metadata
     * @param certType Type of certification
     * @param recipientName Name of the recipient
     */
    function issueCertificate(
        address to,
        string memory tokenURI_,
        string memory certType,
        string memory recipientName
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        certificates[tokenId] = Certificate({
            certType: certType,
            recipientName: recipientName,
            issuedAt: block.timestamp,
            revoked: false
        });

        holderTokens[to].push(tokenId);

        emit CertificateIssued(tokenId, to, certType, recipientName);
        return tokenId;
    }

    /**
     * @dev Revoke a certificate (does not burn, just marks as revoked)
     */
    function revokeCertificate(uint256 tokenId) public onlyOwner {
        require(tokenId < _tokenIdCounter, "Token does not exist");
        certificates[tokenId].revoked = true;
        emit CertificateRevoked(tokenId);
    }

    /**
     * @dev Get certificate details
     */
    function getCertificate(uint256 tokenId) public view returns (
        string memory certType,
        string memory recipientName,
        uint256 issuedAt,
        bool revoked,
        address owner_
    ) {
        require(tokenId < _tokenIdCounter, "Token does not exist");
        Certificate memory cert = certificates[tokenId];
        return (cert.certType, cert.recipientName, cert.issuedAt, cert.revoked, ownerOf(tokenId));
    }

    /**
     * @dev Get all token IDs held by an address
     */
    function getHolderTokens(address holder) public view returns (uint256[] memory) {
        return holderTokens[holder];
    }

    /**
     * @dev Get total certificates issued
     */
    function totalCertificates() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Required overrides
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
