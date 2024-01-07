# Vue3 D3 Chart Library

## Overview

Vue3 D3 Chart Library is a comprehensive and versatile charting library that leverages the power of D3.js within the Vue 3 framework. It offers a range of customizable chart components, designed for developers looking to integrate advanced data visualizations into Vue3 applications.

## Features

- Seamless integration with Vue3 projects.
- A variety of chart types including line charts, bar charts, pie charts, and more.
- High customization capabilities.
- Responsive design for mobile and desktop views.
- Easy-to-use with comprehensive documentation.

## Installation

To install the library, run:

```bash
npm install vue-graphs
```

In Vue 3's Composition API with the `script setup` syntax, you can import and use the `LineChart` component as follows:

```vue
<template>
  <LineChart :data="chartData" />
</template>

<script setup>
import { ref } from 'vue';
import { LineChart } from 'vue-graphs';

const chartData = ref({
  { x: "January", y: 62 },
  { x: "February", y: 69 },
  { x: "March", y: 99 },
  { x: "April", y: 136 },
  { x: "May", y: 144 },
  { x: "June", y: 177 },
  { x: "July", y: 199 },
  { x: "August", y: 178 },
  { x: "September", y: 240 },
  { x: "October", y: 287 },
  { x: "November", y: 297 },
  { x: "December", y: 321 },
});
</script>
```
## Documentation

For detailed documentation on each chart type and their props, visit [Vue3 D3 Chart Docs](https://www.vuegraphs.com).

## Contributing

We welcome contributions to the Vue3 D3 Chart Library. If you have suggestions or issues, please open an issue on GitHub. For code contributions, please submit a pull request for review.

## License

This project is licensed under the MIT License.

