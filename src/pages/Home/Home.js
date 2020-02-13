import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { formatCurrency } from '../../services/formatters';
import { get } from '../../services/store';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import styles, { cardStyle } from '../styles';
import {
   FetchContext,
   LoaderContext,
   HeaderContext,
} from '../../services/context';

export default ({ navigation, route }) => {
   const [user, setUser] = useState('');
   const [sale, setSale] = useState({ items: [] });
   const [hasSale, setHasSale] = useState(false);
   const [values, setValues] = useState({});
   const { fetch, setFetch } = useContext(FetchContext);
   const { loading, setLoading } = useContext(LoaderContext);
   const { setHeader } = useContext(HeaderContext);

   useEffect(() => {
      fetchUserData();
   }, []);

   useEffect(() => {
      const { Home } = fetch;
      if (Home) {
         fetchUserData();
         setFetch(fetch => ({ ...fetch, Home: false }));
      }
   }, [fetch]);

   useFocusEffect(() => {
      setHeader(header => ({
         ...header,
         routeName: 'Painel',
         showBack: false,
      }));
   }, []);

   const fetchUserData = async () => {
      get('token')
         .then(token => {
            api.get('/getUserData', {
               headers: {
                  authorization: token,
               },
            })
               .then(({ data }) => {
                  setUser(data.user);
                  let value = 0,
                     amount = 0,
                     hasValues = Object.keys(data.sale).length && true;

                  if (hasValues) {
                     setSale(data.sale);
                     data.sale.items.forEach(({ quantity, product }) => {
                        value += quantity * product.price;
                        amount += quantity;
                     });
                  } else {
                     setSale({
                        items: [],
                     });
                  }
                  setValues({ value, amount });
                  setHasSale(hasValues);
               })
               .catch(error => {
                  console.error(error);
                  navigation.navigate('SignIn');
               })
               .finally(() => setLoading(false));
         })
         .catch(() => navigation.navigate('SignIn'));
   };

   return (
      <ScrollView style={styles.view}>
         <View style={{ opacity: loading ? 0 : 1 }}>
            <Text style={styles.title}>{!loading && `Olá, ${user.name}.`}</Text>
            <View style={{ marginVertical: 12 }}>
               <Text style={homeStyle.text}>Seu consumo atual:</Text>
               <View
                  style={{
                     backgroundColor: '#101010',
                     padding: 6,
                     margin: 6,
                     borderRadius: 5,
                  }}
               >
                  <Text style={[homeStyle.text, homeStyle.value]}>
                     {formatCurrency(values.value)}
                  </Text>
                  <Text style={homeStyle.text}>{values.amount} Produtos.</Text>
               </View>
            </View>
            <View>
               {hasSale && (
                  <Text style={homeStyle.text}>Produtos recentes:</Text>
               )}
               <View style={homeStyle.recentProducts}>
                  {hasSale ? (
                     sale.items.map(
                        ({ product }, i) =>
                           i < 4 && (
                              <View key={i} style={homeStyle.card}>
                                 <Card
                                    onPress={() =>
                                       navigation.navigate('Product', {
                                          productId: product._id,
                                       })
                                    }
                                 >
                                    <Card.Cover
                                       style={cardStyle.cover}
                                       source={{
                                          uri: product.image,
                                       }}
                                       resizeMode="contain"
                                    />
                                 </Card>
                              </View>
                           )
                     )
                  ) : (
                     <Text style={homeStyle.noRecentProductsText}>
                        Você não adicionou nenhum produto recentemente
                     </Text>
                  )}
               </View>
            </View>
         </View>
      </ScrollView>
   );
};

const homeStyle = StyleSheet.create({
   text: {
      margin: 6,
      color: '#ffffff',
      textAlign: 'center',
   },
   value: {
      fontSize: 24,
      fontFamily: 'Circular',
   },
   recentProducts: {
      flex: 1,
      marginVertical: 12,
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   card: {
      padding: 12,
      width: '50%',
      height: '50%',
   },
   noRecentProductsText: {
      padding: 12,
      textAlign: 'center',
      color: '#ffffff',
   },
});
