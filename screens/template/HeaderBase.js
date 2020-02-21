import React, { Component } from 'react';
import { 
    Text, View, Image, Dimensions , Alert, TextInput, FlatList
} from 'react-native';
import { Container, Icon, CheckBox } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
//import ViewPager from '@react-native-community/viewpager';

import MainStyle from './../../styles/MainStyle';
import HeaderRight from './HeaderRight';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';

import {getBgHome, getSearchProducts} from './../../src/api/apiProHot';
//import getStorage from './../api/getStorage';

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

    render() {
        const { navigation, page, title, heading } = this.props;
        switch (page) {
            case 'home':
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
                                    <View style={MainStyle.slideBg}>
                                        <Swiper autoplay={true}>
                                            {this.state.list.map((item, i) =>{ return(
                                                <Image key={i} style={{width:ScreenWidth-40, height:(ScreenWidth/3), borderRadius:8}}  source={{uri:item.image}}/>
                                            )})}
                                        </Swiper >
                                    </View>
                                    <View style={MainStyle.menu}>
                                        <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=> { navigation.navigate('CatScreen')}}>
                                            <View>
                                                <Image style={MainStyle.logoMenu} source={require('./../../assets/icon_cat_b.png')}/>
                                            </View>
                                            <Text style={MainStyle.textMenu}>Danh mục</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=> { navigation.navigate('CatalogScreen')}}>
                                            <View >
                                                <Image style={MainStyle.logoMenu} source={require('./../../assets/icon_catalog.png')}/>
                                            </View>
                                            <Text style={MainStyle.textMenu}>Catalog</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=>{navigation.navigate('SearchScreen')}}>
                                            <View >
                                                <Image style={MainStyle.logoMenu} source={require('./../../assets/icon_cart_b.png')}/>
                                            </View>
                                            <Text style={MainStyle.textMenu}>Đơn hàng</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=> { navigation.navigate('NewsScreen')}}>
                                            <View >
                                                <Image style={MainStyle.logoMenu} source={require('./../../assets/icon_news.png')}/>
                                            </View>
                                            <Text style={MainStyle.textMenu}>Tin tức</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=>{navigation.navigate('ContactScreen')}}>
                                            <View >
                                                <Image style={MainStyle.logoMenu} source={require('./../../assets/icon_contact.png')}/>
                                            </View>
                                            <Text style={MainStyle.textMenu}>Liên hệ</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                         </View>
                    </View>
                );
                case 'category':
                return (
                    <View >
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
                case 'cat':
                return (
                    <View >
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
                case 'news':
                return (
                    <View >
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
                case 'news_detail':
                    return (
                        <View >
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
                    case 'product_detail':
                    return (
                        <View >
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
                    case 'catalog':
                        return (
                            <View >
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
                        case 'catalog_detail':
                        return (
                            <View >
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
                        case 'contact':
                        return (
                            <View >
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

                        case 'search':
                        return (
                            <View style={{ position:'relative'}} >
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

                        case 'notifi':
                        return (
                            <View >
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

                        case 'member':
                        return (
                            <View >
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
            default:
                // return (
                //     <View >
                //         <View style={MainStyle.SliderContainerStyle}>
                //             <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                //             <View style={MainStyle.itemHeagerHome}>
                //                 <View style={MainStyle.headerItem}>
                //                     <View style={MainStyle.headerHomeLeft}>
                //                         <HeaderLeft page={page} title={title} navigation={navigation} />
                //                     </View>
                //                     <View style={MainStyle.headerHomeCenter}>
                //                         <HeaderCenter page={page} title={title} navigation={navigation} />
                //                     </View>
                //                     <View style={MainStyle.headerHomeRight}>
                //                         <HeaderRight page={page} title={title} navigation={navigation} />
                //                     </View>
                //                 </View>
                //             </View>
                //         </View>
                //     </View>
                // );
        }

     }
    
}
