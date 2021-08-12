import { ethers } from 'ethers';
import Web3 from 'web3';
import {
  // getBalancesForEthereumAddress,
  getBalancesForEthereumAddresses,
} from '..';

// const executeEthers = async () => {
//   const provider = new ethers.providers.InfuraProvider(
//     1,
//     '9aa3d95b3bc440fa88ea12eaa4456161'
//   );

//   const balances = await getBalancesForEthereumAddress({
//     contractAddresses: [
//       '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
//       '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
//     ],
//     ethereumAddress: '0x37c81284caA97131339415687d192BF7D18F0f2a',
//     providerOptions: {
//       ethersProvider: provider,
//     },
//     formatBalances: true,
//   });

//   console.log('ethers', balances);
// };

// executeEthers();

// const executeWeb3 = async () => {
//   const web3 = new Web3(
//     'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
//   );
//   const balances = await getBalancesForEthereumAddress({
//     contractAddresses: [
//       '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
//       '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
//     ],
//     ethereumAddress: '0x37c81284caA97131339415687d192BF7D18F0f2a',
//     providerOptions: {
//       web3Instance: web3,
//     },
//     formatBalances: true,
//   });

//   console.log('web3', balances);
// };

// executeWeb3();

const executeEthersBulk = async () => {
  const provider = new ethers.providers.InfuraProvider(
    1,
    '9aa3d95b3bc440fa88ea12eaa4456161'
  );

  const balances = await getBalancesForEthereumAddresses({
    contractAddresses: [
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    ],
    ethereumAddresses: [
      '0x37c81284caA97131339415687d192BF7D18F0f2a',
      '0x699c2daD091ffcF18f3cd9E8495929CA3a64dFe1',
    ],
    providerOptions: {
      ethersProvider: provider,
    },
    formatBalances: true,
  });

  console.log('ethers', balances);
};

executeEthersBulk();

const executeWeb3Bulk = async () => {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  );
  const balances = await getBalancesForEthereumAddresses({
    contractAddresses: [
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    ],
    ethereumAddresses: [
      '0x37c81284caA97131339415687d192BF7D18F0f2a',
      '0x699c2daD091ffcF18f3cd9E8495929CA3a64dFe1',
    ],
    providerOptions: {
      web3Instance: web3,
    },
    formatBalances: true,
  });

  console.log('web3', balances);
};

executeWeb3Bulk();
