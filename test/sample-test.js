const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("MyNFT", function(){
  it("Should mint and transfer the NFT as required", async function () {
    const FiredGuys = await ethers.getContractFactory("FiredGuys");
    const firedGuys = await FiredGuys.deploy();
    await firedGuys.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

    let metadaURI = "cid/test.png";

    let balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newMintedToken = await firedGuys.payToMint(recipient, metadaURI, {value :ethers.utils.parseEther('0.05')});
    
    await newMintedToken.wait();

    balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await firedGuys.isContentOwned(metadaURI)).to.equal(true);

  });
});
