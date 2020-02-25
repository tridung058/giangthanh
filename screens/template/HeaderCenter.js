import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, TextInput, FlatList, Alert} from 'react-native';
import { Icon } from "native-base";
import MainStyle from './../../styles/MainStyle';

import { getSearchProducts } from './../../src/api/apiProHot';
import global from "../../src/api/global";

const {width, height} = Dimensions.get('window');
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
export default class HeaderCenter extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            list_search: [],
            search: '',
            page: 1
        }
    }

    componentDidMount() {

    }
    ProductDetail(id){
        this.props.navigation.navigate('ProductDetailScreen',{id:id});
    }

    setSearch=(value)=>{
        this.setState(
                  { "search": value},
                );
        var key = this.state.search;
        global.onChangeSearch(key);
    }

    renderButton(){
        const {navigation} = this.props;
            if(this.props.page && this.props.page == 'home'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/12}}>
                        <Image style={MainStyle.logoHome} source={require('./../../assets/logo.png')}/>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'category' || this.props.page == 'cat' || this.props.page == 'cat_machine' || this.props.page == 'news' || this.props.page == 'news_detail' || this.props.page == 'catalog' || this.props.page == 'catalog_detail'|| this.props.page == 'search'|| this.props.page == 'notifi'|| this.props.page == 'member')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        <Icon type="Ionicons" name="md-search" style={{ color: '#000000', position: 'absolute', top: 5, left: 20,zIndex:2 }} />
                        <TextInput style={{ height: 35, backgroundColor:'#ffffff', width:ScreenWidth - 40 -(ScreenWidth/4), borderRadius:3, fontFamily:'Roboto', paddingLeft:35 }} placeholderTextColor='#000000'
                        onChangeText={search => this.setSearch(search)}
                        value={this.state.search}
                        placeholder={'Nhập mã hoặc tên sản phẩm'} />
                    </View>
                )
            } else if(this.props.page && (this.props.page == 'product_detail')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'contact')){
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