import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import DateHeader from '../components/molecules/DateHeader';
import { themeSelector } from '../store/selector';
import TimeTable from '../components/organisms/TimeTable';


const MainScreen = () => {
  const theme = useRecoilValue(themeSelector);
  return <SafeAreaView>
    <View
      style={[theme.background, { height: '100%', paddingTop: 20, paddingHorizontal: '2%', alignItems: 'center' }]}>
      <DateHeader />
      <TimeTable />
    </View>
  </SafeAreaView>;
};

export default MainScreen;

const styles = StyleSheet.create({});