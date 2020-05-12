import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ActivityIndicator, Platform, Button, Alert} from 'react-native';
import { Container, Icon, Form } from "native-base";
import Swiper from 'react-native-swiper'

import MainStyle from '../styles/MainStyle.js';
import HeaderBase from './template/HeaderBase';
import FooterBase from './template/FooterBase';

import {getStorage, saveStorage} from '../src/api/storage';

import {getProHot, getCat, getSubCatTech, getSubCatIn, getListTech, getListIn, getSubCatAr, getListAr, getSubCatB, getSubCatSer } from './../src/api/apiProHot';

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
            list_cat_tech: [],
            list_cat_in: [],
            cat_ids: '',
            cat_idsar: '',
            cat_idste: '',
            list_pro_tech: [],
            list_pro_in: [],
            list_cat_ar: [],
            list_pro_ar: [],
            list_cat_buy: [],
            list_cat_service: [],
            id: 0,
            type: 'all'
        }; 
    }


    componentDidMount() {
       this.makeRemoteRequest();
    }

    makeRemoteRequest(){
        this.setState({ loading: true}); 
        let cat_id = 'all';
        let cat_id_ar = 'all_ar';
        let cat_id_te = 'all_te';
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

        //sub cat techology
        this.getSubCatTechology();
        //sub cat industry
        this.getSubCatIndustry();
         //get list by techology
         this.proByTechology(cat_id_te);
        //get list by industry
        this.proByIndustry(cat_id);
        //sub cat Accessary
        this.getSubCatAccessary();
        //get list by accessary
        this.proByAccessary(cat_id_ar);
        //get list cat buy
        this.getSubCatBuy();
        //get list cat service
        this.getSubCatService();
    }


    getSubCatTechology(){
        let id = '9';
        getSubCatTech(id)
        .then(resJSON => {
			const {list_cat_tech, error} = resJSON;
			if(error == false){	
				this.setState({
					list_cat_tech: list_cat_tech, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
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

    //sub cat buy

    getSubCatBuy(){
        let id = '308';
        getSubCatB(id)
        .then(resJSON => {
			const {list_cat_buy, error} = resJSON;
			if(error == false){	
				this.setState({
					list_cat_buy: list_cat_buy, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }

    //sub cat service

    getSubCatService(){
        let id = '321';
        getSubCatSer(id)
        .then(resJSON => {
			const {list_cat_service, error} = resJSON;
			if(error == false){	
				this.setState({
					list_cat_service: list_cat_service, 
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }
    
    proByTechology(cat_id){
        getListTech(cat_id)
        .then(resJSON => {
			const {list_pro_tech, cat_idste, error} = resJSON;
			if(error == false){	
				this.setState({
                    cat_id:cat_id,
                    list_pro_tech: list_pro_tech, 
                    cat_idste: cat_idste
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
			const {list_pro_in, cat_ids, error} = resJSON;
			if(error == false){	
				this.setState({
                    cat_id:cat_id,
                    list_pro_in: list_pro_in, 
                    cat_ids: cat_ids
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
			const {list_pro_ar, cat_idsar, error} = resJSON;
			if(error == false){	
				this.setState({
                    cat_id_ar:cat_id_ar,
                    list_pro_ar: list_pro_ar, 
                    cat_idsar: cat_idsar
				});
			}else{
				this.setState({ loading: false });
			}
        }).catch(err => {
			this.setState({ loading: false });
        });
    }

    viewMore(row, rowperpage){
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
    productDetail(id, cat_id){
        getStorage('viewed')
            .then(viewed => {
                var tmp = [];
                var existID = false;
                if(viewed != ''){
                    var arrViewed = JSON.parse(viewed);
                    arrViewed.map(c => {
                        if(c.id == id){
                            existID = true;
                        }
                        tmp.push(c);
                    })
                }
                if(existID == false){
                    tmp.push({
                        id: id,
                    });
                }
                saveStorage('viewed', JSON.stringify(tmp));
            })
            .catch(err => console.log(err+'Lỗi'));

        this.props.navigation.navigate('ProductDetailScreen',{id: id,cat_id: cat_id});
    }
    viewMoreProHot(){
        let type = this.state.type;
        this.props.navigation.navigate('ProductHotScreen',{type: type});
    }
    viewMorePro(cat_id){
       // Alert.alert(cat_id);return;
        this.props.navigation.navigate('ProductsScreen',{cat_id: cat_id});
    }
    viewMoreCatMachin(){
        let type = this.state.type;
        this.props.navigation.navigate('CatMachinScreen',{type: type});
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
                    <View style={MainStyle.menu}>
                                    <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=> { navigation.navigate('CatScreen')}}>
                                        <View>
                                            <Image style={MainStyle.logoMenu} source={require('./../assets/icon_cat_b.png')}/>
                                        </View>
                                        <Text style={MainStyle.textMenu}>Danh mục</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=> { navigation.navigate('CatalogScreen')}}>
                                        <View >
                                            <Image style={MainStyle.logoMenu} source={require('./../assets/icon_catalog.png')}/>
                                        </View>
                                        <Text style={MainStyle.textMenu}>Catalog</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=>{navigation.navigate('OrderMemberScreen')}}>
                                        <View >
                                            <Image style={MainStyle.logoMenu} source={require('./../assets/icon_cart_b.png')}/>
                                        </View>
                                        <Text style={MainStyle.textMenu}>Đơn hàng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=> { navigation.navigate('NewsScreen')}}>
                                        <View >
                                            <Image style={MainStyle.logoMenu} source={require('./../assets/icon_news.png')}/>
                                        </View>
                                        <Text style={MainStyle.textMenu}>Tin tức</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={MainStyle.itemTouchMenu} onPress={()=>{navigation.navigate('ContactScreen')}}>
                                        <View >
                                            <Image style={MainStyle.logoMenu} source={require('./../assets/icon_contact.png')}/>
                                        </View>
                                        <Text style={MainStyle.textMenu}>Liên hệ</Text>
                                    </TouchableOpacity>
                                </View>
                        <View style={MainStyle.proHot}>
                            <View style={MainStyle.bgProHot}>
                                <Text style={MainStyle.textProHot}>Sản phẩm nổi bật</Text>
                                <Image style={{ width: screenWidth, height:(screenWidth*90/750)}} source={require('./../assets/bg_cat.png')}/>
                                <TouchableOpacity style={MainStyle.viewMoreProHot} onPress={()=>{this.viewMoreProHot()}}>
                                    <Text style={MainStyle.textVm}>Xem thêm</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={MainStyle.showProHot}>
                                {this.state.list_pro_hot.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>{this.productDetail(item.id, item.cat_id)}}>
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
                                <TouchableOpacity style={MainStyle.viewMoreProHot} onPress={()=>{this.viewMoreCatMachin()}}>
                                    <Text style={MainStyle.textVm}>Xem thêm</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={MainStyle.showCat}>
                                {this.state.list_cat.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemCat} onPress={()=>(this.goCatDetail(item.id, item.name))}>
                                        {item.type !== '2'?
                                        <View>
                                            <View style={MainStyle.colorBgCat}>
                                                <Image style={{width:(screenWidth-100)/4, height:((screenWidth-100)/4)}}  source={{uri:item.image}}/>
                                            </View>
                                            <Text style={MainStyle.nameCat}>{item.name}</Text>
                                        </View>
                                        :<View>
                                            <Text style={MainStyle.nameItemNoImage}>{item.name}</Text>
                                        </View>
                                        }
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
                                    <TouchableOpacity style={MainStyle.catLevel} onPress={() =>(this.proByTechology('all')) }>
                                        <View style={this.state.cat_id == 'all'?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                            <Text style={ this.state.cat_id == 'all'?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>Tất cả</Text>
                                        </View>
                                    </TouchableOpacity >
                                    {this.state.list_cat_tech.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={MainStyle.catLevel} onPress={() =>(this.proByTechology(item.id)) }>
                                            <View style={this.state.cat_id == item.id?MainStyle.boxCatLevel:MainStyle.boxCatLevelActive}>
                                                <Text style={this.state.cat_id == item.id?MainStyle.nameCatLevel:MainStyle.nameCatLevelActvie}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                   )})}
                                </ScrollView>
                            </View>
                            <View style={[MainStyle.showProHot]}>
                                {this.state.list_pro_tech.map((item,i) =>{return(
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>this.productDetail(item.id, item.cat_id)}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                            <View>
                                <View style={MainStyle.moreCatMcTeach}>
                                    <View style={MainStyle.boxMoreCat}>
                                        <TouchableOpacity onPress={()=>(this.viewMorePro(this.state.cat_idste))}>
                                            <Text style={MainStyle.textMoreCatMcTeach}>
                                                Xem thêm
                                                <Icon type="AntDesign" name="right" style={{ color: '#228fca',fontSize:13,paddingLeft:20}} />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>this.productDetail(item.id, item.cat_id)}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                            
                            <View>
                                <View style={MainStyle.moreCatMcTeach}>
                                    <View style={MainStyle.boxMoreCat}>
                                        <TouchableOpacity onPress={()=>(this.viewMorePro(this.state.cat_ids))}>
                                            <Text style={MainStyle.textMoreCatMcTeach}>
                                                Xem thêm
                                                <Icon type="AntDesign" name="right" style={{ color: '#228fca',fontSize:13,paddingLeft:20}} />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
                                    <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>this.productDetail(item.id, item.cat_id)}>
                                        <View>
                                            <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                            <Text style={MainStyle.namePro}>{item.name}</Text>
                                            <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )})}
                            </View>
                            <View>
                                <View style={MainStyle.moreCatMcTeach}>
                                    <View style={MainStyle.boxMoreCat}>
                                        <TouchableOpacity onPress={()=>(this.viewMorePro(this.state.cat_idsar))}>
                                            <Text style={MainStyle.textMoreCatMcTeach}>
                                                Xem thêm
                                                <Icon type="AntDesign" name="right" style={{ color: '#228fca',fontSize:13,paddingLeft:20}} />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* MUA BÁN*/}
                        <View style={MainStyle.purchase}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Mua bán quần áo, vải, phụ liệu</Text>
                            </View>
                            <View style={[MainStyle.showPurchase]}>
                                {this.state.list_cat_buy.map((item, i)=>{
                                    return(
                                        <TouchableOpacity style={MainStyle.itemPurchase} onPress={()=>(this.goCatDetail(item.id, item.name))}>
                                            <View>
                                                <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={{uri:item.image}}/>
                                                <Text style={MainStyle.namePurchase}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                        {/* DỊCH VỤ*/}
                        <View style={MainStyle.service}>
                            <View style={MainStyle.bgSewing}>
                                <Text style={MainStyle.textProHot}>Dịch vụ ngành may</Text>
                            </View>
                            <View style={[MainStyle.showPurchase]}>
                                {this.state.list_cat_service.map((item,i)=>{
                                    return(
                                        <TouchableOpacity style={MainStyle.itemPurchase} onPress={()=>(this.goCatDetail(item.id, item.name))}>
                                            <View>
                                                <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3)}}  source={{uri:item.image}}/>
                                                <Text style={MainStyle.namePurchase}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                        
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <FooterBase page="home" navigation={navigation}/>
            </Container>
        )
    }
}

