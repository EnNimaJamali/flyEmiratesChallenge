import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ListView,
    ScrollView,
    Dimensions,
    ImageBackground,
} from 'react-native';

import {
    Container,
    Header,
    Title,
    Text,
    Body,
    Left,
    Right,
    Button,
} from "native-base";


import indexIcon from "../assets/index.png";
import returnIcon from "../assets/return.png";
import backIcon from "../node_modules/react-navigation-stack/src/views/assets/back-icon.png"

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var fareImage;

export  class fares extends Component 
{
    constructor(props) 
    {
        super(props);
        const myData = this.props.navigation.state.params.fares;
        fareImage = this.props.navigation.state.params.fareImage;
        this.state = {
            dataSource: ds.cloneWithRows(myData),
        }
    }

    ListViewItemSeparatorLine = () => 
    {
        return (
          <View style={{height: 5,nwidth: "100%", backgroundColor: 'green',}}/>
          );
    }
    
    render()
    {
        return (
            <Container >
                <Header>
                    <Left >
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Image source={backIcon}></Image>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Fly Emirates</Title>
                    </Body>
                    <Right >
                        <Image style={{height: 40, width: 40 }} source={indexIcon}/>
                    </Right>
                </Header>
                <View>
                    <View style={{flexDirection:'column'}}>   
                        <ImageBackground 
                                style={{ width: deviceWidth ,height:deviceWidth/1.5 ,flexDirection:'row' }}
                                source={{ uri: this.props.navigation.state.params.fareImage}}  
                        >
                            <View style={{flexDirection:'row',position: 'absolute', bottom: 10,left:10  }}>
                                <Image
                                    style={{ width: 40 ,height:40 ,}}
                                    source={returnIcon}
                                />
                                <View>
                                    <Text style={{ fontSize: 18 , color: 'white',marginLeft:20}} >
                                        Return trip from {this.props.navigation.state.params.depCity} 
                                        ({this.props.navigation.state.params.depAirport}) to 
                                    </Text>
                                    <Text style={{ fontSize: 25 ,fontWeight: 'bold', color: 'white',marginLeft:20}} >
                                        {this.props.navigation.state.params.destCity} 
                                        ({this.props.navigation.state.params.destAirport})
                                    </Text>
                                </View> 
                            </View>
                        </ImageBackground>            
                    </View>
                    <View style={{height: 5,nwidth: "100%", backgroundColor: 'green',}}/>

                    <ScrollView >
                        <ListView
                                contentContainerStyle={styles.list}
                                dataSource={this.state.dataSource}
                                renderSeparator={this.ListViewItemSeparatorLine}
                                renderRow={(rowData) =>
                            <View style={{ left: 10 }}>
                                <Text style={{ fontSize: 18 , color: 'green',fontStyle:'italic' }} >
                                    {rowData.travelclasstext}
                                </Text>
                                <Text style={{ fontSize: 18 , color: 'black' ,fontWeight:'bold'}} >
                                    From
                                </Text>
                                <Text style={{ fontSize: 25 , color: 'black',fontWeight:'bold' }} >
                                    {rowData.price}
                                </Text>
                                <Text style={{ fontSize: 18 , color: 'black' }} >
                                    {rowData.currencycode}
                                </Text>
                                <Text style={{ fontSize: 18 , color: 'black' }} >
                                    For travel between{rowData.travelfromuntil}
                                </Text>
                                <Text style={{ fontSize: 18 , color: 'red' }} >
                                Fare expires in {rowData.expiryindays} days
                                </Text>                               
                            </View>
                                 
                        }/> 
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  
});

export default fares;

    {/* <Image
                                    style={{ width: deviceWidth ,height:deviceWidth/1.5 }}
                                    source={{ uri: this.props.navigation.state.params.fareImage}}
                                />
                                 */}