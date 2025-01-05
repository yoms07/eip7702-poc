import { ethers } from "hardhat";
import fs from "fs";

// Deploying with address index 0
const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  const BatchCallDelegation = await ethers.getContractFactory(
    "BatchCallDelegation"
  );
  const batchCallDelegation = await BatchCallDelegation.deploy();
  await batchCallDelegation.waitForDeployment();
  console.log(
    "BatchCallDelegation deployed to:",
    await batchCallDelegation.getAddress()
  );

  const Token01 = await ethers.getContractFactory("Token1");
  const token01 = await Token01.deploy();
  await token01.waitForDeployment();
  console.log("Token01 deployed to:", await token01.getAddress());

  const Token02 = await ethers.getContractFactory("Token2");
  const token02 = await Token02.deploy();
  await token02.waitForDeployment();
  console.log("Token02 deployed to:", await token02.getAddress());

  const recap = {
    token01: token01.target,
    token02: token02.target,
    batchCallDelegation: batchCallDelegation.target,
  };

  fs.writeFileSync(`${__dirname}/address.json`, JSON.stringify(recap, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
