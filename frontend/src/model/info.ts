export interface GlobalInfo {
  walletAddress: string;
  sponsorAddress: string;
  code: string;
  token01Address: string;
  token02Address: string;
  walletEthBalance: string;
  sponsorEthBalance: string;
  addressesEthBalance: AddressesEthBalance[];
  walletTokenBalance: WalletTokenBalance;
  sponsorTokenBalance: SponsorTokenBalance;
  addressesTokenBalance: AddressesTokenBalance[];
  availableAddresses: string[];
}

export interface AddressesEthBalance {
  ethBalance: string;
  address: string;
}

export interface WalletTokenBalance {
  token01Balance: string;
  token02Balance: string;
}

export interface SponsorTokenBalance {
  token01Balance: string;
  token02Balance: string;
}

export interface AddressesTokenBalance {
  address: string;
  token01Balance: string;
  token02Balance: string;
}
