import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Configs from '../config';

const GRAPHQL_ENDPOINT = Configs.coinApiClient.base_url;

const CACHE_TIME = 100 * 24 * 60 * 60 * 1000;

export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
	percentageChange24h: number
};

export type TokenInfo = {
  id: string;
  logo: string;
};

const fetchTokens = async (): Promise<Token[]> => {
  const { data } = await axios.post(GRAPHQL_ENDPOINT, {
    query: `
      query {
        tokens(limit: 10) {
          id
          name
          symbol
          price
					percentageChange24h
        }
      }
    `
  });
  return data.data.tokens;
};

const fetchTokenInfo = async (ids: string): Promise<TokenInfo[]> => {
  const { data } = await axios.post(GRAPHQL_ENDPOINT, {
    query: `
      query($ids: String!) {
        tokenInfo(ids: $ids) {
          id
          logo
        }
      }
    `,
    variables: { ids }
  });
  return data.data.tokenInfo;
};

export const useTokenList = () => {
  return useQuery<Token[], Error>({
    queryKey: ['tokenList'],
    queryFn: fetchTokens,
		staleTime: CACHE_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useTokenInfo = (ids: string | undefined) => {
  return useQuery<TokenInfo[], Error>({
    queryKey: ['tokenInfo', ids],
    queryFn: () => fetchTokenInfo(ids as string),
    enabled: !!ids,
		staleTime: CACHE_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};