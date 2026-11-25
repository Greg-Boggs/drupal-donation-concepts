import { campaignPage } from "./components/campaign-page.js";
export default class {
  data() {
    return { permalink: "/index.html" };
  }
  render() {
    return campaignPage("evidence");
  }
}
