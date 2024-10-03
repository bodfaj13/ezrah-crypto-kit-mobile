import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import AnimatedListItem from '../components/animated-list-item';
import TokenItem from '../components/tokenitem/tokenitem';
import {lightColorMode} from '../theme/colors';
import {Token, useTokenInfo, useTokenList} from '../api/tokenQueries';

const Tokens: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {isPending, data: tokens, refetch} = useTokenList();

  const ids = tokens?.map(item => item.id).join(',');

  const {
    data: infoData,
    isPending: isInfoPending,
    error: infoError,
  } = useTokenInfo(ids);

  // Handle refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItems = ({index, item}: {index: number; item: Token}) => {
    const info = infoData?.find(i => i.id === item.id);

    return (
      // <AnimatedListItem key={`token-${index}-${item?.id}`}>

      // </AnimatedListItem>
      <TokenItem token={item} info={info} key={`token-${index}-${item?.id}`} />
    );
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.header}>
            <Text style={{fontWeight: '600', fontSize: 40}}>Tokens</Text>
            <Text>Listing and managing your favourite tokens</Text>
          </View>
          {isPending ? null : (
            <View style={styles.tokenList}>
              <FlatList
                data={tokens}
                renderItem={renderItems}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={styles.tokensList}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColorMode.appColorWhite,
  },
  header: {
    fontWeight: '700',
    marginTop: 50,
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  },
  tokenList: {
    marginTop: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 12,
  },
  tokensList: {
    flex: 1,
    marginTop: 10,
    paddingTop: 10,
  },
});

export default Tokens;
