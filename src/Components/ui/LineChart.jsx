import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";

// this is dummy data will upgrade with time
// table is to show the number of tasks in a day against the tasks completed

const data = [
  {
    id: "Tasks",
    color: "hsl(61, 70%, 50%)",
    data: [
      {
        x: "Mon",
        y: 26,
      },
      {
        x: "Tue",
        y: 14,
      },
      {
        x: "Wen",
        y: 38,
      },
      {
        x: "Thur",
        y: 12,
      },
      {
        x: "Fri",
        y: 2,
      },
    ],
  },
];
const LineChart = () => {
  return (
    <div
      className="h-1/2 w-3/5 bg-white mr-4 mt-8 rounded-lg"
      style={{ height: "500px" }}
    >
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        enableArea
        curve="monotoneX"
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Days",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Tasks Done",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={["#af91eb"]}
        areaOpacity={0.3}
        areaBaselineValue={20}
        areaBlendMode="darken"
        //   match all gradients with the id of gradient A
        fill={[{ match: "*", id: "gradientA" }]}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        defs={[
          // using helpers
          // will inherit colors from current element
          linearGradientDef("gradientA", [
            { offset: 0, color: "inherit" },
            { offset: 100, color: "inherit", opacity: 0 },
          ]),
        ]}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
