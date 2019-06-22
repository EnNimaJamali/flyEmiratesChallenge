import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ListView,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
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
import backIcon from "../node_modules/react-navigation-stack/src/views/assets/back-icon.png"

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
var  depCountryCode ;
var destCountryCode ;
const ds = new ListView.DataSource({ rowHasChanged: (r1_1, r2) => r1_1 !== r2 });

export class fareCards extends Component 
{
    constructor(props) 
    {
        super(props);
        depCountryCode = this.props.navigation.state.params.depCountryCode ;
        destCountryCode = this.props.navigation.state.params.destCountryCode ;
        this.state = 
        {
            isLoading: true,
            isEmpty : false,
        }
    }

  async componentDidMount() 
  {
      try 
      {
          const response = await fetch('http://www.emirates.com/api/en-' + depCountryCode + '/fares');
          const responseJson = await response.json();
          strData = JSON.stringify(responseJson);
          if (!(strData.indexOf('status') > -1)) 
          {
              this.setState({
                  isLoading: false,
                  isEmpty: false,
                  //dataSource: ds.cloneWithRows(responseJson.farecards.cards),
                  dataSource: ds.cloneWithRows(responseJson.farecards.cards.filter(d => d.destcountrycode === destCountryCode)),
                });
                if(this.state.dataSource.getRowCount()<1)
                {
                    this.setState({
                        isEmpty: true,
                    })
                }
            }
            else 
            {
                this.setState({
                    isEmpty: true,
                    isLoading: false,
                });
            }
        }
        catch (error) 
        {
            console.error(error);
        }
    }

  ListViewItemSeparatorLine = () => 
  {
      return (
        <View style={{height: 5,nwidth: "100%", backgroundColor: "#000",}}/>
        );
    }

  render() 
  {
      if (this.state.isLoading) 
      {
          return (
                <Container style={styles.container}>
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
                    <View style={{flex: 1, paddingTop: 20}}>
                        <Text style={ {alignSelf : 'center' , marginTop :50 , fontSize : 18} }>
                            Please wait ...
                        </Text>
                        <ActivityIndicator size = 'large' style={ {alignSelf : 'center' , marginTop :50} }/>
                    </View>
                </Container>
      
            );
        } 
        if(this.state.isEmpty)
        {
            return (
                <Container style={styles.container}>
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
                    <View style={{flex: 1, paddingTop: 20}}>
                        <Text style={ styles.welcome }>
                            Sorry, there are no featured fares from {depCountryCode} to {destCountryCode}.
                        </Text>
                    </View>
                </Container>
            );
        }
        return (
            <Container style={styles.container}>
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
                <ScrollView >
                    <ListView
                            contentContainerStyle={styles.list}
                            dataSource={this.state.dataSource}
                            renderSeparator={this.ListViewItemSeparatorLine}
                            renderRow={(rowData) =>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('fares',
                                                                                    {
                                                                                        fares:rowData.fares , 
                                                                                        fareImage:rowData.image,
                                                                                        depCity:rowData.depcityshortname,
                                                                                        depAirport:rowData.depairportcode,
                                                                                        destCity:rowData.destcityshortname,
                                                                                        destAirport:rowData.destairportcode,
                                                                                    })}>
                            <View style={{flexDirection:'row'}}>                 
                                <Image
                                        style={{ width: deviceWidth/2.6 , height:deviceWidth/2.6/1.5 }}
                                        source={{ uri: rowData.image}}
                                />
                                <View style={{ left: 10 }}>
                                    <Text style={{ fontSize: 20 , color: 'black' }} >
                                        From 
                                    </Text>
                                    <Text style={{ fontSize: 14 , color: 'black' }} >
                                        {rowData.depcountryname} / {rowData.depcityshortname}({rowData.depairportcode})
                                    </Text>
                                    <Text style={{ fontSize: 20 , color: 'black' }} >
                                        To 
                                    </Text>
                                    <Text style={{ fontSize: 14 , color: 'black' }} >
                                        {rowData.destcountryname} / {rowData.destcityshortname}({rowData.destairportcode})
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }/>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: 1,
    margin: 20,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  }
});

export default fareCards