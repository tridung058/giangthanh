import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PixelRatio, Dimensions } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import { Icon} from "native-base";

//import global from './../api/global';
const {width, height} = Dimensions.get('window');
export default class HeaderRight extends Component{
    constructor(props) {
        super(props);

        this.state = {
           
        }
    }

    componentDidMount() {
       
    }
    renderButton(){
        const {navigation} = this.props;

        return (
            <TouchableOpacity onPress={() => this.onLogout()}>
                <Image style={MainStyle.icon_cart} source={require('./../../assets/icon_cart.png')}/>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <View style={{alignSelf: 'flex-end',flexDirection:'row', marginTop:(width/12)}}>
                {this.renderButton()}
            </View>
        );
    }
}