import React from 'react';
import { View, Image, Alert } from 'react-native';
import { GiangThanh } from './Router';
import { createAppContainer} from 'react-navigation';
import MainStyle from './styles/MainStyle.js';

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
    }

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