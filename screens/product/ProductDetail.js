import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert, TextInput, Modal, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import AutoHeightWebView from 'react-native-autoheight-webview';

import { getProductDetail, getOtherPro, postComment, getComment } from '../../src/api/apiProHot';
import {getStorage, saveStorage} from '../../src/api/storage';

import global from '../../src/api/global';

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
            comment: '',
            modalVisible:false,
            amout: '1',
            code: '',
            name: '',
            email: '',
            re_code: '',
            id: 0,
            is_login: false,
            member: [],
            viewed: [],
            list_comment: [],
            list_sub_comment: [],
            count_comment: 0

        }
        //global.onSignIn = this.onSignIn.bind(this);
    }

    componentDidMount() {
        this.setState({amout: '1'});
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
                        id: id
                    });
                }else{
                    this.setState({ 
                        loading: false, 
                        allow_more: false,
                    });
                }
                    
            }).catch(err => {
                // console.log(err);
                this.setState({ loading: false });
            });

            getComment(id)
            .then(resJSON => {
                const {list_comment, list_sub_comment, count_comment, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        list_comment: list_comment, 
                        list_sub_comment: list_sub_comment,
                        count_comment: count_comment,
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

            getStorage('member')
            .then((member)=>{
                if(member !=''){
                    this.setState({
                        member:JSON.parse(member),
                        is_login: true
                    })
                }
            })
            .catch((err)=>{
                console.log(err+ 'LOI');
            })

            getStorage('viewed')
            .then((viewed)=>{
                if(viewed !=''){
                    this.setState({
                        viewed:JSON.parse(viewed),
                        is_login: true
                    })
                    console.log(this.state.viewed);
                }else{
                    console.log('NULL');
                }
            })
            .catch((err)=>{
                console.log(err+ 'LOI viewed');
            })

        this.generateRandomString(3);

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
    
    generateRandomString(string_length)
    {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var string = '';
        for(var i = 0; i <= string_length; i++)
        {
            var rand = Math.round(Math.random() * (characters.length - 1));
            var character = characters.substr(rand, 1);
            string = string + character;
        }
        this.setState({
            code: string
        })
    }

    sendComment(){
        var { email, name,comment, code, re_code, is_login, id, member } = this.state;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let number = /^[0-9 .]+$/;
        switch(is_login){
            case true:
                if(comment == ''){
                    Alert.alert('Thông báo', 'Bạn vui lòng nhập bình luận.');
                    return;
                }else if(re_code == ''){
                    Alert.alert('Thông báo', 'Vui lòng nhập mã bảo mật.');
                    return;
                }else if(re_code !== code){
                    Alert.alert('Thông báo', 'Mã bảo mật bạn nhập chưa đúng');
                    return;
                }else{
                    postComment(member.name, member.email, comment, is_login, id)
                    .then(resJSON => {
                        const {msg, error } = resJSON;
                        if(error == false){
                            Alert.alert(msg);
                            this.props.navigation.navigate('HomeScreen');
                        }else{
                            Alert.alert(msg);
                            return;
                        }	
                    }).catch(err => {
                        console.log(err+ 'LOI')
                        this.setState({ loading: false });
                    });
                }
            break;
            case false:
                if(comment == ''){
                    Alert.alert('Thông báo', 'Bạn vui lòng nhập bình luận.');
                    return;
                }else if(name == ''){
                    Alert.alert('Thông báo','Vui lòng nhập tên');
                    return;
                }else if (email == '') {
                    Alert.alert('Thông báo', 'Bạn vui lòng nhập email.');
                    return;
                }else if(reg.test(email) === false){
                    Alert.alert('Thông báo', 'Email bạn nhập chưa hợp lệ.');
                    return;
                }else if(re_code == ''){
                    Alert.alert('Thông báo', 'Vui lòng nhập mã bảo mật.');
                    return;
                }else if(re_code !== code){
                    Alert.alert('Thông báo', 'Mã bảo mật bạn nhập chưa đúng');
                    return;
                }else{
                    postComment(name, email, comment, is_login, id)
                    .then(resJSON => {
                        const {msg, error } = resJSON;
                        if(error == false){
                            Alert.alert(msg);
                            this.props.navigation.navigate('HomeScreen');
                        }else{
                            Alert.alert(msg);
                            return;
                        }	
                    }).catch(err => {
                        console.log(err+ 'LOI')
                        this.setState({ loading: false });
                    });
                }
        }
        
    }

    setModalVisible(visible){
        this.setState({
            modalVisible:visible
        })
    }

    addCart(){
        //Alert.alert(this.state.id);return;
        let {is_login} = this.state;
        if(is_login === true){
            if(this.state.amout < 1){
                Alert.alert('Thông báo', 'Bạn vui lòng nhập số lượng!');
                return false;
            }
            getStorage('cart')
            .then(cart => {
                var tmp = [];
                var existID = false;
                if(cart != ''){
                    var arrCart = JSON.parse(cart);
                    arrCart.map(c => {
                        if(c.id == this.state.id){
                            c.amout = parseInt(c.amout) + parseInt(this.state.amout);
                            existID = true;
                        }
                        tmp.push(c);
                    })
                }
                if(existID == false){
                    tmp.push({
                        id: this.state.id,
                        amout: this.state.amout,
                    });
                }
                saveStorage('cart', JSON.stringify(tmp));
            })
            .catch(err => console.log(err+'Lỗi'));
    
            this.setModalVisible(true)
        }else{
            Alert.alert('Thông báo', 'Vui lòng đăng nhập để mua hàng');
        }
    }
    gotoCart(){
        this.setModalVisible(!this.state.modalVisible);
        this.props.navigation.navigate('CartsScreen');
	}
    
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
        const {is_login, list_comment, list_sub_comment, count_comment } = this.state;
        const memberComment = (
            <View style={MainStyle.formComment}>
                <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, height:60 }}  onChangeText={(comment) => this.setState({ comment })} value={this.state.comment}
                    placeholder="Viết bình luận" multiline={true} 
                />
                <View style={{flexDirection:'row'}}>
                    <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10, width:(screenWidth-20)/2.5 }}  onChangeText={(re_code) => this.setState({ re_code })} value={this.state.re_code}
                        placeholder="Nhập mã bảo mật*" multiline={false} 
                    />
                    <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10,width:(screenWidth-20)/7,marginLeft:5,marginRight:5,textAlign:'center', fontSize:13, fontFamily:'Roboto' }}editable = {false} value={this.state.code}
                    />
                    <TouchableOpacity onPress={ () => this.sendComment()} style={{width:(screenWidth-20)/3,backgroundColor:'#ce1e1e', justifyContent:'center',alignItems:'center',  marginTop:10,}}>
                        <View >
                            <Text style={{fontFamily:'RobotoBold', color:'#ffffff'}}>Gửi bình luận</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View> 
        )

        const guestComment = (
            <View style={MainStyle.formComment}>
                <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, height:60 }}  onChangeText={(comment) => this.setState({ comment })} value={this.state.comment}
                    placeholder="Viết bình luận" multiline={true} 
                />
                <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(name) => this.setState({ name })} value={this.state.name}
                    placeholder="Tên*" multiline={false} 
                />
                <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10 }}  onChangeText={(email) => this.setState({ email })} value={this.state.email}
                    placeholder="Email*" multiline={false} 
                />
                <View style={{flexDirection:'row'}}>
                    <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10, width:(screenWidth-20)/2.5 }}  onChangeText={(re_code) => this.setState({ re_code })} value={this.state.re_code}
                        placeholder="Nhập mã bảo mật*" multiline={false} 
                    />
                    <TextInput style={{fontSize:14,borderColor:'#dddddd', borderWidth:1, padding:5, marginTop:10,width:(screenWidth-20)/7,marginLeft:5,marginRight:5,textAlign:'center', fontSize:13, fontFamily:'Roboto' }}editable = {false} value={this.state.code}
                    />
                    <TouchableOpacity onPress={ () => this.sendComment()} style={{width:(screenWidth-20)/3,backgroundColor:'#ce1e1e', justifyContent:'center',alignItems:'center',  marginTop:10,}}>
                        <View >
                            <Text style={{fontFamily:'RobotoBold', color:'#ffffff'}}>Gửi bình luận</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View> 
        )

        const mainComment = is_login === true?memberComment:guestComment;

        return(
            <Container>
                <HeaderBase page="product_detail" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:130}}>
                           <View style={{width: screenWidth-20,marginLeft:10, marginTop:10}}>
                                <View style={{position:'relative', zIndex:0}}>
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
                                            <TextInput style={MainStyle.childOrderNumber} keyboardType='phone-pad' onChangeText={(amout) => this.setState({ amout })} value={this.state.amout} />
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={ this.addCart.bind(this) }>
                                        <View style={MainStyle.addCart}>
                                            <View style={MainStyle.bgAddCart}>
                                                <Icon type="FontAwesome" name="cart-arrow-down" style={{ color: '#ffffff',fontSize:25,paddingRight:5}} />
                                                <Text style={{fontFamily:'RobotoBold',textTransform:'uppercase', fontSize:14, color:'#ffffff'}}>Thêm vào giỏ hàng</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
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
                                        <View>
                                            <View>
                                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:5}}>
                                                    <Icon type="FontAwesome" name="comments-o" style={{fontSize:20}} />
                                                    <Text style={{fontFamily:'RobotoBold', paddingLeft:10, flex:1}}>ĐÁNH GIÁ VÀ NHẬN XÉT</Text>
                                                    <View/>
                                                </View>
                                                <Text style={{fontFamily:'Roboto',paddingBottom:10, fontSize:15}}>Danh sách thảo luận ({count_comment})</Text>
                                            </View>
                                            {list_comment.map((item, i) =>{
                                                return(
                                                    <View key={i}>
                                                        <View style={MainStyle.commentStyle}>
                                                            <Image style={{ width: screenWidth/7, height:(screenWidth/7)}} source={require('./../../assets/gus_cm.png')}/>
                                                            <View style={{flex:1, paddingHorizontal:15}}>
                                                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                                    <Text style={{fontFamily:'RobotoBold', color:'#000000',}}>{item.name} - </Text>
                                                                    <Text style={{fontFamily:'Roboto', color:'#333333', flex: 1}}>{item.time}</Text>
                                                                    <View/>
                                                                </View>
                                                                <Text>{item.comment}</Text>
                                                            </View>
                                                            <View/>
                                                        </View>
                                                        {list_sub_comment[item.id].length != 0?
                                                        <View>
                                                            {list_sub_comment[item.id].map((res,i2)=>{return(
                                                                <View key={i2} style={MainStyle.subCommentStyle}>
                                                                    <Image style={{ width: screenWidth/7, height:(screenWidth/7)}} source={require('./../../assets/member.png')}/>
                                                                    <View style={{flex:1, paddingHorizontal:15}}>
                                                                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                                            <Text style={{fontFamily:'RobotoBold' , color:'#000000'}}>{res.sub_name} - </Text>
                                                                            <Text style={{fontFamily:'Roboto', color:'#333333', flex: 1}}>{res.sub_time}</Text>
                                                                            <View/>
                                                                        </View>
                                                                        <Text>{res.sub_comment}</Text>
                                                                    </View>
                                                                    <View/>
                                                                </View>
                                                            )})}
                                                        </View>:null
                                                        }
                                                        
                                                    </View>
                                                )})}
                                        </View>
                                        <View style={MainStyle.textComment}>
                                            <View style={{width:(screenWidth-20)/4, borderBottomColor:'#eb1a20', borderBottomWidth:1}}>
                                                <Text style={{fontFamily:'RobotoBold', color:'#ce1e1e', fontSize:18}}>BÌNH LUẬN</Text>
                                            </View>
                                            <View style={{width:(screenWidth-20)*3/4, borderBottomColor:'#dddddd', borderBottomWidth:1}}>
                                                
                                            </View>
                                        </View>
                                        {mainComment}
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
                    <TouchableOpacity onPress={this.addCart.bind(this)}>
                        <View style={MainStyle.bgAddCart}>
                            <Icon type="FontAwesome" name="cart-arrow-down" style={{ color: '#ffffff',fontSize:25,paddingRight:5}} />
                            <Text style={{fontFamily:'RobotoBold',textTransform:'uppercase', fontSize:14, color:'#ffffff'}}>Thêm vào giỏ hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Modal
                presentationStyle="overFullScreen"
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={MainStyle.tContainerModal}>
                        <View style={[MainStyle.pModalBody]}>
                            <View style={MainStyle.pModalContent}>
                                <View style={{width:screenWidth-20, marginLeft:10, paddingTop:15, flexDirection:'row', position:'relative'}}>
                                    <Text style={{ fontFamily:'Roboto', fontSize:13}}>
                                        <Icon type="MaterialCommunityIcons" name="check-circle-outline" style={{ color: '#f22c11',fontSize:15, paddingRight:10}} />
                                         Sản phẩm đã được thêm vào giỏ hàng
                                    </Text>
                                    <TouchableHighlight style={[MainStyle.pBtnModal]}
                                        onPress={()=>this.setModalVisible(!this.state.modalVisible)}>
                                        <Text style={[MainStyle.tBtnModalText],[MainStyle.pBtnModalText]} >
                                            <Icon type="AntDesign" name="close" style={{ fontSize:20, paddingRight:10}} />
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                                <ScrollView>
                                <View style={{ flexDirection:'row', width:screenWidth - 20, marginLeft:10 }}>
                                    <View style={{width:(screenWidth-20)/3}}>
                                        <Image style={{width:(screenWidth-20)/3, height:((screenWidth-20)/3)*436/400}}  source={{uri:this.state.product_detail.image}}/>
                                    </View>
                                    <View style={{ paddingTop:30, paddingLeft:20, width:(screenWidth-20)*2/3}} >
                                        <Text style={{fontSize:15, fontFamily:'Roboto'}}>{ this.state.product_detail.name}</Text>
                                        <Text style={{fontSize:15, fontFamily:'RobotoBold', paddingTop:5, color:'#ce1e1e'}}>{ this.state.product_detail.price}</Text>
                                    </View>
                                </View>
                                </ScrollView>
                                <View style={MainStyle.view_cart}>
                                    <TouchableOpacity onPress={ this.gotoCart.bind(this) }>
                                        <View style={MainStyle.bgViewCart}>
                                            <Text style={{fontFamily:'RobotoBold', fontSize:15, color:'#ffffff'}}>Xem giỏ hàng</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}
 