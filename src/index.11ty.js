import { layout } from "./components/layout.js";
export default class {
  data() {
    return { permalink: "/index.html" };
  }
  render() {
    return layout(
      "Two ways to support the work",
      `<section class="section review-index"><p class="eyebrow">Campaign concepts / November 2026</p><h1>Security takes people.<br>Support takes a reason.</h1><p class="lead">Two landing pages. The same evidence, real team members, and a clear path to support their work.</p><div class="concept-grid"><a class="concept-card evidence-card" href="/security/"><span>01 / Evidence first</span><h2>AI finds the bugs.<br>People ship the fixes.</h2><p>Start with the workload. Meet the people behind the response.</p><b>Explore this page ↗</b></a><a class="concept-card people-card" href="/people/"><span>02 / People first</span><h2>Your next update<br>starts with someone.</h2><p>Start with the team. See what their work makes possible.</p><b>Explore this page ↗</b></a></div><p class="fine">Independent community proposal. Campaign terms are illustrative. <a href="/sources/">See the evidence and credits.</a></p></section>`,
    );
  }
}
