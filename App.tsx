import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import useCachedResources from './src/hooks/useCachedResources';

const App = () => {
  const isLoadingComplete = useCachedResources();

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

