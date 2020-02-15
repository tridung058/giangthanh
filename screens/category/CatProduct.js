import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getSubCatById, getListBySubCat} from './../../src/api/apiCatProduct';
import {getStorage} from './../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class CatProduct extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_sub_cat: [],
            list_by_sub_cat: [],
            type: '1'
        }
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        const name = this.props.navigation.state.params.name;
        let type = this.state.type;
        this.makeRemoteRequest(id, name, type);
        
    }

    makeRemoteRequest = (id, name, type) => {

        this.setState({ loading: true});
		
		getSubCatById(id, name)
        .then(resJSON => {
            const {list_sub_cat, error } = resJSON;
            //console.log(list_sub_cat);
			if(error == false){
				this.setState({
					list_sub_cat: list_sub_cat, 
					loading: false, 
                    refreshing: false ,
                    allow_more: false,
                    name_cat: name
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
        
        getListBySubCat(id, type)
        .then(resJSON => {
            const {list_by_sub_cat, error } = resJSON;
			if(error == false){
				this.setState({
					list_by_sub_cat: list_by_sub_cat, 
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
    getPro(id){
        getListBySubCat(id, this.state.type)
        .then(resJSON => {
            const {list_by_sub_cat, error } = resJSON;
			if(error == false){
				this.setState({
					list_by_sub_cat: list_by_sub_cat, 
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

    ProductDetail(id){
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
    
    
    render() {
        const {navigation} = this.props;

        return(
            <Container>
                <HeaderBase page="category" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={MainStyle.subCat}>
                                    <Text style={{fontSize:25,fontFamily:'RobotoBold',color:'#000000',paddingTop:30, paddingBottom:5, paddingLeft:20}}>
                                        {this.state.name_cat}
                                    </Text>
                                    <View style={MainStyle.subCatDetail}>
                                            {this.state.list_sub_cat.map((item,i) =>{return(
                                                <TouchableOpacity key={i} style={MainStyle.itemSubCat} onPress={()=>this.getPro(item.id)}>
                                                    <View>
                                                        <View style={{backgroundColor:'#eeeeee', borderRadius:10, justifyContent:'center',alignItems:'center'}}>
                                                            <Image style={{width:(screenWidth-120)/3, height:((screenWidth-120)/3), }}  source={{uri:item.image}}/>
                                                        </View>
                                                        <Text style={MainStyle.nameItem}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )})}
                                    </View>
                                </View>
                           </View>


                           <View style={{marginBottom:120}}>
                                <View style={MainStyle.bgSewing}>
                                    <Text style={MainStyle.textProHot}>Tất cả sản phẩm</Text>
                                </View> 
                                <View style={[MainStyle.showProHot]}>
                                    {this.state.list_by_sub_cat.map((item,i) =>{return(
                                        <TouchableOpacity key={i} style={MainStyle.itemProHot} onPress={()=>this.ProductDetail(item.id)}>
                                            <View>
                                                <Image style={{width:(screenWidth-100)/3, height:((screenWidth-100)/3)*370/360}}  source={{uri:item.image}}/>
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
                <FooterBase navigation={navigation} page="category"  />
            </Container>
        );
    }
}
 