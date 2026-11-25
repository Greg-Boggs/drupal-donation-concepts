import { campaignPage } from "./components/campaign-page.js";
export default class {
  data() {
    return { permalink: "/people/index.html" };
  }
  render() {
    return campaignPage("people");
  }
}
