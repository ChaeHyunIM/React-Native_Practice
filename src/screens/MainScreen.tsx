import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { themeStyles } from '../styles/globalStyles';
import DateMover from '../components/molecules/DateMover';


const MainScreen = () => {
  return <SafeAreaView>
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}
                style={[themeStyles['background-grey'], { height: '100%' }]}>
      <DateMover />
      <Text>TimeTable</Text>
    </ScrollView>
  </SafeAreaView>;
};

export default MainScreen;

const styles = StyleSheet.create({});