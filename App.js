import React from 'react';
import { View, Image, Alert } from 'react-native';
import { GiangThanh } from './Router';
import { createAppContainer} from 'react-navigation';
import MainStyle from './styles/MainStyle.js';
import { registerForPushNotificationsAsync } from './src/api/registerForPushNotificationsAsync';
import {Notifications} from 'expo';

import { NavigationActions } from 'react-navigation';
import * as Font from 'expo-font'
const AppContainer = createAppContainer(GiangThanh);

export default class App extends React.Component {
    state = {
        notification: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false
        }
    }
    
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
            'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
     
        this.setState({fontLoaded: true})

        registerForPushNotificationsAsync();
    
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = async (notification) => {
        
        this.setState({notification: notification});
        var {origin, data} = notification;
        // https://stackoverflow.com/questions/48547771/navigate-app-from-the-application-root

        // https://expo.io/dashboard/notifications

        // console.log(notification);

        if (origin === 'selected') {
            this.navigator && this.navigator.dispatch(
                NavigationActions.navigate({ routeName: data.screen})
            );
        }
    };


    render() {
       
        if(this.state.fontLoaded)
            return (
                <AppContainer ref={nav => { this.navigator = nav; }} />
            )
        else
            return (
                <View style={{flex: 1}}>
                    <Image style={[MainStyle.tSplash]} source={require('./assets/splash.png')} />
                </View>
            )
    }
}