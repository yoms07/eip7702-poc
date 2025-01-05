interface TokenDisplayProps {
  tokenId: string;
  address: string;
}

export function TokenDisplay({ tokenId, address }: TokenDisplayProps) {
  return (
    <div className="text-sm text-gray-600">
      <div className="font-medium text-gray-900">{tokenId} Address</div>
      <div className="font-mono">{address}</div>
    </div>
  );
}
