import React from 'react';
import Routes from './src/routes';
import * as Font from 'expo-font';

Font.loadAsync({
    Circular: require('./assets/fonts/circular-bold.woff'),
});

export default () => <Routes />;
