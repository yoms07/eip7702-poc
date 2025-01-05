import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface WalletInfoProps {
  title: string;
  walletAddress: string;
  ethBefore: string;
  ethAfter: string;
  token01Before: string;
  token01After: string;
  token02Before: string;
  token02After: string;
  code?: string;
  showCode?: boolean;
}
function formatEther(input: string): string {
  return input.length > 10 ? input.slice(0, 10) : input;
}

export function WalletInfo({
  title,
  walletAddress,
  ethBefore,
  ethAfter,
  token01Before,
  token01After,
  token02Before,
  token02After,
  code = "0x",
  showCode = false,
}: WalletInfoProps) {
  console.log(token01After);
  return (
    <TooltipProvider>
      <Card className="bg-white shadow-md h-full flex flex-col">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow mt-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">- Address</div>
            <div className="font-mono text-base text-gray-600">
              {walletAddress}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">
              - ETH Balance
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-gray-500">before</div>
                <div className="text-gray-900 text-lg">
                  {formatEther(ethBefore)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">after</div>
                <div className="text-gray-900 text-lg">
                  {formatEther(ethAfter)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">
              - Token01 Balance
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-gray-500">before</div>
                <div className="text-gray-900 text-lg">
                  {formatEther(token01Before)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">after</div>
                <div className="text-gray-900 text-lg">
                  {formatEther(token01After)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">
              - Token02 Balance
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-gray-500">before</div>
                <div className="text-gray-900 text-lg">
                  {formatEther(token02Before)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">after</div>
                <div className="text-gray-900 text-lg">
                  {formatEther(token02After)}
                </div>
              </div>
            </div>
          </div>

          {showCode && (
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">Code:</div>
              {code.length > 8 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="font-mono text-gray-900 text-lg bg-slate-500 px-1 py-1 bg-opacity-55 rounded-sm cursor-pointer">
                      {code.slice(0, 8)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delegation Destination Marker</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <span className="font-mono text-gray-900 text-lg">
                {code.slice(8)}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
