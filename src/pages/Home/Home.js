import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { formatCurrency } from '../../services/formatters';
import { get } from '../../services/store';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import styles, { cardStyle } from '../styles';
import { FetchContext, LoaderContext } from '../../services/context';

export default ({ navigation, route }) => {
    const [user, setUser] = useState('');
    const [sale, setSale] = useState({});
    const [value, setValue] = useState(0);
    const { fetch, setFetch } = useContext(FetchContext);
    const { loading, setLoading } = useContext(LoaderContext);

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

    const fetchUserData = async () => {
        get('token')
            .then(token => {
                api.get(`/user/getUserData/${token}`)
                    .then(({ data }) => {
                        setUser(data.user);
                        if (data.sale) {
                            setSale(data.sale);
                            let value = 0;
                            data.sale.items.map(
                                ({ quantity, product }) =>
                                    (value += quantity * product.price)
                            );
                            setValue(value);
                        }
                        console.log(data);
                    })
                    .catch(() => navigation.navigate('SignIn'))
                    .finally(() => setLoading(false));
            })
            .catch(() => navigation.navigate('SignIn'));
    };

    return (
        <ScrollView>
            <View style={[styles.view, { opacity: loading ? 0 : 1 }]}>
                <Text style={styles.title}>
                    {!loading && `Olá, ${user.name}.`}
                </Text>
                <View style={{ marginVertical: 48 }}>
                    <Text style={homeStyle.text}>
                        Seu consumo até agora é de
                    </Text>
                    <Text style={[homeStyle.text, homeStyle.value]}>
                        {formatCurrency(value)}
                    </Text>
                </View>
                <View>
                    <Text style={homeStyle.text}>Produtos recentes</Text>
                    <View style={homeStyle.recentProducts}>
                        {sale.items ? (
                            sale.items.map(({ product }, i) => (
                                <View style={homeStyle.card}>
                                    <Card
                                        key={i}
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
                                    </Card>
                                </View>
                            ))
                        ) : (
                            <></>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const homeStyle = StyleSheet.create({
    text: {
        color: '#ffffff',
        textAlign: 'center',
    },
    value: {
        margin: 6,
        fontSize: 24,
        fontFamily: 'Circular',
    },
    recentProducts: {
        marginVertical: 12,
        flex: 1,
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
});
