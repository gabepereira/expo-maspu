import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

export default props => {
    const [routeName, setRouteName] = useState('');

    useEffect(() => {
        setRouteName(props.scene.route.name);
    }, [props]);

    return (
        <Appbar style={headerStyle.header}>
            <Text style={headerStyle.title}>{routeName}</Text>
            <Appbar.Action
                size={24}
                icon="dots-vertical"
                onPress={() => console.log('Pressed delete')}
            />
        </Appbar>
    );
};

const headerStyle = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#101010',
    },
    title: {
        marginHorizontal: 12,
        fontFamily: 'Circular',
        color: '#ffffff',
    },
});
