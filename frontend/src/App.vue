<template>
  <div
    class="app-wrapper background dark:bg-slate-900 w-[100vw] text-slate-900 dark:text-slate-400 bg-slate-100 overflow-hidden transition ease flex"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<style>
p {
  padding: 0;
}

input:focus {
  outline: none;
}

.the-search {
  position: absolute;
  top: 108px;
  left: calc(
    50% - 680px / 2 + 40px
  ); /* 50% - half of the center div width - left div width - 20px margin */
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active,
.-enter-active,
.-leave-active {
  transition: all 200ms ease;
}

.slide-up-enter-from,
.slide-down-leave-to {
  transform: translateY(2%);
  opacity: 0;
}

.slide-up-leave-to,
.slide-down-enter-from {
  transform: translateY(-2%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from,
.slide-down-enter-to,
.slide-down-leave-from,
.-enter-to,
.-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.documents-mobile {
  width: calc(100vw - 40px);
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 200ms ease;
}

.popup-overlay {
  background-color: rgba(13, 13, 46, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(1px);
}

.popup {
  border-radius: 4px;
  position: relative;
  z-index: 1000;
}

.item-transition-enter-active,
.item-transition-leave-active {
  transition: all 0.5s;
}

.item-transition-enter-from,
.item-transition-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.item-transition-enter-to,
.item-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.popup-content {
  height: calc(80vh - 160px);
}

select {
  text-align: right;
}

a:hover {
  text-decoration: none;
  text-underline-offset: 2px;
}

.comp-icon {
  border-radius: 14px;
  height: 13px;
  width: 13px;
  cursor: pointer;
}

.selector-toggle {
  padding: 0;
  transition: all 100ms ease;
  margin: 0 0 0 6px;
}

.selector-toggle.opened {
  transform: rotate(180deg);
  transition: all 100ms ease;
}

.nav-chevron.opened {
  transform: rotate(180deg);
  transition: all 150ms ease-in-out;
}

.nav-chevron {
  padding: 0;
  transition: all 150ms ease-in-out;
  margin: 0 0 0 6px;
}

.hamburger-menu-items {
  height: calc(100vh - 126px);
}
em {
  font-style: normal;
}

.expanded-info {
  position: absolute;
  z-index: 50;
}

.comp-description-l {
  width: 240px;
  font-size: 11px;
  padding: 16px;
  border-radius: 4px;
  font-weight: 400;
  line-height: 26px;
}

.ad-content {
  width: 90%;
  height: 90%;
  border: 1px dashed gray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.account-mgmt {
  display: flex;
  align-items: flex-end;
  font-size: 10px;
  height: 18px;
  margin: 0 20px;
}

.nav-search {
  display: flex;
  align-items: center;
}

.search-icon:hover {
  background: #7777a432;
}

.search-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-nav-subs {
  font-size: 10px;
  margin: 10px 0;
  padding: 0 18px;
}

.side-nav-sub {
  margin: 12px 0;
}

.search-icon-name {
  font-size: 10px;
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: default;
}

.searcher-option {
  padding: 0 3px;
  font-size: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.sb-icon-name {
  font-size: 12px;
}

.sb-icon-name.mouseleave {
  opacity: 0;
  transition: all 0.2s ease;
  transform: translateX(2px);
}

.sb-icon-name.mouseleave.light {
  opacity: 0;
  transition: all 0.2s ease;
  transform: translateX(-4px);
}

.sb-icon-name.hover-item {
  opacity: 1;
  transition: all 0.2s ease;
  transform: translateX(5px);
}

.sb-icon-name.hover-item.light {
  opacity: 1;
  transition: all 0.2s ease;
  transform: translateX(-8px);
}

.theme-togglers {
  align-items: center;
  height: 100%;
  transition: all 0.15s ease;
}

.toggle-theme {
  height: 24px;
  width: 24px;
  padding: 0 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.toggle-theme:hover {
  background: #7777a432;
}

.right.side-object {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#search::placeholder {
  font-size: 11px;
}

#search.results {
  border-radius: 16px;
  border-left: 0.1rem solid #2b333d;
  border-top: 0.1rem solid #2b333d;
  border-right: 0.1rem solid #2b333d;
}

input#search:focus {
  outline: none;
  transition: all 0.2s ease;
}

input#search.results:focus {
  outline: none;
  border: 0;
  border: 0.075rem solid rgb(158, 161, 172);
  transition: all 0.2s ease;
}

.company-query {
  cursor: pointer;
  padding: 4px;
  height: 26px;
}

.selected {
  background: #12131a;
  color: #d4d4d8;
}

.search-queries {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  font-weight: 400;
  width: 200px;
}

.company-ticker-q {
  width: 50px;
}

.company-name-q {
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  white-space: nowrap;
  width: 150px;
}

.search-result {
  margin: 10px 0 0 0;
  position: absolute;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 6px;
  transition: all 200ms ease;
}

textarea {
  overflow: auto;
  outline: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none; /*remove the resize handle on the bottom right*/
}

#feedback-input {
  width: 165px;
  padding: 8px;
  height: 150px;
  border: 0;
  text-align: start;
  font-family: poppins;
  color: #d4d4d8;
  font-size: 10px;
}

input#email-input {
  width: 177px;
  height: 24px;
  padding: 0 8px;
  border: 0;
  border-bottom: 0.1rem solid #2b333d;
  border-radius: 14px 14px 0 0;
  font-size: 10px;
  background: transparent;
  background: #1b212d;
  color: rgb(148, 153, 199);
  font-family: poppins;
  transition: all 0.2s ease;
}

input#email-input:focus {
  outline: none;
  transition: all 0.2s ease;
}

.info-enter-active,
.info-leave-active {
  transition: all 0.15s ease;
}

.info-enter-from,
.info-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

.feedback-box {
  width: 180px;
  height: 200px;
  border: 0.1rem solid #2b333d;
  background: #1b212d;
  border-radius: 14px;
  margin: 0 0 30px 10px;
}

.right.side-content {
  display: flex;
  align-items: flex-end;
}

.left.side-content {
  width: 130px;
  padding: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.content {
  display: flex;
  width: calc(100vw - 160px);
  height: 100vh;
  overflow-y: hidden;
}

.content-mobile {
  height: calc(100vh - 60px);
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
}

.side-object {
  width: 240px;
  display: flex;
  justify-content: space-between;
}

.navigation-objects {
  display: flex;
  justify-content: center;
}

.upper-ribbon-objects {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}

.searcher-objects {
  display: flex;
  width: 260px;
  justify-content: center;
  align-items: center;
}

.searcher {
  width: auto;
}

.upper-ribbon {
  height: 42px;
  display: flex;
}

.logo-name-cursor {
  width: auto;
  display: flex;
  align-items: center;
}

.ih-logo {
  margin: 0 10px;
  display: flex;
  align-items: center;
}

.insider-data:active::-webkit-scrollbar-thumb,
.insider-data:focus::-webkit-scrollbar-thumb,
.insider-data:hover::-webkit-scrollbar-thumb,
.trans-section:active::-webkit-scrollbar-thumb,
.trans-section:focus::-webkit-scrollbar-thumb,
.trans-section:hover::-webkit-scrollbar-thumb,
.table-data:active::-webkit-scrollbar-thumb,
.table-data:focus::-webkit-scrollbar-thumb,
.table-data:hover::-webkit-scrollbar-thumb,
.rss-table:active::-webkit-scrollbar-thumb,
.rss-table:focus::-webkit-scrollbar-thumb,
.rss-table:hover::-webkit-scrollbar-thumb,
.rightie-content:active::-webkit-scrollbar-thumb,
.rightie-content:focus::-webkit-scrollbar-thumb,
.rightie-content:hover::-webkit-scrollbar-thumb {
  visibility: visible;
  transition: all 150ms ease;
}

.trans-section::-webkit-scrollbar-thumb,
.insider-data::-webkit-scrollbar-thumb,
.table-data::-webkit-scrollbar-thumb,
.rss-table::-webkit-scrollbar-thumb,
.rightie-content::-webkit-scrollbar-thumb {
  background-color: rgba(180, 180, 180, 0.3);
  visibility: hidden;
  transition: all 150ms ease;
}

.trans-section::-webkit-scrollbar,
.insider-data::-webkit-scrollbar,
.table-data::-webkit-scrollbar,
.rss-table::-webkit-scrollbar,
.rightie-content::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-left-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-left-enter-from,
.fade-left-leave-to {
  opacity: 0;
}

.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.5s ease;
}

.fade-top-enter-from,
.fade-top-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomInDisappear {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}

.zoomin-enter-active,
.zoomin-leave-active {
  animation-fill-mode: both;
}

.zoomin-enter-active {
  animation-name: zoomIn;
  animation-duration: 0.25s;
}

.zoomin-leave-active {
  animation-name: zoomInDisappear;
  animation-duration: 0.25s;
}

.line-calbox {
  width: auto;
  height: auto;
  border: 0px dashed rgb(170, 170, 170);
}

.insider-box {
  width: auto;
  height: 120px;
  padding: 12px 24px;
  overflow-y: auto;
}

.funds-box {
  width: auto;
  height: 128px;
  padding: 12px 16px;
  overflow-y: auto;
}

.report-box {
  width: auto;
  height: 160px;
  padding: 12px 16px;
  overflow-y: auto;
}

.slideinfo-enter-active {
  transition: all 0.2s ease;
}

.slideinfo-leave-active {
  transition: all 0.2s ease;
}

.slideinfo-enter-to,
.slideinfo-leave-from {
  height: 90px;
  overflow: hidden;
}

.slideinfo-enter-from,
.slideinfo-leave-to {
  overflow: hidden;
  height: 0;
}

.slidesectors-enter-active {
  transition: all 0.2s ease;
}

.slidesectors-leave-active {
  transition: all 0.2s ease;
}

.slidesectors-enter-to,
.slidesectors-leave-from {
  height: 270px;
  overflow: hidden;
}

.slidesectors-enter-from,
.slidesectors-leave-to {
  overflow: hidden;
  height: 0;
}

.dashslide-enter-active {
  transition: all 0.2s ease;
}

.dashslide-leave-active {
  transition: all 0.2s ease;
}

.dashslide-enter-to,
.dashslide-leave-from {
  height: 113px;
  overflow: hidden;
}

.dashslide-enter-from,
.dashslide-leave-to {
  overflow: hidden;
  height: 0;
}

.title-enter-active,
.title-leave-active {
  transition: all 0.2s ease;
}

.title-enter-from,
.title-leave-to {
  transform: translateY(4px);
  opacity: 0;
}

.filter-enter-active,
.filter-leave-active {
  transition: all 0.2s ease;
}

.filter-enter-from,
.filter-leave-to {
  transform: translateY(4px) scale(0.98);
  opacity: 0;
}

.spinner-enter-active,
.spinner-leave-active {
  transition: all 0.15s ease;
}

.spinner-enter-from,
.spinner-leave-to {
  transform: translateY(8px);
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.2s ease;
}

.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-to,
.slide-leave-from {
  height: 120px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  height: 0;
}

.slidefeeds-enter-active {
  transition: all 0.2s ease;
}

.slidefeeds-leave-active {
  transition: all 0.2s ease;
}

.slidefeeds-enter-to,
.slidefeeds-leave-from {
  height: 60px;
  overflow: hidden;
}

.slidefeeds-enter-from,
.slidefeeds-leave-to {
  overflow: hidden;
  height: 0;
}

.slidemedium-enter-active {
  transition: all 0.2s ease;
}

.slidemedium-leave-active {
  transition: all 0.2s ease;
}

.slidemedium-enter-to,
.slidemedium-leave-from {
  height: 128px;
  overflow: hidden;
}

.slidemedium-enter-from,
.slidemedium-leave-to {
  overflow: hidden;
  height: 0;
}

.sideslide-enter-active {
  transition: all 0.2s ease;
}

.sideslide-leave-active {
  transition: all 0.2s ease;
}

.sideslide-enter-to,
.sideslide-leave-from {
  width: calc(60vw + 21px);
}

.sideslide-enter-from,
.sideslide-leave-to {
  opacity: 0;
  width: 0;
}

.slidemobile-enter-active {
  transition: all 0.2s ease;
}

.slidemobile-leave-active {
  transition: all 0.2s ease;
}

.slidemobile-enter-to,
.slidemobile-leave-from {
  height: 180px;
  overflow: hidden;
}

.slidemobile-enter-from,
.slidemobile-leave-to {
  overflow: hidden;
  height: 0;
}

.slidemobilesmall-enter-active {
  transition: all 0.2s ease;
}

.slidemobilesmall-leave-active {
  transition: all 0.2s ease;
}

.slidemobilesmall-enter-to,
.slidemobilesmall-leave-from {
  height: 128px;
  overflow: hidden;
}

.slidemobilesmall-enter-from,
.slidemobilesmall-leave-to {
  overflow: hidden;
  height: 0;
}

.actual-header-cell,
.estimate-header-cell,
.previous-header-cell {
  display: flex;
  justify-content: right;
}

.diff-pos.icon {
  margin: 0;
  display: flex;
  justify-content: center;
}

.diff-neg.icon {
  margin: 0;
  display: flex;
  justify-content: center;
}

.diffpos {
  color: rgb(0, 71, 0);
}

.diffneg {
  color: rgb(106, 1, 1);
}

.diffneut {
  color: rgb(100, 100, 100);
}

.table-data-row {
  transition: all 0.1s ease;
  font-weight: 400;
}

.shrinked-row {
  width: auto;
  display: flex;
  cursor: pointer;
  align-items: center;
}

.shrinked-row.clickable {
  cursor: pointer;
}

.cell {
  padding: 8px;
  display: flex;
  align-items: center;
}

.lg-cell {
  padding: 12px 8px;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
}

.time-row {
  width: 55px;
}

.country-flag-div {
  width: 30px;
}

.components {
  display: flex;
  justify-content: space-between;
}

.component {
  margin: 14px;
}

.category-title {
  font-size: 14px;
}

html.dark {
  transition: all 0.2s ease;
}

body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
}

#app {
  font-family: Works Sans, Poppins;
}

a {
  text-decoration: none;
  font-weight: 400;
}

::placeholder {
  font-weight: 400;
  font-size: 12px;
  transition: all 0.15s ease;
}

:focus::placeholder {
  opacity: 0;
  transition: all 0.15s ease;
}

.title-box {
  transition: all 0.1s ease;
  font-size: 8px;
  display: flex;
  align-items: center;
  width: auto;
  font-weight: 400;
}

.mh-object {
  width: 260px;
}

.main-header {
  display: flex;
  width: 100vw;
  align-items: center;
}

.ih-name {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.dot-l {
  font-size: 12px;
}

.diffpos2 {
  color: rgb(72, 173, 86);
}

.diffneg2 {
  color: rgb(203, 35, 103);
}

.diffneut2 {
  color: rgb(145, 145, 145);
}

.insiders-container {
  width: auto;
  height: 120px;
  padding: 0 0 10px 25px;
  border-radius: 5px;
}

.y-axis > path.domain,
.y-axis-line > path.domain,
.y-axis-dot > path.domain {
  color: transparent;
}

.x-axis > g.tick > text {
  transform: translateY(2px);
  font-size: 10px;
  font-weight: 400;
}

.y-axis > g.tick > text {
  transform: translateX(-4px);
  font-size: 10px;
}

.canvas {
  /* important for responsiveness */
  display: block;
  fill: none;
  stroke: none;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.table {
  width: auto;
  font-size: 10px;
  height: calc(100vh - 215px);
}

.table-mobile {
  width: auto;
  font-size: 10px;
  height: calc(100vh - 200px);
}
</style>
