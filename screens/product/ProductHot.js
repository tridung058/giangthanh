import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getProductHot} from '../../src/api/apiProHot';
import {getStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class ProductHot extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_pro_hot: [],
        }
    }

    componentDidMount() {
        let type = this.props.navigation.state.params.type;
        this.makeRemoteRequest(type);
        
    }

    makeRemoteRequest = (type) => {

        this.setState({ loading: true});
		
		getProductHot(type)
        .then(resJSON => {
            const {list_pro_hot, error } = resJSON;
            //console.log(list_sub_cat);
			if(error == false){
				this.setState({
					list_pro_hot: list_pro_hot, 
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

    productDetail(id, cat_id){
        this.props.navigation.navigate('ProductDetailScreen',{id: id,cat_id: cat_id});
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
                <HeaderBase page="cat" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:100}}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={MainStyle.subCat}>
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
                           </View>
                        </ScrollView>
                    </View>
                </View>
                <FooterBase navigation={navigation} page="cat"  />
            </Container>
        );
    }
}
 