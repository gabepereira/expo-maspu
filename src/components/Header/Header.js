import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

export default props => {
    const [routeName, setRouteName] = useState('');
    const { navigation, scene } = props;

    useEffect(() => {
        setRouteName(scene.route.name);
    }, [scene.route.name]);

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
            <Appbar.Action
                size={18}
                icon="dots-vertical"
                onPress={() => console.log('Pressed delete')}
            />
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
