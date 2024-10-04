import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Configs from '../config';

const GRAPHQL_ENDPOINT = Configs.coinApiClient.base_url;

const CACHE_TIME = 100 * 24 * 60 * 60 * 1000;

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

const fetchTokens = async (limit?: number): Promise<Token[]> => {
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

export const useTokenList = (limit?: number) => {
  return useQuery<Token[], Error>({
    queryKey: ['tokenList', limit],
    queryFn: () => fetchTokens(limit),
    staleTime: CACHE_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useTokenInfo = (ids: string | undefined) => {
  return useQuery<TokenInfo[], Error>({
    queryKey: ['tokenInfo', ids],
    queryFn: () => fetchTokenInfo(ids || ''),
    enabled: !!ids,
    staleTime: CACHE_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

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
