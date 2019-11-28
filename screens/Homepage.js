import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import axios from "axios";

import HomepageTable from "../components/HomepageTable/HomepageTable";
import Colors from "../constants/colors";

class Homepage extends Component {
  state = {
    stocks: null,
    tableHead: ["", "Fiyat", "Düşük-Yüksek", "Fark"],
    activeStock: "",
    targets: {},
    graphData: null,
    loading: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(
        "https://my4wv99yv6.execute-api.us-east-1.amazonaws.com/default/fetch_stock_data"
      )
      .then(res => {
        const data = res.data;
        let targets = {};
        Object.keys(data).map(stockName => {
          targets[stockName] = {
            buyTarget: data[stockName].buyTarget.toString(),
            sellTarget: data[stockName].sellTarget.toString(),
            cloneBuyTarget: data[stockName].buyTarget.toString(),
            cloneSellTarget: data[stockName].sellTarget.toString(),
            prevBuyTarget: data[stockName].prevBuyTarget.toString(),
            prevSellTarget: data[stockName].prevSellTarget.toString()
          };
        });
        this.setState({ stocks: data, targets });
      })
      .catch(err => console.error(err));
  };

  changeActiveStock = async stock => {
    this.setState({ loading: true });
    if (stock !== "") {
      await axios
        .get(
          "https://2akmvtjm73.execute-api.us-east-1.amazonaws.com/default/rsi_index_calculator?stock=" +
            stock
        )
        .then(res => this.setState({ graphData: res.data }))
        .catch(err => console.error(err));
    }
    this.setState({
      activeStock: stock,
      loading: false
    });
  };

  onTargetChangeHandler = (inputText, stockName, targetType) => {
    let targets = { ...this.state.targets };
    targets[stockName][targetType] = inputText;
    this.setState({
      targets
    });
  };

  setBuyTarget = async stockName => {
    this.setState({ loading: true });
    let target = {
      name: stockName,
      target: this.state.targets[stockName].buyTarget,
      prevTarget: this.state.targets[stockName].cloneBuyTarget,
      state: true
    };
    await axios
      .post("https://teknodeneyim.com/stocks/setbuytarget", target)
      .then(res => console.log("success"))
      .catch(err => {
        console.log(err);
      });
    this.getData();
    this.setState({
      loading: false
    });
  };

  setSellTarget = async stockName => {
    this.setState({ loading: true });
    let target = {
      name: stockName,
      target: this.state.targets[stockName].sellTarget,
      prevTarget: this.state.targets[stockName].cloneSellTarget,
      state: true
    };
    await axios
      .post("https://teknodeneyim.com/stocks/setselltarget", target)
      .then(res => console.log("success"))
      .catch(err => {
        console.log(err);
      });
    this.setState({
      loading: false
    });
    this.getData();
  };

  deleteStock = name => {
    axios
      .post("https://teknodeneyim.com/stocks/delete", { name })
      .then(res => {})
      .catch(err => console.error(err));
    this.getData();
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          {this.state.loading ? (
            <View style={[styles.container, styles.loading]}>
              <ActivityIndicator size="large" color="rgb(134, 65, 244)" />
            </View>
          ) : (
            <View></View>
          )}
          {this.state.stocks ? (
            <HomepageTable
              stocks={this.state.stocks}
              headers={this.state.tableHead}
              refresh={this.getData}
              activeStock={this.state.activeStock}
              changeActiveStock={this.changeActiveStock}
              targets={this.state.targets}
              targetChange={this.onTargetChangeHandler}
              setBuyTarget={this.setBuyTarget}
              setSellTarget={this.setSellTarget}
              graphData={this.state.graphData}
              delete={this.deleteStock}
            />
          ) : (
            <View style={[styles.container, styles.loading]}>
              <ActivityIndicator size="large" color="rgb(134, 65, 244)" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: Colors.dark
  },
  loading: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    flex: 1,
    position: "absolute",
    zIndex: 20,
    height: "100%",
    width: "100%"
  }
});

export default Homepage;
