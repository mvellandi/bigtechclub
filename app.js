const chapters = [
  {
    slug: 'frame', title: 'Frame the problem', region: 'The Survey Coast', x: 161, y: 275,
    summary: 'Turn a promising AI use case into a task you can test.',
    sections: [
      ['Choose a task', 'The support team wants to reduce time spent on repeat questions. Start with one job: answer public help-center questions using approved articles. Account-specific requests and topics with conflicting evidence go to a human.'],
      ['Measure the current workflow', 'Sample real cases with personal details removed. Time a support teammate using ordinary search, then record whether the answer is correct and supported. Keep the same cases for the model comparison.'],
      ['Write a release test', 'Agree on an acceptable success rate, the maximum latency, and which mistakes require escalation. Hold back cases for release evaluation and inspect results by request type before expanding access.']
    ],
    steps: ['Collect cases', 'Measure the baseline', 'Define success', 'Review failures'],
    callout: 'For the help-center assistant, a confident answer about the wrong refund policy can be more costly than handing the case to a human.'
  },
  {
    slug: 'ground', title: 'Ground the system', region: 'The Archive Delta', x: 367, y: 218,
    summary: 'Give the system useful evidence and make its answers traceable.',
    sections: [
      ['Organize sources', 'Use approved help-center articles and revision dates. Preserve headings and links when preparing text for search.'],
      ['Test retrieval', 'Look at what search actually finds for common, ambiguous, and outdated questions before testing the final answer.'],
      ['Make evidence visible', 'Return source links so readers can check the claim. Route questions with missing or conflicting material for review.']
    ],
    steps: ['Index approved sources', 'Retrieve evidence', 'Answer with links'],
    callout: 'A link is useful when the linked passage supports the actual claim.'
  },
  {
    slug: 'workflow', title: 'Design the workflow', region: 'The Toolworks', x: 556, y: 302,
    summary: 'Decide where a model, a fixed step, or a human belongs.',
    sections: [
      ['Draw the workflow', 'Separate question triage, retrieval, drafting, and publication. Give each step a clear input and output.'],
      ['Choose where to use a model', 'A model can propose an answer from text. A fixed check can make sure source IDs came back with the evidence.'],
      ['Define the handoff', 'When a case needs a person, send the original question, relevant evidence, and the reason for escalation.']
    ],
    steps: ['Triage', 'Retrieve', 'Draft', 'Review or publish'],
    callout: 'Give the next person enough context to pick up the case without repeating the whole workflow.'
  },
  {
    slug: 'evaluate', title: 'Evaluate behavior', region: 'The Test Range', x: 707, y: 153,
    summary: 'Build an evaluation set that reveals how changes affect actual cases.',
    sections: [
      ['Cover important cases', 'Sample routine questions, conflicting policies, unanswered questions, and requests that require a human.'],
      ['Grade separate behaviors', 'Track correctness, evidence use, and appropriate escalation as distinct judgments. Keep examples that show where reviewers differ.'],
      ['Inspect changes by category', 'Compare results against the earlier release and read representative failures before drawing conclusions.']
    ],
    steps: ['Sample', 'Grade', 'Compare', 'Investigate'],
    callout: 'An overall improvement can hide a regression in a small but high-impact category.'
  },
  {
    slug: 'operate', title: 'Operate in production', region: 'The Watchtower', x: 895, y: 219,
    summary: 'Set a service target and give operators a way to recover.',
    sections: [
      ['Decide what to monitor', 'Track response time, answer rate, escalation volume, and whether cited sources still exist.'],
      ['Prepare recovery', 'Document how to disable generated answers and restore the previous published version. Include ownership and the conditions that trigger that switch.'],
      ['Review changes in stages', 'Start with a small share of cases. Compare new outcomes to the release thresholds before expanding.']
    ],
    steps: ['Monitor', 'Investigate', 'Roll back', 'Review'],
    callout: 'Practice turning off generated answers while the ordinary help-center search stays available.'
  }
];
const quizzes = {
  frame: [
    ['What is the first task in the running example?', 'Answer public help-center questions from approved articles', 'Handle every request the support team receives', 'A narrow task makes the audience, input, and acceptable output clear.'],
    ['What should you compare the assistant against?', 'The current human and search workflow', 'An unrelated chatbot demo', 'The baseline shows what users already get on the same kind of task.'],
    ['Which question belongs in the release set?', 'A realistic question with conflicting policy evidence', 'A question copied into every prompt example', 'Conflicting evidence tests a behavior that matters and should stay unseen during tuning.'],
    ['Which measure best checks a supported answer?', 'The answer is correct and its cited passage supports the claim', 'The answer includes a link of any kind', 'A citation only helps if it supports what the assistant said.'],
    ['What should happen with an account-specific request?', 'Send it to the appropriate human support path', 'Assume the most common account configuration', 'Account-specific cases fall outside the public help-center task.'],
    ['When should the team agree on release thresholds?', 'Before reviewing release scores', 'After seeing which results look strongest', 'Earlier agreement prevents the test from shifting to fit the results.'],
    ['Which dataset best supports a fair comparison?', 'The same representative cases for both workflows', 'Easy cases for the assistant and hard cases for the baseline', 'Shared cases make the comparison interpretable.'],
    ['How should sampled support cases be prepared?', 'Remove personal details while preserving the task', 'Keep all identifying details by default', 'The evaluation needs the scenario, not the identity of the person who raised it.'],
    ['Which best describes an operational constraint?', 'The service should respond within an agreed time budget', 'The product should feel impressive', 'A time budget can be measured and tied to the user experience.'],
    ['Which is an example of a high-impact mistake?', 'A confident answer using the wrong refund policy', 'A truthful response that offers escalation', 'The incorrect policy can mislead the user into making a consequential decision.'],
    ['Why retain a holdout set?', 'To assess how the system handles cases it was not tuned on', 'To make those questions available as prompt examples', 'A holdout measures behavior on cases unseen during iteration.'],
    ['What can the baseline reveal before building an assistant?', 'That ordinary search already meets the target', 'That a model is necessary for every case', 'Measuring existing performance can change whether a proposed feature is worth building.'],
    ['What belongs in a useful task specification?', 'The intended user, task, success criteria, and escalation policy', 'A model name with a broad mission statement', 'A specification explains who the feature serves and how its behavior will be judged.'],
    ['Which result warrants a closer look?', 'Strong overall results with poor performance on refunds', 'An improvement across all measured categories', 'A high-impact category may matter more than its share of the average.'],
    ['What should happen when approved sources disagree?', 'Escalate rather than invent a definitive answer', 'Always choose the shorter article', 'The running example treats conflicting evidence as a reason for human review.'],
    ['How can the team grade speed fairly?', 'Measure comparable tasks from the same starting point', 'Compare model generation alone to the whole support interaction', 'Comparable boundaries make timing measurements useful.'],
    ['Who can help identify acceptable failure behavior?', 'The people who own and handle escalated support cases', 'Only the person who wrote the prompt', 'Support owners know where errors cause extra work or harm.'],
    ['Which is the clearest next step after a release-blocking result?', 'Investigate the failure and rerun the release test after a fix', 'Remove that class of case from the test', 'The result is evidence that the tested version misses an agreed threshold.'],
    ['What is a legitimate product outcome for an unsupported question?', 'A clear handoff to the next available support channel', 'A fluent guess to keep the answer rate high', 'A handoff preserves usefulness when the system lacks evidence.'],
    ['When should the team consider broadening the scope?', 'After the current task meets its criteria and the new task has its own test plan', 'As soon as the first example works in a demo', 'Broader scope introduces different cases and failure costs.']
  ],
  ground: [
    ['What should retrieval first be tested against?', 'Questions whose needed sources are known', 'Only the first article in the index', 'Known source targets help diagnose retrieval separately from generation.'],
    ['What makes a citation useful?', 'Its passage supports the claim', 'The article is long', 'A reader needs a source that verifies the particular claim.']
  ],
  workflow: [
    ['Which job suits a fixed check?', 'Check that every cited ID came from retrieval', 'Write a nuanced natural-language summary', 'ID membership can be checked directly.'],
    ['What should an escalation include?', 'The question, evidence, and reason for handoff', 'A generic notification', 'The added context lets the next person continue the work.']
  ],
  evaluate: [
    ['What can a single overall score miss?', 'A regression in a small category', 'Every improvement in a large category', 'Separate numbers reveal how changes affect smaller groups.'],
    ['What should you retain alongside aggregate results?', 'Case-level examples and judgments', 'Only the final percentage', 'Examples support investigation and useful reviewer disagreement.']
  ],
  operate: [
    ['What belongs in the recovery plan?', 'How to disable generated answers and who owns the action', 'A promise to investigate after any incident', 'Operators need a specific action and clear ownership.'],
    ['How should a new release first reach users?', 'Serve a small share of cases and review the result', 'Replace the previous version for everyone immediately', 'A staged rollout makes it easier to contain and inspect unexpected outcomes.']
  ]
};
const members = [
  {slug: 'mina-rao', name: 'Mina Rao', initials: 'MR', city: 'Berlin', region: 'Europe', specialty: 'Evaluation', interest: 'Digital literacy', focus: 'Building evaluation sets from support transcripts.', exploring: 'How multilingual teams disagree on useful answers.'},
  {slug: 'jonas-berg', name: 'Jonas Berg', initials: 'JB', city: 'Copenhagen', region: 'Europe', specialty: 'Retrieval', interest: 'Open source', focus: 'Search pipelines for small, messy collections.', exploring: 'What public libraries can do with better local search.'},
  {slug: 'amara-okafor', name: 'Amara Okafor', initials: 'AO', city: 'Lagos', region: 'Africa', specialty: 'Evaluation', interest: 'Education', focus: 'Human review and useful grading rubrics.', exploring: 'How beginners learn to tell a good evaluation case from a weak one.'},
  {slug: 'sora-park', name: 'Sora Park', initials: 'SP', city: 'Seoul', region: 'Asia', specialty: 'Operations', interest: 'Open source', focus: 'Rollout and recovery for small services.', exploring: 'Operational tools that fit a two-person team.'},
  {slug: 'elena-torres', name: 'Elena Torres', initials: 'ET', city: 'Mexico City', region: 'North America', specialty: 'Retrieval', interest: 'Digital literacy', focus: 'Search across Spanish-language public resources.', exploring: 'Ways to show uncertainty when an archive is incomplete.'},
  {slug: 'luca-meyer', name: 'Luca Meyer', initials: 'LM', city: 'Berlin', region: 'Europe', specialty: 'Operations', interest: 'Education', focus: 'Incident drills for teams shipping their first model feature.', exploring: 'How to teach recovery with small hands-on exercises.'}
];

const main = document.querySelector('main');
const routeLink = (path, label, secondary = false) =>
  `<a class="button${secondary ? ' secondary' : ''}" href="${path}">${label}</a>`;
const chapterPath = chapter => `#/book/${chapter.slug}/`;
const profilePath = member => `#/members/${member.slug}/`;
const back = (path, label) => `<a class="back" href="${path}">← ${label}</a>`;
const title = (heading, intro, eyebrow = '') => `
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h1>${heading}</h1>
  ${intro ? `<p class="intro">${intro}</p>` : ''}`;

function atlas(kind, chapter) {
  const interactive = kind === 'overview';
  const pins = interactive ? chapters.map((entry, index) => `
    <a class="map-pin" href="${chapterPath(entry)}" aria-label="Chapter ${index + 1}, ${entry.title}"
      style="left:${entry.x / 10}%;top:${entry.y / 4.3}%">${index + 1}</a>`).join('') : '';
  const caption = chapter ? `Regional map · ${chapter.region}` : 'AI Engineering Atlas · Five chapter regions';
  return `<figure class="map">
    <div class="map-art"><canvas data-map="${kind}" data-chapter="${chapter?.slug ?? ''}" width="1000" height="${chapter ? 330 : 430}" aria-hidden="true"></canvas>${pins}</div>
    <figcaption>${caption}</figcaption>
  </figure>`;
}

function drawMap(canvas, chapter) {
  const ctx = canvas.getContext('2d');
  const styles = getComputedStyle(canvas);
  const color = token => styles.getPropertyValue(token).trim();
  const viewport = chapter ? { x: chapter.x - 180, y: chapter.y - 59, scale: 2.75 } : { x: 0, y: 0, scale: 1 };
  const islands = [
    [[-78,285],[-22,237],[43,231],[62,177],[127,163],[156,182],[188,174],[216,201],[278,206],[301,236],[282,270],[307,296],[270,330],[227,329],[214,369],[146,386],[106,361],[40,375],[-32,356]],
    [[235,130],[272,96],[331,92],[346,59],[400,49],[451,77],[474,123],[521,150],[523,192],[491,205],[474,244],[424,274],[382,256],[344,278],[321,243],[293,219],[310,190],[266,176]],
    [[425,329],[440,285],[476,271],[506,235],[553,247],[586,229],[641,244],[657,293],[682,327],[663,366],[612,381],[579,411],[525,412],[500,386],[447,384]],
    [[541,120],[577,95],[605,48],[638,46],[653,15],[705,2],[744,21],[790,29],[808,73],[787,108],[818,147],[783,186],[744,190],[727,223],[671,220],[629,196],[584,205],[572,165]],
    [[787,218],[829,196],[832,160],[862,134],[912,149],[942,131],[986,148],[1002,183],[1041,202],[1049,250],[1013,273],[983,266],[950,296],[900,282],[872,294],[840,268]]
  ];
  const terrain = [
    [140, 250, 135, 91, '--map-land-survey'],
    [395, 145, 115, 98, '--map-land-archive'],
    [557, 326, 96, 70, '--map-land-toolworks'],
    [684, 114, 113, 87, '--map-land-test'],
    [934, 204, 95, 65, '--map-land-watchtower']
  ];
  const drawIsland = points => {
    ctx.beginPath();
    points.forEach(([x, y], i) => {
      const [nextX, nextY] = points[(i + 1) % points.length];
      const midX = (x + nextX) / 2;
      const midY = (y + nextY) / 2;
      if (i === 0) {
        const [lastX, lastY] = points.at(-1);
        ctx.moveTo((lastX + x) / 2, (lastY + y) / 2);
      }
      ctx.quadraticCurveTo(x, y, midX, midY);
    });
    ctx.closePath();
  };
  ctx.fillStyle = color('--map-water');
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(viewport.scale, viewport.scale);
  ctx.translate(-viewport.x, -viewport.y);
  ctx.strokeStyle = color('--map-grid');
  ctx.lineWidth = .8;
  for (let x = -100; x < 1100; x += 34) {
    ctx.beginPath(); ctx.moveTo(x, -100); ctx.lineTo(x, 520); ctx.stroke();
  }
  for (let y = -100; y < 520; y += 34) {
    ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(1100, y); ctx.stroke();
  }
  islands.forEach((points, index) => {
    const [x, y, rx, ry, land] = terrain[index];
    drawIsland(points);
    ctx.fillStyle = color(land);
    ctx.fill();
    ctx.strokeStyle = color('--map-coast');
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = color('--map-contour');
    ctx.lineWidth = .8;
    for (let band = 1; band <= 8; band++) {
      ctx.beginPath();
      for (let step = 0; step <= 72; step++) {
        const angle = step * Math.PI / 36;
        const wobble = 1 + .15 * Math.sin(3 * angle + band * .19) + .08 * Math.cos(5 * angle);
        const px = x + rx * band / 9 * Math.cos(angle) * wobble;
        const py = y + ry * band / 9 * Math.sin(angle) * wobble;
        if (step === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.restore();
  });
  ctx.beginPath();
  chapters.forEach(({ x, y }, i) => {
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = color('--map-route');
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);
  chapters.forEach(({x, y}) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color('--map-route');
    ctx.fill();
  });
  ctx.restore();
  if (chapter) {
    ctx.fillStyle = color('--accent');
    ctx.font = '16px monospace';
    ctx.fillText('N ↑', 26, 33);
  } else {
    ctx.fillStyle = color('--map-label');
    ctx.font = '21px Georgia';
    ctx.fillText('N ↑', 35, 46);
    ctx.font = 'italic 22px Georgia';
    ctx.fillText('The Open Sea', 320, 382);
  }
}

function redrawMaps() {
  main.querySelectorAll('canvas[data-map]').forEach(canvas => {
    const chapter = chapters.find(entry => entry.slug === canvas.dataset.chapter);
    drawMap(canvas, chapter);
  });
}

function chapterIndex() {
  return `<ol class="index">${chapters.map((chapter, i) => `
    <li><a href="${chapterPath(chapter)}">
      <span class="eyebrow">0${i + 1}</span><span><strong>${chapter.title}</strong><br><span class="fine">${chapter.region}</span></span><span aria-hidden="true">→</span>
    </a></li>`).join('')}</ol>`;
}

function memberCards(entries) {
  return `<div class="cards">${entries.map(member => `
    <article class="card">
      <p class="eyebrow">${member.city} · ${member.specialty}</p>
      <h3><a href="${profilePath(member)}">${member.name}</a></h3>
      <p>${member.focus}</p>
    </article>`).join('')}</div>`;
}

function home() {
  return `<section class="hero">
    <div>${title('A club for people building with AI.', 'Read a free field guide to AI engineering, find people who share your interests, and drop in on a live session.')}
    <div class="actions">${routeLink('#/book/', 'Read the book')}${routeLink('#/members/', 'Find members', true)}</div></div>
    <a href="#/book/landscape/" aria-label="Explore the AI Engineering Atlas">${atlas('cover')}</a>
  </section>
  <section class="rule columns">
    <div><p class="eyebrow">The book</p><h2>AI Engineering Atlas</h2></div>
    <div><p>Follow a help-center assistant from the first task specification through retrieval, evaluation, and release. Five chapters, free online, with a $20 print edition.</p>
    <div class="actions">${routeLink('#/book/landscape/', 'Explore the atlas', true)}</div></div>
  </section>
  <section class="rule">
    <h2>Meet the members</h2>
    ${memberCards(members.slice(0, 3))}
    <div class="actions">${routeLink('#/members/', 'Browse the directory', true)}</div>
  </section>
  <section class="rule columns">
    <div><p class="eyebrow">On the livestream</p><h2>Can your assistant show its work?</h2>
    <p>A working session on source quality, with a demo, a short interview, and audience questions.</p>
    <div class="actions">${routeLink('#/live/', 'See the session', true)}</div></div>
    <div><p class="eyebrow">The mission</p><h2>Make AI engineering easier to learn.</h2>
    <p>Keep the book open to everyone and put print proceeds after expenses toward digital literacy.</p>
    <div class="actions">${routeLink('#/mission/', 'About the club', true)}</div></div>
  </section>`;
}

function book() {
  return `<header class="hero book-hero">
    <div>
      ${title('AI Engineering Atlas', 'A free online book about taking a small AI system from idea to production. Follow one example through five chapters, with a quiz at the end of each.')}
      <div class="actions">
        ${routeLink(chapterPath(chapters[0]), 'Start chapter one')}
        ${routeLink('#/book/landscape/', 'Open the landscape', true)}
        ${routeLink('#/book/print/', 'Buy the book', true)}
      </div>
    </div>
    <div class="book-cover" aria-hidden="true">🗺️</div>
  </header>
  <div class="narrow">
    <nav class="subnav" aria-label="Book sections"><a href="#/book/?section=contents">Contents</a><a href="#/book/landscape/">Landscape</a></nav>
    <section><h2 id="contents" tabindex="-1">Contents</h2>${chapterIndex()}</section>
  </div>`;
}

function printEdition() {
  return `<div class="narrow">
    ${back('#/book/', 'AI Engineering Atlas')}
    ${title('Print edition', 'A $20 print copy of AI Engineering Atlas, with the full atlas and a region map for every chapter.')}
    <section class="rule">
      <h2>Where the proceeds go</h2>
      <p>All print proceeds after expenses go to a digital literacy charity.</p>
      <p class="fine">Ordering opens when the print program launches.</p>
      <div class="actions">${routeLink('#/book/', 'Read online for free', true)}</div>
    </section>
  </div>`;
}

function landscape() {
  return `${back('#/book/', 'Book')}
    ${title('The landscape', 'Choose any region to open its chapter, or follow the route from the Survey Coast to the Watchtower.')}
    <section>${atlas('overview')}</section>
    <section class="narrow rule"><h2>Chapters</h2>${chapterIndex()}</section>`;
}

function chapterPage(chapter) {
  const index = chapters.indexOf(chapter);
  const next = chapters[index + 1];
  const sections = chapter.sections.map(([heading, text], i) => `
    <section class="rule"><h2 id="part-${i}" tabindex="-1">${heading}</h2><p>${text}</p></section>`).join('');
  return `${back('#/book/landscape/', 'Landscape')}
    <header>${title(chapter.title, chapter.summary, `Chapter ${index + 1} / ${chapters.length}`)}</header>
    <section>${atlas('chapter', chapter)}</section>
    <div class="narrow">
      <nav class="subnav" aria-label="Chapter sections">
        ${chapter.sections.map(([heading], i) => `<a href="${chapterPath(chapter)}?section=part-${i}">${heading}</a>`).join('')}
        <a href="${chapterPath(chapter)}?section=quiz-heading">Quiz</a>
      </nav>
      ${sections}
      <ol class="steps" aria-label="Workflow">${chapter.steps.map(step => `<li>${step}</li>`).join('')}</ol>
      <aside class="callout"><strong>Field note</strong><p>${chapter.callout}</p></aside>
      <section class="rule"><h2 id="quiz-heading" tabindex="-1">Check your understanding</h2>
        <p>${index === 0 ? '20 questions with feedback.' : 'Two sample questions for this prototype.'}</p>
        <div id="quiz" class="quiz"></div>
      </section>
      <div class="actions">${next ? routeLink(chapterPath(next), `Next · ${next.title}`, true) : routeLink('#/book/landscape/', 'Return to the landscape', true)}</div>
    </div>`;
}

function directory() {
  const filters = [
    ['place', 'Location or region', [...new Set(members.map(m => m.region)), ...new Set(members.map(m => m.city))].sort()],
    ['specialty', 'Specialty', [...new Set(members.map(m => m.specialty))].sort()],
    ['interest', 'Interest', [...new Set(members.map(m => m.interest))].sort()]
  ];
  return `${title('Member directory', 'Browse by where people are based, the work they do, and the subjects they want to explore.')}
    <form class="filters" id="filters" aria-label="Member filters">
    ${filters.map(([name, label, options]) => `<label>${label}<select name="${name}"><option value="">Any</option>
      ${options.map(option => `<option>${option}</option>`).join('')}</select></label>`).join('')}
    <button type="reset" class="button secondary">Reset filters</button>
    </form>
    <p id="member-count" class="fine" role="status"></p><div id="member-results"></div>`;
}

function memberPage(member, params) {
  const reading = {
    Evaluation: chapters[3],
    Retrieval: chapters[1],
    Operations: chapters[4]
  }[member.specialty];
  const fragment = new URLSearchParams({ place: member.city });
  const returnFilters = new URLSearchParams();
  ['place', 'specialty', 'interest'].forEach(key => {
    const value = params.get(key);
    if (value) returnFilters.set(key, value);
  });
  const directoryPath = returnFilters.size ? `#/members/?${returnFilters}` : '#/members/';
  return `<div class="narrow">
    ${back(directoryPath, 'Member directory')}
    <div class="profile">
      <div>
        ${title(member.name, member.focus, `${member.city} · ${member.region}`)}
        <dl><dt>Ask me about</dt><dd>${member.specialty}</dd><dt>Exploring now</dt><dd>${member.exploring}</dd><dt>Club interest</dt><dd>${member.interest}</dd></dl>
      </div>
      <div class="monogram" aria-hidden="true">${member.initials}</div>
    </div>
    <section class="rule"><h2>Links</h2><div class="link-list">
      <a href="https://example.com/" target="_blank" rel="noopener">Personal site · example ↗</a>
      <a href="${chapterPath(reading)}">Recommended reading · ${reading.title}</a>
      <a href="#/members/?${fragment}">More members in ${member.city}</a>
    </div></section>
  </div>`;
}

function live() {
  return `<div class="narrow">
    ${title('Can your assistant show its work?', 'A working session on what a source has to prove, with Mina Rao.', 'Livestream · Demo session')}
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
      <div class="actions">${routeLink('#/live/apply/?format=segment', 'Pitch a segment')}${routeLink('#/live/apply/?format=short', 'Apply for a short contribution', true)}</div>
    </section>
  </div>`;
}

function mission() {
  return `<div class="narrow">
    ${title('The mission', 'Make AI engineering education available to anyone, and give practitioners a place to find each other and share what they learn.')}
    <section class="rule"><h2>Keep the book public</h2>
    <p>The book is free to read online. The proposed print edition costs $20, with all proceeds after expenses going to a digital literacy charity.</p>
    <div class="actions">${routeLink('#/book/', 'Read the book')}</div></section>
    <section class="rule"><h2>Make people easy to find</h2>
    <p>Browse by location, specialty, and interest. Each member chooses what to share and where to send a reader next.</p>
    <div class="actions">${routeLink('#/members/', 'Find members', true)}</div></section>
    <section class="rule"><h2>Give good ideas airtime</h2>
    <p>Pitch a timed walkthrough with a concrete example, apply for a short interview, or bring a perspective to a topic the show is already covering. Selected conversations can reach people beyond the live audience through recordings and short clips.</p>
    <div class="actions">${routeLink('#/live/apply/?format=segment', 'Pitch a segment', true)}${routeLink('#/live/apply/?format=short', 'Apply for a short contribution', true)}</div></section>
  </div>`;
}

function applyPage(params) {
  const short = params.get('format') === 'short';
  return `<div class="narrow">
    ${back('#/live/', 'Live')}
    ${title('Contribute to a session', 'Tell the hosts what you’d share and what viewers would get out of it.')}
    <form class="pitch" id="pitch">
      <label>Contribution format<select name="format"><option${short ? '' : ' selected'}>Programmed segment</option><option${short ? ' selected' : ''}>Short interview or topic contribution</option></select></label>
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
  </div>`;
}

function bindApplication() {
  document.querySelector('#pitch').addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    ['format', 'topic', 'example', 'takeaway'].forEach(field => {
      document.querySelector(`#pitch-${field}`).textContent = fields.get(field).trim();
    });
    const preview = document.querySelector('#pitch-preview');
    preview.hidden = false;
    preview.querySelector('h2').focus();
  });
}

function bindLive() {
  const play = document.querySelector('#play');
  play.addEventListener('click', () => {
    const playing = play.getAttribute('aria-pressed') === 'true';
    play.setAttribute('aria-pressed', String(!playing));
    play.textContent = playing ? 'Play demo' : 'Pause demo';
    document.querySelector('#player-caption').textContent = playing ? 'Big Tech Club Live' : 'Problem brief · 00:00';
  });
  document.querySelector('#chat-form').addEventListener('submit', event => {
    event.preventDefault();
    const field = event.currentTarget.elements.message;
    const message = field.value.trim();
    if (!message) return;
    const list = document.querySelector('#chat');
    const item = document.createElement('li');
    item.textContent = `You (demo): ${message}`;
    list.append(item);
    list.scrollTop = list.scrollHeight;
    field.value = '';
  });
}

function bindDirectory(params) {
  const filter = document.querySelector('#filters');
  const count = document.querySelector('#member-count');
  const results = document.querySelector('#member-results');
  ['place', 'specialty', 'interest'].forEach(name => {
    const select = filter.elements[name];
    const value = params.get(name);
    if ([...select.options].some(option => option.value === value)) select.value = value;
  });
  function update() {
    const { place, specialty, interest } = Object.fromEntries(new FormData(filter));
    const matches = members.filter(member =>
      (!place || member.city === place || member.region === place) &&
      (!specialty || member.specialty === specialty) &&
      (!interest || member.interest === interest));
    count.textContent = `${matches.length} ${matches.length === 1 ? 'member' : 'members'}`;
    results.innerHTML = matches.length
      ? memberCards(matches)
      : '<p class="callout">No members match these filters. Try a wider region or reset your filters.</p>';
    const search = new URLSearchParams();
    Object.entries({ place, specialty, interest }).forEach(([key, value]) => {
      if (value) search.set(key, value);
    });
    if (search.size) {
      results.querySelectorAll('h3 a').forEach(link => {
        link.hash += `?${search}`;
      });
    }
    history.replaceState(null, '', search.size ? `#/members/?${search}` : '#/members/');
  }
  filter.addEventListener('change', update);
  filter.addEventListener('reset', () => queueMicrotask(update));
  update();
}

function bindQuiz(chapter) {
  const root = document.querySelector('#quiz');
  const questions = quizzes[chapter.slug];
  let index = 0;
  let score = 0;
  function showQuestion(moveFocus = false) {
    if (index === questions.length) {
      root.innerHTML = `<h3 tabindex="-1">${score} of ${questions.length} correct</h3>
        <div class="actions"><button type="button" class="button secondary">Try again</button></div>`;
      root.querySelector('h3').focus();
      root.querySelector('button').addEventListener('click', () => {
        index = 0;
        score = 0;
        showQuestion(true);
      });
      return;
    }
    const [prompt, correct, distractor, rationale] = questions[index];
    const choices = index % 2 ? [distractor, correct] : [correct, distractor];
    root.innerHTML = `<form>
      <p class="eyebrow" tabindex="-1">Question ${index + 1} of ${questions.length}</p>
      <fieldset><legend>${prompt}</legend>
        ${choices.map((choice, id) => `<label><input required name="answer" type="radio" value="${id}">${choice}</label>`).join('')}
      </fieldset>
      <p class="quiz-output" role="status"></p>
      <div class="actions"><button type="submit" class="button">Check answer</button>
        <button type="button" class="button secondary" hidden>${index + 1 === questions.length ? 'See results' : 'Next question'}</button></div>
    </form>`;
    if (moveFocus) root.querySelector('.eyebrow').focus();
    const form = root.querySelector('form');
    const next = form.querySelector('[type="button"]');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const value = new FormData(form).get('answer');
      if (value === null) return;
      const isCorrect = choices[Number(value)] === correct;
      if (isCorrect) score++;
      form.querySelector('fieldset').disabled = true;
      form.querySelector('[type="submit"]').hidden = true;
      form.querySelector('.quiz-output').textContent = `${isCorrect ? 'Correct.' : 'Review this one.'} ${rationale}`;
      next.hidden = false;
      next.focus();
    });
    next.addEventListener('click', () => {
      index++;
      showQuestion(true);
    });
  }
  showQuestion();
}

let renderedPath;

function focusSection(params) {
  const section = document.getElementById(params.get('section'));
  if (section && main.contains(section)) {
    section.scrollIntoView();
    section.focus({ preventScroll: true });
    return true;
  }
  return false;
}

function render(moveFocus = false) {
  const [path, search] = (location.hash.slice(1) || '/').split('?');
  const params = new URLSearchParams(search);
  const chapter = chapters.find(entry => chapterPath(entry) === `#${path}`);
  const member = members.find(entry => profilePath(entry) === `#${path}`);
  if (path === renderedPath && (chapter || path === '/book/')) {
    if (!focusSection(params)) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
    return;
  }
  renderedPath = path;
  const pages = new Map([
    ['/', home], ['/book/', book], ['/book/landscape/', landscape], ['/book/print/', printEdition],
    ['/members/', directory], ['/live/', live], ['/live/apply/', applyPage], ['/mission/', mission]
  ]);
  const missingPage = () => `${title('Page unavailable', 'Open the book or browse the member directory.')}
    <div class="actions">${routeLink('#/', 'Go to the homepage')}</div>`;
  const view = pages.get(path) || missingPage;
  main.innerHTML = chapter ? chapterPage(chapter) : member ? memberPage(member, params) : view(params);
  document.title = path === '/' ? 'Big Tech Club' : `${main.querySelector('h1').textContent} · Big Tech Club`;
  document.querySelectorAll('.mast nav a').forEach(link => {
    link.removeAttribute('aria-current');
    const rootPath = link.hash.slice(1);
    if (path.startsWith(rootPath)) link.setAttribute('aria-current', path === rootPath ? 'page' : 'true');
  });
  redrawMaps();
  if (chapter) bindQuiz(chapter);
  if (path === '/members/') bindDirectory(params);
  if (path === '/live/') bindLive();
  if (path === '/live/apply/') bindApplication();
  if (!focusSection(params) && moveFocus) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
}
function bindTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector('#theme-toggle');
  const storageKey = 'bigtechclub-theme';
  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  } catch {
    // The switch still works for the current page when storage is unavailable.
  }
  toggle.checked = root.dataset.theme === 'dark';
  toggle.addEventListener('change', () => {
    const theme = toggle.checked ? 'dark' : 'light';
    root.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Keep the current theme even if the preference cannot be saved.
    }
  });
  toggle.closest('label').hidden = false;
}

document.querySelector('#skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange', () => render(true));
bindTheme();
new MutationObserver(redrawMaps).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});
render();
