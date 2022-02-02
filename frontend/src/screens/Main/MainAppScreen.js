import React from 'react';
import { StyleSheet, ScrollView, TouchableNativeFeedback, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Layout,
    Icon,
    TopNavigationAction,
    TopNavigation,
    Text,
    Avatar,
    MenuItem,
    OverflowMenu
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';

import greeting from '../../utils/Greeting';
import CountDown from '../../utils/Countdown';
import { UserAvatar, Stats, LoadingIndicator, Status, RecentLikes } from '../../components/index';

const MainAppScreen = ({ navigation }) => {
    const [image, setImage] = React.useState('');
    const { name } = useSelector(state => state.auth);
    const { userData } = useSelector(state => state.user);
    const [loading, setLoading] = React.useState(false);
    const [menuVisible, setMenuVisible] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        if (userData.imagePath !== undefined) {
            setImage(userData.imagePath);
        }
        setLoading(false);
    }, [userData]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateProfileScreen = () => {
        setTimeout(() => {
            navigation.navigate('ProfileNavigator');
        }, 975);
    };

    const renderTitle = () => <Text style={styles.titleHeader}>Home</Text>;

    const DrawerIcon = props => (
        <Icon
            {...props}
            name='menu-outline'
            style={[props.style, { width: 32, height: 32 }]}
            animation='pulse'
            fill='#407BFF'
            onPress={() => navigation.openDrawer()}
        />
    );

    const renderSettingsIcon = () => <TopNavigationAction icon={DrawerIcon} />;

    const LinkIcon = props => (
        <Icon
            {...props}
            name='link-2-outline'
            style={[props.style, { width: 28, height: 28 }]}
            animation='pulse'
            fill='#407BFF'
        />
    );

    const MenuIcon = props => (
        <Icon
            {...props}
            name='more-vertical-outline'
            style={[props.style, { width: 28, height: 28 }]}
            animation='pulse'
            fill='#407BFF'
        />
    );

    const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;

    const orbitalLinkHandler = () => {
        Linking.openURL('https://orbital.comp.nus.edu.sg/');
    };

    const skylabLinkHandler = () => {
        Linking.openURL('https://nusskylab-dev.comp.nus.edu.sg/');
    };

    const renderRightActions = () => (
        <React.Fragment>
            <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={LinkIcon} title='Orbital' onPress={orbitalLinkHandler} />
                <MenuItem accessoryLeft={LinkIcon} title='Skylab' onPress={skylabLinkHandler} />
            </OverflowMenu>
        </React.Fragment>
    );

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <SafeAreaView style={styles.parentContainer}>
            <TopNavigation
                title={renderTitle}
                alignment='center'
                accessoryLeft={renderSettingsIcon}
                accessoryRight={renderRightActions}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableNativeFeedback
                    onPress={navigateProfileScreen}
                    background={TouchableNativeFeedback.Ripple('#00000020', false)}
                    useForeground={true}
                >
                    <Layout style={styles.greetingCard}>
                        <Layout>
                            <Text style={styles.greetingTitle}>{greeting()}</Text>
                            <Text>{name}</Text>
                        </Layout>
                        {image.length > 0 ? (
                            <Avatar shape='rounded' size='giant' source={{ uri: image }} />
                        ) : (
                            <UserAvatar name={name} size={56} fontSize={28} />
                        )}
                    </Layout>
                </TouchableNativeFeedback>
                <Status />
                <CountDown />
                <Stats />
                <RecentLikes />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    greetingCard: {
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        elevation: 3
    },
    greetingTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24
    },
    titleHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    }
});

export default MainAppScreen;
