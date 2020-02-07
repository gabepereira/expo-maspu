import React from 'react';
import { View, Image } from 'react-native';

export default ({ style, width, height }) => (
    <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...style,
        }}
    >
        <Image
            style={{
                width,
                height,
            }}
            resizeMode="contain"
            source={require('../../../assets/bear.png')}
        />
    </View>
);
