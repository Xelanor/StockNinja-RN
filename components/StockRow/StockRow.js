import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { TableWrapper, Cell } from "react-native-table-component";
import Swipeout from "react-native-swipeout";

import StockDetail from "../StockDetail/StockDetail";
import Colors from "../../constants/colors";

rateCalculator = (price, prevClose) => {
  const rate = (((price - prevClose) / prevClose) * 100).toFixed(2);
  return rate;
};

const StockRow = props => {
  const rate = rateCalculator(
    parseFloat(props.stock.price),
    parseFloat(props.stock.prevClose)
  );
  var swipeoutBtns = [
    {
      text: "Button",
      backgroundColor: "red",
      color: "white",
      type: "delete"
    }
  ];
  return (
    <>
      <Swipeout
        right={swipeoutBtns}
        backgroundColor={Colors.primary}
        autoClose={true}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (!props.list) {
              props.activeStock === props.stockName
                ? props.changeActiveStock("")
                : props.changeActiveStock(props.stockName);
            }
          }}
        >
          <View>
            <TableWrapper style={styles.row}>
              <Cell
                key={props.stockName}
                data={props.stockName}
                textStyle={styles.titleText}
              />
              <Cell
                key={props.stock.price}
                data={props.stock.price}
                textStyle={
                  rate < 0 ? styles.decreasingText : styles.increasingText
                }
              />
              <Cell
                key={props.stock.dayRange}
                data={props.stock.dayRange}
                textStyle={styles.defaultText}
              />
              <Cell
                key={rate}
                data={rate}
                textStyle={
                  rate < 0 ? styles.decreasingText : styles.increasingText
                }
              />
            </TableWrapper>
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
      {props.activeStock === props.stockName ? (
        <StockDetail
          stockName={props.stockName}
          stock={props.stock}
          targets={props.targets}
          targetChange={props.targetChange}
          setBuyTarget={props.setBuyTarget}
          setSellTarget={props.setSellTarget}
          graphData={props.graphData}
        />
      ) : (
        <View></View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  titleText: { margin: 6, color: "white", fontWeight: "600" },
  defaultText: { margin: 6, color: "white", textAlign: "center" },
  increasingText: { margin: 6, color: Colors.increase, textAlign: "center" },
  decreasingText: { margin: 6, color: Colors.decrease, textAlign: "center" },
  row: {
    height: 50,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderBottomWidth: 0.5
  }
});

export default StockRow;
