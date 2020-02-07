import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

export default props => {
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <View style={styles.view}>
            <View>
                <Text style={styles.title}>Produto</Text>
            </View>
        </View>
    );
};
