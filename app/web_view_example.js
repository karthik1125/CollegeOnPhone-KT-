import React, { Component } from 'react'
import { View, WebView, StyleSheet,Text } from 'react-native'
export default class WebViewExample extends React.Component {
    constructor(props){
        super(props);
        this.state={value:true}
    }
    _onShouldStartLoadWithRequest = (e) => {
        let myurl = e.url
        console.log(e.url);
        const stripped = e.url.split('/')
        let value =  stripped[stripped.length-1];
        console.log( stripped[stripped.length-1])
        
        //  if(e.url != "http://10.0.80.133:3000/login/5be32df126e7c300158688da" ) {
            
        //     this.props.returnFunction(stripped[stripped.length-1])
        
        // }

        if(e.url != "https://serene-wildwood-35121.herokuapp.com/login/5be32df126e7c300158688da" ) {

            this.props.returnFunction(value)
        
        }
    }
    render(){
        return (
            <View>
                <View>
                     <Text>
                 {"\n\n\n"}
                 </Text>
             <View style={{height: 500}}>
                 <WebView
                 automaticallyAdjustContentInsets={false}
                 source={{ uri: 'https://serene-wildwood-35121.herokuapp.com/login/5be32df126e7c300158688da' }}
                 //source={{ uri: 'http://10.0.80.133:3000/login/5be32df126e7c300158688da'}}
                 onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                 onNavigationStateChange = {this._onShouldStartLoadWithRequest}
                 />
             </View>
                </View>
               
     
            </View>
        
        )
    }
  
}

const styles = StyleSheet.create({
   container: {
      height: 350,
      alignItems: 'center'  
   }
})