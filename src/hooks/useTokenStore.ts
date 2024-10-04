import {useQuery, useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenDetail} from '../api/tokenQueries';

// Key for AsyncStorage and React Query
const TOKENS_KEY = 'tokens';

// Helper function to fetch persisted tokens from AsyncStorage
const fetchTokens = async (): Promise<TokenDetail[]> => {
  try {
    const storedTokens = await AsyncStorage.getItem(TOKENS_KEY);
    return storedTokens ? JSON.parse(storedTokens) : [];
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
};

// Helper function to persist tokens to AsyncStorage
const persistTokens = async (tokens: TokenDetail[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error persisting tokens:', error);
  }
};

const useTokenStore = () => {
  const queryClient = useQueryClient();

  // Initialize the tokens array with useQuery
  const {data: tokens = []} = useQuery({
    queryKey: [TOKENS_KEY],
    queryFn: fetchTokens,
    initialData: [],
  });

  // Function to add a token to the array
  const addToken = async (newToken: TokenDetail): Promise<void> => {
    const tokenExists = tokens.find(token => token.id === newToken.id);

    if (!tokenExists) {
      const updatedTokens = [...tokens, newToken];
      await persistTokens(updatedTokens);
      queryClient.setQueryData<TokenDetail[]>([TOKENS_KEY], updatedTokens);
    }
  };

  // Function to remove a token from the array
  const removeToken = async (idToRemove: string): Promise<void> => {
    const updatedTokens = tokens.filter(token => token.id !== idToRemove);
    await persistTokens(updatedTokens);
    queryClient.setQueryData<TokenDetail[]>([TOKENS_KEY], updatedTokens);
  };

  // Function to check if a token is in the array
  const isTokenInArray = (id: string): boolean =>
    tokens.some(token => token.id === id);

  return {tokens, addToken, removeToken, isTokenInArray};
};

export default useTokenStore;
