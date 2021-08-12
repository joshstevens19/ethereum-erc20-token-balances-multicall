import BigNumber from 'bignumber.js';
import {
  ContractCallContext,
  ContractCallResults,
  ContractCallReturnContext,
  Multicall,
} from 'ethereum-multicall';
import ERC20Abi from './ABI/erc-20-abi.json';

export interface ProviderOptions {
  // tslint:disable-next-line: no-any
  web3Instance?: any | undefined;
  // tslint:disable-next-line: no-any
  ethersProvider?: any | undefined;
}

interface Erc20TokensBalancesRequestBase {
  contractAddresses: string[];
  providerOptions: ProviderOptions;
  multicallCustomContractAddress?: string;
  // default true!
  formatBalances?: boolean;
}

export interface SingleEthereumAddressRequest
  extends Erc20TokensBalancesRequestBase {
  ethereumAddress: string;
}

export interface MultipleEthereumAddressRequest
  extends Erc20TokensBalancesRequestBase {
  ethereumAddresses: string[];
}

export interface Token {
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  balance: string;
}

export interface BalanceResult {
  ethereumAddress: string;
  tokens: Token[];
}

const BALANCE = 0;
const SYMBOL = 1;
const DECIMALS = 2;
const NAME = 3;

/**
 * Get balances for the user for all contracts in 1 single jsonrpc call
 * @param request The erc20 token balance request
 */
export async function getBalancesForEthereumAddress(
  request: SingleEthereumAddressRequest
): Promise<BalanceResult> {
  if (request.formatBalances === undefined) {
    request.formatBalances = true;
  }

  const multicall = buildMultiCallInstance(request);

  const contractCallContext: ContractCallContext[] = [];

  for (let i = 0; i < request.contractAddresses.length; i++) {
    const token = request.contractAddresses[i];
    contractCallContext.push(
      buildContractCallContext(token, request.ethereumAddress, token)
    );
  }

  const contractCallResults: ContractCallResults = await multicall.call(
    contractCallContext
  );

  const tokens: Token[] = [];

  for (const result in contractCallResults.results) {
    tokens.push(
      buildToken(contractCallResults.results[result], request.formatBalances)
    );
  }

  return { ethereumAddress: request.ethereumAddress, tokens };
}

/**
 * Get balances for all users for all contracts in 1 single jsonrpc call
 * @param request The erc20 token balance request
 */
export async function getBalancesForEthereumAddresses(
  request: MultipleEthereumAddressRequest
): Promise<BalanceResult[]> {
  if (request.formatBalances === undefined) {
    request.formatBalances = true;
  }

  const multicall = buildMultiCallInstance(request);

  const contractCallContext: ContractCallContext[] = [];

  for (let i = 0; i < request.contractAddresses.length; i++) {
    const token = request.contractAddresses[i];
    for (let u = 0; u < request.ethereumAddresses.length; u++) {
      const ethereumAddress = request.ethereumAddresses[u];
      contractCallContext.push(
        buildContractCallContext(
          `${token}_${ethereumAddress}`,
          ethereumAddress,
          token
        )
      );
    }
  }

  const contractCallResults: ContractCallResults = await multicall.call(
    contractCallContext
  );

  const balanceResults: BalanceResult[] = [];

  for (const result in contractCallResults.results) {
    const token = buildToken(
      contractCallResults.results[result],
      request.formatBalances
    );

    const balanceResult = balanceResults.find((balance) =>
      result.includes(balance.ethereumAddress)
    );

    if (balanceResult) {
      balanceResult.tokens.push(token);
    } else {
      balanceResults.push({
        ethereumAddress: result.split('_')[1],
        tokens: [token],
      });
    }
  }

  return balanceResults;
}

/**
 * Build the token
 * @param tokenInfo The token info
 * @param formatBalances The format balances
 */
function buildToken(
  tokenInfo: ContractCallReturnContext,
  formatBalances: boolean
): Token {
  const decimals = tokenInfo.callsReturnContext[DECIMALS].returnValues[0];

  return {
    contractAddress: tokenInfo.originalContractCallContext.contractAddress,
    symbol: tokenInfo.callsReturnContext[SYMBOL].returnValues[0],
    decimals,
    name: tokenInfo.callsReturnContext[NAME].returnValues[0],
    balance:
      formatBalances === true
        ? new BigNumber(
            tokenInfo.callsReturnContext[BALANCE].returnValues[0].hex
          )
            .shiftedBy(decimals * -1)
            .toFixed()
        : tokenInfo.callsReturnContext[BALANCE].returnValues[0].hex,
  };
}

/**
 * Build the multicall instance
 * @param request The erc20 token balance request
 */
function buildMultiCallInstance(
  request: Erc20TokensBalancesRequestBase
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

/**
 * Build contract call context
 * @param reference The reference for call
 * @param ethereumAddress The ethereum address
 * @param contractAddress The contract address
 */
function buildContractCallContext(
  reference: string,
  ethereumAddress: string,
  contractAddress: string
): ContractCallContext {
  return {
    reference,
    contractAddress,
    abi: ERC20Abi,
    calls: [
      {
        reference: 'balance',
        methodName: 'balanceOf',
        methodParameters: [ethereumAddress],
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
  };
}
