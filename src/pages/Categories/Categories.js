import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
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

export default ({ navigation }) => {
   const { setHeader } = useContext(HeaderContext);

   useFocusEffect(() => {
      setHeader(header => ({
         ...header,
         routeName: 'Categorias',
         showBack: false,
      }));
   }, []);

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
