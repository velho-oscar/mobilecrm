import React from 'react';
import { Text, View, Button, Image, ActivityIndicator, ListView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import Row from '../styles/Row';
import Header from '../styles/Header';

import styles from '../styles/main'; // Plik opisujacy wyglad poszczegolnych elementow.


export default class ActiveTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  static navigationOptions = {
    tapBarLabel: 'Do wykonania',
    drawerIcon: ({tintColor}) => {
      return(
        <FontAwesome style={{color: tintColor, fontSize: 20}}>{Icons.code}</FontAwesome>
      )
    },
    title: 'Do wykonania',
  }

  componentDidMount() {
    return fetch('http://crm.veeo.eu/json/zadania')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // Zrob cos z nowym stanem.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, position: 'absolute', bottom: '50%', alignSelf: 'center'}}>
          <ActivityIndicator size={'large'} color={'#46237A'} />
        </View>
      );
    }

    return (
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row {...rowData}/>}
          //renderSeparator={(sectionId, rowId) => <View style={styles.separator}></View>}
          //renderHeader={() => <Header />}
        />
    );
  }
}