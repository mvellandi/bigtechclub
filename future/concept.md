---
title: "Big Tech Club"
status: "concept-prototype"
version: "0.1"
site_role: "Independent public club"
design_direction: "An atlas for AI engineering, with a directory of the people who practice it"
review_artifact: "index.html"
core_journeys:
  - "Open the atlas, choose a chapter, read, and check understanding"
  - "Filter the member directory, open a profile, and find a useful link"
  - "Watch a programmed session and explore applying to contribute"
---

# Big Tech Club

Imagine the club a few seasons after opening. Its public AI engineering book is already circulating, members maintain concise public profiles, and a recurring broadcast brings a few of them together around one well-defined engineering question. The club has its own identity and navigation, separate from the studio and BTC projects.

The book and member directory carry the site between broadcasts. Anyone can read the online book for free. The proposed print edition costs $20, with all proceeds after expenses going to a digital literacy charity. The charity and expense policy are open decisions.

## Pages and jobs

| Intended route | Page | Layout and primary action |
| --- | --- | --- |
| `/` | Home | Editorial hero with “Read the book” and “Find members,” followed by a book feature, member profiles, a programmed session, and a short mission block. |
| `/book/` | Book index | Pair the title, description, and actions with square cover art at least 400 × 400 px on desktop. Offer a direct start with chapter one, a route through the landscape, and a “Buy the book” link. |
| `/book/print/` | Print edition | Explain the $20 edition, what’s included, and where the proceeds go. |
| `/book/landscape/` | Landscape | One explorable, fictional geographic map containing five chapter regions. Pair the map with an ordered list that works by keyboard and on narrow screens. |
| `/book/<chapter>/` | Chapter | Open with a zoomed view of the same geography. Follow with an in-page section menu, prose, practical visuals, a callout, a 20-question interactive quiz, and a link onward. |
| `/members/` | Directory | Filter by location or region, specialty, and interest. Show the active criteria, result count, and a reset path when no members match. |
| `/members/<handle>/` | Member | Name, approximate location, short bio, “Ask me about” and “Exploring now,” followed by three to five member-curated links. The visitor can act through a link the member chose. |
| `/live/` | Live | Centered player hero, moderated chat beneath, timed program and contribution paths. The same page can show an upcoming session or an archive state. |
| `/mission/` | Mission | Explain the book and print economics, what a profile offers, and how to pitch a programmed segment or join a short interview or topic discussion. |
| `/live/apply/` | Contribute | Choose a segment or short contribution. Describe the topic, concrete example, and audience takeaway. The prototype previews a pitch in the browser. |

## The atlas

Treat the map as the book’s table of contents. Each region has a recognizable landmark and keeps its position when the chapter opens. Reuse the same geography in print, along with the numbered chapter key. The design cue from *Designing Data-Intensive Applications* is the way maps orient a technical reader within a larger subject.

| Chapter | Region | Practical outcome |
| --- | --- | --- |
| 1. Frame the problem | The Survey Coast | Specify a task, baseline, success metric, and failure policy. |
| 2. Ground the system | The Archive Delta | Assemble relevant evidence and trace responses to their sources. |
| 3. Design the workflow | The Toolworks | Decide where to use a model, a fixed step, or human approval. |
| 4. Evaluate behavior | The Test Range | Build an evaluation set and investigate regressions. |
| 5. Operate in production | The Watchtower | Plan for service targets, monitoring, and recovery. |

A running example follows a support team building a public help-center assistant. The finished quizzes use 20 questions per chapter, with feedback grounded in the reading. The first prototype includes one complete 20-question quiz and two sample questions per remaining chapter.

## What membership feels like

Proposed default for review: anyone can browse. Members opt into listing and choose how to describe their location, what they want to be asked about, and which links to publish. A profile can work like a personal homepage and still feel part of the club. The directory works independently of livestream participation.

A broadcast starts with a five-minute problem brief, moves into a fifteen-minute walkthrough and ten-minute interview, then closes with audience questions. A future host workflow can turn one accepted pitch into a timed session and a reusable recording or clip for wider distribution. Candidate participation paths include proposing a book correction or supplying a worked example. A monthly member newsletter or quarterly magazine remains a later editorial choice.

## Architectural review

The future app is a static folder with its own HTML, CSS, and JavaScript files. It uses the global Atlas theme at `../themes/atlas.css` and the shared switcher at `../components/theme-switcher.js`. The Atlas theme contains light and dark palettes. The switch uses a saved choice when one exists and otherwise starts in light mode. It uses local fixtures and shareable hash navigation. The route table describes intended public URLs. Live playback and chat are simulated, the print option is a concept, and applications stay on the device while the page is open. Member names and details are fictional. Production decisions include member publishing and consent, moderation, application review, and print fulfillment and charity reporting. A future service can live on Hetzner via Coolify while the book and public pages retain a static publishing path.

Use local edits as the source for each review milestone. Dessn documents static HTML and initial folder upload, plus a local working-tree push to a frame copy through its MCP. For the first stage review, live-test one imported frame in Play, including navigation, map pins, quiz feedback, and directory filters. Then make a noticeable local edit and try one batched frame update. Check whether the existing review link still shows the new revision and compare account metering after the import and update. Standalone links to individual states use URL fragments, so board-wide review in separate native frames may eventually benefit from distinct static routes.

Dessn documents Library recompiles and replacement folder uploads as Pro features. Its documented frame-code edits use zero AI credits and require an available sandbox. The reported 50-call monthly ceiling is a planning constraint pending an account-level check. One frame for the whole prototype gives us an update unit we can test without per-page edits. [Supported code imports](https://www.dessn.com/docs/getting-started/connect-your-code) · [Library sync](https://www.dessn.com/docs/getting-started/design-library) · [Frame editing and credits](https://www.dessn.com/docs/mcp/what-you-can-do)
