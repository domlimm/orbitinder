import React, { useState, useEffect } from 'react';
import { TouchableNativeFeedback, StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Layout, Text, Popover, Icon } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import firebase from '../../firebase';

const { width, height } = Dimensions.get('window');

const Stats = () => {
    const uid = firebase.auth().currentUser.uid;

    const [likesCount, setLikesCount] = useState('');
    const [dislikesCount, setDislikesCount] = useState('');
    const [likedByCount, setLikedByCount] = useState('');
    const [visible, setVisible] = useState(false);
    const userData = useSelector(state => state.user.userData);
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        const statsListener = firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(querySnapshot => {
                if (initial) {
                    if (userData.likes !== undefined) {
                        setLikesCount(userData.likes.length);
                    }

                    if (userData.dislikes !== undefined) {
                        setDislikesCount(userData.dislikes.length);
                    }

                    if (userData.likedBy !== undefined) {
                        setLikedByCount(userData.likedBy.length);
                    }

                    setInitial(false);
                } else {
                    const data = querySnapshot.data();

                    setLikesCount(data.likes !== undefined && data.likes.length);
                    setDislikesCount(data.dislikes !== undefined && data.dislikes.length);
                    setLikedByCount(data.likedBy !== undefined && data.likedBy.length);
                }
            });

        return () => statsListener();
    }, [userData]);

    const TouchIcon = () => <FontAwesome5 name='hand-point-up' size={32} color='#407BFF' />;

    const InfoIcon = () => <Icon style={styles.icon} fill='#407BFF' name='info-outline' />;

    const LikeIcon = () => (
        <View style={styles.iconContainer}>
            <Feather name='smile' size={26} color='#4983C4' />
        </View>
    );

    const DislikeIcon = () => (
        <View style={[styles.iconContainer, { backgroundColor: '#FCDCDC' }]}>
            <Feather name='thumbs-down' size={26} color='#F05859' />
        </View>
    );

    const StatCard = ({ type }) => (
        <Layout style={styles.statCard}>
            <View style={styles.headerContainer}>
                <View style={styles.figureContainer}>
                    <Text category='h1' style={styles.statFigure}>
                        {type === 'likes' ? likesCount : dislikesCount}
                    </Text>
                </View>
                <View style={styles.iconFooter}>{type === 'likes' ? <LikeIcon /> : <DislikeIcon />}</View>
            </View>
            <Text category='h6' style={styles.statTitle}>
                {type}
            </Text>
        </Layout>
    );

    const LikedByCard = () => (
        <TouchableNativeFeedback
            onPress={() => setVisible(true)}
            background={TouchableNativeFeedback.Ripple('#00000020', false)}
            useForeground={true}
        >
            <Layout style={styles.likedByContainer}>
                <View style={styles.likedByText}>
                    <Text category='h6'>
                        {likedByCount.length === 0
                            ? 'No user has swiped right on you just yet!'
                            : likedByCount.length === 1
                            ? `${likedByCount} user has swiped right on you!`
                            : `${likedByCount} users have swiped right on you!`}
                    </Text>
                </View>
                <View style={styles.likedByIcon}>
                    <TouchIcon />
                </View>
            </Layout>
        </TouchableNativeFeedback>
    );

    return (
        <View style={styles.parentContainer}>
            <Text category='h5' style={styles.headerTitle}>
                Personal Insights
            </Text>
            <Popover
                anchor={LikedByCard}
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                placement='bottom'
                fullWidth={true}
            >
                <Layout style={styles.popoverContainer}>
                    <View style={styles.popoverIcon}>
                        <InfoIcon />
                    </View>
                    <View style={styles.popoverText}>
                        <Text style={styles.infoText}>We hope this helps you in branding yourself!</Text>
                    </View>
                </Layout>
            </Popover>
            <View style={styles.statCardsContainer}>
                <StatCard type='likes' />
                <StatCard type='disinterest' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        margin: 20
    },
    headerTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    statCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statCard: {
        width: width * 0.5 - 28,
        height: height * 0.16,
        marginHorizontal: 8,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        elevation: 3
    },
    statTitle: {
        textTransform: 'uppercase',
        marginTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statFigure: {
        fontWeight: 'bold'
    },
    figureContainer: {
        width: '80%'
    },
    iconFooter: {
        width: '20%'
    },
    iconContainer: {
        borderRadius: 46,
        backgroundColor: '#E8F2FB',
        height: 50,
        width: 50,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 24,
        width: 24
    },
    likedByContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        elevation: 3
    },
    likedByText: {
        width: '90%',
        justifyContent: 'center'
    },
    likedByIcon: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popoverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        elevation: 3
    },
    popoverIcon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popoverText: {
        width: '80%'
    },
    infoText: {
        fontWeight: 'bold',
        textAlign: 'left'
    }
});

export default Stats;
