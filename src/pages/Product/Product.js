import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../../services/api';
import { get } from '../../services/store';
import { formatCurrency } from '../../services/formatters';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import { CartCounter } from '../../components';
import styles, { cardStyle } from '../styles';
import {
   FetchContext,
   LoaderContext,
   HeaderContext,
} from '../../services/context';

export default ({ navigation, route }) => {
   const [product, setProduct] = useState({});
   const [quantity, setQuantity] = useState(0);
   const { productId } = route.params;
   const { setFetch } = useContext(FetchContext);
   const { loading, setLoading } = useContext(LoaderContext);
   const { setHeader } = useContext(HeaderContext);

   useEffect(() => {
      api.get(`/product/${productId}`)
         .then(({ data }) => setProduct(data))
         .catch(error => console.error(error));
   }, []);

   useFocusEffect(
      useCallback(() => {
         setHeader({
            routeName: 'Produto',
            showBack: true,
         });
      }, [route])
   );

   const handleAddProduct = async data => {
      const token = await get('token');
      api.post('/createSale', data, {
         headers: {
            authorization: token,
         },
      })
         .then(({ data }) => {
            console.log(data);
            setFetch(pages => ({ ...pages, Home: true }));
            setLoading(true);
            navigation.navigate('Home');
         })
         .catch(error => {
            setLoading(false);
            console.error(error);
         });
   };

   return (
      <View style={styles.view}>
         <Text style={styles.title}>{product.title}</Text>
         <Card style={productStyle.card}>
            <Card.Cover
               style={productStyle.cover}
               source={{ uri: product.image }}
               resizeMode="contain"
            />
            <Card.Content style={cardStyle.content}>
               <Paragraph>{product.description}</Paragraph>
               <Paragraph style={cardStyle.price}>
                  {formatCurrency(product.price)}
               </Paragraph>
            </Card.Content>
         </Card>
         <View style={[productStyle.card, { marginTop: 'auto' }]}>
            <Text
               style={[
                  cardStyle.title,
                  { color: '#ffffff', marginHorizontal: 'auto' },
               ]}
            >
               Total: {formatCurrency(quantity * product.price)}
            </Text>
            <CartCounter onChange={quantity => setQuantity(quantity)} />
            <Button
               mode="contained"
               color="#ffffff"
               style={{ marginBottom: 24 }}
               onPress={() =>
                  quantity && handleAddProduct({ productId, quantity })
               }
            >
               Adicionar
            </Button>
         </View>
      </View>
   );
};

const productStyle = StyleSheet.create({
   card: {
      marginHorizontal: 24,
   },
   cover: {
      padding: 12,
      backgroundColor: '#ffffff',
   },
});
