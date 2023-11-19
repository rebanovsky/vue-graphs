<template>
  <div class="legal-content">
    <div class="legal-title">
      <h1>Disclaimers</h1>
      <p class="dark:text-slate-400 text-slate-600">Updated at 2023-04-11</p>
    </div>
    <div class="legal-wrapper mt-[32px]">
      <div
        class="shadow-top transition ease shadow-scrollshtop dark:shadow-scrollshtopdark"
        :class="{ visible: isScrolledTop, '!w-[100vw]': isMobileDevice }"
      ></div>
      <div
        class="overflow-y-auto w-[100vw] pt-[16px] flex justify-center"
        ref="tableContainer"
        @scroll="handleScrollShadow"
      >
        <div class="legal-items  ">
          <p>
            <em class="font-semibold"
              >PLEASE READ THE FOLLOWING DISCLAIMERS CAREFULLY BEFORE
              USING INSIDERHIVE.COM (the "Website").</em
            >
            The terms "you", "user", "visitor", or "trader" refer to any
            individual or entity who accepts the terms and conditions of this
            Disclaimer by using the Website, the information, data, and
            materials provided therein, or any of its features or
            functionalities. "We", "us", "our", and "InsiderHive" refer to the
            financial data company providing the services on this Website.
          </p>
          <ol>
            <li>
              <h2>No Investment Advice</h2>
              <p>
                The information, data, and materials provided by InsiderHive,
                including but not limited to the live feed of insider
                transactions of US companies, are for informational purposes
                only and do not constitute investment advice or recommendations
                to buy, sell, or hold any security, investment, or financial
                product. You are solely responsible for your investment
                decisions, and you acknowledge that InsiderHive is not providing
                any personalized investment advice or making any
                recommendations.
              </p>
            </li>
            <li>
              <h2>Use of Information and Data</h2>
              <p>
                By using the Website, you acknowledge and agree that the
                information and data provided by InsiderHive, including Form 4
                filings, are obtained from the U.S. Securities and Exchange
                Commission's (SEC) Electronic Data Gathering, Analysis, and
                Retrieval (EDGAR) database. While we strive to provide
                up-to-date information, there may be a time lag between the data
                being available on the SEC EDGAR database and its appearance on
                the Website due to parsing and processing. We do not guarantee
                the accuracy, completeness, timeliness, or correct sequencing of
                such information and data. You understand that the use of
                InsiderHive's services is at your own risk, and you assume full
                responsibility for any loss or gain resulting from your use of,
                or reliance on, the information and data provided on the
                Website.
              </p>
            </li>
            <li>
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, InsiderHive and its
                affiliates, directors, officers, employees, and agents shall not
                be liable for any direct, indirect, incidental, consequential,
                special, or exemplary damages, including but not limited to lost
                profits, lost revenue, lost data, or financial losses, arising
                out of or in connection with your use of the Website, the
                information, data, and materials provided by InsiderHive, or any
                investment decisions made based on such information and data.
              </p>
            </li>
            <li>
              <h2>Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless InsiderHive
                and its affiliates, directors, officers, employees, and agents
                from and against any and all claims, liabilities, damages,
                losses, or expenses, including reasonable attorneys' fees and
                costs, arising out of or in any way connected with your access
                to or use of the Website, the information, data, and materials
                provided by InsiderHive, or your violation of this Disclaimer.
              </p>
            </li>
            <li>
              <h2>Changes to the Disclaimer</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace this Disclaimer at any time without prior notice. By
                continuing to use the Website after any such changes, you accept
                the modified Disclaimer. We encourage you to periodically review
                this Disclaimer to stay informed about its terms and conditions.
              </p>
            </li>
            <li>
              <h2>Governing Law and Jurisdiction</h2>
              <p>
                This Disclaimer shall be governed by and construed in accordance
                with the laws of the jurisdiction in which InsiderHive is
                incorporated, without regard to its conflict of law provisions.
                Any disputes arising from or relating to this Disclaimer shall
                be resolved exclusively in the courts located within that
                jurisdiction.
              </p>
            </li>
          </ol>
          <p class="py-[48px]">
            By using this Website, you acknowledge that you have read,
            understood, and agree to be bound by the terms and conditions of
            this Disclaimer. If you do not agree with any part of this
            Disclaimer, you must immediately discontinue your use of the Website
            and its services.
          </p>
        </div>
      </div>
      <div
        class="shadow-bottom transition ease shadow-scrollshbot dark:shadow-scrollshbotdark"
        :class="{ visible: isScrolledBottom }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const tableContainer = ref(null);
    const isScrolledTop = ref(true);
    const isScrolledBottom = ref(true);

    const checkScrollPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = tableContainer.value;

      isScrollable.value = scrollHeight > clientHeight;
      isScrolledTop.value = scrollTop > 0;
      isScrolledBottom.value = scrollTop + clientHeight <= scrollHeight;
    };

    const handleScrollShadow = () => {
      checkScrollPosition();
    };

    return {
      tableContainer,
      handleScrollShadow,
      isScrolledTop,
      isScrolledBottom,
    };
  },
};
</script>

<style>
.legal-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.sider {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.legal-title {
  width: 600px;
  margin: 20px 0 0 0;
}

.legal-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.legal-items {
  padding: 20px;
  font-size: 12px;
  height: calc(100vh - 200px) !important;
  border-radius: 4px;
  width: 600px;
}

h1 {
  font-size: 14px;
  margin: 20px 0 5px 0 !important;
  font-weight: 500 !important;
}

h2 {
  font-size: 12px;
  margin: 20px 0 5px 0 !important;
  font-weight: 500 !important;
}

p {
  font-size: 10px;
}

ul {
  font-size: 10px;
  display: block !important;
  list-style-type: disc !important;
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 40px !important;
}

li {
  display: list-item !important;
}

ol {
  display: block !important;
  list-style-type: decimal !important;
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 10px !important;
}
</style>
