import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        flex: 1,
        padding: 12,
        backgroundColor: '#303030',
    },
    button: {
        margin: 12,
    },
    input: {
        marginBottom: 6,
        height: 48,
        width: '100%',
    },
    title: {
        fontFamily: 'Circular',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 6,
        marginBottom: 16,
        color: '#ffffff',
    },
});

const cardStyle = StyleSheet.create({
    card: {
        marginBottom: 24,
        marginHorizontal: 24,
    },
    cover: {
        padding: 12,
        backgroundColor: '#ffffff',
    },
    content: {
        marginTop: 12,
    },
    title: {
        fontFamily: 'Circular',
        fontSize: 16,
    },
    price: {
        fontFamily: 'Circular',
    },
});

export { cardStyle };
