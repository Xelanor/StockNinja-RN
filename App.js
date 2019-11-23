import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Header from "./components/Layout/Header";
import Homepage from "./screens/Homepage";
import StocksList from "./screens/StocksList";
import Colors from "./constants/colors";

class HomeScreen extends Component {
  state = {
    screen: "stocks"
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          {this.state.screen === "stocks" ? <Homepage /> : <StocksList />}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              backgroundColor: Colors.secondary
            }}
          >
            <View style={styles.bottomNavigator}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ screen: "stocks" });
                }}
              >
                <Text style={styles.navigationTitle}>Hisse Senetlerim</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ screen: "allStocks" });
                }}
              >
                <Text style={styles.navigationTitle}>Bütün Hisseler</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push("Details")}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  bottomNavigator: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "ios" ? 10 : 10,
    paddingBottom: Platform.OS === "ios" ? 40 : 10,
    alignItems: "center"
  },
  navigationTitle: {
    color: Colors.title,
    fontSize: 20,
    textAlign: "center"
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.dark,
        borderBottomWidth: 0,
        shadowColor: "transparent",
        elevation: 0
      },
      headerTitle: () => <Header />,
      headerBackTitle: null,
      headerLeft: null
    }
  }
);

export default createAppContainer(AppNavigator);
