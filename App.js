import React, { useState } from 'react';
import Routes from './src/routes';
import * as Font from 'expo-font';
import { LoaderContext } from './src/services/context';
import { ActivityIndicator, Colors, Provider } from 'react-native-paper';

Font.loadAsync({
    Circular: require('./assets/fonts/circular-bold.woff'),
});

export default () => {
    const [loading, setLoading] = useState(true);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {loading && (
                <ActivityIndicator
                    size={48}
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        flex: 1,
                        width: '100%',
                        height: '100%',
                    }}
                    animating={true}
                    color={Colors.red800}
                />
            )}
            <Provider>
                <Routes />
            </Provider>
        </LoaderContext.Provider>
    );
};
