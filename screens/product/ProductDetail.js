import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView,Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import FooterBase from '../template/FooterBase';
import HeaderBase from '../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";
import AutoHeightWebView from 'react-native-autoheight-webview';

import { getNewsDetail, getOtherNews} from '../../src/api/apiNews';
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
            news_detail: {},
            list_other : []
        }
    }

    componentDidMount() {
        let id = this.props.navigation.state.params.id;
        //this.makeRemoteRequest(id);
        
    }

    makeRemoteRequest = (id) => {

        this.setState({ loading: true});

            getNewsDetail(id)
            .then(resJSON => {
                const {news_detail, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        news_detail: news_detail, 
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

            getOtherNews(id)
            .then(resJSON => {
                const {list_other, error } = resJSON;
                
                if(error == false){
                    this.setState({
                        list_other: list_other, 
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
                                    {/* <Image style={{width:screenWidth-20, height: screenWidth/2}}  source={{uri:this.state.news_detail.image}}/> */}
                                    <View>
                                       
                                    </View>
                                </View>
                                
                                <View>

                                </View>

                                <View style={MainStyle.other_news}>
                                   
                                </View>
                           </View>
                        </ScrollView>
                    </View>
                </View>
                <View>
                    
                </View>
            </Container>
        );
    }
}
 