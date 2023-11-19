export const secTables = [
  {
    id: "insiders",
    title: "4",
    subTitle: "Insider trading",
    description:
      "SEC Form 4: Statement of Changes in Beneficial Ownership is a document that must be filed with the Securities and Exchange Commission (SEC) whenever there is a material change in the holdings of company insiders. Insiders consist of directors and officers of the company, as well as any shareholders, owning 10% or more of the company's outstanding stock. The forms ask about the reporting person's relationship to the company and about purchases and sales of such equity shares.",
  },
  {
    id: "eightk",
    title: "8K",
    subTitle: "Important events",
    description:
      "An 8-K is a report of unscheduled material events or corporate changes at a company that could be of importance to the shareholders or the Securities and Exchange Commission (SEC). Also known as a Form 8K, the report notifies the public of events, including acquisitions, bankruptcy, the resignation of directors, or changes in the fiscal year.",
  },
  {
    id: "tenk",
    title: "10K",
    subTitle: "Annual reports",
    description:
      "A 10-K is a comprehensive report filed annually by a publicly-traded company about its financial performance and is required by the U.S. Securities and Exchange Commission (SEC). The report contains much more detail than a company's annual report, which is sent to its shareholders before an annual meeting to elect company directors.",
  },
  {
    id: "tenq",
    title: "10Q",
    subTitle: "Quarterly reports",
    description:
      "SEC Form 10-Q is comprehensive report of financial performance that must be submitted quarterly by all public companies to the Securities and Exchange Commission (SEC). In the 10-Q, firms are required to disclose relevant information regarding their finances as a result of their business operations. The 10-Q is generally an unaudited report.",
  },
  {
    id: "funds",
    title: "13F",
    subTitle: "Institutional trading",
    description:
      "Form 13F is a quarterly report that is required to be filed by all institutional investment managers with at least $100 million in assets under management. It discloses their equity holdings and can provide insights into what the smart money is doing in the market. Hedge funds are required to file Form 13F within 45 days after the last day of the calendar quarter. Most funds wait until the end of this period in order to conceal their investment strategy from competitors and the public.",
  },
];

export const secHeaders = {
  insiders: [
    { id: "filed", title: "FILED", width: "60px" },
    { id: "ticker", title: "TICKER", width: "70px" },
    { id: "company", title: "COMPANY", width: "280px" },
    { id: "transaction", title: "TRANSACTION", width: "90px" },
    { id: "volume", title: "VOLUME", width: "100px" },
  ],
  eightk: [
    { id: "filed", title: "FILED", width: "60px" },
    { id: "ticker", title: "TICKER", width: "70px" },
    { id: "company", title: "COMPANY", width: "350px" },
    { id: "items", title: "ITEMS", width: "120px" },
  ],
  tenk: [
    { id: "filed", title: "FILED", width: "60px" },
    { id: "period", title: "PERIOD", width: "70px" },
    { id: "ticker", title: "TICKER", width: "70px" },
    { id: "company", title: "COMPANY", width: "260px" },
    { id: "empty", title: "", width: "140px" },
  ],
  tenq: [
    { id: "filed", title: "FILED", width: "60px" },
    { id: "period", title: "PERIOD", width: "70px" },
    { id: "ticker", title: "TICKER", width: "70px" },
    { id: "company", title: "COMPANY", width: "320px" },
    { id: "empty", title: "", width: "80px" },
  ],
  funds: [
    { id: "filed", title: "FILED", width: "60px" },
    { id: "period", title: "PERIOD", width: "60px" },
    { id: "ticker", title: "FUND", width: "230px" },
    { id: "company", title: "MARKET VALUE", width: "100px" },
    { id: "empty", title: "ANNUAL PERFORMANCE", width: "150px" },
  ],
};

export const secFeedComponents = {
  insiders: "TheInsiders",
  eightk: "TheEvents",
  tenk: "TheAnnual",
  tenq: "TheQuarterly",
  funds: "TheFunds",
};
