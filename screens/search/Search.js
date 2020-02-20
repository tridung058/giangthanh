import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getCat} from '../../src/api/apiCatProduct';
import {getStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class Search extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_cat: [],
            level: '1'
        }
    }

    componentDidMount() {
        let level = this.state.level;
    
       // this.makeRemoteRequest(level);
        
    }

    makeRemoteRequest = (level) => {

        this.setState({ loading: true});
		
		getCat(level)
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
                <HeaderBase page="search" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={MainStyle.subCat}>
                                    <View style={{paddingTop:10, justifyContent:'center'}}>
                                       <Text style={{paddingLeft:20, fontFamily:'Roboto', fontSize:16}}>Máy may công nghệ</Text>
                                       <Text style={{paddingLeft:20,fontFamily:'Roboto', fontSize:18}}>Máy may công nghiệp</Text>
                                       <Text style={{paddingLeft:20,fontFamily:'Roboto', fontSize:18}}>Thiết bị chuyên dụng</Text>
                                       <Text style={{paddingLeft:20,fontFamily:'Roboto', fontSize:18}}>Phụ tùng</Text>
                                    </View>
                                </View>
                           </View>
                        </ScrollView>
                    </View>
                </View>
            </Container>
        );
    }
}
 