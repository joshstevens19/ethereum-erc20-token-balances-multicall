import { ethers } from 'ethers';
import Web3 from 'web3';
import { getBalances } from '..';

const executeEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(
    1,
    '9aa3d95b3bc440fa88ea12eaa4456161'
  );

  const balances = await getBalances({
    contractAddresses: [
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    ],
    ethereumAddress: '0x37c81284caA97131339415687d192BF7D18F0f2a',
    providerOptions: {
      ethersProvider: provider,
    },
    formatBalances: true,
  });

  console.log('ethers', balances);
};

executeEthers();

const executeWeb3 = async () => {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  );
  const balances = await getBalances({
    contractAddresses: [
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
    ],
    ethereumAddress: '0x37c81284caA97131339415687d192BF7D18F0f2a',
    providerOptions: {
      web3Instance: web3,
    },
    formatBalances: true,
  });

  console.log('web3', balances);
};

executeWeb3();
