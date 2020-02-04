import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ActivityIndicator, Platform, Button, Alert} from 'react-native';
import { Container, Icon } from "native-base";
import Swiper from 'react-native-swiper'

import MainStyle from '../styles/MainStyle.js';
import HeaderBase from './template/HeaderBase';
import FooterBase from './template/FooterBase';

import {getProHot, getCat, getSubCatIn, getListIn, getSubCatAr, getListAr } from './../src/api/apiProHot';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
export default class Home extends React.Component{

    static navigationOptions = ({ navigation }) => ({
		header: null,
    });
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            list_pro_hot: [],
            list_cat: [],
            list_cat_in: [],
            list_pro_in: [],
            list_cat_ar: [],
            list_pro_ar: []
        }; 
    }


    componentDidMount() {
       this.makeRemoteRequest();
    }

    makeRemoteRequest(){
        this.setState({ loading: true}); 
        let cat_id = 'all';
        let cat_id_ar = 'all_ar';
        let is_hot = '1';
        getProHot(is_hot)
        .then(resJSON => {
			const {list_pro_hot, error} = resJSON;
			if(error == false){	
				this.setState({
					list_pro_hot: list_pro_hot, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
        //get cat product
        getCat()
        .then(resJSON => {
			const {list_cat, error} = resJSON;
			if(error == false){	
				this.setState({
					list_cat: list_cat, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });

        //sub cat industry
        this.getSubCatIndustry();
        //get list by industry
        this.proByIndustry(cat_id);
        //sub cat Accessary
        this.getSubCatAccessary();
        //get list by accessary
        this.proByAccessary(cat_id_ar);
    }

    getSubCatIndustry(){
        let id = '9';
        getSubCatIn(id)
        .then(resJSON => {
			const {list_cat_in, error} = resJSON;
			if(error == false){	
				this.setState({
					list_cat_in: list_cat_in, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }
    getSubCatAccessary(){
        let id = '11';
        getSubCatAr(id)
        .then(resJSON => {
			const {list_cat_ar, error} = resJSON;
			if(error == false){	
				this.setState({
					list_cat_ar: list_cat_ar, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }
    
    proByIndustry(cat_id){
        getListIn(cat_id)
        .then(resJSON => {
			const {list_pro_in, error} = resJSON;
			if(error == false){	
				this.setState({
                    cat_id:cat_id,
					list_pro_in: list_pro_in, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }

    proByAccessary(cat_id_ar){
        getListAr(cat_id_ar)
        .then(resJSON => {
			const {list_pro_ar, error} = resJSON;
			if(error == false){	
				this.setState({
                    cat_id_ar:cat_id_ar,
					list_pro_ar: list_pro_ar, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }
    
    goCatDetail(id, name){
        this.props.navigation.navigate('CatProductScreen',{id:id, name:name});
    }
    productDetail(id){
        this.props.navigation.navigate('ProductDetailScreen',{id:id});
    }

    renderLoading  = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{paddingVertical: 20}}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    
    render(){
        const {navigation} = this.props;
        return(
            <Container>
                <HeaderBase page="home" navigation={navigation} />
                <View style={[MainStyle.bodyHome]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={MainStyle.proHot}>
                            <View style={MainStyle.bgProHot}>
                                <Text style={MainStyle.textProHot}>Sản phẩm nổi bật</Text>
                                <Image style={{ width: screenWidth, height:(screenWidth*90/750)}} source={require('./../assets/bg_cat.png')}/>
                                <TouchableOpacity style={MainStyle.viewMoreProHot}>
                                    <Text style={MainStyle.textVm}>Xem thêm</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={MainStyle.showProHot}>
                                {this.state.list_pro_hot.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>{this.productDetail(item.id)}}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                        </View>
                        {/* DANH MỤC MÁY */}
                        <View style={MainStyle.catMachine}>
                            <View style={MainStyle.bgProHot}>
                                <Text style={MainStyle.textProHot}>Danh mục máy</Text>
                                <Image style={{ width: screenWidth, height:(screenWidth*90/750)}} source={require('./../assets/bg_cat.png')}/>
                                <TouchableOpacity style={MainStyle.viewMoreProHot}>
                                    <Text style={MainStyle.textVm}>Xem thêm</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={MainStyle.showCat}>
                                {this.state.list_cat.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemCat} onPress={()=>(this.goCatDetail(item.id, item.name))}>
                                        <View style={MainStyle.colorBgCat}>
                                            <Image style={{width:(screenWidth-100)/4, height:((screenWidth-100)/4)}}  source={{uri:item.image}}/>
                                        </View>
                                        <Text style={MainStyle.nameCat}>{item.name}</Text>
                                    </TouchableOpacity>
                                )})}
                            </View>
                        </View>
                        {/* DANH MỤC MÁY MAY CÔNG NGHỆ */}
                        <View style={MainStyle.sewingMcTech}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Máy may công nghệ</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:20}}>
                                <ScrollView horizontal={true} showsVerticalScrollIndicator={false} >
                                    <TouchableOpacity style={MainStyle.catLevel} onPress={() =>(this.proByIndustry('all')) }>
                                        <View style={this.state.cat_id == 'all'?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                            <Text style={ this.state.cat_id == 'all'?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>Tất cả</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.state.list_cat_in.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={MainStyle.catLevel} onPress={() =>(this.proByIndustry(item.id)) }>
                                            <View style={this.state.cat_id == item.id?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                                <Text style={this.state.cat_id == item.id?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                   )})}
                                </ScrollView>
                            </View>
                            <View style={[MainStyle.showProHot]}>
                                {this.state.list_pro_in.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                            <View>
                                <TouchableOpacity style={MainStyle.moreCatMcTeach}>
                                    <View style={MainStyle.boxMoreCat}>
                                        <Text style={MainStyle.textMoreCatMcTeach}>
                                            Xem thêm 30 sản phẩm 
                                            <Icon type="AntDesign" name="right" style={{ color: '#228fca',fontSize:13,paddingLeft:20}} />
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* DANH MỤC MÁY MAY CÔNG NGHIỆP */}
                        <View style={MainStyle.sewingMcIn}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Máy may công nghiệp</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:20}}>
                                <ScrollView horizontal={true} showsVerticalScrollIndicator={false} >
                                    <TouchableOpacity style={MainStyle.catLevel} onPress={() =>(this.proByIndustry('all')) }>
                                        <View style={this.state.cat_id == 'all'?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                            <Text style={ this.state.cat_id == 'all'?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>Tất cả</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.state.list_cat_in.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={MainStyle.catLevel} onPress={() =>(this.proByIndustry(item.id)) }>
                                            <View style={this.state.cat_id == item.id?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                                <Text style={this.state.cat_id == item.id?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )})}
                                </ScrollView>
                            </View>
                            <View style={[MainStyle.showProHot]}>
                                {this.state.list_pro_in.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                            <View>
                                <TouchableOpacity style={MainStyle.moreCatMcTeach}>
                                    <View style={MainStyle.boxMoreCat}>
                                        <Text style={MainStyle.textMoreCatMcTeach}>
                                            Xem thêm 30 sản phẩm 
                                            <Icon type="AntDesign" name="right" style={{ color: '#228fca',fontSize:13,paddingLeft:20}} />
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* PHỤ TÙNG*/}
                        <View style={MainStyle.accessary}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Phụ tùng</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:20}}>
                                <ScrollView horizontal={true} showsVerticalScrollIndicator={false} >
                                    <TouchableOpacity style={MainStyle.catLevel} onPress={() =>(this.proByAccessary('all_ar')) }>
                                        <View style={this.state.cat_id_ar == 'all_ar'?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                            <Text style={ this.state.cat_id_ar == 'all_ar'?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>Tất cả</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.state.list_cat_ar.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={MainStyle.catLevel} onPress={() =>(this.proByAccessary(item.id)) }>
                                            <View style={this.state.cat_id_ar == item.id?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                                <Text style={this.state.cat_id_ar == item.id?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )})}
                                </ScrollView>
                            </View>
                            <View style={[MainStyle.showProHot]}>
                                {this.state.list_pro_ar.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                            <View>
                                <TouchableOpacity style={MainStyle.moreCatMcTeach}>
                                    <View style={MainStyle.boxMoreCat}>
                                        <Text style={MainStyle.textMoreCatMcTeach}>
                                            Xem thêm 30 sản phẩm 
                                            <Icon type="AntDesign" name="right" style={{ color: '#228fca',fontSize:13,paddingLeft:20}} />
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* MUA BÁN*/}
                        <View style={MainStyle.purchase}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Mua bán quần áo, vải, phụ liệu</Text>
                            </View>
                            <View style={[MainStyle.showPurchase]}>
                                <TouchableOpacity style={MainStyle.itemPurchase}>
                                    <View>
                                        <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={require('./../assets/5.png')}/>
                                        <Text style={MainStyle.namePurchase}>Mua bán quần áo</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={MainStyle.itemPurchase}>
                                    <View>
                                        <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={require('./../assets/6.png')}/>
                                        <Text style={MainStyle.namePurchase}>Vải vóc</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={MainStyle.itemPurchase}>
                                    <View>
                                        <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={require('./../assets/7.png')}/>
                                        <Text style={MainStyle.namePurchase}>Phụ liệu</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* DỊCH VỤ*/}
                        <View style={MainStyle.service}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Dịch vụ ngành may</Text>
                            </View>
                            <View style={[MainStyle.showPurchase]}>
                                <TouchableOpacity style={MainStyle.itemPurchase}>
                                    <View>
                                        <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={require('./../assets/8.png')}/>
                                        <Text style={MainStyle.namePurchase}>Sửa chữa</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={MainStyle.itemPurchase}>
                                    <View>
                                        <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={require('./../assets/9.png')}/>
                                        <Text style={MainStyle.namePurchase}>Lắp đặt</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={MainStyle.itemPurchase}>
                                    <View>
                                        <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={require('./../assets/10.png')}/>
                                        <Text style={MainStyle.namePurchase}>Bảo trì</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <FooterBase page="home" navigation={navigation}/>
            </Container>
        )
    }
}

