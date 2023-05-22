import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

function secureCoinFlip(seed) {
  const crypto = require('crypto');

  // Generate a random byte array using the provided seed
  const seedBytes = Uint8Array.from(Buffer.from(seed, 'hex'));

  // Use the random bytes as the seed for a cryptographically secure PRNG
  const prng = new Math.seedrandom(seedBytes);

  // Generate a random number between 0 and 1
  const randomNumber = prng();

  return (randomNumber < 0.5) ? 'Heads' : 'Tails';
}

export const addressToID = (hexValue) => {
  // Convert hexadecimal value to decimal
  const decimalValue = BigInt(hexValue);

  // Calculate the range (1240 - 1 + 1 = 1240)
  const range = BigInt(1240);

  // Map the decimal value to the desired range (1 to 1240)
  const mappedValue = (decimalValue % range) + BigInt(1);

  return Number(mappedValue);
}
export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
