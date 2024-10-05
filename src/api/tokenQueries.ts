import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Configs from '../config';
import {FALLBACK_BASE_URL} from '../utils/appdetails';

const GRAPHQL_ENDPOINT = Configs.coinApiClient.base_url ?? FALLBACK_BASE_URL;

export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  percentageChange1h: number;
};

export type TokenInfo = {
  id: string;
  logo: string;
  description: string;
  name: string;
  slug: string;
  symbol: string;
};

export type TokenDetail = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  percentageChange1h: number;
  logo?: string;
  description?: string;
  slug?: string;
};

export type CryptoTicker = {
  timestamp: string;
  price: number;
  volume24h: number;
  marketCap: number;
};

/**
 * Fetches a list of tokens from the GraphQL endpoint.
 * @param limit Optional parameter to limit the number of tokens returned.
 * @returns A promise that resolves to an array of Token objects.
 */
const fetchTokens = async (limit?: number): Promise<Token[]> => {
	console.log("Fetching tokens...");
  const {data} = await axios.post(GRAPHQL_ENDPOINT, {
    query: `
      query($limit: Int){
        tokens(limit: $limit) {
          id
          name
          symbol
          price
					percentageChange1h
        }
      }
    `,
    variables: {limit},
  });
  return data.data.tokens;
};

/**
 * Fetches detailed information for specific tokens.
 * @param ids A string of comma-separated token IDs.
 * @returns A promise that resolves to an array of TokenInfo objects.
 */
const fetchTokenInfo = async (ids: string): Promise<TokenInfo[]> => {
  const {data} = await axios.post(GRAPHQL_ENDPOINT, {
    query: `
      query($ids: String!) {
        tokenInfo(ids: $ids) {
          id
          logo
					description
					name
					slug
					symbol
        }
      }
    `,
    variables: {ids},
  });
  return data.data.tokenInfo;
};

/**
 * Fetches historical ticker data for a specific cryptocurrency.
 * @param cryptoId The ID of the cryptocurrency.
 * @param startDate The start date for the historical data.
 * @param endDate Optional end date for the historical data.
 * @param limit Optional limit on the number of data points returned.
 * @returns A promise that resolves to an array of CryptoTicker objects.
 */
const fetchCryptoTickers = async (
  cryptoId: string,
  startDate: string,
  endDate?: string,
  limit?: number,
): Promise<CryptoTicker[]> => {
  const {data} = await axios.post(GRAPHQL_ENDPOINT, {
    query: `
      query($cryptoId: String!, $startDate: String!, $endDate: String, $limit: Int) {
        getCryptoTickers(cryptoId: $cryptoId, startDate: $startDate, endDate: $endDate, limit: $limit) {
          timestamp
          price
          volume24h
          marketCap
        }
      }
    `,
    variables: {cryptoId, startDate, endDate, limit},
  });
  return data.data.getCryptoTickers;
};

/**
 * React Query hook for fetching a list of tokens.
 * @param limit Optional parameter to limit the number of tokens returned.
 * @returns A query result object containing the token list data.
 */
export const useTokenList = (limit?: number) => {
  return useQuery<Token[], Error>({
    queryKey: ['tokenList', limit],
    queryFn: () => fetchTokens(limit),
  });
};

/**
 * React Query hook for fetching detailed information for specific tokens.
 * @param ids A string of comma-separated token IDs.
 * @returns A query result object containing the token info data.
 */
export const useTokenInfo = (ids: string | undefined) => {
  return useQuery<TokenInfo[], Error>({
    queryKey: ['tokenInfo', ids],
    queryFn: () => fetchTokenInfo(ids || ''),
    enabled: !!ids,
  });
};

/**
 * React Query hook for fetching historical ticker data for a specific cryptocurrency.
 * @param cryptoId The ID of the cryptocurrency.
 * @param startDate The start date for the historical data.
 * @param endDate Optional end date for the historical data.
 * @param limit Optional limit on the number of data points returned.
 * @returns A query result object containing the crypto ticker data.
 */
export const useCryptoTickers = (
  cryptoId: string,
  startDate: string,
  endDate?: string,
  limit?: number,
) => {
  return useQuery<CryptoTicker[], Error>({
    queryKey: ['cryptoTickers', cryptoId, startDate, endDate, limit],
    queryFn: () => fetchCryptoTickers(cryptoId, startDate, endDate, limit),
  });
};
