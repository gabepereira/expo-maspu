import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar, Menu, Provider } from 'react-native-paper';

export default props => {
    const [routeName, setRouteName] = useState('');
    const [visible, setVisible] = useState(false);
    const { navigation, scene } = props;

    useEffect(() => {
        setRouteName(scene.route.name);
    }, [scene.route.name]);

    const handleSignOut = () => {
        setVisible(false);
        navigation.navigate('SignIn');
    };

    return (
        <Appbar style={headerStyle.header}>
            {scene.route.name === 'Product' && (
                <Appbar.Action
                    size={20}
                    icon="arrow-left"
                    onPress={() => navigation.goBack()}
                />
            )}
            <Text style={headerStyle.title}>{routeName}</Text>

            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                    <Appbar.Action
                        size={18}
                        color="#ffffff"
                        icon="dots-vertical"
                        onPress={() => setVisible(true)}
                    />
                }
            >
                <Menu.Item onPress={handleSignOut} title="Sign out" />
            </Menu>
        </Appbar>
    );
};

const headerStyle = StyleSheet.create({
    header: {
        flex: 1,
        padding: 6,
        justifyContent: 'space-between',
        backgroundColor: '#101010',
    },
    title: {
        marginHorizontal: 12,
        fontFamily: 'Circular',
        color: '#ffffff',
    },
});
