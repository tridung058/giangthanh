import React, { Component } from 'react';
import { 
    Text, View, Image, Dimensions , Alert, TextInput, FlatList, TouchableOpacity
} from 'react-native';
import { Container, Icon, CheckBox } from "native-base";
import Swiper from 'react-native-swiper';
//import ViewPager from '@react-native-community/viewpager';

import MainStyle from './../../styles/MainStyle';
import HeaderRight from './HeaderRight';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';

import {getBgHome, getSearchProducts} from './../../src/api/apiProHot';
import { ScrollView } from 'react-native-gesture-handler';
import {getStorage, saveStorage} from './../../src/api/storage';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;

export default class HeaderBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
           loading:true,
           list: [],
           list_search: [],
           search: '',
           page: 1
        }

    }

    componentDidMount() {
       this.makeRemoteRequest();
    }
    makeRemoteRequest(){
        this.setState({ loading: true});

        getBgHome()
        .then(resJSON => {
			const {list, error} = resJSON;
			if(error == false){	

				this.setState({
					list: list, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    
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
    ProductDetail(id, cat_id, name){

        getStorage('history_search')
            .then(history_search => {
                var tmp = [];
                var existID = false;
                if(history_search != ''){
                    var arrSearch = JSON.parse(history_search);
                    arrSearch.map(c => {
                        if(c.id == id){
                            existID = true;
                        }
                        tmp.push(c);
                    })
                }
                if(existID == false){
                    tmp.push({
                        id: id,
                        cat_id: cat_id,
                        name: name
                    });
                }

                saveStorage('history_search', JSON.stringify(tmp));
                this.props.navigation.navigate('ProductDetailScreen',{id:id, cat_id:cat_id});
            })
            .catch(err => console.log(err+'Lỗi'));
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
    goBack(){
        const {navigation} = this.props;
        navigation.goBack();
    }

    render() {
        const { navigation, page, title, heading } = this.props;
        if(page == 'home'){
            return (
                <View >
                    <View style={MainStyle.SliderContainerStyle}>
                        <Image style={MainStyle.bgHeaderHome} source={require('./../../assets/bg_home.png')}/>
                            <View style={MainStyle.itemHeagerHome}>
                                <View style={MainStyle.headerItem}>
                                    <View style={MainStyle.headerHomeLeft}>
                                        <HeaderLeft page={page} title={title} navigation={navigation} />
                                    </View>
                                    <View style={MainStyle.headerHomeCenter}>
                                        <HeaderCenter page={page} title={title} navigation={navigation} />
                                    </View>
                                    <View style={MainStyle.headerHomeRight}>
                                        <HeaderRight page={page} title={title} navigation={navigation} />
                                    </View>
                                </View>
                                <View style={MainStyle.searchBox}>
                                    <Icon type="Ionicons" name="md-search" style={{ color: '#000000', position: 'absolute', top: 8, left: 30,zIndex:2 }} />
                                    <TextInput style={{ height: 40, backgroundColor:'#ffffff', width:ScreenWidth - 40, borderRadius:3, fontFamily:'Roboto', paddingLeft:35 }} placeholderTextColor='#000000'
                                    onChangeText={search => this.setSearch(search)}
                                    value={this.state.search}
                                    placeholder={'Vui lòng nhập mã hoặc tên sản phẩm'} />
                                </View>
                                <View >
                                    { this.state.count > 0 ? 
                                        <FlatList style={{ position:'relative',backgroundColor:'#fff', height:ScreenHeight-(ScreenHeight/3.7),width: ScreenWidth,marginTop:10 }}
                                            data={this.state.list_search}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={{borderBottomColor:'#eeeeee', borderBottomWidth:1, paddingVertical:10}}  onPress={()=>this.ProductDetail(item.id, item.cat_id, item.name)}>
                                                    <View style={{paddingLeft:20, paddingTop:10, paddingRight:20}}>
                                                        <Text style={{fontFamily:'Roboto', color:'red',fontSize:15 }}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            // numColumns={6}
                                        />
                                        :
                                        null
                                    }
                                </View>
                                <View style={MainStyle.slideBg}>
                                    <Swiper autoplay={true}>
                                        {this.state.list.map((item, i) =>{ return(
                                            <Image key={i} style={{width:ScreenWidth-40, height:(ScreenWidth/3.5), borderRadius:8}}  source={{uri:item.image}}/>
                                        )})}
                                    </Swiper >
                                </View>
                            </View>
                     </View>
                </View>
            );
        }else if(page == 'category' || page == 'cat' || page == 'cat_machine' || page == 'news'
        || page == 'news_detail'|| page == 'product_detail' || page == 'catalog' ||
         page == 'catalog_detail' || page == 'contact' || page == 'search' || page == 'notifi'
        || page == 'member' || page == 'carts' || page == 'info_member' || page == 'order_member'
        || page == 'order_member_detail' || page == 'change_pass_word' || page == 'forget_password' || page == 'search_key'){
            return (
                <View style={ MainStyle.heightHeader }>
                    <View style={MainStyle.SliderContainerStyle}>
                    <View>
                                <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                                </View>
                        <View style={MainStyle.itemHeagerHomeSearch}>
                            <View style={MainStyle.headerItemCat}>
                                <View style={MainStyle.headerHomeLeftCat}>
                                    <HeaderLeft page={page} title={title} navigation={navigation} />
                                </View>
                                <View style={MainStyle.headerHomeCenterCat}>
                                    <HeaderCenter page={page} title={title} navigation={navigation} />
                                </View>
                                <View style={MainStyle.headerHomeRightCat}>
                                    <HeaderRight page={page} title={title} navigation={navigation} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }else if(page == 'product_detail'){
            return (
                <View style={ MainStyle.heightHeader }>
                    <View style={MainStyle.SliderContainerStyle}>
                    <View>
                            <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                            </View>
                        <View style={MainStyle.itemHeagerHomeSearch}>
                            <View style={MainStyle.headerItemCat}>
                                <View style={MainStyle.headerHomeLeftProduct}>
                                    <HeaderLeft page={page} title={title} navigation={navigation} />
                                </View>
                                <View style={MainStyle.headerHomeCenterProduct}>
                                    <HeaderCenter page={page} title={title} navigation={navigation} />
                                </View>
                                <View style={MainStyle.headerHomeRightProduct}>
                                    <HeaderRight page={page} title={title} navigation={navigation} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }else if(page == 'authentication'){
            return (
                <View style={ MainStyle.heightHeaderAuthentication }>
                    <View style={MainStyle.SliderContainerStyle}>
                        <View>
                            <Image style={MainStyle.bgHeaderLogin} source={require('./../../assets/bg_login.png')}/>
                        </View>
                        <TouchableOpacity style={{position:'absolute', top:40,left:20}} onPress={this.goBack.bind(this)}>
                            <Icon type="Feather" name="x" style={{ color: '#ffffff', fontSize:35}} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

     }
    
}
