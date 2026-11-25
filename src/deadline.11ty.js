import { campaignPage } from "./components/campaign-page.js";
export default class {
  data() {
    return { permalink: "/deadline/index.html" };
  }
  render() {
    return campaignPage("deadline");
  }
}
