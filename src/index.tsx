import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './routes';
import apolloClient from './config/apollo';

const queryClient = new QueryClient();

const Root: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ApolloProvider>
);

export default Root;