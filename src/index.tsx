import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import App from './routes';
import apolloClient from './config/apollo';
import {NotifierWrapper} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './theme/theme';

const queryClient = new QueryClient();

const Root: React.FC = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <ThemeProvider>
      <NotifierWrapper>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ApolloProvider>
      </NotifierWrapper>
    </ThemeProvider>
  </GestureHandlerRootView>
);

export default Root;
