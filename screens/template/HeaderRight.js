import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PixelRatio, Dimensions, Alert } from 'react-native';
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
    gotoCart(){
        const {navigation} = this.props;
        navigation.navigate('CartsScreen');
    }
    renderButton(){
        const {navigation} = this.props;
        
        if(this.props.page && this.props.page == 'product_detail'){
            return (
                <View style={MainStyle.leftProductDetail}>
                        
                    {/* <Icon type="Ionicons" name="md-search" style={{ color: '#ffffff',fontSize:30, paddingRight:10 }} />
                
                    <Icon type="Feather" name="share-2" style={{ color: '#ffffff', fontSize:30, paddingRight:10 }} />
                
                
                    <Image style={MainStyle.icon_cart_pro} source={require('./../../assets/icon_cart.png')}/>
                
                    <Icon type="Entypo" name="dots-three-horizontal" style={{ color: '#ffffff', fontSize:30,paddingLeft:15, paddingRight:10 }} /> */}
                </View>
            )
        }else if(this.props.page && this.props.page == 'carts'){
            return (
                <View style={MainStyle.leftProductDetail}>
                        
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={this.gotoCart.bind(this)}>
                    <View>
                        <Image style={MainStyle.icon_cart} source={require('./../../assets/icon_cart.png')}/>
                    </View>
                </TouchableOpacity>
            )
        }
        
    }

    render() {
        return(
            <View style={{alignSelf: 'flex-end',flexDirection:'row', marginTop:(width/12)}}>
                {this.renderButton()}
            </View>
        );
    }
}