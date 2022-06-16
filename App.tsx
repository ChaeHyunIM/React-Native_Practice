import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import useCachedResources from './src/hooks/useCachedResources';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import firebase, { db } from './src/utils/firebase';

const App = () => {
  const isLoadingComplete = useCachedResources();
  useEffect(()=> {
  },[])

  if (isLoadingComplete) return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
  return <View><Text>Loading</Text></View>;
};
export default App;

