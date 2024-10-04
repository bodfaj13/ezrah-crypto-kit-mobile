import {useQuery, useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for AsyncStorage and React Query
const PREVIOUS_ROUTE_KEY = 'previousRoute';

// Helper function to fetch the previous route from AsyncStorage
const fetchPreviousRoute = async (): Promise<string | null> => {
  try {
    const storedRoute = await AsyncStorage.getItem(PREVIOUS_ROUTE_KEY);
    return storedRoute ? JSON.parse(storedRoute) : null;
  } catch (error) {
    console.error('Error fetching previous route:', error);
    return null;
  }
};

// Helper function to persist the previous route to AsyncStorage
const persistPreviousRoute = async (routeName: string): Promise<void> => {
  try {
		console.log('.....', routeName)
    await AsyncStorage.setItem(PREVIOUS_ROUTE_KEY, JSON.stringify(routeName));
  } catch (error) {
    console.error('Error persisting previous route:', error);
  }
};

const usePreviousRouteStore = () => {
  const queryClient = useQueryClient();

  // Initialize the previous route string with useQuery
  const {data: previousRoute = null} = useQuery({
    queryKey: [PREVIOUS_ROUTE_KEY],
    queryFn: fetchPreviousRoute,
    initialData: null,
  });

  // Function to update the previous route
  const updatePreviousRoute = async (newRouteName: string): Promise<void> => {
    await persistPreviousRoute(newRouteName);
    queryClient.setQueryData<string | null>([PREVIOUS_ROUTE_KEY], newRouteName);
  };

  // Function to reset the previous route (e.g., when navigating away)
  const resetPreviousRoute = async (): Promise<void> => {
    await persistPreviousRoute('');
    queryClient.setQueryData<string | null>([PREVIOUS_ROUTE_KEY], '');
  };

  return {previousRoute, updatePreviousRoute, resetPreviousRoute};
};

export default usePreviousRouteStore;
