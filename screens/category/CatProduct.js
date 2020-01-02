import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import MainStyle from './../../styles/MainStyle';
import FooterBase from './../template/FooterBase';
import HeaderBase from './../template/HeaderBase';
import { Container, Content, CheckBox, Icon } from "native-base";

import {getStorage} from './../../src/api/storage';

export default class CatProduct extends Component{
    static navigationOptions = ({ navigation }) => ({
		header: null,
    });

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
       
        
    }

    makeRemoteRequest = () => {

        this.setState({ loading: true});
		
		getListStudent(this.state.teacher_id, this.state.class_id)
        .then(resJSON => {
            const {list, error } = resJSON;
            console.log(list);
			if(error == false){
                this.arr = this.arr.concat(list);
				this.setState({
					list: this.arr, 
					loading: false, 
                    refreshing: false ,
                    allow_more: false
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
                <HeaderBase page="category" title={''} navigation={navigation} />
                <View style={[MainStyle.tContainerDefault, {paddingTop: 20}]}>
                    <View style={[MainStyle.tDefaultContent, MainStyle.tDefaultContentFix, {backgroundColor: '#f5fdff'}]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={MainStyle.tDefaultScrollView}>
                           
                        </ScrollView>
                    </View>
                </View>
                <FooterBase navigation={navigation} page="category"  />
            </Container>
        );
    }
}
 