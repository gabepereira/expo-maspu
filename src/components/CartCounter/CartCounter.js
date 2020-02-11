import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default props => {
    const [counter, setCounter] = useState(0);

    const handleCartCounterClick = action => {
        setCounter(counter => {
            const newCounter =
                counter === 0 && action === -1 ? 0 : counter + action;
            props.onChange(newCounter);
            return newCounter;
        });
    };

    return (
        <View style={cartCounterStyle.container}>
            <Button
                onPress={() => handleCartCounterClick(-1)}
                style={cartCounterStyle.button}
            >
                -
            </Button>
            <Button
                style={{
                    flex: 1,
                    marginHorizontal: 12,
                    backgroundColor: '#ffffff',
                }}
            >
                <Text style={{ color: '#303030', fontFamily: 'Circular' }}>
                    {counter}
                </Text>
            </Button>
            <Button
                onPress={() => handleCartCounterClick(+1)}
                style={cartCounterStyle.button}
            >
                +
            </Button>
        </View>
    );
};

const cartCounterStyle = StyleSheet.create({
    container: {
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    display: {
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: '#ffffff',
    },
});
