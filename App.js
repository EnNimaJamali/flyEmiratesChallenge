import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import searchPage from './screens/searchPage';    
import fareCards from './screens/fareCards';
import fares from './screens/fares';

const AppNavigator = createStackNavigator(
    {
      searchPage: { screen: searchPage },
      fareCards: { screen: fareCards },
      fares: { screen: fares },
    },
    {
        headerMode: 'none',
    }
);

export default App = createAppContainer(AppNavigator);

