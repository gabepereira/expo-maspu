import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Categories, Home, Product, Products, SignIn } from './pages';
import { Header } from './components';
import { MaterialIcons } from '@expo/vector-icons';
import { FetchContext, HeaderContext } from './services/context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsScreen = () => (
   <Stack.Navigator headerMode="none" initialRouteName="Categories">
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Products" component={Products} />
   </Stack.Navigator>
);

const Dashboard = () => (
   <Tab.Navigator
      screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons
               name={
                  {
                     Home: 'home',
                     Products: 'shopping-cart',
                  }[route.name]
               }
               size={size}
               color={color}
            />
         ),
      })}
      tabBarOptions={{
         showLabel: false,
         activeTintColor: '#303030',
         inactiveTintColor: 'gray',
      }}
   >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Products" component={ProductsScreen} />
   </Tab.Navigator>
);

const Views = () => (
   <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
         headerShown: true,
         header: props => <Header {...props} />,
         headerLeft: null,
      }}
   >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Product" component={Product} />
   </Stack.Navigator>
);

const Routes = () => (
   <Stack.Navigator headerMode="none" initialRouteName="Views">
      <Stack.Screen name="Views" component={Views} />
      <Stack.Screen
         options={{ headerShown: false }}
         name="SignIn"
         component={SignIn}
      />
   </Stack.Navigator>
);

export default () => {
   const [fetch, setFetch] = useState({
      Home: false,
      Products: false,
   });
   const [header, setHeader] = useState({
      routeName: 'Painel',
      showBack: false,
   });

   return (
      <FetchContext.Provider value={{ fetch, setFetch }}>
         <HeaderContext.Provider value={{ header, setHeader }}>
            <NavigationContainer>
               <Routes />
            </NavigationContainer>
         </HeaderContext.Provider>
      </FetchContext.Provider>
   );
};
