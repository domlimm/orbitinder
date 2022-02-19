import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Button,
    Layout,
    Input,
    Select,
    SelectItem,
    IndexPath,
    Text,
    Icon
} from '@ui-kitten/components';

import { NavHeader, Toast } from '../../components/index';
import { sweExperience, idea } from '../../constants/profleCreationData';

const InputBackgroundScreen2 = ({ route, navigation }) => {
    const [ideaIndex, setIdeaIndex] = React.useState(new IndexPath(0));
    const displayIdea = idea[ideaIndex.row];

    const [sweIndex, setSWEIndex] = React.useState(new IndexPath(0));
    const displaySWE = sweExperience[sweIndex.row];

    const [bio, setBio] = React.useState('');
    const [github, setGithub] = React.useState('');
    const [linkedin, setLinkedin] = React.useState('');
    const [telegram, setTelegram] = React.useState('');
    const [telegramConfirm, setTelegramConfirm] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertStatus, setAlertStatus] = React.useState('');
    const BIO_MAX_LENGTH = 260;

    const navigateRegistration = () => {
        if (telegram.length === 0) {
            setAlertMessage('Telegram username cannot be empty!');
            setShowAlert(true);
            setAlertStatus('warning');

            return;
        }

        if (telegramConfirm.length === 0) {
            setAlertMessage('Please enter your Telegram username again!');
            setShowAlert(true);
            setAlertStatus('warning');

            return;
        }

        if (telegram !== telegramConfirm) {
            setAlertMessage('Telegram username has to match!');
            setShowAlert(true);
            setAlertStatus('warning');

            return;
        }

        navigation.navigate('InputBackground3', {
            ...route.params,
            background: {
                ...route.params.background,
                idea: displayIdea,
                sweExperience: displaySWE,
                biography: bio,
                github: github.length > 0 ? `https://github.com/${github}` : '',
                linkedin:
                    linkedin.length > 0
                        ? `https://www.linkedin.com/in/${linkedin}`
                        : '',
                telegram: telegram.length > 0 ? `https://t.me/${telegram}` : ''
            }
        });
    };

    const AlertIcon = props => <Icon {...props} name='alert-circle-outline' />;

    const renderCaption = () => (
        <Layout>
            <Text
                category='label'
                status='danger'
                style={{ marginVertical: 4 }}
            >
                Only you and your matched partner can see this{' '}
            </Text>
        </Layout>
    );

    const renderBioCaption = () => (
        <Layout
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 4
            }}
        >
            <Text category='label' appearance='hint'>
                Provide a short bio
            </Text>
            <Text category='label' appearance='hint'>
                {bio.length == 0
                    ? 0 + ' / ' + BIO_MAX_LENGTH
                    : bio.length + ' / ' + BIO_MAX_LENGTH}
            </Text>
        </Layout>
    );

    const navProps = {
        navigation: navigation,
        backNav: true,
        type: 'register'
    };

    return (
        <KeyboardAvoidingView
            style={styles.kbContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.container}>
                <NavHeader navProps={navProps} />
                {showAlert && (
                    <Toast
                        message={alertMessage}
                        status={alertStatus}
                        hide={show => setShowAlert(show)}
                    />
                )}
                <ScrollView>
                    <Layout style={styles.textContainer}>
                        <Text style={styles.screenTitle}>
                            Personal Background{' '}
                        </Text>
                        <Text style={styles.screenCaption}>
                            Let others find out more about you!
                        </Text>
                    </Layout>
                    <Layout style={styles.inputContainer}>
                        <Select
                            style={styles.selectInput}
                            selectedIndex={ideaIndex}
                            value={displayIdea}
                            onSelect={index => setIdeaIndex(index)}
                            label='Do you already have an idea in mind?'
                        >
                            {idea.map((value, key) => (
                                <SelectItem key={key} title={value} />
                            ))}
                        </Select>
                        <Select
                            style={styles.selectInput}
                            selectedIndex={sweIndex}
                            value={displaySWE}
                            onSelect={index => setSWEIndex(index)}
                            label='Choose your SWE experience level'
                        >
                            {sweExperience.map((value, key) => (
                                <SelectItem key={key} title={value} />
                            ))}
                        </Select>

                        <Input
                            style={styles.bioInput}
                            multiline={true}
                            textStyle={styles.bioText}
                            placeholder='Bio'
                            label={renderBioCaption}
                            onChangeText={input => setBio(input)}
                            numberOfLines={5}
                            value={bio}
                            maxLength={BIO_MAX_LENGTH}
                        />
                        <Input
                            style={styles.bioInput}
                            placeholder='GitHub Username'
                            label='Github (Optional)'
                            onChangeText={input => setGithub(input)}
                            value={github}
                            autoCapitalize='none'
                        />
                        <Input
                            style={styles.bioInput}
                            placeholder='LinkedIn Username'
                            label='LinkedIn (Optional)'
                            onChangeText={input => setLinkedin(input)}
                            value={linkedin}
                            autoCapitalize='none'
                        />
                        <Input
                            style={styles.bioInput}
                            label='Telegram Username'
                            placeholder='Your handler'
                            onChangeText={input => setTelegram(input)}
                            value={telegram}
                            caption={renderCaption}
                            accessoryRight={AlertIcon}
                            autoCapitalize='none'
                        />
                        <Input
                            style={styles.bioInput}
                            label='Telegram Username Check'
                            placeholder='Re-Enter handler'
                            onChangeText={input => setTelegramConfirm(input)}
                            value={telegramConfirm}
                            accessoryRight={AlertIcon}
                            autoCapitalize='none'
                        />
                    </Layout>
                    <Layout style={styles.inputContainer}></Layout>
                    <Layout style={styles.btnContainer}>
                        <Button
                            onPress={navigateRegistration}
                            style={styles.signupBtn}
                        >
                            Next
                        </Button>
                    </Layout>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    kbContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btnContainer: {
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textContainer: {
        marginVertical: 5,
        alignItems: 'center'
    },
    signupBtn: {
        width: '70%',
        marginVertical: 30
    },
    selectInput: {
        width: '70%',
        marginVertical: 10
    },
    screenTitle: {
        color: '#407BFF',
        fontSize: 20,
        fontWeight: 'bold',
        width: '70%'
    },
    screenCaption: {
        color: '#8cb0ff',
        fontSize: 12,
        fontWeight: 'bold',
        width: '70%'
    },
    bioInput: {
        width: '70%',
        marginVertical: 10
    },
    bioText: {
        minHeight: 64,
        paddingVertical: 10,
        textAlignVertical: 'top'
    }
});

export default InputBackgroundScreen2;
