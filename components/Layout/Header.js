import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import Colors from "../../constants/colors";

const Header = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.header}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.headerTitle}>StockNinja</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600"
  }
});

export default Header;
