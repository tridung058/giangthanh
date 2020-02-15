import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getCatAllMachin} from '../../src/api/apiCatProduct';
import {getStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class CatMachin extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_cat: [],
        }
    }

    componentDidMount() {
        let type = this.props.navigation.state.params.type;
    
        this.makeRemoteRequest(type);
        
    }

    makeRemoteRequest = (type) => {

        this.setState({ loading: true});
		
		getCatAllMachin(type)
        .then(resJSON => {
            const {list_cat, error } = resJSON;
            //console.log(list_sub_cat);
			if(error == false){
				this.setState({
					list_cat: list_cat, 
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

    goCatDetail(id, name){
        this.props.navigation.navigate('CatProductScreen',{id:id, name:name});
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
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={MainStyle.subCat}>
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
                           </View>
                        </ScrollView>
                    </View>
                </View>
                <FooterBase navigation={navigation} page="cat"  />
            </Container>
        );
    }
}
 