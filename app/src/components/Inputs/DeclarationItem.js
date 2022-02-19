import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Layout, Text } from '@ui-kitten/components';

const DeclarationItem = props => {
    return (
        <>
            <Layout style={styles.container}>
                <Icon
                    {...props}
                    name='checkmark-outline'
                    fill='#3D9A12'
                    style={styles.icon}
                />
                <Text style={styles.text}>{props.data}</Text>
            </Layout>
            {props.usage.length > 0 && <Text>{props.usage}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    text: {
        fontWeight: 'bold',
        marginVertical: 4
    }
});

export default DeclarationItem;
