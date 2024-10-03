import {useQuery, useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for the array of IDs
type IdArray = string[];

// Key for AsyncStorage and React Query
const IDS_KEY = 'ids';

// Helper function to fetch persisted IDs from AsyncStorage
const fetchIds = async (): Promise<IdArray> => {
  try {
    const storedIds = await AsyncStorage.getItem(IDS_KEY);
    return storedIds ? JSON.parse(storedIds) : [];
  } catch (error) {
    console.error('Error fetching IDs:', error);
    return [];
  }
};

// Helper function to persist IDs to AsyncStorage
const persistIds = async (ids: IdArray): Promise<void> => {
  try {
    await AsyncStorage.setItem(IDS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error persisting IDs:', error);
  }
};

const useIdsStore = () => {
  const queryClient = useQueryClient();

  // Initialize the IDs array with useQuery
  const {data: ids = []} = useQuery<IdArray>(IDS_KEY, fetchIds, {
    initialData: [],
  });

  // Function to add an ID to the array
  const addId = async (newId: string): Promise<void> => {
    if (!ids.includes(newId)) {
      const updatedIds = [...ids, newId];
      await persistIds(updatedIds);
      queryClient.setQueryData<IdArray>(IDS_KEY, updatedIds);
    }
  };

  // Function to remove an ID from the array
  const removeId = async (idToRemove: string): Promise<void> => {
    const updatedIds = ids.filter(id => id !== idToRemove);
    await persistIds(updatedIds);
    queryClient.setQueryData<IdArray>(IDS_KEY, updatedIds);
  };

  // Function to check if an ID is in the array
  const isIdInArray = (id: string): boolean => ids.includes(id);

  return {ids, addId, removeId, isIdInArray};
};

export default useIdsStore;
