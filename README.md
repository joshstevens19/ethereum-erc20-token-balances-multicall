[![npm version](https://badge.fury.io/js/ethereum-erc20-token-balances-multicall.svg)](https://badge.fury.io/js/ethereum-erc20-token-balances-multicall)
![downloads](https://img.shields.io/npm/dw/ethereum-erc20-token-balances-multicall)

# ethereum-erc20-token-balances-multicall

This library will fetch all the token balances you want within 1 JSONRPC call. This solves long loading time when your trying to show balances for a lot of assets and brings down JSONRPC request limits. It also brings down the metadata for the token aka decimal places, name, symbol and balance. This will return in lighting speed if you compare that to say doing 50 seperate JSONRPC calls this brings the speed down around 50x. You can call a single ethereum address or you can call as many ethereum addresses as you want.

This uses the ethereum-multicall which is a lightweight library for interacting with the [multicall](https://github.com/joshstevens19/ethereum-multicall) smart contract.

ethereum-erc20-token-balances-multicall is fully written in typescript so has full compile time support. The motivation of this package was to expose a super simple and easy to understand interface for you to take the full benefits of the fast loading of erc20 balances for users. Also to not being opinionated on how you use it, you can use it with web3 or ethers.

## Supports

- mainnet
- kovan
- görli
- rinkeby
- ropsten
- binance smart chain
- xdai
- matic
- mumbai

## Installation

### npm:

```js
$ npm install ethereum-erc20-token-balances-multicall
```

### yarn:

```js
$ yarn add ethereum-erc20-token-balances-multicall
```

## Usage

### Ethers

#### Query just 1 ethereum address:

```ts
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall';

const balances = await getBalancesForEthereumAddress({
  // erc20 tokens you want to query!
  contractAddresses: [
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    // unlimited amount you can keep adding and adding
    // you can also build up easily through the code as well
  ],
  // ethereum address of the user you want to get the balances for
  ethereumAddress: 'THE_ETHEREUM_ADDRESS',
  // your ethers provider
  providerOptions: {
    ethersProvider: YOUR_ETHERS_PROVIDER,
  },
});

console.log('result', balances);
```

Result:

```ts
{
  ethereumAddress: 'THE_ETHEREUM_ADDRESS',
  tokens:
    [
      {
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        symbol: 'UNI',
        decimals: 18,
        name: 'Uniswap',
        balance: '703.523279430449604142',
      },
      {
        contractAddress: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
        symbol: 'GTC',
        decimals: 18,
        name: 'Gitcoin',
        balance: '400.606',
      },
    ];
}
```

#### Query > 1 ethereum addresses balances

```ts
import { getBalancesForEthereumAddresses } from 'ethereum-erc20-token-balances-multicall';

const balances = await getBalancesForEthereumAddresses({
  // erc20 tokens you want to query!
  contractAddresses: [
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    // unlimited amount you can keep adding and adding
    // you can also build up easily through the code as well
  ],
  // ethereum addresses you want to get the balance for
  ethereumAddress: ['ADDRESS_1', 'ADDRESS_2'],
  // your ethers provider
  providerOptions: {
    ethersProvider: YOUR_ETHERS_PROVIDER,
  },
});

console.log('result', balances);
```

Result:

```ts
[{
  ethereumAddress: 'ADDRESS_1',
  tokens:
    [
      {
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        symbol: 'UNI',
        decimals: 18,
        name: 'Uniswap',
        balance: '703.523279430449604142',
      },
      {
        contractAddress: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
        symbol: 'GTC',
        decimals: 18,
        name: 'Gitcoin',
        balance: '400.606',
      },
    ];
}, {
  ethereumAddress: 'ADDRESS_2',
  tokens:
    [
      {
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        symbol: 'UNI',
        decimals: 18,
        name: 'Uniswap',
        balance: '23.523279430449604142',
      },
      {
        contractAddress: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
        symbol: 'GTC',
        decimals: 18,
        name: 'Gitcoin',
        balance: '293.606',
      },
    ];
}]
```

### Web3

#### Query just 1 ethereum address:

```ts
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall';

const balances = await getBalancesForEthereumAddress({
  // erc20 tokens you want to query!
  contractAddresses: [
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    // unlimited amount you can keep adding and adding
    // you can also build up easily through the code as well
  ],
  // ethereum address of the user you want to get the balances for
  ethereumAddress: 'THE_ETHEREUM_ADDRESS',
  // your web3 provider
  providerOptions: {
    web3Instance: YOUR_WEB_PROVIDER,
  },
});

console.log('result', balances);
```

Result:

```ts
{
  ethereumAddress: 'THE_ETHEREUM_ADDRESS',
  tokens:
    [
      {
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        symbol: 'UNI',
        decimals: 18,
        name: 'Uniswap',
        balance: '703.523279430449604142',
      },
      {
        contractAddress: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
        symbol: 'GTC',
        decimals: 18,
        name: 'Gitcoin',
        balance: '400.606',
      },
    ];
}
```

#### Query > 1 ethereum addresses balances

```ts
import { getBalancesForEthereumAddresses } from 'ethereum-erc20-token-balances-multicall';

const balances = await getBalancesForEthereumAddresses({
  // erc20 tokens you want to query!
  contractAddresses: [
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    // unlimited amount you can keep adding and adding
    // you can also build up easily through the code as well
  ],
  // ethereum addresses you want to get the balance for
  ethereumAddress: ['ADDRESS_1', 'ADDRESS_2'],
  // your web3 provider
  providerOptions: {
    web3Instance: YOUR_WEB_PROVIDER,
  },
});

console.log('result', balances);
```

Result:

```ts
[{
  ethereumAddress: 'ADDRESS_1',
  tokens:
    [
      {
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        symbol: 'UNI',
        decimals: 18,
        name: 'Uniswap',
        balance: '703.523279430449604142',
      },
      {
        contractAddress: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
        symbol: 'GTC',
        decimals: 18,
        name: 'Gitcoin',
        balance: '400.606',
      },
    ];
}, {
  ethereumAddress: 'ADDRESS_2',
  tokens:
    [
      {
        contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        symbol: 'UNI',
        decimals: 18,
        name: 'Uniswap',
        balance: '23.523279430449604142',
      },
      {
        contractAddress: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
        symbol: 'GTC',
        decimals: 18,
        name: 'Gitcoin',
        balance: '293.606',
      },
    ];
}]
```

## Issues

Please raise any issues in the below link.

https://github.com/joshstevens19/ethereum-erc20-token-balances-multicall/issues

## Thanks And Support

This package is brought to you by [Josh Stevens](https://github.com/joshstevens19). My aim is to be able to keep creating these awesome packages to help the Ethereum space grow with easier-to-use tools to allow the learning curve to get involved with blockchain development easier and making Ethereum ecosystem better. If you want to help with that vision and allow me to invest more time into creating cool packages or if this package has saved you a lot of development time donations are welcome, every little helps. By donating, you are supporting me to be able to maintain existing packages, extend existing packages (as Ethereum matures), and allowing me to build more packages for Ethereum due to being able to invest more time into it. Thanks, everyone!

## Direct donations

Direct donations any token accepted - Eth address > `0x699c2daD091ffcF18f3cd9E8495929CA3a64dFe1`

## Github sponsors

[sponsor me](https://github.com/sponsors/joshstevens19) via github using fiat money
