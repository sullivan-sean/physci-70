import * as array from "d3-array";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import { Path, Grid, YAxis } from "react-native-svg-charts";

const MultiLineChart = (props) => {
  const [size, setSize] = useState({ height: 0, width: 0 });

	const {
		data,
    dataKeys,
    xKey,
		yScale,
		xScale,
		style,
		animate,
		animationDuration,
		showGrid,
		numberOfTicks,
		contentInset: { top = 0, bottom = 0, left = 0, right = 0 },
		gridMax,
		gridMin,
		renderDecorator,
		extras,
		gridProps,
		svg,
		renderGrid = Grid,
    colors,
    curve
	} = props;

	if (data.length === 0) {
		return <View style={style} />;
	}

  const createPaths = ({ data, x, y }) => {
  };

	const myData = dataKeys.map(key => data.map((item, index) => ({ x: item[xKey], y: item[key] })));

  const _onLayout = (event) => {
    const { nativeEvent: { layout: { height, width } } } = event;
    setSize({ height, width });
  }

	const yValues = myData.flat().map(item => item.y);
	const xValues = myData[0].map(item => item.x);
	const yExtent = array.extent([...yValues]);
	const xExtent = array.extent([...xValues]);

	const { width, height } = size;

	const x = xScale().domain(xExtent).range([left, width - right]);
	const y = yScale().domain(yExtent).range([height - bottom, top]);

  const lines = myData.map(item => (
    shape.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .defined(item => typeof item.y === "number")
      .curve(curve)(item)
  ));

	const ticks = y.ticks(numberOfTicks);

  const extraData = {
    x,
    y,
    width,
    height,
    path: lines.join(""),
    line: lines,
    color: colors
  };

	return (
    <>
    <YAxis
      data={yValues}
      contentInset={{ top: 10, bottom: 10 }}
      svg={{ fill: 'grey', fontSize: 10 }}
      numberOfTicks={10}
      formatLabel={item => item.toFixed(2)}
    />
		<View style={style}>
			<View style={{ flex: 1 }} onLayout={_onLayout}>
				<Svg style={{ flex: 1 }}>
					{showGrid && renderGrid({ x, y, ticks, data, gridProps })}
					{lines.map((x, i) => {
						return (
							<Path
								key={i}
								fill={"none"}
								stroke={colors[i]}
								d={x}
								animate={animate}
								animationDuration={animationDuration}
							/>
						);
					})}

					{data.map((value, index) => renderDecorator({ x, y, value, index }))}
					{extras.map((item, index) => item({ ...extraData, index }))}
				</Svg>
			</View>
		</View>
    </>
	);
}

MultiLineChart.defaultProps = {
  svg: {},
  width: 100,
  height: 100,
  curve: shape.curveLinear,
  contentInset: {},
  numberOfTicks: 10,
  showGrid: true,
  extras: [],
  xScale: scale.scaleLinear,
  yScale: scale.scaleLinear,
  renderDecorator: () => {}
};

export default MultiLineChart;
