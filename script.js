// Basic utilities
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "event-blueprint";
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function linesToListItems(text) {
  if (!text) return "";
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => `<li>${escapeHtml(l)}</li>`)
    .join("\n");
}

// Collect form data
function getFormData() {
  const get = (id) => document.getElementById(id)?.value.trim() || "";

  return {
    eventName: get("eventName"),
    eventTheme: get("eventTheme"),
    eventDates: get("eventDates"),
    eventHashtag: get("eventHashtag"),
    coreAssets: get("coreAssets"),
    primaryGoals: get("primaryGoals"),
    targetCohorts: get("targetCohorts"),
    primaryKpis: get("primaryKpis"),
    secondaryKpis: get("secondaryKpis"),
    timelinePre: get("timelinePre"),
    timelineDuring: get("timelineDuring"),
    timelinePost: get("timelinePost"),
    roomFormats: get("roomFormats"),
    specialItems: get("specialItems"),
    creatorLogic: get("creatorLogic"),
    gifterLogic: get("gifterLogic"),
    antiAbuse: get("antiAbuse"),
    growthTargets: get("growthTargets"),
    monetisationTargets: get("monetisationTargets"),
    creatorTargets: get("creatorTargets"),
    crmNotes: get("crmNotes"),
  };
}

// Update live preview
function updatePreview() {
  const data = getFormData();

  const name = data.eventName || "Event name not set";
  const dates = data.eventDates || "Dates not set";
  const hashtag = data.eventHashtag || "#hashtag";
  const theme = data.eventTheme || "Describe the event theme";

  const previewEventName = document.getElementById("previewEventName");
  const previewMeta = document.getElementById("previewMeta");
  const previewGoals = document.getElementById("previewGoals");
  const previewPrimaryKpis = document.getElementById("previewPrimaryKpis");
  const previewSecondaryKpis = document.getElementById("previewSecondaryKpis");
  const previewFileName = document.getElementById("previewFileName");

  if (previewEventName) previewEventName.textContent = name;
  if (previewMeta) {
    previewMeta.innerHTML = `${escapeHtml(dates)} &middot; ${escapeHtml(theme)} &middot; ${escapeHtml(
      hashtag
    )}`;
  }
  if (previewGoals) {
    const goals =
      data.primaryGoals ||
      "Add primary goals to make this blueprint useful for Growth, Product and CRM.";
    previewGoals.textContent = goals;
  }

  if (previewPrimaryKpis) {
    const items = linesToListItems(data.primaryKpis);
    previewPrimaryKpis.innerHTML = items || "<li>Add primary KPIs</li>";
  }
  if (previewSecondaryKpis) {
    const items = linesToListItems(data.secondaryKpis);
    previewSecondaryKpis.innerHTML = items || "<li>Add secondary KPIs</li>";
  }

  const slug = slugify(name);
  if (previewFileName) {
    previewFileName.textContent = `event-${slug}.html`;
  }
}

// Generate full event HTML (fully styled & responsive)
function generateEventHtml(data) {
  const primaryKpiLis = linesToListItems(data.primaryKpis);
  const secondaryKpiLis = linesToListItems(data.secondaryKpis);
  const preTimelineLis = linesToListItems(data.timelinePre);
  const duringTimelineLis = linesToListItems(data.timelineDuring);
  const postTimelineLis = linesToListItems(data.timelinePost);
  const roomFormatLis = linesToListItems(data.roomFormats);
  const specialItemLis = linesToListItems(data.specialItems);
  const creatorLogicLis = linesToListItems(data.creatorLogic);
  const gifterLogicLis = linesToListItems(data.gifterLogic);
  const antiAbuseLis = linesToListItems(data.antiAbuse);

  const eventName = escapeHtml(data.eventName || "Live-Ops Event");
  const eventTheme = escapeHtml(
    data.eventTheme ||
      "Time-boxed live-ops campaign aligned to a key cultural or product moment."
  );
  const eventDates = escapeHtml(data.eventDates || "Dates not set");
  const eventHashtag = escapeHtml(data.eventHashtag || "#event");
  const coreAssets = escapeHtml(data.coreAssets || "Special in-app virtual items");
  const primaryGoals =
    escapeHtml(
      data.primaryGoals ||
        "Increase engagement, boost creator earnings, and deepen community participation."
    ) + ".";
  const targetCohorts = escapeHtml(
    data.targetCohorts ||
      "Define target cohorts such as viewers, gifters, creators, and new users."
  );
  const growthTargets = escapeHtml(
    data.growthTargets || "+X% DAU uplift on event days"
  );
  const monetisationTargets = escapeHtml(
    data.monetisationTargets || "+Y% gifting uplift; Z% viewers → gifters"
  );
  const creatorTargets = escapeHtml(
    data.creatorTargets || "Meaningful earnings uplift for both top and long-tail creators"
  );
  const crmNotes = escapeHtml(
    data.crmNotes ||
      "Outline key CRM cohorts and journeys that support this event across push, in-app, and email."
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${eventName} — Live-Ops Blueprint</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="event-page">
  <header class="top-nav">
    <div class="nav-inner container">
      <div class="logo-mark">
        <span class="logo-dot"></span>
        <span class="logo-text">LiveOps Library</span>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation">☰</button>
      <nav class="nav-links">
        <a href="index.html">Generator</a>
        <a href="#overview">Overview</a>
        <a href="#mechanics">Mechanics</a>
        <a href="#pnl">P&L</a>
        <a href="#crm">CRM</a>
        <a href="#creative">Creatives</a>
      </nav>
    </div>
  </header>

  <main class="container event-layout">
    <aside class="event-sidebar">
      <a href="index.html" class="back-link">&larr; Back to Generator</a>
      <p class="pill pill-latest">Event Blueprint</p>
      <h1>${eventName}</h1>
      <p class="event-subtitle">
        ${eventTheme}
      </p>

      <div class="event-meta-block">
        <h2>Event Snapshot</h2>
        <dl>
          <div>
            <dt>Theme</dt>
            <dd>${eventTheme}</dd>
          </div>
          <div>
            <dt>Dates</dt>
            <dd>${eventDates}</dd>
          </div>
          <div>
            <dt>Hashtag</dt>
            <dd>${eventHashtag}</dd>
          </div>
          <div>
            <dt>Core Asset</dt>
            <dd>${coreAssets}</dd>
          </div>
          <div>
            <dt>Primary Goals</dt>
            <dd>${primaryGoals}</dd>
          </div>
          <div>
            <dt>Target Cohorts</dt>
            <dd>${targetCohorts}</dd>
          </div>
        </dl>
      </div>

      <div class="event-tags">
        <h2>Tags</h2>
        <ul class="tag-list compact">
          <li>Live-Ops</li>
          <li>Virtual Gifting</li>
          <li>Creator Campaign</li>
        </ul>
      </div>
    </aside>

    <section class="event-main">
      <div class="tab-nav" data-tab-root>
        <button class="tab-link active" data-tab-target="overview">Overview</button>
        <button class="tab-link" data-tab-target="mechanics">Mechanics & Game Logic</button>
        <button class="tab-link" data-tab-target="pnl">P&L Template</button>
        <button class="tab-link" data-tab-target="crm">Cohorts & CRM</button>
        <button class="tab-link" data-tab-target="creative">Creative Checklist</button>
      </div>

      <section id="overview" class="tab-panel active">
        <h2>1. Event Overview</h2>
        <p>
          ${eventName} is a live-ops event designed to capitalise on a key moment and drive
          <strong>DAU, time spent, and monetisation</strong>. It combines themed live rooms,
          special limited-time assets, and creator-led challenges into a single, structured campaign.
        </p>

        <div class="cards-inline">
          <article class="mini-card">
            <h3>Primary KPIs</h3>
            <ul>
              ${primaryKpiLis || "<li>Add primary KPIs in the generator.</li>"}
            </ul>
          </article>
          <article class="mini-card">
            <h3>Secondary KPIs</h3>
            <ul>
              ${secondaryKpiLis || "<li>Add secondary KPIs in the generator.</li>"}
            </ul>
          </article>
          <article class="mini-card">
            <h3>Target Cohorts</h3>
            <p style="font-size:0.85rem;">
              ${targetCohorts}
            </p>
          </article>
        </div>

        <h3>Event Timeline (Blueprint)</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-badge">Pre-event</div>
            <div class="timeline-content">
              <h4>Preparation</h4>
              <ul>
                ${preTimelineLis || "<li>Define pre-event tasks in the generator.</li>"}
              </ul>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-badge">During</div>
            <div class="timeline-content">
              <h4>Live days</h4>
              <ul>
                ${duringTimelineLis || "<li>Define during-event flows in the generator.</li>"}
              </ul>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-badge">Post</div>
            <div class="timeline-content">
              <h4>Wrap-up & retro</h4>
              <ul>
                ${postTimelineLis || "<li>Define post-event wrap-up steps in the generator.</li>"}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="mechanics" class="tab-panel">
        <h2>2. Mechanics & Game Logic</h2>

        <h3>2.1 Live Room Formats</h3>
        <ul class="checklist">
          ${roomFormatLis || "<li>Add live room formats in the generator.</li>"}
        </ul>

        <h3>2.2 Special Assets / Gifts</h3>
        <p>Key assets available only during this event window:</p>
        <ul>
          ${specialItemLis || "<li>Add special items in the generator.</li>"}
        </ul>

        <div class="cards-inline">
          <article class="mini-card">
            <h3>Creator Leaderboard</h3>
            <ul>
              ${creatorLogicLis || "<li>Define creator leaderboard logic in the generator.</li>"}
            </ul>
          </article>
          <article class="mini-card">
            <h3>Gifter Leaderboard</h3>
            <ul>
              ${gifterLogicLis || "<li>Define gifter leaderboard logic in the generator.</li>"}
            </ul>
          </article>
        </div>

        <h3>2.3 Anti-Abuse & Guardrails</h3>
        <ul class="checklist">
          ${antiAbuseLis || "<li>Define guardrails in the generator.</li>"}
        </ul>
      </section>

      <section id="pnl" class="tab-panel">
        <h2>3. P&L Template</h2>
        <p class="hint">
          Use this table as a starting point. Copy into Sheets / Excel and
          replace assumptions with real values for this specific event.
        </p>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Line Item</th>
                <th>Assumption / Basis</th>
                <th>Planned</th>
                <th>Actual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Projected DAU uplift</td>
                <td>${growthTargets}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Projected gifting revenue</td>
                <td>${monetisationTargets}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Creator reward pool</td>
                <td>Fixed pool + performance bonuses</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Marketing budget</td>
                <td>Paid + influencer + barter</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Net event margin</td>
                <td>Revenue − rewards − marketing</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>New paying users acquired</td>
                <td># first-time payers / gifters during event</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Blended CAC for new payers</td>
                <td>Marketing / new payers</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="crm" class="tab-panel">
        <h2>4. Cohorts & CRM Journeys</h2>
        <p>
          Use this section to align CRM, Growth, and Product on behaviour-to-action
          mappings. Fill details in the generator and expand them in your CRM tool.
        </p>
        <p style="font-size:0.9rem;">
          ${crmNotes}
        </p>
      </section>

      <section id="creative" class="tab-panel">
        <h2>5. Creative & Comms Checklist</h2>
        <p>
          Use this as a ready reckoner for Design, Copy, and Creator Success teams.
        </p>
        <div class="cards-inline">
          <article class="mini-card">
            <h3>Surfaces</h3>
            <ul>
              <li>Home banner for the event</li>
              <li>Category / event tiles</li>
              <li>In-room highlights for special assets</li>
              <li>Creator dashboard announcement card</li>
            </ul>
          </article>
          <article class="mini-card">
            <h3>Copy Hooks</h3>
            <ul>
              <li>Hero line to explain the event in one sentence</li>
              <li>Short CTA for notifications / banners</li>
              <li>Creator-facing explanation of rewards</li>
            </ul>
          </article>
          <article class="mini-card">
            <h3>Creator Toolkit</h3>
            <ul>
              <li>Sample show flow scripts for creators</li>
              <li>Overlay frames or visual elements</li>
              <li>Countdown story / post templates</li>
            </ul>
          </article>
        </div>
        <h3>Asset Links</h3>
        <p class="hint">
          Paste Figma / Drive links here when you use this internally.
        </p>
        <ul>
          <li>Figma file: Event creatives</li>
          <li>Drive folder: Creator communication PDFs</li>
          <li>Sheet: Final rewards & winners list</li>
        </ul>
      </section>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>${eventName} &middot; Live-Ops Blueprint</p>
      <p class="footer-meta">
        Generated via the Live-Ops Event Blueprint Generator. Clone this file as
        a template for future events.
      </p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;
}

// Download helper
function downloadHtml() {
  const data = getFormData();
  if (!data.eventName) {
    alert("Please enter at least an event name before downloading.");
    return;
  }

  const html = generateEventHtml(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const slug = slugify(data.eventName);
  const a = document.createElement("a");
  a.href = url;
  a.download = `event-${slug}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Mobile nav + tabs
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Tab behaviour (for generated pages)
  const tabRoots = document.querySelectorAll("[data-tab-root]");
  tabRoots.forEach((root) => {
    const buttons = root.querySelectorAll(".tab-link");
    const panels = document.querySelectorAll(".tab-panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab-target");

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        panels.forEach((panel) => {
          if (panel.id === targetId) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  });

  const generatePreviewBtn = document.getElementById("generatePreviewBtn");
  const downloadHtmlBtn = document.getElementById("downloadHtmlBtn");

  if (generatePreviewBtn) {
    generatePreviewBtn.addEventListener("click", updatePreview);
  }
  if (downloadHtmlBtn) {
    downloadHtmlBtn.addEventListener("click", () => {
      updatePreview();
      downloadHtml();
    });
  }

  // Initial preview
  updatePreview();
});

async function downloadHtml() {
  const data = getFormData();
  if (!data.eventName) {
    alert("Please enter at least an event name before downloading.");
    return;
  }

  const cssText = await fetch("styles.css").then(r => r.text());
  const jsText = await fetch("blueprint_runtime.js").then(r => r.text());

  let html = generateEventHtml(data);

  html = html
    .replace(`<link rel="stylesheet" href="styles.css" />`, `<style>${cssText}</style>`)
    .replace(`<script src="script.js"></script>`, `<script>${jsText}</script>`);

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const slug = slugify(data.eventName);
  const a = document.createElement("a");
  a.href = url;
  a.download = `event-${slug}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
