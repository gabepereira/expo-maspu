import React, { useState, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { HeaderContext } from '../../services/context';

export default ({ navigation }) => {
   const [visible, setVisible] = useState(false);
   const { header } = useContext(HeaderContext);

   const handleSignOut = () => {
      setVisible(false);
      navigation.navigate('SignIn');
   };

   return (
      <Appbar style={headerStyle.header}>
         {header.showBack && (
            <Appbar.Action
               size={16}
               icon="arrow-left"
               onPress={() => navigation.goBack()}
            />
         )}
         <Text style={headerStyle.title}>{header.routeName}</Text>

         <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
               <Appbar.Action
                  size={18}
                  color="#ffffff"
                  icon="dots-vertical"
                  onPress={() => setVisible(true)}
               />
            }
         >
            <Menu.Item onPress={handleSignOut} title="Sign out" />
         </Menu>
      </Appbar>
   );
};

const headerStyle = StyleSheet.create({
   header: {
      flex: 1,
      padding: 6,
      justifyContent: 'space-between',
      backgroundColor: '#101010',
   },
   title: {
      marginHorizontal: 12,
      fontFamily: 'Circular',
      color: '#ffffff',
   },
});
