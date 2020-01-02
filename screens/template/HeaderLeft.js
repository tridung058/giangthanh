import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PixelRatio } from 'react-native';
import { Icon, Container,Content } from "native-base";
import MainStyle from './../../styles/MainStyle';
//import global from './../api/global';

export default class HeaderLeft extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    gotoBack(){
        // global.onRefreshCount();
        this.props.navigation.goBack();
    }

    renderButton(){
        const {navigation} = this.props;
            if(this.props.page && this.props.page == 'home' || this.props.page == 'category'){
                return (
                    null
                )
            }else{
                return (
                    <TouchableOpacity onPress={() => this.gotoBack()}>
                        <Icon type="SimpleLineIcons" name="arrow-left"  />
                    </TouchableOpacity>
                )
            }
        }
    
    render() {
        return(
            <View style={{alignSelf: 'flex-start', flexDirection:'row'}}>
                {this.renderButton()}
            </View>
        );
    }
}