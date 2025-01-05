import { ethers } from "hardhat";
import address from "./address.json";

async function main() {
  // Replace with the deployed contract address
  const token01Address = address.token01;
  const token02Address = address.token02;

  const mintAmount = ethers.parseUnits("5000", 18); // Mint 100 tokens (18 decimals)

  // Get the signer (ensure it's the owner of the contract)
  const [owner] = await ethers.getSigners();

  const token01 = await ethers.getContractAt("Token1", token01Address);
  const token02 = await ethers.getContractAt("Token2", token02Address);
  // Attach the deployed contract

  // Call the mint function
  console.log(
    `Minting Token01 ${mintAmount.toString()} tokens to ${owner.address}...`
  );
  let tx = await token01.connect(owner).mint(owner.address, mintAmount);
  await tx.wait();
  console.log(`Minted successfully! Transaction hash: ${tx.hash}`);

  console.log(
    `Minting Token02 ${mintAmount.toString()} tokens to ${owner.address}...`
  );
  tx = await token02.connect(owner).mint(owner.address, mintAmount);
  await tx.wait();
  console.log(`Minted successfully! Transaction hash: ${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
