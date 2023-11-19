<template>
  <div
    class="playground-component w-[100%] flex justify-between rounded-[14px] gridlines"
    style="height: calc(100vh - 162px)"
  >
    <div class="playground w-full overflow-y-auto">
      <div class="boxes flex gap-[40px] flex-wrap p-[32px]">
        <div
          class="box-test h-[auto] w-[400px] shadow-boxshlight border-[1px] rounded-[12px] border-slate-200 flex flex-col gap-[4px] p-[12px]"
          v-for="(i, index) in subjects"
          :key="index"
        >
          <div class="box-title text-[14px] font-medium">{{ i.title }}</div>
          <div
            class="box-content gridlines p-[12px] rounded h-[100%] flex flex-col text-[12px] gap-[16px]"
          >
            <div class="description text-slate-400">{{ i.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    const subjects = ref([
      {
        title: "Options Chain",
        description:
          "Detailed listings of all available option contracts for a particular stock, including calls and puts, strike prices, premiums, and expiration dates.",
      },
      {
        title: "Options Analytics",
        description:
          "Advanced analysis tools that measure the sensitivity of an option's price to its underlying factors, such as the Greeks (Delta, Gamma, Theta, Vega, and Rho).",
      },
      {
        title: "Implied Volatility Data",
        description:
          "Data on the implied volatility of options which helps in understanding market sentiment and the potential movement in stock prices.",
      },
      {
        title: "Volume and Open Interest",
        description:
          "Real-time and historical data on the volume and open interest of options contracts, indicating liquidity and trader interest.",
      },
      {
        title: "Historical Options Data",
        description:
          "Past data on options prices and trades, useful for backtesting strategies and understanding options pricing trends over time.",
      },
      {
        title: "Options Trading Strategies",
        description:
          "Educational content on various options trading strategies, from basic to advanced, including long calls, covered calls, protective puts, spreads, straddles, and strangles.",
      },
      {
        title: "Options Market News",
        description:
          "The latest news and analysis affecting the options market, including regulatory changes, market volatility, and economic events.",
      },
      {
        title: "Options Education",
        description:
          "Comprehensive learning resources for options traders at all levels, covering the basics of options trading, terminology, and risk management.",
      },
      {
        title: "Options Simulator",
        description:
          "A virtual trading platform that allows users to practice options trading with simulated money, enabling them to learn and experiment without financial risk.",
      },
      {
        title: "Regulatory and Compliance Information",
        description:
          "Information on legal and regulatory considerations for options trading, including margin requirements, exercise and assignment, and settlement procedures.",
      },
      {
        title: "Earnings and Events Calendar",
        description:
          "Calendar of corporate events, including earnings releases, dividends, and splits, which could impact options pricing and strategies.",
      },
      {
        title: "Trade Ideas and Analysis",
        description:
          "Curated trade ideas based on current market conditions and analysis, providing users with potential options trading opportunities.",
      },
      {
        title: "User-Centered Tools",
        description:
          "Interactive tools that allow users to filter and customize options data display according to their trading preferences and strategies.",
      },
    ]);

    return { subjects };
  },
};
</script>

<style lang="scss" scoped></style>
