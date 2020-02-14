import React, { useContext, useCallback } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import styles, { cardStyle } from '../styles';
import { HeaderContext } from '../../services/context';
import drinks from '../../../assets/drinks.jpg';
import bomboniere from '../../../assets/bomboniere.jpg';

const categories = [
   {
      title: 'Bebidas',
      image: drinks,
      categoryId: 1,
   },
   {
      title: 'Bomboniere',
      image: bomboniere,
      categoryId: 2,
   },
];

export default ({ navigation, route }) => {
   const { setHeader } = useContext(HeaderContext);

   useFocusEffect(
      useCallback(() => {
         setHeader({
            routeName: 'Categorias',
            showBack: false,
         });
      }, [route])
   );
   return (
      <View style={styles.view}>
         <Text style={styles.title}>Categorias</Text>
         <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
         >
            {categories.map((category, i) => (
               <Card
                  key={i}
                  style={cardStyle.card}
                  onPress={() =>
                     navigation.navigate('Products', {
                        categoryId: category.categoryId,
                     })
                  }
               >
                  <Card.Cover
                     source={{ uri: category.image }}
                     resizeMode="cover"
                  />
                  <Card.Content style={cardStyle.content}>
                     <Title style={cardStyle.title}>{category.title}</Title>
                  </Card.Content>
               </Card>
            ))}
         </ScrollView>
      </View>
   );
};
