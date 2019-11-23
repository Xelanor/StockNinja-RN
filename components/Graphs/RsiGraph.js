import React from "react";
import { LineChart, YAxis, Grid } from "react-native-svg-charts";
import { View } from "react-native";

class RsiGraph extends React.PureComponent {
  render() {
    const data = this.props.data;
    const contentInset = { top: 20, bottom: 20 };

    return (
      <View style={{ height: 200, flexDirection: "row" }}>
        <YAxis
          data={[0, 100]}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10
          }}
          numberOfTicks={10}
        />
        <LineChart
          style={{ flex: 1, marginHorizontal: 16 }}
          data={data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={contentInset}
          yMax={100}
          yMin={0}
        >
          <Grid />
        </LineChart>
      </View>
    );
  }
}

export default RsiGraph;
