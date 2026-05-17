import React from "react";
import { Area, Rose } from "@ant-design/charts";
import "./chart.css";

const ChartComponent = ({ sortedTransaction }) => {
  const lineData = sortedTransaction.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const pieData = sortedTransaction
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag || "Unknown", // Default to 'Unknown' if tag is null/undefined
      amount: transaction.amount || 0,
    }))
    .filter((item) => item.amount > 0);

  // Stacked Area Chart Configuration
  const areaConfig = {
    data: lineData,
    xField: "date",
    yField: "amount",
    seriesField: "amount",
    color: "#5B8FF9",
    areaStyle: () => ({
      fill: "l(90) 0:#5B8FF9 1:#5AD8A6",
    }),
    line: {
      color: "#5B8FF9",
    },
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#5AD8A6",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
      formatter: (item) => ({
        name: "Amount",
        value: `$${item.amount.toFixed(2)}`,
      }),
    },
    xAxis: {
      title: { text: "Date", style: { fontWeight: "bold", fontSize: 14 } },
    },
    yAxis: {
      title: {
        text: "Amount ($)",
        style: { fontWeight: "bold", fontSize: 14 },
      },
      grid: { line: { style: { stroke: "#d3d3d3", lineDash: [4, 4] } } },
    },
  };

  // Rose Chart Configuration
  const roseConfig = {
    data: pieData,
    xField: "tag",
    yField: "amount",
    seriesField: "tag",
    radius: 1,
    innerRadius: 0.3,
    colorField: "tag",
    color: ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16", "#7262fd", "#78D3F8"],
    label: {
      content: "{name}: {value}",
      offset: -10,
      style: { fontSize: 12, fill: "#fff", fontWeight: 600 },
    },
    legend: { position: "bottom" },
    interactions: [{ type: "element-active" }],
  };

  return (
    <>
      <div className="wrapper charts-wrapper">
        <h2
          style={{
            textAlign: "center",
            color: "#374151",
            fontSize: "1.5em",
            marginBottom: "20px",
          }}
        >
          Your Transaction History (Area Chart)
        </h2>
        <Area {...areaConfig} />
      </div>
      <div className="chart-section">
        <h3 className="chart-title">Spending by Category</h3>
        <div className="chart-content">
          <Rose {...roseConfig} />
        </div>
      </div>
    </>
  );
};

export default ChartComponent;
