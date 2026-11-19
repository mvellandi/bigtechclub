import"./theme-switcher-B8ZrSKTK.js";var e=[{slug:`frame`,title:`Frame the problem`,region:`The Survey Coast`,x:161,y:275,summary:`Turn a promising AI use case into a task you can test.`,sections:[[`Choose a task`,`The support team wants to reduce time spent on repeat questions. Start with one job: answer public help-center questions using approved articles. Account-specific requests and topics with conflicting evidence go to a human.`],[`Measure the current workflow`,`Sample real cases with personal details removed. Time a support teammate using ordinary search, then record whether the answer is correct and supported. Keep the same cases for the model comparison.`],[`Write a release test`,`Agree on an acceptable success rate, the maximum latency, and which mistakes require escalation. Hold back cases for release evaluation and inspect results by request type before expanding access.`]],steps:[`Collect cases`,`Measure the baseline`,`Define success`,`Review failures`],callout:`For the help-center assistant, a confident answer about the wrong refund policy can be more costly than handing the case to a human.`},{slug:`ground`,title:`Ground the system`,region:`The Archive Delta`,x:367,y:218,summary:`Give the system useful evidence and make its answers traceable.`,sections:[[`Organize sources`,`Use approved help-center articles and revision dates. Preserve headings and links when preparing text for search.`],[`Test retrieval`,`Look at what search actually finds for common, ambiguous, and outdated questions before testing the final answer.`],[`Make evidence visible`,`Return source links so readers can check the claim. Route questions with missing or conflicting material for review.`]],steps:[`Index approved sources`,`Retrieve evidence`,`Answer with links`],callout:`A link is useful when the linked passage supports the actual claim.`},{slug:`workflow`,title:`Design the workflow`,region:`The Toolworks`,x:556,y:302,summary:`Decide where a model, a fixed step, or a human belongs.`,sections:[[`Draw the workflow`,`Separate question triage, retrieval, drafting, and publication. Give each step a clear input and output.`],[`Choose where to use a model`,`A model can propose an answer from text. A fixed check can make sure source IDs came back with the evidence.`],[`Define the handoff`,`When a case needs a person, send the original question, relevant evidence, and the reason for escalation.`]],steps:[`Triage`,`Retrieve`,`Draft`,`Review or publish`],callout:`Give the next person enough context to pick up the case without repeating the whole workflow.`},{slug:`evaluate`,title:`Evaluate behavior`,region:`The Test Range`,x:707,y:153,summary:`Build an evaluation set that reveals how changes affect actual cases.`,sections:[[`Cover important cases`,`Sample routine questions, conflicting policies, unanswered questions, and requests that require a human.`],[`Grade separate behaviors`,`Track correctness, evidence use, and appropriate escalation as distinct judgments. Keep examples that show where reviewers differ.`],[`Inspect changes by category`,`Compare results against the earlier release and read representative failures before drawing conclusions.`]],steps:[`Sample`,`Grade`,`Compare`,`Investigate`],callout:`An overall improvement can hide a regression in a small but high-impact category.`},{slug:`operate`,title:`Operate in production`,region:`The Watchtower`,x:895,y:219,summary:`Set a service target and give operators a way to recover.`,sections:[[`Decide what to monitor`,`Track response time, answer rate, escalation volume, and whether cited sources still exist.`],[`Prepare recovery`,`Document how to disable generated answers and restore the previous published version. Include ownership and the conditions that trigger that switch.`],[`Review changes in stages`,`Start with a small share of cases. Compare new outcomes to the release thresholds before expanding.`]],steps:[`Monitor`,`Investigate`,`Roll back`,`Review`],callout:`Practice turning off generated answers while the ordinary help-center search stays available.`}],t={frame:[[`What is the first task in the running example?`,`Answer public help-center questions from approved articles`,`Handle every request the support team receives`,`A narrow task makes the audience, input, and acceptable output clear.`],[`What should you compare the assistant against?`,`The current human and search workflow`,`An unrelated chatbot demo`,`The baseline shows what users already get on the same kind of task.`],[`Which question belongs in the release set?`,`A realistic question with conflicting policy evidence`,`A question copied into every prompt example`,`Conflicting evidence tests a behavior that matters and should stay unseen during tuning.`],[`Which measure best checks a supported answer?`,`The answer is correct and its cited passage supports the claim`,`The answer includes a link of any kind`,`A citation only helps if it supports what the assistant said.`],[`What should happen with an account-specific request?`,`Send it to the appropriate human support path`,`Assume the most common account configuration`,`Account-specific cases fall outside the public help-center task.`],[`When should the team agree on release thresholds?`,`Before reviewing release scores`,`After seeing which results look strongest`,`Earlier agreement prevents the test from shifting to fit the results.`],[`Which dataset best supports a fair comparison?`,`The same representative cases for both workflows`,`Easy cases for the assistant and hard cases for the baseline`,`Shared cases make the comparison interpretable.`],[`How should sampled support cases be prepared?`,`Remove personal details while preserving the task`,`Keep all identifying details by default`,`The evaluation needs the scenario, not the identity of the person who raised it.`],[`Which best describes an operational constraint?`,`The service should respond within an agreed time budget`,`The product should feel impressive`,`A time budget can be measured and tied to the user experience.`],[`Which is an example of a high-impact mistake?`,`A confident answer using the wrong refund policy`,`A truthful response that offers escalation`,`The incorrect policy can mislead the user into making a consequential decision.`],[`Why retain a holdout set?`,`To assess how the system handles cases it was not tuned on`,`To make those questions available as prompt examples`,`A holdout measures behavior on cases unseen during iteration.`],[`What can the baseline reveal before building an assistant?`,`That ordinary search already meets the target`,`That a model is necessary for every case`,`Measuring existing performance can change whether a proposed feature is worth building.`],[`What belongs in a useful task specification?`,`The intended user, task, success criteria, and escalation policy`,`A model name with a broad mission statement`,`A specification explains who the feature serves and how its behavior will be judged.`],[`Which result warrants a closer look?`,`Strong overall results with poor performance on refunds`,`An improvement across all measured categories`,`A high-impact category may matter more than its share of the average.`],[`What should happen when approved sources disagree?`,`Escalate rather than invent a definitive answer`,`Always choose the shorter article`,`The running example treats conflicting evidence as a reason for human review.`],[`How can the team grade speed fairly?`,`Measure comparable tasks from the same starting point`,`Compare model generation alone to the whole support interaction`,`Comparable boundaries make timing measurements useful.`],[`Who can help identify acceptable failure behavior?`,`The people who own and handle escalated support cases`,`Only the person who wrote the prompt`,`Support owners know where errors cause extra work or harm.`],[`Which is the clearest next step after a release-blocking result?`,`Investigate the failure and rerun the release test after a fix`,`Remove that class of case from the test`,`The result is evidence that the tested version misses an agreed threshold.`],[`What is a legitimate product outcome for an unsupported question?`,`A clear handoff to the next available support channel`,`A fluent guess to keep the answer rate high`,`A handoff preserves usefulness when the system lacks evidence.`],[`When should the team consider broadening the scope?`,`After the current task meets its criteria and the new task has its own test plan`,`As soon as the first example works in a demo`,`Broader scope introduces different cases and failure costs.`]],ground:[[`What should retrieval first be tested against?`,`Questions whose needed sources are known`,`Only the first article in the index`,`Known source targets help diagnose retrieval separately from generation.`],[`What makes a citation useful?`,`Its passage supports the claim`,`The article is long`,`A reader needs a source that verifies the particular claim.`]],workflow:[[`Which job suits a fixed check?`,`Check that every cited ID came from retrieval`,`Write a nuanced natural-language summary`,`ID membership can be checked directly.`],[`What should an escalation include?`,`The question, evidence, and reason for handoff`,`A generic notification`,`The added context lets the next person continue the work.`]],evaluate:[[`What can a single overall score miss?`,`A regression in a small category`,`Every improvement in a large category`,`Separate numbers reveal how changes affect smaller groups.`],[`What should you retain alongside aggregate results?`,`Case-level examples and judgments`,`Only the final percentage`,`Examples support investigation and useful reviewer disagreement.`]],operate:[[`What belongs in the recovery plan?`,`How to disable generated answers and who owns the action`,`A promise to investigate after any incident`,`Operators need a specific action and clear ownership.`],[`How should a new release first reach users?`,`Serve a small share of cases and review the result`,`Replace the previous version for everyone immediately`,`A staged rollout makes it easier to contain and inspect unexpected outcomes.`]]},n=[{slug:`mina-rao`,name:`Mina Rao`,initials:`MR`,city:`Berlin`,region:`Europe`,specialty:`Evaluation`,interest:`Digital literacy`,focus:`Building evaluation sets from support transcripts.`,exploring:`How multilingual teams disagree on useful answers.`},{slug:`jonas-berg`,name:`Jonas Berg`,initials:`JB`,city:`Copenhagen`,region:`Europe`,specialty:`Retrieval`,interest:`Open source`,focus:`Search pipelines for small, messy collections.`,exploring:`What public libraries can do with better local search.`},{slug:`amara-okafor`,name:`Amara Okafor`,initials:`AO`,city:`Lagos`,region:`Africa`,specialty:`Evaluation`,interest:`Education`,focus:`Human review and useful grading rubrics.`,exploring:`How beginners learn to tell a good evaluation case from a weak one.`},{slug:`sora-park`,name:`Sora Park`,initials:`SP`,city:`Seoul`,region:`Asia`,specialty:`Operations`,interest:`Open source`,focus:`Rollout and recovery for small services.`,exploring:`Operational tools that fit a two-person team.`},{slug:`elena-torres`,name:`Elena Torres`,initials:`ET`,city:`Mexico City`,region:`North America`,specialty:`Retrieval`,interest:`Digital literacy`,focus:`Search across Spanish-language public resources.`,exploring:`Ways to show uncertainty when an archive is incomplete.`},{slug:`luca-meyer`,name:`Luca Meyer`,initials:`LM`,city:`Berlin`,region:`Europe`,specialty:`Operations`,interest:`Education`,focus:`Incident drills for teams shipping their first model feature.`,exploring:`How to teach recovery with small hands-on exercises.`}],r=document.querySelector(`main`),i=(e,t,n=!1)=>`<a class="button${n?` secondary`:``}" href="${e}">${t}</a>`,a=e=>`#/book/${e.slug}/`,o=e=>`#/members/${e.slug}/`,s=(e,t)=>`<a class="back" href="${e}">← ${t}</a>`,c=(e,t,n=``)=>`
  ${n?`<p class="eyebrow">${n}</p>`:``}
  <h1>${e}</h1>
  ${t?`<p class="intro">${t}</p>`:``}`;function l(t,n){let r=t===`overview`?e.map((e,t)=>`
    <a class="map-pin" href="${a(e)}" aria-label="Chapter ${t+1}, ${e.title}"
      style="left:${e.x/10}%;top:${e.y/4.3}%">${t+1}</a>`).join(``):``,i=n?`Regional map · ${n.region}`:`AI Engineering Atlas · Five chapter regions`;return`<figure class="map">
    <div class="map-art"><canvas data-map="${t}" data-chapter="${n?.slug??``}" width="1000" height="${n?330:430}" aria-hidden="true"></canvas>${r}</div>
    <figcaption>${i}</figcaption>
  </figure>`}function u(t,n){let r=t.getContext(`2d`),i=getComputedStyle(t),a=e=>i.getPropertyValue(e).trim(),o=n?{x:n.x-180,y:n.y-59,scale:2.75}:{x:0,y:0,scale:1},s=[[[-78,285],[-22,237],[43,231],[62,177],[127,163],[156,182],[188,174],[216,201],[278,206],[301,236],[282,270],[307,296],[270,330],[227,329],[214,369],[146,386],[106,361],[40,375],[-32,356]],[[235,130],[272,96],[331,92],[346,59],[400,49],[451,77],[474,123],[521,150],[523,192],[491,205],[474,244],[424,274],[382,256],[344,278],[321,243],[293,219],[310,190],[266,176]],[[425,329],[440,285],[476,271],[506,235],[553,247],[586,229],[641,244],[657,293],[682,327],[663,366],[612,381],[579,411],[525,412],[500,386],[447,384]],[[541,120],[577,95],[605,48],[638,46],[653,15],[705,2],[744,21],[790,29],[808,73],[787,108],[818,147],[783,186],[744,190],[727,223],[671,220],[629,196],[584,205],[572,165]],[[787,218],[829,196],[832,160],[862,134],[912,149],[942,131],[986,148],[1002,183],[1041,202],[1049,250],[1013,273],[983,266],[950,296],[900,282],[872,294],[840,268]]],c=[[140,250,135,91,`--map-land-survey`],[395,145,115,98,`--map-land-archive`],[557,326,96,70,`--map-land-toolworks`],[684,114,113,87,`--map-land-test`],[934,204,95,65,`--map-land-watchtower`]],l=e=>{r.beginPath(),e.forEach(([t,n],i)=>{let[a,o]=e[(i+1)%e.length],s=(t+a)/2,c=(n+o)/2;if(i===0){let[i,a]=e.at(-1);r.moveTo((i+t)/2,(a+n)/2)}r.quadraticCurveTo(t,n,s,c)}),r.closePath()};r.fillStyle=a(`--map-water`),r.fillRect(0,0,t.width,t.height),r.save(),r.scale(o.scale,o.scale),r.translate(-o.x,-o.y),r.strokeStyle=a(`--map-grid`),r.lineWidth=.8;for(let e=-100;e<1100;e+=34)r.beginPath(),r.moveTo(e,-100),r.lineTo(e,520),r.stroke();for(let e=-100;e<520;e+=34)r.beginPath(),r.moveTo(-100,e),r.lineTo(1100,e),r.stroke();s.forEach((e,t)=>{let[n,i,o,s,u]=c[t];l(e),r.fillStyle=a(u),r.fill(),r.strokeStyle=a(`--map-coast`),r.lineWidth=1.5,r.stroke(),r.save(),r.clip(),r.strokeStyle=a(`--map-contour`),r.lineWidth=.8;for(let e=1;e<=8;e++){r.beginPath();for(let t=0;t<=72;t++){let a=t*Math.PI/36,c=1+.15*Math.sin(3*a+e*.19)+.08*Math.cos(5*a),l=n+o*e/9*Math.cos(a)*c,u=i+s*e/9*Math.sin(a)*c;t===0?r.moveTo(l,u):r.lineTo(l,u)}r.stroke()}r.restore()}),r.beginPath(),e.forEach(({x:e,y:t},n)=>{n===0?r.moveTo(e,t):r.lineTo(e,t)}),r.setLineDash([5,5]),r.strokeStyle=a(`--map-route`),r.lineWidth=2,r.stroke(),r.setLineDash([]),e.forEach(({x:e,y:t})=>{r.beginPath(),r.arc(e,t,5,0,2*Math.PI),r.fillStyle=a(`--map-route`),r.fill()}),r.restore(),n?(r.fillStyle=a(`--accent`),r.font=`16px monospace`,r.fillText(`N ↑`,26,33)):(r.fillStyle=a(`--map-label`),r.font=`21px Georgia`,r.fillText(`N ↑`,35,46),r.font=`italic 22px Georgia`,r.fillText(`The Open Sea`,320,382))}function d(){r.querySelectorAll(`canvas[data-map]`).forEach(t=>{u(t,e.find(e=>e.slug===t.dataset.chapter))})}function f(){return`<ol class="index">${e.map((e,t)=>`
    <li><a href="${a(e)}">
      <span class="eyebrow">0${t+1}</span><span><strong>${e.title}</strong><br><span class="fine">${e.region}</span></span><span aria-hidden="true">→</span>
    </a></li>`).join(``)}</ol>`}function p(e){return`<div class="cards">${e.map(e=>`
    <article class="card">
      <p class="eyebrow">${e.city} · ${e.specialty}</p>
      <h3><a href="${o(e)}">${e.name}</a></h3>
      <p>${e.focus}</p>
    </article>`).join(``)}</div>`}function m(){return`<section class="hero">
    <div>${c(`A club for people building with AI.`,`Read a free field guide to AI engineering, find people who share your interests, and drop in on a live session.`)}
    <div class="actions">${i(`#/book/`,`Read the book`)}${i(`#/members/`,`Find members`,!0)}</div></div>
    <a href="#/book/landscape/" aria-label="Explore the AI Engineering Atlas">${l(`cover`)}</a>
  </section>
  <section class="rule columns">
    <div><p class="eyebrow">The book</p><h2>AI Engineering Atlas</h2></div>
    <div><p>Follow a help-center assistant from the first task specification through retrieval, evaluation, and release. Five chapters, free online, with a $20 print edition.</p>
    <div class="actions">${i(`#/book/landscape/`,`Explore the atlas`,!0)}</div></div>
  </section>
  <section class="rule">
    <h2>Meet the members</h2>
    ${p(n.slice(0,3))}
    <div class="actions">${i(`#/members/`,`Browse the directory`,!0)}</div>
  </section>
  <section class="rule columns">
    <div><p class="eyebrow">On the livestream</p><h2>Can your assistant show its work?</h2>
    <p>A working session on source quality, with a demo, a short interview, and audience questions.</p>
    <div class="actions">${i(`#/live/`,`See the session`,!0)}</div></div>
    <div><p class="eyebrow">The mission</p><h2>Make AI engineering easier to learn.</h2>
    <p>Keep the book open to everyone and put print proceeds after expenses toward digital literacy.</p>
    <div class="actions">${i(`#/mission/`,`About the club`,!0)}</div></div>
  </section>`}function h(){return`<header class="hero book-hero">
    <div>
      ${c(`AI Engineering Atlas`,`A free online book about taking a small AI system from idea to production. Follow one example through five chapters, with a quiz at the end of each.`)}
      <div class="actions">
        ${i(a(e[0]),`Start chapter one`)}
        ${i(`#/book/landscape/`,`Open the landscape`,!0)}
        ${i(`#/book/print/`,`Buy the book`,!0)}
      </div>
    </div>
    <div class="book-cover" aria-hidden="true">🗺️</div>
  </header>
  <div class="narrow">
    <nav class="subnav" aria-label="Book sections"><a href="#/book/?section=contents">Contents</a><a href="#/book/landscape/">Landscape</a></nav>
    <section><h2 id="contents" tabindex="-1">Contents</h2>${f()}</section>
  </div>`}function g(){return`<div class="narrow">
    ${s(`#/book/`,`AI Engineering Atlas`)}
    ${c(`Print edition`,`A $20 print copy of AI Engineering Atlas, with the full atlas and a region map for every chapter.`)}
    <section class="rule">
      <h2>Where the proceeds go</h2>
      <p>All print proceeds after expenses go to a digital literacy charity.</p>
      <p class="fine">Ordering opens when the print program launches.</p>
      <div class="actions">${i(`#/book/`,`Read online for free`,!0)}</div>
    </section>
  </div>`}function _(){return`${s(`#/book/`,`Book`)}
    ${c(`The landscape`,`Choose any region to open its chapter, or follow the route from the Survey Coast to the Watchtower.`)}
    <section>${l(`overview`)}</section>
    <section class="narrow rule"><h2>Chapters</h2>${f()}</section>`}function v(t){let n=e.indexOf(t),r=e[n+1],o=t.sections.map(([e,t],n)=>`
    <section class="rule"><h2 id="part-${n}" tabindex="-1">${e}</h2><p>${t}</p></section>`).join(``);return`${s(`#/book/landscape/`,`Landscape`)}
    <header>${c(t.title,t.summary,`Chapter ${n+1} / ${e.length}`)}</header>
    <section>${l(`chapter`,t)}</section>
    <div class="narrow">
      <nav class="subnav" aria-label="Chapter sections">
        ${t.sections.map(([e],n)=>`<a href="${a(t)}?section=part-${n}">${e}</a>`).join(``)}
        <a href="${a(t)}?section=quiz-heading">Quiz</a>
      </nav>
      ${o}
      <ol class="steps" aria-label="Workflow">${t.steps.map(e=>`<li>${e}</li>`).join(``)}</ol>
      <aside class="callout"><strong>Field note</strong><p>${t.callout}</p></aside>
      <section class="rule"><h2 id="quiz-heading" tabindex="-1">Check your understanding</h2>
        <p>${n===0?`20 questions with feedback.`:`Two sample questions for this prototype.`}</p>
        <div id="quiz" class="quiz"></div>
      </section>
      <div class="actions">${r?i(a(r),`Next · ${r.title}`,!0):i(`#/book/landscape/`,`Return to the landscape`,!0)}</div>
    </div>`}function y(){let e=[[`place`,`Location or region`,[...new Set(n.map(e=>e.region)),...new Set(n.map(e=>e.city))].sort()],[`specialty`,`Specialty`,[...new Set(n.map(e=>e.specialty))].sort()],[`interest`,`Interest`,[...new Set(n.map(e=>e.interest))].sort()]];return`${c(`Member directory`,`Browse by where people are based, the work they do, and the subjects they want to explore.`)}
    <form class="filters" id="filters" aria-label="Member filters">
    ${e.map(([e,t,n])=>`<label>${t}<select name="${e}"><option value="">Any</option>
      ${n.map(e=>`<option>${e}</option>`).join(``)}</select></label>`).join(``)}
    <button type="reset" class="button secondary">Reset filters</button>
    </form>
    <p id="member-count" class="fine" role="status"></p><div id="member-results"></div>`}function b(t,n){let r={Evaluation:e[3],Retrieval:e[1],Operations:e[4]}[t.specialty],i=new URLSearchParams({place:t.city}),o=new URLSearchParams;return[`place`,`specialty`,`interest`].forEach(e=>{let t=n.get(e);t&&o.set(e,t)}),`<div class="narrow">
    ${s(o.size?`#/members/?${o}`:`#/members/`,`Member directory`)}
    <div class="profile">
      <div>
        ${c(t.name,t.focus,`${t.city} · ${t.region}`)}
        <dl><dt>Ask me about</dt><dd>${t.specialty}</dd><dt>Exploring now</dt><dd>${t.exploring}</dd><dt>Club interest</dt><dd>${t.interest}</dd></dl>
      </div>
      <div class="monogram" aria-hidden="true">${t.initials}</div>
    </div>
    <section class="rule"><h2>Links</h2><div class="link-list">
      <a href="https://example.com/" target="_blank" rel="noopener">Personal site · example ↗</a>
      <a href="${a(r)}">Recommended reading · ${r.title}</a>
      <a href="#/members/?${i}">More members in ${t.city}</a>
    </div></section>
  </div>`}function x(){return`<div class="narrow">
    ${c(`Can your assistant show its work?`,`A working session on what a source has to prove, with Mina Rao.`,`Livestream · Demo session`)}
    <div class="player">
      <div><h2 id="player-caption">Big Tech Club Live</h2>
      <button class="button" id="play" type="button" aria-pressed="false">Play demo</button></div>
    </div>
    <p class="fine">Simulated player and local demo chat</p>
    <section class="rule">
      <h2>Chat</h2>
      <ul class="chat" id="chat" role="log">
        <li><strong>Host:</strong> Bring a question your help center struggles to answer.</li>
        <li><strong>Mina:</strong> I’ll show a grading example before we open the floor.</li>
      </ul>
      <form id="chat-form" class="inline-form">
        <label>Your demo message<input name="message" type="text" required maxlength="240" autocomplete="off"></label>
        <button class="button secondary">Post locally</button>
      </form>
    </section>
    <section class="rule">
      <h2>Program</h2>
      <ol class="schedule">
        <li><strong>00:00–05:00</strong> · Problem brief</li>
        <li><strong>05:00–20:00</strong> · Walkthrough of an answer with weak evidence</li>
        <li><strong>20:00–30:00</strong> · Interview with Mina Rao</li>
        <li><strong>30:00–40:00</strong> · Audience questions</li>
      </ol>
      <div class="actions">${i(`#/live/apply/?format=segment`,`Pitch a segment`)}${i(`#/live/apply/?format=short`,`Apply for a short contribution`,!0)}</div>
    </section>
  </div>`}function S(){return`<div class="narrow">
    ${c(`The mission`,`Make AI engineering education available to anyone, and give practitioners a place to find each other and share what they learn.`)}
    <section class="rule"><h2>Keep the book public</h2>
    <p>The book is free to read online. The proposed print edition costs $20, with all proceeds after expenses going to a digital literacy charity.</p>
    <div class="actions">${i(`#/book/`,`Read the book`)}</div></section>
    <section class="rule"><h2>Make people easy to find</h2>
    <p>Browse by location, specialty, and interest. Each member chooses what to share and where to send a reader next.</p>
    <div class="actions">${i(`#/members/`,`Find members`,!0)}</div></section>
    <section class="rule"><h2>Give good ideas airtime</h2>
    <p>Pitch a timed walkthrough with a concrete example, apply for a short interview, or bring a perspective to a topic the show is already covering. Selected conversations can reach people beyond the live audience through recordings and short clips.</p>
    <div class="actions">${i(`#/live/apply/?format=segment`,`Pitch a segment`,!0)}${i(`#/live/apply/?format=short`,`Apply for a short contribution`,!0)}</div></section>
  </div>`}function C(e){let t=e.get(`format`)===`short`;return`<div class="narrow">
    ${s(`#/live/`,`Live`)}
    ${c(`Contribute to a session`,`Tell the hosts what you’d share and what viewers would get out of it.`)}
    <form class="pitch" id="pitch">
      <label>Contribution format<select name="format"><option${t?``:` selected`}>Programmed segment</option><option${t?` selected`:``}>Short interview or topic contribution</option></select></label>
      <label>Working title<input type="text" name="topic" required maxlength="100"></label>
      <label>What example would you bring?<textarea name="example" rows="3" maxlength="500" required></textarea></label>
      <label>What should viewers take away?<textarea name="takeaway" rows="3" maxlength="500" required></textarea></label>
      <button class="button">Preview application</button>
      <p class="fine">Prototype · Your application stays in this browser view.</p>
    </form>
    <section class="rule" id="pitch-preview" hidden><h2 tabindex="-1">Application preview</h2>
    <p class="fine" id="pitch-format"></p><h3 id="pitch-topic"></h3>
    <p><strong>Example</strong><br><span class="pitch-preview" id="pitch-example"></span></p>
    <p><strong>Audience takeaway</strong><br><span class="pitch-preview" id="pitch-takeaway"></span></p></section>
  </div>`}function w(){document.querySelector(`#pitch`).addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget);[`format`,`topic`,`example`,`takeaway`].forEach(e=>{document.querySelector(`#pitch-${e}`).textContent=t.get(e).trim()});let n=document.querySelector(`#pitch-preview`);n.hidden=!1,n.querySelector(`h2`).focus()})}function T(){let e=document.querySelector(`#play`);e.addEventListener(`click`,()=>{let t=e.getAttribute(`aria-pressed`)===`true`;e.setAttribute(`aria-pressed`,String(!t)),e.textContent=t?`Play demo`:`Pause demo`,document.querySelector(`#player-caption`).textContent=t?`Big Tech Club Live`:`Problem brief · 00:00`}),document.querySelector(`#chat-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=e.currentTarget.elements.message,n=t.value.trim();if(!n)return;let r=document.querySelector(`#chat`),i=document.createElement(`li`);i.textContent=`You (demo): ${n}`,r.append(i),r.scrollTop=r.scrollHeight,t.value=``})}function E(e){let t=document.querySelector(`#filters`),r=document.querySelector(`#member-count`),i=document.querySelector(`#member-results`);[`place`,`specialty`,`interest`].forEach(n=>{let r=t.elements[n],i=e.get(n);[...r.options].some(e=>e.value===i)&&(r.value=i)});function a(){let{place:e,specialty:a,interest:o}=Object.fromEntries(new FormData(t)),s=n.filter(t=>(!e||t.city===e||t.region===e)&&(!a||t.specialty===a)&&(!o||t.interest===o));r.textContent=`${s.length} ${s.length===1?`member`:`members`}`,i.innerHTML=s.length?p(s):`<p class="callout">No members match these filters. Try a wider region or reset your filters.</p>`;let c=new URLSearchParams;Object.entries({place:e,specialty:a,interest:o}).forEach(([e,t])=>{t&&c.set(e,t)}),c.size&&i.querySelectorAll(`h3 a`).forEach(e=>{e.hash+=`?${c}`}),history.replaceState(null,``,c.size?`#/members/?${c}`:`#/members/`)}t.addEventListener(`change`,a),t.addEventListener(`reset`,()=>queueMicrotask(a)),a()}function D(e){let n=document.querySelector(`#quiz`),r=t[e.slug],i=0,a=0;function o(e=!1){if(i===r.length){n.innerHTML=`<h3 tabindex="-1">${a} of ${r.length} correct</h3>
        <div class="actions"><button type="button" class="button secondary">Try again</button></div>`,n.querySelector(`h3`).focus(),n.querySelector(`button`).addEventListener(`click`,()=>{i=0,a=0,o(!0)});return}let[t,s,c,l]=r[i],u=i%2?[c,s]:[s,c];n.innerHTML=`<form>
      <p class="eyebrow" tabindex="-1">Question ${i+1} of ${r.length}</p>
      <fieldset><legend>${t}</legend>
        ${u.map((e,t)=>`<label><input required name="answer" type="radio" value="${t}">${e}</label>`).join(``)}
      </fieldset>
      <p class="quiz-output" role="status"></p>
      <div class="actions"><button type="submit" class="button">Check answer</button>
        <button type="button" class="button secondary" hidden>${i+1===r.length?`See results`:`Next question`}</button></div>
    </form>`,e&&n.querySelector(`.eyebrow`).focus();let d=n.querySelector(`form`),f=d.querySelector(`[type="button"]`);d.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(d).get(`answer`);if(t===null)return;let n=u[Number(t)]===s;n&&a++,d.querySelector(`fieldset`).disabled=!0,d.querySelector(`[type="submit"]`).hidden=!0,d.querySelector(`.quiz-output`).textContent=`${n?`Correct.`:`Review this one.`} ${l}`,f.hidden=!1,f.focus()}),f.addEventListener(`click`,()=>{i++,o(!0)})}o()}var O;function k(e){let t=document.getElementById(e.get(`section`));return t&&r.contains(t)?(t.scrollIntoView(),t.focus({preventScroll:!0}),!0):!1}function A(t=!1){let[s,l]=(location.hash.slice(1)||`/`).split(`?`),u=new URLSearchParams(l),f=e.find(e=>a(e)===`#${s}`),p=n.find(e=>o(e)===`#${s}`);if(s===O&&(f||s===`/book/`)){k(u)||(window.scrollTo(0,0),r.focus({preventScroll:!0}));return}O=s;let A=new Map([[`/`,m],[`/book/`,h],[`/book/landscape/`,_],[`/book/print/`,g],[`/members/`,y],[`/live/`,x],[`/live/apply/`,C],[`/mission/`,S]]).get(s)||(()=>`${c(`Page unavailable`,`Open the book or browse the member directory.`)}
    <div class="actions">${i(`#/`,`Go to the homepage`)}</div>`);r.innerHTML=f?v(f):p?b(p,u):A(u),document.title=s===`/`?`Big Tech Club`:`${r.querySelector(`h1`).textContent} · Big Tech Club`,document.querySelectorAll(`.mast nav a`).forEach(e=>{e.removeAttribute(`aria-current`);let t=e.hash.slice(1);s.startsWith(t)&&e.setAttribute(`aria-current`,s===t?`page`:`true`)}),d(),f&&D(f),s===`/members/`&&E(u),s===`/live/`&&T(),s===`/live/apply/`&&w(),!k(u)&&t&&(window.scrollTo(0,0),r.focus({preventScroll:!0}))}document.querySelector(`#skip`).addEventListener(`click`,e=>{e.preventDefault(),r.focus()}),window.addEventListener(`hashchange`,()=>A(!0)),new MutationObserver(d).observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`]}),A();