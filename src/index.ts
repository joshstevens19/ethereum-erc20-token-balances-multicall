import BigNumber from 'bignumber.js';
import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from 'ethereum-multicall';
import ERC20Abi from './ABI/erc-20-abi.json';

export interface ProviderOptions {
  // tslint:disable-next-line: no-any
  web3Instance?: any | undefined;
  // tslint:disable-next-line: no-any
  ethersProvider?: any | undefined;
}

export interface Erc20TokensBalancesRequest {
  contractAddresses: string[];
  ethereumAddress: string;
  providerOptions: ProviderOptions;
  multicallCustomContractAddress?: string;
  // default true!
  formatBalances?: boolean;
}

export interface Token {
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  balance: string;
}

/**
 * Get balances for all contracts in 1 single jsonrpc call
 * @param request The erc20 token balance request
 */
export async function getBalances(
  request: Erc20TokensBalancesRequest
): Promise<Token[]> {
  if (request.formatBalances === undefined) {
    request.formatBalances = true;
  }

  const tokens: Token[] = [];

  const multicall = buildMultiCallInstance(request);

  const contractCallContext: ContractCallContext[] = [];

  const BALANCE = 0;
  const SYMBOL = 1;
  const DECIMALS = 2;
  const NAME = 3;

  for (let i = 0; i < request.contractAddresses.length; i++) {
    const token = request.contractAddresses[i];
    contractCallContext.push({
      reference: `${token}`,
      contractAddress: `${token}`,
      abi: ERC20Abi,
      calls: [
        {
          reference: 'balance',
          methodName: 'balanceOf',
          methodParameters: [request.ethereumAddress],
        },
        {
          reference: 'symbol',
          methodName: 'symbol',
          methodParameters: [],
        },
        {
          reference: 'decimals',
          methodName: 'decimals',
          methodParameters: [],
        },
        {
          reference: 'name',
          methodName: 'name',
          methodParameters: [],
        },
      ],
    });
  }

  const contractCallResults: ContractCallResults = await multicall.call(
    contractCallContext
  );

  for (const result in contractCallResults.results) {
    const tokenInfo = contractCallResults.results[result];

    const decimals = tokenInfo.callsReturnContext[DECIMALS].returnValues[0];

    tokens.push({
      contractAddress: tokenInfo.originalContractCallContext.contractAddress,
      symbol: tokenInfo.callsReturnContext[SYMBOL].returnValues[0],
      decimals,
      name: tokenInfo.callsReturnContext[NAME].returnValues[0],
      balance:
        request.formatBalances === true
          ? new BigNumber(
              tokenInfo.callsReturnContext[BALANCE].returnValues[0].hex
            )
              .shiftedBy(decimals * -1)
              .toFixed()
          : tokenInfo.callsReturnContext[BALANCE].returnValues[0].hex,
    });
  }

  return tokens;
}

/**
 * Build the multicall instance
 * @param request The erc20 token balance request
 */
function buildMultiCallInstance(
  request: Erc20TokensBalancesRequest
): Multicall {
  if (request.providerOptions.ethersProvider) {
    return new Multicall({
      ethersProvider: request.providerOptions.ethersProvider,
      multicallCustomContractAddress: request.multicallCustomContractAddress,
      tryAggregate: true,
    });
  }

  return new Multicall({
    web3Instance: request.providerOptions.web3Instance,
    multicallCustomContractAddress: request.multicallCustomContractAddress,
    tryAggregate: true,
  });
}
