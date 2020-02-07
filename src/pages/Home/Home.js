import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { get } from '../../services/store';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

export default ({ navigation }) => {
    const [user, setUser] = useState('');
    const [sale, setSale] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const token = await get('token');
            token &
                api
                    .get(`/user/getUserData/${token}`)
                    .then(({ data }) => {
                        console.log(data);
                        setUser(data.user);
                        setSale(data.sale);
                    })
                    .catch(error => console.error(error))
                    .finally(() => setLoading(false));
        })();
    }, []);

    return (
        <View style={styles.view}>
            <View>
                <Text style={styles.title}>
                    {!loading && `Olá, ${user.name}.`}
                </Text>
            </View>
        </View>
    );
};
