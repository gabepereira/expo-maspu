import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatCurrency } from '../../services/formatters';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import styles from '../styles';

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
        <View style={styles.view}>
            <Text style={styles.title}>Produtos</Text>
            <ScrollView showsHorizontalScrollIndicator={false}>
                {products.map((product, i) => (
                    <Card
                        key={i}
                        style={cardStyle.card}
                        onPress={() =>
                            navigation.navigate('Product', product.id)
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

const cardStyle = StyleSheet.create({
    card: {
        marginHorizontal: 12,
        marginBottom: 24,
    },
    cover: {
        padding: 12,
        backgroundColor: '#ffffff',
    },
    content: {
        marginTop: 12,
    },
    title: {
        fontFamily: 'Circular',
        fontSize: 16,
    },
    price: {
        fontFamily: 'Circular',
    },
});
