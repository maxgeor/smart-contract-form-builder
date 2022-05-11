const getContractFromEtherscan = async (address) => {
  const data = await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
  const json = await data.json();
  return json.result[0];
}

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(-4)}`;

export { getContractFromEtherscan, shortenAddress };