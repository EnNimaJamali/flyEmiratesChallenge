import React , {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    ActivityIndicator, 
} from 'react-native';

import {
    Container,
    Picker,
    Header,
    Title,
    Button,
    Text,
    Body,
    Left,
    Right,
} from "native-base";

import indexIcon from "../assets/index.png";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export  class searchPage extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            isLoading: true,
            depCountryHolder : '',
            destCountryHolder : ''
        }
    }

    OpenSecondActivity() 
    {
        this.props.navigation.navigate('allList');
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://restcountries.eu/rest/v2/all');
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                countryList: responseJson,
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    render(){
        if (this.state.isLoading) 
        {
          return (
                <Container style={styles.container}>
                    <Header>
                        <Left >
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
    return(
        <Container style={styles.container}>
            <Header>
                <Left >
                </Left>
                <Body>
                    <Title>Fly Emirates</Title>
                </Body>
                <Right >
                    <Image style={{height: 40, width: 40 }} source={indexIcon}/>
                </Right>
            </Header>
            <View style={{  alignItems: 'center', justifyContent: 'center' }}>  
                <Text style={{marginTop:20,alignSelf: 'flex-start'}}>FROM:</Text>                     
                <View style={{marginTop:20, borderWidth:1, borderColor: 'rgb(200, 200, 200)',width: deviceWidth-40}}>
                    <Picker
                        selectedValue={this.state.depCountryHolder}
                        style={{height: 50, width: deviceWidth }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                                depCountryHolder: itemValue ,
                            })
                        }
                    >
                        { this.state.countryList.map((item, key)=>(
                            <Picker.Item label={item.name +'  ('+ item.alpha2Code +')'} value={item.alpha2Code} key={key} />)
                        )}

                    </Picker>
                </View>
                <Text style={{marginTop:40,alignSelf: 'flex-start'}}>TO:</Text>                     
                <View style={{marginTop:20, borderWidth:1, borderColor: 'rgb(200, 200, 200)',width: deviceWidth-40}}>
                    <Picker
                        selectedValue={this.state.destCountryHolder}
                        style={{height: 50, width: deviceWidth }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                                destCountryHolder: itemValue ,
                            })
                        }
                    >

                        { this.state.countryList.map((item, key)=>(
                            <Picker.Item label={item.name +'  ('+ item.alpha2Code +')'} value={item.alpha2Code} key={key} />)
                        )}
                    </Picker>
                </View>
                <Button danger style={styles.bigButton}
                        onPress={() => this.props.navigation.navigate('fareCards',
                                    {depCountryCode: this.state.depCountryHolder ,
                                    destCountryCode : this.state.destCountryHolder} 
                                )}>
                    <Text style={{textAlign:'center'}}>Search</Text>
                </Button>   
            </View>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    bigButton: {
        marginTop:30 , 
        alignSelf:'center',
        width : deviceWidth/2,
        justifyContent:'center'
    }
});

export default searchPage;