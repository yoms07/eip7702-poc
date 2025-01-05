"use client";
import { cloneDeep } from "lodash";
import { TokenDisplay } from "@/components/token-display";
import { SponsorInfo } from "@/components/sponsor-info";
import { WalletInfo } from "@/components/wallet-info";
import { BatchTransaction } from "@/components/batch-transaction";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { GlobalInfo } from "@/model/info";

function formatEthereumAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function Page() {
  const [dataBefore, setDataBefore] = useState<GlobalInfo | null>(null);
  const [dataAfter, setDataAfter] = useState<GlobalInfo | null>(null);
  const fetchData = async () => {
    const result = (await fetch("http://localhost:3000").then((data) =>
      data.json()
    )) as GlobalInfo;

    if (dataAfter !== null) {
      setDataBefore(cloneDeep(dataAfter));
    }
    setDataAfter(result);
  };
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      fetchData();
    }, 5000);
  }, []);
  if (dataAfter === null) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">EIP-7702 POC</h1>

        {/* Top section - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-6">
          {/* Left Column - Token Addresses */}
          <div className="space-y-4 self-start">
            <TokenDisplay
              tokenId="Token01"
              address={formatEthereumAddress(dataAfter.token01Address)}
            />
            <TokenDisplay
              tokenId="Token02"
              address={formatEthereumAddress(dataAfter.token02Address)}
            />
          </div>

          {/* Middle Column - Sponsors Info */}
          <div className="h-full">
            <SponsorInfo
              title="Sponsors Info"
              sponsorAddress={formatEthereumAddress(dataAfter.sponsorAddress)}
              ethBefore={dataBefore ? dataBefore.sponsorEthBalance : "-"}
              ethAfter={dataAfter.sponsorEthBalance}
              token01Before={
                dataBefore ? dataBefore.sponsorTokenBalance.token01Balance : "-"
              }
              token01After={dataAfter.sponsorTokenBalance.token01Balance}
              token02Before={
                dataBefore ? dataBefore.sponsorTokenBalance.token02Balance : "-"
              }
              token02After={dataAfter.sponsorTokenBalance.token02Balance}
            />
          </div>

          {/* Right Column - Wallet Info */}
          <div className="h-full">
            <WalletInfo
              title="Wallet Info"
              walletAddress={formatEthereumAddress(dataAfter.walletAddress)}
              ethBefore={dataBefore ? dataBefore.walletEthBalance : "-"}
              ethAfter={dataAfter.walletEthBalance}
              token01Before={
                dataBefore ? dataBefore.walletTokenBalance.token01Balance : "-"
              }
              token01After={dataAfter.walletTokenBalance.token01Balance}
              token02Before={
                dataBefore ? dataBefore.walletTokenBalance.token02Balance : "-"
              }
              token02After={dataAfter.walletTokenBalance.token02Balance}
              code={dataAfter.code}
              showCode
            />
          </div>
        </div>

        {/* Horizontal Separator */}
        <Separator className="my-8 bg-gray-300" />

        {/* Middle section - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Address01 Info */}
          <div>
            <WalletInfo
              title="Address01 Info"
              walletAddress={formatEthereumAddress(
                dataAfter.availableAddresses[0]
              )}
              ethBefore={
                dataBefore ? dataBefore.addressesEthBalance[0].ethBalance : "-"
              }
              ethAfter={dataAfter.addressesEthBalance[0].ethBalance}
              token01Before={
                dataBefore
                  ? dataBefore.addressesTokenBalance[0].token01Balance
                  : "-"
              }
              token01After={dataAfter.addressesTokenBalance[0].token01Balance}
              token02Before={
                dataBefore
                  ? dataBefore.addressesTokenBalance[0].token02Balance
                  : "-"
              }
              token02After={dataAfter.addressesTokenBalance[0].token02Balance}
            />
          </div>

          {/* Right Column - Address02 Info */}
          <div>
            <WalletInfo
              title="Address02 Info"
              walletAddress={formatEthereumAddress(
                dataAfter.availableAddresses[1]
              )}
              ethBefore={
                dataBefore ? dataBefore.addressesEthBalance[1].ethBalance : "-"
              }
              ethAfter={dataAfter.addressesEthBalance[1].ethBalance}
              token01Before={
                dataBefore
                  ? dataBefore.addressesTokenBalance[1].token01Balance
                  : "-"
              }
              token01After={dataAfter.addressesTokenBalance[1].token01Balance}
              token02Before={
                dataBefore
                  ? dataBefore.addressesTokenBalance[1].token02Balance
                  : "-"
              }
              token02After={dataAfter.addressesTokenBalance[1].token02Balance}
            />
          </div>
        </div>

        {/* Bottom section - Batch Transaction */}
        <div className="mt-8">
          <BatchTransaction
            onSent={() => fetchData()}
            recipientList={dataAfter.availableAddresses}
            tokenAddress={[dataAfter.token01Address, dataAfter.token02Address]}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
