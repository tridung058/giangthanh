import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import AutoHeightWebView from 'react-native-autoheight-webview';

import { getProductDetail, getOtherPro} from '../../src/api/apiProHot';
import {getStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class ProductDetail extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            product_detail: {},
            other_pro: [],
            change_des: '1',
            comment: ''
        
        }
    }

    componentDidMount() {
        let id = this.props.navigation.state.params.id;
        let cat_id = this.props.navigation.state.params.cat_id;
        this.makeRemoteRequest(id, cat_id);
        
    }

    makeRemoteRequest = (id, cat_id) => {

        this.setState({ loading: true});

            getProductDetail(id)
            .then(resJSON => {
                const {product_detail, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        product_detail: product_detail, 
                        loading: false, 
                        refreshing: false ,
                        allow_more: false,
                    });
                }else{
                    this.setState({ 
                        loading: false, 
                        allow_more: false
                    });
                }
                    
            }).catch(err => {
                // console.log(err);
                this.setState({ loading: false });
            });

            getOtherPro(cat_id, id)
            .then(resJSON => {
                const {other_pro, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        other_pro: other_pro, 
                        loading: false, 
                        refreshing: false ,
                        allow_more: false,
                    });
                }else{
                    this.setState({ 
                        loading: false, 
                        allow_more: false
                    });
                }
                    
            }).catch(err => {
                // console.log(err);
                this.setState({ loading: false });
            });
        
    }

    changeDes(change_des){
            if(change_des == '2'){
                this.setState({
                    change_des:'2'
                })
            }else{
                this.setState({
                    change_des:'1'
                })
            }
    }
    // productDetail(id, cat_id){
    //     this.props.navigation.navigate('ProductDetailScreen',{id: id,cat_id: cat_id});
    // }


	renderLoading  = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{paddingVertical: 20}}>
                <ActivityIndicator animating size="large" />
            </View>
        );
	};
    
    render() {
        const {navigation} = this.props;
        return(
            <Container>
                <HeaderBase page="product_detail" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:130}}>
                           <View style={{width: screenWidth-20,marginLeft:10, marginTop:10}}>
                                <View style={{position:'relative'}}>
                                    <View style={MainStyle.imageDetail}>
                                        <Image style={{width:screenWidth-40, height: (screenWidth)*400/436, }}  source={{uri:this.state.product_detail.image}}/>
                                    </View>

                                    <View>
                                        <Text style={{paddingTop:10, paddingBottom:5, fontFamily:'RobotoBold', fontSize:18}}>{this.state.product_detail.name}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={MainStyle.detailInfoPrice}>Giá:</Text>
                                            <Text style={{color:'#ce1e1e', fontFamily:'RobotoBold'}}>{this.state.product_detail.price}</Text>
                                        </View>
                                        <View style={{flexDirection:'row', paddingTop:2}}>
                                            <Text style={MainStyle.detailInfo}>Mã SP:</Text> 
                                            <Text style={MainStyle.childDetail}>{this.state.product_detail.code}</Text>
                                        </View>
                                        <View style={{flexDirection:'row', paddingTop:2}}>
                                            <Text style={MainStyle.detailInfo}>Xuất xứ:</Text>
                                            <Text style={MainStyle.childDetail}>{this.state.product_detail.madein}</Text>
                                        </View>
                                        <View style={{flexDirection:'row', paddingTop:2}}>
                                            <Text style={MainStyle.detailInfo}>Lượt xem:</Text> 
                                            <Text style={MainStyle.childDetail}>{this.state.product_detail.hits}</Text>
                                        </View>
                                        <View style={{flexDirection:'row', paddingTop:7}}>
                                            <Text style={MainStyle.detailInfo}>Nhập số lượng:</Text> 
                                            <TextInput style={MainStyle.childOrderNumber} keyboardType='phone-pad' />
                                        </View>
                                    </View>

                                    <View style={MainStyle.addCart}>
                                        <View style={MainStyle.bgAddCart}>
                                            <Icon type="FontAwesome" name="cart-arrow-down" style={{ color: '#ffffff',fontSize:25,paddingRight:5}} />
                                            <Text style={{fontFamily:'RobotoBold',textTransform:'uppercase', fontSize:14, color:'#ffffff'}}>Thêm vào giỏ hàng</Text>
                                        </View>
                                    </View>

                                    <View style={MainStyle.contact}>
                                        <View style={MainStyle.detailContact}>
                                            <View>
                                                <Image style={MainStyle.callIcon} source={require('./../../assets/contact.png')}/>
                                            </View>
                                            <View style={{paddingTop:5,paddingLeft:10}}>
                                                <Text style={MainStyle.contactAdd}>LIÊN HỆ TẠI HÀ NỘI</Text>
                                                <Text style={MainStyle.contactInfo}>{this.state.product_detail.mrsb}</Text>
                                                <Text style={MainStyle.contactInfo}>{this.state.product_detail.mrb}</Text>
                                                <Text style={MainStyle.contactInfo}>{this.state.product_detail.emailb}</Text>
                                            </View>
                                        </View>
                                        <View style={MainStyle.detailContactN}>
                                            <View>
                                                <Image style={MainStyle.callIcon} source={require('./../../assets/contact.png')}/>
                                            </View>
                                            <View style={{paddingTop:5,paddingLeft:10}}>
                                                <Text style={MainStyle.contactAdd}>LIÊN HỆ TẠI TP HCM</Text>
                                                <Text style={MainStyle.contactInfo}>{this.state.product_detail.mrsn}</Text>
                                                <Text style={MainStyle.contactInfo}>{this.state.product_detail.emailn}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={MainStyle.description}>
                                        <View style={this.state.change_des == '1'?MainStyle.desActive:MainStyle.des}>
                                            <TouchableOpacity onPress={()=>{this.changeDes('1')}}>
                                                <Text style={this.state.change_des == '1'?MainStyle.titleDesActive:MainStyle.titleDes}>Thông tin chi tiết</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={this.state.change_des == '2'?MainStyle.desActive:MainStyle.des}>
                                            <TouchableOpacity onPress={()=>{this.changeDes('2')}}>
                                                <Text style={this.state.change_des == '2'?MainStyle.titleDesActive:MainStyle.titleDes}>Địa chỉ mua hàng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={MainStyle.contentDescription}>
                                        {this.state.change_des == '1'?
                                            <AutoHeightWebView
                                                customScript={`document.body.style.background = 'transparent';`}
                                                style={{ width: screenWidth-20, marginTop: 10 }}
                                                files={[{
                                                    href: global.BASE_URL+'/templates/default/css/app.css?v=333',
                                                    type: 'text/css',
                                                    rel: 'stylesheet'
                                                }]}
                                                source={{ html: this.state.product_detail.description }}
                                                zoomable={false}
                                            />:
                                            <View style={{paddingTop:10}}>
                                                <Text>Hà Nội: 51 Nguyễn Văn Linh, Phúc Đồng, Long Biên, Hà Nội</Text>
                                                <Text>Hotline :  0967 118879</Text>
                                                <Text>TP HCM: 48/1 Quốc lộ 13 cũ, Hiệp Bình phước, Thủ đức, HCM.</Text>
                                                <Text>Hotline :  0962422227</Text>
                                            </View>
                                        }
                                        
                                    </View>

                                    <View>
                                        <View style={MainStyle.textComment}>
                                            <View style={{width:(screenWidth-20)/4, borderBottomColor:'#eb1a20', borderBottomWidth:1}}>
                                                <Text style={{fontFamily:'RobotoBold', color:'#ce1e1e', fontSize:18}}>BÌNH LUẬN</Text>
                                            </View>
                                            <View style={{width:(screenWidth-20)*3/4, borderBottomColor:'#dddddd', borderBottomWidth:1}}>
                                                
                                            </View>
                                        </View>
                                        <View style={MainStyle.formComment}>
                                            <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, height:60 }}  onChangeText={(comment) => this.setState({ comment })}
                                                placeholder="Viết bình luận" multiline={true} 
                                            />
                                            <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(name) => this.setState({ name })}
                                                placeholder="Tên*" multiline={false} 
                                            />
                                            <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(email) => this.setState({ email })}
                                                placeholder="Email*" multiline={false} 
                                            />
                                            <View style={{flexDirection:'row'}}>
                                                <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10, width:(screenWidth-20)/2.5 }}  onChangeText={(email) => this.setState({ email })}
                                                    placeholder="Nhập mã bảo mật*" multiline={false} 
                                                />
                                                <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10,width:(screenWidth-20)/7,marginLeft:5,marginRight:5 }}editable = {false}
                                                />
                                                <View style={{width:(screenWidth-20)/3,backgroundColor:'#ce1e1e', justifyContent:'center',alignItems:'center',  marginTop:10,}}>
                                                    <Text style={{fontFamily:'RobotoBold', color:'#ffffff'}}>Gửi bình luận</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                           </View>
                           <View style={MainStyle.other_product}>
                                <View style={MainStyle.bgSewing}>
                                    <Text style={MainStyle.textProHot}>Sản phẩm cùng loại</Text>
                                </View>
                                <View style={MainStyle.showProHot}>
                                    {this.state.other_pro.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>{this.makeRemoteRequest(item.id, item.cat_id)}}>
                                            <View>
                                                <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)}}  source={{uri:item.image}}/>
                                                <Text style={MainStyle.namePro}>{item.name}</Text>
                                                <Text style={MainStyle.pricePro}>Giá: {item.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )})}
                            </View>
                           </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={MainStyle.add_cart}>
                    <View style={MainStyle.bgAddCart}>
                        <Icon type="FontAwesome" name="cart-arrow-down" style={{ color: '#ffffff',fontSize:25,paddingRight:5}} />
                        <Text style={{fontFamily:'RobotoBold',textTransform:'uppercase', fontSize:14, color:'#ffffff'}}>Thêm vào giỏ hàng</Text>
                    </View>
                </View>
            </Container>
        );
    }
}
 