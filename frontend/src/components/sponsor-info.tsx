import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SponsorInfoProps {
  title: string;
  sponsorAddress: string;
  ethBefore: string;
  ethAfter: string;
  token01Before: string;
  token01After: string;
  token02Before: string;
  token02After: string;
}

function formatEther(input: string): string {
  return input.length > 9 ? input.slice(0, 9) : input;
}

export function SponsorInfo({
  title,
  sponsorAddress,
  ethBefore,
  ethAfter,
  token01Before,
  token01After,
  token02Before,
  token02After,
}: SponsorInfoProps) {
  return (
    <Card className="bg-white shadow-md h-full flex flex-col">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow mt-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">
            - Sponsor address
          </div>
          <div className="font-mono text-base text-gray-600">
            {sponsorAddress}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-700">- Sponsor ETH</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
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
            - Sponsor Token01
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
            - Sponsor Token02
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
      </CardContent>
    </Card>
  );
}
