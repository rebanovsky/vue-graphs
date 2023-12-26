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

export const barProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the bar chart. Each object in the array should include properties necessary for plotting, such as category labels and corresponding values.",
  },
  {
    name: "width",
    type: "String",
    default: "user-defined",
    description: "Specifies the width of the bar chart in pixels.",
  },
  {
    name: "height",
    type: "String",
    default: "user-defined",
    description: "Specifies the height of the bar chart in pixels.",
  },
  {
    name: "title",
    type: "String",
    default: "'Title'",
    description: "The title of the bar chart.",
  },
  {
    name: "customColors",
    type: "Array",
    default: "[array of color strings]",
    description:
      "An array of color strings used to color the bars of the chart. Each bar's color corresponds to the order of this array.",
  },
  {
    name: "legend",
    type: "Boolean",
    default: "false",
    description:
      "Determines whether a legend is displayed. If true, the chart will display a legend with labels.",
  },
  {
    name: "labels",
    type: "Boolean",
    default: "false",
    description:
      "Determines whether labels are shown on the bars. If true, each bar will display its corresponding value.",
  },
  {
    name: "roundedRect",
    type: "Function",
    default: "function definition",
    description:
      "A function used to create rounded rectangles for the bars in the chart.",
  },
  {
    name: "formatNumber",
    type: "Function",
    default: "function definition",
    description:
      "A function used for formatting numbers for display in the chart, particularly for large numbers.",
  },
  {
    name: "barAnimationDuration",
    type: "Number",
    default: "800",
    description: "The duration of the animation for the bars in milliseconds.",
  },
  {
    name: "textAnimationDuration",
    type: "Number",
    default: "150",
    description:
      "The duration of the animation for the text labels in milliseconds.",
  },
  {
    name: "textAnimationDelay",
    type: "Number",
    default: "800",
    description:
      "The delay before starting the animation for the text labels in milliseconds.",
  },
];

export const heatmapProps = [
  {
    name: "geoJsonData",
    type: "Object",
    default: "null",
    description:
      "The GeoJSON data required to render the heatmap. This data should include geographic features along with properties used for coloring and labeling each feature.",
  },
  {
    name: "width",
    type: "Number",
    default: "600",
    description: "Specifies the width of the heatmap in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "400",
    description: "Specifies the height of the heatmap in pixels.",
  },
  {
    name: "colorScale",
    type: "Function",
    default: "d3.scaleQuantize()",
    description:
      "A D3 scale function used to apply colors to the heatmap based on the data values. The scale should map data values to color values.",
  },
  {
    name: "hoveredName",
    type: "String",
    default: "''",
    description:
      "A reactive property to store the name of the currently hovered geographical feature.",
  },
  {
    name: "hoveredValue",
    type: "String",
    default: "''",
    description:
      "A reactive property to store the value of the currently hovered geographical feature.",
  },
  {
    name: "tooltipId",
    type: "String",
    default: "'heatmap-tooltip'",
    description:
      "The ID of the tooltip element used for showing details on feature hover.",
  },
  {
    name: "projection",
    type: "Function",
    default: "d3.geoAlbersUsa()",
    description:
      "A D3 geographic projection function used to transform the latitude and longitude coordinates into the correct position on the SVG.",
  },
];

export const candlestickProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the candlestick chart, each object in the array should include Date, Open, High, Low, and Close values.",
  },
  {
    name: "width",
    type: "Number",
    default: "500",
    description: "Specifies the width of the chart in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "400",
    description: "Specifies the height of the chart in pixels.",
  },
  {
    name: "margin",
    type: "Object",
    default: "{ top: 20, right: 30, bottom: 30, left: 30 }",
    description:
      "Specifies the margin around the chart. Accepts an object with top, right, bottom, and left properties.",
  },
  {
    name: "title",
    type: "String",
    default: "null",
    description: "The title of the candlestick chart.",
  },
  {
    name: "colorUp",
    type: "String",
    default: "'#63ce21'",
    description:
      "The color of the candlestick bars when the closing price is higher than the opening price.",
  },
  {
    name: "colorDown",
    type: "String",
    default: "'#ff1612'",
    description:
      "The color of the candlestick bars when the closing price is lower than the opening price.",
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
];

export const bubblechartProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the bubble chart. Each object in the array should include relevant properties for plotting, such as 'performancePercentage', 'ownership', 'weight', and other specific attributes.",
  },
  {
    name: "width",
    type: "Number",
    default: "user defined",
    description: "Specifies the width of the chart in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "user defined",
    description: "Specifies the height of the chart in pixels.",
  },
  {
    name: "tooltipId",
    type: "String",
    default: "'bubble-tooltip'",
    description:
      "The ID of the tooltip element used for showing details on bubble hover.",
  },
  {
    name: "colorScheme",
    type: "Array",
    default: "[Array of color strings]",
    description:
      "An array of color strings used to color the bubbles based on their category or other data attributes.",
  },
  {
    name: "sectorKey",
    type: "String",
    default: "''",
    description:
      "The key in the dataset that corresponds to the sector or category used for coloring the bubbles.",
  },
  {
    name: "xAxisKey",
    type: "String",
    default: "''",
    description: "The key in the dataset that corresponds to the x-axis value.",
  },
  {
    name: "yAxisKey",
    type: "String",
    default: "''",
    description: "The key in the dataset that corresponds to the y-axis value.",
  },
  {
    name: "radiusKey",
    type: "String",
    default: "'weight'",
    description:
      "The key in the dataset that determines the radius of each bubble.",
  },
  {
    name: "clickable",
    type: "Boolean",
    default: "false",
    description:
      "Determines if the bubbles are clickable, leading to a specified link or action.",
  },
];

export const dotplotProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the dot plot. Each object in the array should include properties like 'EPS', 'Quarter', 'Actual', 'Estimate', etc., necessary for plotting.",
  },
  {
    name: "width",
    type: "Number",
    default: "600",
    description: "Specifies the width of the dot plot in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "400",
    description: "Specifies the height of the dot plot in pixels.",
  },
  {
    name: "title",
    type: "String",
    default: "'EPS'",
    description: "The title of the dot plot.",
  },
  {
    name: "margin",
    type: "Object",
    default: "{ top: 20, right: 30, bottom: 30, left: 40 }",
    description:
      "Specifies the margin around the dot plot. Accepts an object with top, right, bottom, and left properties.",
  },
  {
    name: "colorActual",
    type: "String",
    default: "'#05D9FF'",
    description: "The color of the dots representing actual values.",
  },
  {
    name: "colorEstimate",
    type: "String",
    default: "'#FF5733'",
    description: "The color of the dots representing estimated values.",
  },
  {
    name: "gridlines",
    type: "Boolean",
    default: "false",
    description: "Controls the visibility of gridlines in the chart.",
  },
];

export const doughnutProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the doughnut chart. Each object in the array should include properties necessary for plotting, typically including a 'value' key and other relevant information.",
  },
  {
    name: "width",
    type: "Number",
    default: "user-defined",
    description:
      "Specifies the width of the doughnut chart in pixels. This width includes the chart and any additional padding or margins.",
  },
  {
    name: "height",
    type: "Number",
    default: "user-defined",
    description:
      "Specifies the height of the doughnut chart in pixels. This height includes the chart and any additional padding or margins.",
  },
  {
    name: "customColors",
    type: "Array",
    default: "[array of color strings]",
    description:
      "An array of color strings used to color the segments of the doughnut chart. Each segment's color corresponds to the order of this array.",
  },
  {
    name: "innerRadius",
    type: "Number",
    default: "radius / 2",
    description:
      "Specifies the inner radius of the doughnut chart. By default, it's half of the outer radius, creating a doughnut shape.",
  },
  {
    name: "outerRadius",
    type: "Number",
    default: "calculated based on width and height",
    description:
      "Specifies the outer radius of the doughnut chart. It's calculated to fit within the given width and height of the chart.",
  },
];

export const piechartProps = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the pie chart. Each object in the array should include properties necessary for plotting, typically a 'value' key and optionally a 'label' for the legend.",
  },
  {
    name: "width",
    type: "Number",
    default: "user-defined",
    description: "Specifies the width of the pie chart in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "user-defined",
    description: "Specifies the height of the pie chart in pixels.",
  },
  {
    name: "legend",
    type: "Boolean",
    default: "false",
    description:
      "Determines whether a legend is displayed. If true, the chart will display a legend with labels.",
  },
  {
    name: "labels",
    type: "Boolean",
    default: "false",
    description:
      "Determines whether labels are shown on the pie segments. If true, each segment will display its corresponding value.",
  },
  {
    name: "customColors",
    type: "Array",
    default: "[array of color strings]",
    description:
      "An array of color strings used to color the segments of the pie chart. Each segment's color corresponds to the order of this array.",
  },
  {
    name: "radius",
    type: "Number",
    default: "calculated based on width and height",
    description:
      "Specifies the radius of the pie chart. It's calculated to fit within the given width and height of the chart.",
  },
];

export const treemapProps = [
  {
    name: "data",
    type: "Object",
    default: "null",
    description:
      "The hierarchical data object for the treemap. The data should have a nested structure where each node contains a 'name' and a 'value' along with any child nodes.",
  },
  {
    name: "width",
    type: "Number",
    default: "400",
    description: "Specifies the width of the treemap in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "180",
    description: "Specifies the height of the treemap in pixels.",
  },
  {
    name: "colors",
    type: "Array",
    default: "['#57E2E5', '#FEC3A6', '#FFAC81', '#FF928B']",
    description:
      "An array of color strings used for coloring the treemap's nodes. The colors are applied based on the order of the nodes.",
  },
  {
    name: "padding",
    type: "Number",
    default: "2",
    description: "Specifies the padding between each node in the treemap.",
  },
  {
    name: "tooltip",
    type: "Boolean",
    default: "false",
    description:
      "Determines whether a tooltip is displayed when hovering over nodes. If true, a tooltip showing the node's value will appear.",
  },
];
