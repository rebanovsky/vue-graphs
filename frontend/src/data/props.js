export const lineProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the line chart, consisting of an array of data points.",
  },
  {
    name: "width",
    type: "Number",
    default: "400",
    description: "Specifies the width of the chart in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "200",
    description: "Specifies the height of the chart in pixels.",
  },
  {
    name: "dateFormat",
    type: "String",
    default: "null",
    description:
      "Defines the format for date values in the dataset. If null, no formatting is applied.",
  },
  {
    name: "title",
    type: "String",
    default: '"Title"',
    description: "The title of the line chart.",
  },
  {
    name: "dotColor",
    type: "String",
    default: '"#05D9FF"',
    description: "The color of the dots on the line chart.",
  },
  {
    name: "lineColor",
    type: "String",
    default: "null",
    description:
      "The color of the line in the chart. If not specified, a default color is used.",
  },
  {
    name: "tooltip",
    type: "Boolean",
    default: "false",
    description: "Determines whether tooltips are shown on hover.",
  },
  {
    name: "gridlines",
    type: "Boolean",
    default: "false",
    description: "Controls the visibility of gridlines in the chart.",
  },
  {
    name: "animation",
    type: "Boolean",
    default: "false",
    description: "Controls whether animation is used on load.",
  },
  {
    name: "xAxis",
    type: "Boolean",
    default: "null",
    description:
      "Controls the visibility of the X-axis. If not specified, default behavior is applied.",
  },
];
