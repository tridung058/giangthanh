import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, TextInput} from 'react-native';
import { Icon } from "native-base";
import MainStyle from './../../styles/MainStyle';

//import global from "../api/global";

const {width, height} = Dimensions.get('window');
const ScreenWidth = Dimensions.get('window').width;
export default class HeaderCenter extends Component{
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    renderButton(){
        const {navigation} = this.props;
            if(this.props.page && this.props.page == 'home'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/12}}>
                        <Image style={MainStyle.logoHome} source={require('./../../assets/logo.png')}/>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'category' || this.props.page == 'cat' || this.props.page == 'news' || this.props.page == 'news_detail' || this.props.page == 'catalog' || this.props.page == 'catalog_detail')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        <Icon type="Ionicons" name="md-search" style={{ color: '#000000', position: 'absolute', top: 7, left: 20,zIndex:2 }} />
                        <TextInput style={{ height: 40, backgroundColor:'#ffffff', width:ScreenWidth - 40 -(ScreenWidth/4), borderRadius:3, fontFamily:'Roboto', paddingLeft:35 }} placeholderTextColor='#000000' placeholder={'Nhập mã hoặc tên sản phẩm'} />
                    </View>
                )
            } else if(this.props.page && (this.props.page == 'product_detail')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        
                    </View>
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
            <View>
                {this.renderButton()}
            </View>
        );
    }
}