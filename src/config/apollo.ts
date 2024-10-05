import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

// Define the shape of your API configuration
interface ApiConfig {
  graphqlUrl: string;
}

// Load API configuration from your config file
import Configs from '.';
import {FALLBACK_BASE_URL} from '../utils/appdetails';

const apiConfig: ApiConfig = {
  graphqlUrl: Configs.coinApiClient.base_url ?? FALLBACK_BASE_URL,
};

// Create an http link
const httpLink = createHttpLink({
  uri: apiConfig.graphqlUrl,
});

// Create the Apollo Client instance
const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default apolloClient;
