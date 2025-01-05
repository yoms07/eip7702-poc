# EIP-7702 POC

# How to run

## Node setup

1. Install anvil

```
https://book.getfoundry.sh/anvil/
```

2. Run anvil node with prague fork

```
anvil --hardfork prague
```

3. Copy the first (0-index) signer private key to backend `.env`

## Contract setup

```
cd contracts
npm install
npx hardhat run ./scripts/deploy.ts
npx hardhat run ./scripts/initSponsor.ts
```

Then copy the deployed address (Token1, Token2, BatchCallDelegation) to backend .env

## Backend Setup

```
cd backend
npm install
ts-node ./src/index.ts
```

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Go to `http://localhost:3001`

# Feature

1. Batch call
2. Sponsored transaction
3. EIP-7702
