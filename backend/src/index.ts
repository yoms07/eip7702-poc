// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  http,
  isAddress,
  parseEther,
} from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { anvil, blastSepolia } from "viem/chains";
import { eip7702Actions } from "viem/experimental";
import * as ethers from "ethers";

import erc20ABI from "../abis/erc20.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const sponsorPrivateKey: `0x${string}` = ("0x" +
  process.env.PRIVATE_KEY) as `0x${string}`;
const token01Address = process.env.TOKEN01_ADDRESS as `0x${string}`;
const token02Address = process.env.TOKEN02_ADDRESS as `0x${string}`;
const batchCallDelegationAddress = process.env
  .BATCH_CALL_DELEGATION_ADDRESS as `0x${string}`;

// generate two random address
const availableAddresses = Array(2)
  .fill(null)
  .map(() => privateKeyToAccount(generatePrivateKey()))
  .map((a) => a.address);

// use fix private key
const sponsorWalletClient = createWalletClient({
  account: privateKeyToAccount(sponsorPrivateKey),
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions());

const walletClient = createWalletClient({
  account: privateKeyToAccount(generatePrivateKey()),
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions());

const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
});
const provider = new ethers.JsonRpcProvider(anvil.rpcUrls.default.http[0]);
const token01Contract = new ethers.Contract(token01Address, erc20ABI, provider);
const token02Contract = new ethers.Contract(token02Address, erc20ABI, provider);

const init = async () => {
  // give wallet initial balance
  // give wallet initial token
  const initialEthAmount = parseEther("200");
  const initialTokenAmount = parseEther("20");
  console.info(
    `[INFO] Sending wallet eth: ${initialEthAmount} to ${walletClient.account.address}`
  );
  let txHash = await sponsorWalletClient.sendTransaction({
    to: walletClient.account.address,
    value: initialEthAmount,
  });
  console.info(`[INFO] Success Sending wallet eth: ${txHash}`);

  console.info(`[INFO] Sending token01: ${initialEthAmount}`);
  txHash = await sponsorWalletClient.sendTransaction({
    to: token01Address,
    data: encodeFunctionData({
      abi: erc20ABI,
      functionName: "mint",
      args: [walletClient.account.address, initialTokenAmount],
    }),
  });
  console.info(`[INFO] Success sending token01: ${txHash}`);

  console.info(`[INFO] Sending token02: ${initialEthAmount}`);
  txHash = await sponsorWalletClient.sendTransaction({
    to: token02Address,
    data: encodeFunctionData({
      abi: erc20ABI,
      functionName: "mint",
      args: [walletClient.account.address, initialTokenAmount],
    }),
  });
  console.info(`[INFO] Success sending token02: ${txHash}`);
};

const getTokenBalance = async (address: string) => {
  const token01Balance = await token01Contract.balanceOf(address);
  const token02Balance = await token02Contract.balanceOf(address);
  return {
    token01Balance: ethers.formatUnits(token01Balance, 18), // Assuming 18 decimals for ERC-20
    token02Balance: ethers.formatUnits(token02Balance, 18),
  };
};

const main = async () => {
  await init();
  app.get("/", async (req: Request, res: Response) => {
    // GET ETH BALANCE
    const walletEthBalance = ethers.formatEther(
      await publicClient.getBalance({
        address: walletClient.account.address,
      })
    );
    const sponsorEthBalance = ethers.formatEther(
      await publicClient.getBalance({
        address: sponsorWalletClient.account.address,
      })
    );
    console.log(availableAddresses);
    const addressesEthBalance = await Promise.all(
      availableAddresses.map(async (address) => {
        const balance = await publicClient.getBalance({ address });
        return {
          ethBalance: ethers.formatEther(balance),
          address,
        };
      })
    );

    // GET TOKEN BALANCE
    const walletTokenBalance = await getTokenBalance(
      walletClient.account.address
    );
    const sponsorTokenBalance = await getTokenBalance(
      sponsorWalletClient.account.address
    );
    const addressesTokenBalance = await Promise.all(
      availableAddresses.map(async (address) => {
        const balance = await getTokenBalance(address);
        return {
          address,
          token01Balance: balance.token01Balance,
          token02Balance: balance.token02Balance,
        };
      })
    );
    res.json({
      walletEthBalance,
      sponsorEthBalance,
      addressesEthBalance,

      walletTokenBalance,
      sponsorTokenBalance,
      addressesTokenBalance,
    });
  });

  app.get("/availableAddress", async (req: Request, res: Response) => {
    res.json({
      availableAddresses,
    });
    return;
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

main();
