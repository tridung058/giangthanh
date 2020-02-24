import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert } from 'react-native';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import { getCatalog} from '../../src/api/apiCatalog';
import {getStorage} from '../../src/api/storage';

let screenWidth = Dimensions.get('window').width;
export default class Catalog extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            list_catalog: [],
        }
    }

    componentDidMount() {
    
        this.makeRemoteRequest();
        
    }

    makeRemoteRequest = () => {

        this.setState({ loading: true});
		
		getCatalog()
        .then(resJSON => {
            const {list_catalog, error } = resJSON;
            //console.log(list_sub_cat);
			if(error == false){
				this.setState({
					list_catalog: list_catalog, 
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

    catalogDetail(id, cat_id){
        this.props.navigation.navigate('CatalogDetailScreen',{id:id, cat_id:cat_id});
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
                <HeaderBase page="catalog" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView,{marginBottom:100, marginTop:80}}>
                           <View style={{borderTopWidth:10, borderTopColor:'#eeeeee'}}>
                                <View style={MainStyle.subCatalog}>
                                    <View style={MainStyle.subCatalogDetail}>
                                        {this.state.list_catalog.map((item,i) =>{return(
                                            <TouchableOpacity key={i} style={MainStyle.itemsubCatalog} onPress={()=>(this.catalogDetail(item.id, item.cat_id))}>
                                                <View>
                                                    <View style={{ borderRadius:5, justifyContent:'center',alignItems:'center', borderColor:'#c0c0c0', borderWidth:1}}>
                                                        <Text style={MainStyle.nameCatalog}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )})}
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
 