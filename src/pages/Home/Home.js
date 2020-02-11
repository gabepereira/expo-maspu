import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatCurrency } from '../../services/formatters';
import { get } from '../../services/store';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

export default ({ navigation }) => {
    const [user, setUser] = useState('');
    const [sale, setSale] = useState({});
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            get('token')
                .then(token => {
                    api.get(`/user/getUserData/${token}`)
                        .then(({ data }) => {
                            setUser(data.user);
                            if (data.sale) {
                                setSale(data.sale);
                                let value = 0;
                                data.sale.items.map(
                                    item =>
                                        (value +=
                                            item.quantity * item.product.price)
                                );
                                setValue(value);
                            }
                            console.log(data);
                        })
                        .catch(() => navigation.navigate('SignIn'))
                        .finally(() => setLoading(false));
                })
                .catch(() => navigation.navigate('SignIn'));
        })();
    }, []);

    return (
        <View style={styles.view}>
            <Text style={styles.title}>{!loading && `Olá, ${user.name}.`}</Text>
            <View style={{ margin: 'auto' }}>
                <Text style={homeStyle.text}>Seu consumo até agora é</Text>
                <Text style={[homeStyle.text, homeStyle.value]}>
                    {formatCurrency(value)}
                </Text>
            </View>
        </View>
    );
};

const homeStyle = StyleSheet.create({
    text: {
        color: '#ffffff',
        textAlign: 'center',
    },
    value: {
        fontSize: 24,
    },
});
