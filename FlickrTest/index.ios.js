/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var FLICKR_DATA = { 
  key: '0ecc092d56f0543ed3bb4cf7bae1f3ea',
  secret: '68dcf855b1fd265f',
  url: 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=0ecc092d56f0543ed3bb4cf7bae1f3ea&format=json&nojsoncallback=1'
};

var REQUEST_URL = FLICKR_DATA.url;

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  View,
} = React;

var FlickrTest = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.photos.photo),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPhoto}
        style={styles.listView} />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading pictures...
        </Text>
      </View>
    );
  },

  renderPhoto: function(photo) {

    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.createPhotoURI(photo)}}
          style={styles.thumbnail} />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{photo.title}</Text>
        </View>
      </View>

    );
  },

  createPhotoURI: function(item) {
    //src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
    var uri = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_h.jpg";
    //console.trace(uri);
    return uri;
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  bottomContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  thumbnail: {
    flex: 2,
    height: 200,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('FlickrTest', () => FlickrTest);
