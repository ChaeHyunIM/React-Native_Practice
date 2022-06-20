// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, Text, Button, TextInput } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
// function HomeScreen({ navigation, route }) {
//   // useEffect(() => {
//   //   if (route.params?.post) {
//   //   }
//   // }, [route.params?.post]);
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {/* <Text>Home Screen</Text> */}
//       {/* <Button */}
//       {/*  title="Go to Details" */}
//       {/*  onPress={() => */}
//       {/*    navigation.navigate('Details', { */}
//       {/*      itemId: 86, */}
//       {/*      otherParam: 'anything you want here', */}
//       {/*    }) */}
//       {/*  } */}
//       {/* /> */}
//       <Button
//         title="Go to Profile"
//         onPress={() =>
//           navigation.navigate('Profile', { name: 'Custom profile header' })
//         }
//       />
//       {/* <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text> */}
//     </View>
//   );
// }
//
// function CreatePostScreen({ navigation, route }) {
//   const [postText, setPostText] = useState('');
//
//   return (
//     <>
//       <TextInput
//         multiline
//         placeholder="What's on your mind?"
//         style={{ height: 200, padding: 10, backgroundColor: 'white' }}
//         value={postText}
//         onChangeText={setPostText}
//       />
//       <Button
//         title="Done"
//         onPress={() => {
//           navigation.navigate({
//             name: 'Home',
//             params: { post: postText },
//             merge: true,
//           });
//         }}
//       />
//     </>
//   );
// }
//
// function DetailScreen({ route, navigation }) {
//   const { itemId, otherParam } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Text>itemId: {JSON.stringify(itemId)}</Text>
//       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button
//         title="Go to Details again"
//         onPress={() =>
//           navigation.push('Details', {
//             itemId: Math.floor(Math.random() * 100),
//           })
//         }
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//       />
//     </View>
//   );
// }
//
// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile screen</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }
//
// const Stack = createNativeStackNavigator();
//
// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator mode="modal">
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'My home' }}
//         />
//         {/* <Stack.Screen name="Details" component={DetailScreen} /> */}
//         {/* <Stack.Screen */}
//         {/*  name="CreatePost" */}
//         {/*  component={CreatePostScreen} */}
//         {/*  options={({ route }) => ({ title: route.params.name })} */}
//         {/* /> */}
//         <Stack.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={({ route }) => ({ title: route.params.name })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
//
// export default App;
