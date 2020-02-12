import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { set } from '../../services/store';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Logo } from '../../components';
import styles from '../styles';
import { FetchContext, LoaderContext } from '../../services/context';

export default ({ navigation }) => {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(false);
    const { setFetch } = useContext(FetchContext);
    const { setLoading } = useContext(LoaderContext);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleInputChange = (input, value) => {
        setInputs(inputs => ({
            ...inputs,
            [input]: value,
        }));
    };

    const handleInputFocus = () => setError(false);

    const handleSubmit = () => {
        setLoading(true);
        api.post('/auth', { ...inputs })
            .then(({ data }) => {
                const { token } = data;
                set('token', token)
                    .then(() => {
                        setFetch(fetch => ({ ...fetch, Home: true }));
                        navigation.navigate('Views');
                    })
                    .catch(error => {
                        setError(true);
                        console.error(error);
                    });
            })
            .catch(error => {
                setLoading(false);
                setError(true);
                console.error(error);
            });
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 12,
            }}
        >
            <Logo
                width={144}
                height={48}
                style={{
                    margin: 12,
                }}
            />
            <TextInput
                style={styles.input}
                textContentType="emailAddress"
                label="Email"
                mode="outlined"
                value={inputs.email || ''}
                theme={{
                    colors: {
                        background: '#ffffff',
                    },
                }}
                onFocus={handleInputFocus}
                onChangeText={text => handleInputChange('email', text)}
                error={error}
            />
            <TextInput
                style={styles.input}
                textContentType="password"
                secureTextEntry={true}
                label="Password"
                mode="outlined"
                value={inputs.password || ''}
                theme={{
                    colors: {
                        background: '#ffffff',
                    },
                }}
                onFocus={handleInputFocus}
                onChangeText={text => handleInputChange('password', text)}
                error={error}
            />
            <Button
                style={styles.button}
                mode="contained"
                color="#303030"
                onPress={handleSubmit}
            >
                SignIn
            </Button>
        </View>
    );
};
