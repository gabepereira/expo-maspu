import React, { useState } from 'react';
import api from '../../services/api';
import { set } from '../../services/store';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Logo } from '../../components';
import styles from '../styles';

export default ({ navigation }) => {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(false);

    const handleInputChange = (input, value) => {
        setInputs(inputs => ({
            ...inputs,
            [input]: value,
        }));
    };

    const handleInputFocus = () => setError(false);

    const handleSubmit = () => {
        api.post('/auth', { ...inputs })
            .then(({ data }) => {
                const { token } = data;
                set('token', token)
                    .then(() => navigation.navigate('Views'))
                    .catch(error => {
                        setError(true);
                        console.error(error);
                    });
            })
            .catch(error => {
                setError(true);
                console.error(error);
            });
    };

    return (
        <View style={(styles.container, styles.box)}>
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
