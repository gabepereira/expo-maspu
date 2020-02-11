import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatCurrency } from '../../services/formatters';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import styles, { cardStyle } from '../styles';

export default ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products')
            .then(({ data }) => {
                console.log(data);
                setProducts(data);
            })
            .catch(error => console.error(error))
            .finally(() => {});
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#303030',
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
            >
                {products.map((product, i) => (
                    <Card
                        key={i}
                        style={[
                            cardStyle.card,
                            { marginTop: i === 0 ? 24 : 0 },
                        ]}
                        onPress={() =>
                            navigation.navigate('Product', {
                                productId: product._id,
                            })
                        }
                    >
                        <Card.Cover
                            style={cardStyle.cover}
                            source={{ uri: product.image }}
                            resizeMode="contain"
                        />
                        <Card.Content style={cardStyle.content}>
                            <Title style={cardStyle.title}>
                                {product.title}
                            </Title>
                            <Paragraph>{product.description}</Paragraph>
                            <Paragraph style={cardStyle.price}>
                                {formatCurrency(product.price)}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};
