import React, { Component } from 'react';
import { 
    Text, View, Image, Dimensions , Alert, TextInput
} from 'react-native';
import { Container, Icon, CheckBox } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
//import ViewPager from '@react-native-community/viewpager';

import MainStyle from './../../styles/MainStyle';
import HeaderRight from './HeaderRight';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';

import {getBgHome} from './../../src/api/apiProHot';
//import getStorage from './../api/getStorage';

let ScreenWidth = Dimensions.get("window").width;

export default class HeaderBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
           loading:true,
           list: []
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
                                        <TextInput style={{ height: 40, backgroundColor:'#ffffff', width:ScreenWidth - 40, borderRadius:3, fontFamily:'Roboto', paddingLeft:35 }} placeholderTextColor='#000000' placeholder={'Vui lòng nhập mã hoặc tên sản phẩm'} />
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
                                        <TouchableOpacity style={MainStyle.itemTouchMenu}>
                                            <View >
                                                <Image style={MainStyle.logoMenu} source={require('./../../assets/icon_catalog.png')}/>
                                            </View>
                                            <Text style={MainStyle.textMenu}>Catalog</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={MainStyle.itemTouchMenu}>
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
                                        <TouchableOpacity style={MainStyle.itemTouchMenu}>
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
                            <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                            <View style={MainStyle.itemHeagerHome}>
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
                            <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                            <View style={MainStyle.itemHeagerHome}>
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
                            <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                            <View style={MainStyle.itemHeagerHome}>
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
                                <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                                <View style={MainStyle.itemHeagerHome}>
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
                                <Image style={MainStyle.bgHeaderCategory} source={require('./../../assets/bg_cat_hd.png')}/>
                                <View style={MainStyle.itemHeagerHome}>
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
