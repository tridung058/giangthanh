import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, TextInput, FlatList} from 'react-native';
import { Icon } from "native-base";
import MainStyle from './../../styles/MainStyle';

import { getSearchProducts } from './../../src/api/apiProHot';
//import global from "../api/global";

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

    search(){
        //search
        getSearchProducts(this.state.page, this.state.search)
        .then(resJSON => {
            const { list_search,count, error} = resJSON;
            if (error == false) {
                this.setState({
                    list_search: list_search,
                    refreshing: false,
                    loading: false,
                    count: count,
                });
            
            }else{
                this.setState({
                    count: 0,
                });
            }
        }).catch(err => {
            // this.setState({ loaded: true });  
    });
    }
    
    setSearch=(value)=>{
        var search = value.toString();
        this.setState(
          {
            "search": search,
            "page": 1,
          },
          () => {
            // here is our callback that will be fired after state change.
            this.search();
          }
        );
    }

    renderButton(){
        const {navigation} = this.props;
            if(this.props.page && this.props.page == 'home'){
                return (
                    <View style={{alignItems: 'center',marginTop:width/12}}>
                        <Image style={MainStyle.logoHome} source={require('./../../assets/logo.png')}/>
                    </View>
                )
            }else if(this.props.page && (this.props.page == 'category' || this.props.page == 'cat' || this.props.page == 'news' || this.props.page == 'news_detail' || this.props.page == 'catalog' || this.props.page == 'catalog_detail'|| this.props.page == 'search'|| this.props.page == 'notifi'|| this.props.page == 'member')){
                return (
                    <View style={{alignItems: 'center',marginTop:width/13.5,marginRight:20,position:'relative'}}>
                        <Icon type="Ionicons" name="md-search" style={{ color: '#000000', position: 'absolute', top: 5, left: 20,zIndex:2 }} />
                        <TextInput style={{ height: 35, backgroundColor:'#ffffff', width:ScreenWidth - 40 -(ScreenWidth/4), borderRadius:3, fontFamily:'Roboto', paddingLeft:35 }} placeholderTextColor='#000000'
                        onChangeText={search => this.setSearch(search)}
                        value={this.state.search}
                        placeholder={'Nhập mã hoặc tên sản phẩm'} />
                        
                        <View >
                            { this.state.count > 0 ? 
                                <FlatList style={{ position:'relative',backgroundColor:'#fff', height:ScreenHeight,width: ScreenWidth,marginTop:10,marginLeft:20  }}
                                    data={this.state.list_search}
                                    renderItem={({ item }) => (
                                        <View style={{paddingLeft:20, paddingTop:10, paddingRight:20}}>
                                            <Text style={{fontFamily:'Roboto', color:'red',fontSize:15 }}>{item.name}</Text>
                                        </View>
                                    )}
                                    // numColumns={6}
                                />
                                    :
                                    null
                                }
                            </View>
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