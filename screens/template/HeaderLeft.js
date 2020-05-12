import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PixelRatio,Dimensions } from 'react-native';
import { Icon, Container,Content } from "native-base";
import MainStyle from './../../styles/MainStyle';
//import global from './../api/global';

const {width, height} = Dimensions.get('window');

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
        const {navigation, page} = this.props;
            if(this.props.page && this.props.page == 'home'){
                return (
                    null
                )
            }else if(page =='contact'){
                return(
                    <TouchableOpacity style={MainStyle.goBack} onPress={() => this.gotoBack()}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon style={{marginTop:width/13, paddingLeft:10,fontSize:35,color:'#ffffff'}} type="Entypo" name="chevron-left"  />
                            <Text style={{fontFamily:'RobotoBold', marginTop:width/13, color:'#ffffff', fontSize:18}}>Liên hệ</Text>
                        </View>
                    </TouchableOpacity>
                    )
            }else{
                return (
                    <TouchableOpacity style={MainStyle.goBack} onPress={() => this.gotoBack()}>
                        <Icon style={{marginTop:width/13, paddingLeft:10,fontSize:35,color:'#ffffff'}} type="Entypo" name="chevron-left"  />
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