<template>
  <div
    class="playground-wrapper w-[100%] flex justify-between rounded-[14px]"
    style="height: calc(100vh - 162px)"
  >
    <div class="playground w-full overflow-y-auto flex gap-[8px]">
      <div
        class="sidenav-etf overflow-y-auto gridlines rounded-[8px]"
      >
        <div class="w-[240px]"></div>
      </div>
      <div class="table-wrapper">
        <TheTable
          :columns="columns"
          :rows="bonds"
          table-height-adjust="260px"
          table-title="Bonds"
        />
      </div>
      <div
        class="right-sider w-[320px] flex gridlines rounded-[8px]"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TheTable from "@/components/common/tables/TheTable.vue";

export default {
  components: { TheTable },
  setup() {
    const columns = ref([
      {
        key: "name",
        label: "Name",
        format: "text",
        width: "280px",
        alignment: "flex-start",
      },
      {
        key: "category",
        label: "Category",
        format: "text",
        width: "140px",
        alignment: "flex-start",
      },
      {
        key: "CUSIP",
        label: "CUSIP",
        format: "text",
        width: "120px",
        alignment: "flex-start",
      },
      {
        key: "couponRate",
        label: "Coupon Rate",
        format: "text",
        width: "140px",
        alignment: "flex-end",
      },
      {
        key: "maturityDate",
        label: "Maturity Date",
        format: "text",
        width: "140px",
        alignment: "flex-end",
      },
      {
        key: "yieldToMaturity",
        label: "Yield to Maturity",
        format: "text",
        width: "140px",
        alignment: "flex-end",
      },
    ]);
    const bonds = ref([
      {
        name: "U.S. Treasury",
        category: "Government",
        CUSIP: "9128285A7",
        couponRate: "1.75%",
        maturityDate: "2030-11-15",
        yieldToMaturity: "1.80%",
      },
      {
        name: "Apple Inc.",
        category: "Corporate",
        CUSIP: "037833AJ9",
        couponRate: "2.25%",
        maturityDate: "2028-05-06",
        yieldToMaturity: "2.30%",
      },
      {
        name: "City of New York Municipal",
        category: "Municipal",
        CUSIP: "64971TAM5",
        couponRate: "3.00%",
        maturityDate: "2035-08-01",
        yieldToMaturity: "2.50%",
      },
      {
        name: "Berkshire Hathaway Inc.",
        category: "Corporate",
        CUSIP: "084670AP3",
        couponRate: "4.25%",
        maturityDate: "2046-08-15",
        yieldToMaturity: "3.90%",
      },
      {
        name: "Germany Federal Bond",
        category: "Sovereign",
        CUSIP: "DE0001102309",
        couponRate: "0.50%",
        maturityDate: "2031-02-15",
        yieldToMaturity: "0.55%",
      },
      {
        name: "Wells Fargo & Co.",
        category: "Corporate",
        CUSIP: "94974BGL9",
        couponRate: "3.50%",
        maturityDate: "2027-12-15",
        yieldToMaturity: "3.60%",
      },
      {
        name: "Brazil Government International Bond",
        category: "Sovereign",
        CUSIP: "105756BH3",
        couponRate: "5.75%",
        maturityDate: "2041-01-05",
        yieldToMaturity: "6.25%",
      },
      {
        name: "California State General Obligation",
        category: "Municipal",
        CUSIP: "13063DZU6",
        couponRate: "2.50%",
        maturityDate: "2040-04-01",
        yieldToMaturity: "2.65%",
      },
      {
        name: "Goldman Sachs Group Inc.",
        category: "Corporate",
        CUSIP: "38141GGK4",
        couponRate: "3.25%",
        maturityDate: "2029-04-01",
        yieldToMaturity: "3.35%",
      },
      {
        name: "AT&T Inc.",
        category: "Corporate",
        CUSIP: "00206RCP8",
        couponRate: "4.80%",
        maturityDate: "2039-11-15",
        yieldToMaturity: "4.85%",
      },
      {
        name: "Amazon.com Inc.",
        category: "Corporate",
        CUSIP: "023135BC3",
        couponRate: "2.50%",
        maturityDate: "2029-01-15",
        yieldToMaturity: "2.60%",
      },
      {
        name: "Florida State Board of Education",
        category: "Municipal",
        CUSIP: "34148QAD7",
        couponRate: "3.10%",
        maturityDate: "2042-03-01",
        yieldToMaturity: "2.90%",
      },
      {
        name: "Toyota Motor Credit Corporation",
        category: "Corporate",
        CUSIP: "89236TAD4",
        couponRate: "1.90%",
        maturityDate: "2025-09-10",
        yieldToMaturity: "2.00%",
      },
      {
        name: "Canada Government Bond",
        category: "Sovereign",
        CUSIP: "135087K25",
        couponRate: "1.75%",
        maturityDate: "2030-06-01",
        yieldToMaturity: "1.80%",
      },
      {
        name: "Bank of America Corp",
        category: "Corporate",
        CUSIP: "06051GDT3",
        couponRate: "3.00%",
        maturityDate: "2032-08-15",
        yieldToMaturity: "3.10%",
      },
      {
        name: "Mexico Government International Bond",
        category: "Sovereign",
        CUSIP: "91086QAZ4",
        couponRate: "6.50%",
        maturityDate: "2045-02-24",
        yieldToMaturity: "6.75%",
      },
      {
        name: "JP Morgan Chase & Co.",
        category: "Corporate",
        CUSIP: "46625HJQ2",
        couponRate: "3.40%",
        maturityDate: "2028-10-01",
        yieldToMaturity: "3.50%",
      },
      {
        name: "IBM Corp.",
        category: "Corporate",
        CUSIP: "459200GY3",
        couponRate: "2.80%",
        maturityDate: "2031-11-29",
        yieldToMaturity: "2.90%",
      },
      {
        name: "CVS Health Corporation",
        category: "Corporate",
        CUSIP: "126650CN6",
        couponRate: "4.00%",
        maturityDate: "2045-08-15",
        yieldToMaturity: "4.10%",
      },
      {
        name: "State of Illinois",
        category: "Municipal",
        CUSIP: "452152JU7",
        couponRate: "5.00%",
        maturityDate: "2039-12-01",
        yieldToMaturity: "5.25%",
      },
      {
        name: "General Electric Co.",
        category: "Corporate",
        CUSIP: "369604BD3",
        couponRate: "2.30%",
        maturityDate: "2027-05-15",
        yieldToMaturity: "2.40%",
      },
      {
        name: "Pfizer Inc.",
        category: "Corporate",
        CUSIP: "717081CD5",
        couponRate: "3.20%",
        maturityDate: "2026-04-01",
        yieldToMaturity: "3.30%",
      },
      {
        name: "Goldman Sachs Group Inc.",
        category: "Corporate",
        CUSIP: "38141GGK4",
        couponRate: "3.25%",
        maturityDate: "2029-04-01",
        yieldToMaturity: "3.35%",
      },
      {
        name: "Italy Government Bond",
        category: "Sovereign",
        CUSIP: "IT0005244782",
        couponRate: "1.00%",
        maturityDate: "2032-03-01",
        yieldToMaturity: "1.10%",
      },
      {
        name: "Verizon Communications Inc.",
        category: "Corporate",
        CUSIP: "92343VDG7",
        couponRate: "2.65%",
        maturityDate: "2030-08-21",
        yieldToMaturity: "2.75%",
      },
      {
        name: "Ford Motor Credit Company LLC",
        category: "Corporate",
        CUSIP: "345397VW2",
        couponRate: "4.50%",
        maturityDate: "2027-09-15",
        yieldToMaturity: "4.60%",
      },
      {
        name: "France Government Bond",
        category: "Sovereign",
        CUSIP: "FR0013232334",
        couponRate: "0.75%",
        maturityDate: "2029-11-25",
        yieldToMaturity: "0.85%",
      },
      {
        name: "Los Angeles Unified School District",
        category: "Municipal",
        CUSIP: "544654GJ9",
        couponRate: "5.25%",
        maturityDate: "2040-07-01",
        yieldToMaturity: "5.35%",
      },
      {
        name: "Australia Government Bond",
        category: "Sovereign",
        CUSIP: "AU0000XVGZA3",
        couponRate: "2.25%",
        maturityDate: "2029-05-21",
        yieldToMaturity: "2.35%",
      },
      {
        name: "Chevron Corporation",
        category: "Corporate",
        CUSIP: "166764BF3",
        couponRate: "3.15%",
        maturityDate: "2033-10-01",
        yieldToMaturity: "3.25%",
      },
      {
        name: "Spain Government Bond",
        category: "Sovereign",
        CUSIP: "ES00000123D3",
        couponRate: "0.60%",
        maturityDate: "2031-10-30",
        yieldToMaturity: "0.70%",
      },
      {
        name: "South Africa Government Bond",
        category: "Sovereign",
        CUSIP: "ZAG000158241",
        couponRate: "7.75%",
        maturityDate: "2048-02-28",
        yieldToMaturity: "7.85%",
      },
      {
        name: "Walmart Inc.",
        category: "Corporate",
        CUSIP: "931142CU5",
        couponRate: "2.55%",
        maturityDate: "2028-04-03",
        yieldToMaturity: "2.65%",
      },
      {
        name: "Johnson & Johnson",
        category: "Corporate",
        CUSIP: "478160CL2",
        couponRate: "2.95%",
        maturityDate: "2032-03-01",
        yieldToMaturity: "3.05%",
      },
      {
        name: "United Kingdom Gilt",
        category: "Sovereign",
        CUSIP: "GB00B24FF097",
        couponRate: "1.50%",
        maturityDate: "2030-07-22",
        yieldToMaturity: "1.60%",
      },
      {
        name: "Coca-Cola Co",
        category: "Corporate",
        CUSIP: "191216CK7",
        couponRate: "3.45%",
        maturityDate: "2047-11-15",
        yieldToMaturity: "3.55%",
      },
      {
        name: "Texas Transportation Commission",
        category: "Municipal",
        CUSIP: "882677AD5",
        couponRate: "4.10%",
        maturityDate: "2045-04-01",
        yieldToMaturity: "4.20%",
      },
      {
        name: "Nestle SA",
        category: "Corporate",
        CUSIP: "641069AH2",
        couponRate: "1.75%",
        maturityDate: "2026-10-15",
        yieldToMaturity: "1.85%",
      },
      {
        name: "India Government Bond",
        category: "Sovereign",
        CUSIP: "IN0020130050",
        couponRate: "6.45%",
        maturityDate: "2033-09-23",
        yieldToMaturity: "6.55%",
      },
      {
        name: "Microsoft Corporation",
        category: "Corporate",
        CUSIP: "594918BM2",
        couponRate: "2.40%",
        maturityDate: "2030-11-29",
        yieldToMaturity: "2.50%",
      },
    ]);

    return { columns, bonds };
  },
};
</script>

<style lang="scss" scoped></style>
