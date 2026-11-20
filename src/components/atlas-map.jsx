import { useId } from 'react';
import { Link } from 'react-router-dom';

const islands = [
  { slug: 'frame', d: 'M-78 285 Q-35 220 43 231 Q52 165 127 163 Q158 192 188 174 Q226 185 278 206 Q320 239 282 270 Q319 302 270 330 Q231 324 214 369 Q153 399 106 361 Q35 389-32 356 Q-62 330-78 285Z' },
  { slug: 'ground', d: 'M235 130 Q260 87 331 92 Q341 52 400 49 Q459 66 474 123 Q529 139 523 192 Q492 208 474 244 Q431 287 382 256 Q338 290 321 243 Q283 224 310 190 Q265 181 266 176 Q233 159 235 130Z' },
  { slug: 'workflow', d: 'M425 329 Q430 286 476 271 Q498 226 553 247 Q587 218 641 244 Q663 281 682 327 Q670 371 612 381 Q579 423 525 412 Q493 382 447 384 Q421 362 425 329Z' },
  { slug: 'evaluate', d: 'M541 120 Q568 88 605 48 Q630 54 653 15 Q704-7 744 21 Q797 20 808 73 Q786 108 818 147 Q795 193 744 190 Q727 232 671 220 Q624 204 584 205 Q560 171 572 165 Q540 151 541 120Z' },
  { slug: 'operate', d: 'M787 218 Q819 190 832 160 Q851 124 912 149 Q946 120 986 148 Q1011 177 1041 202 Q1061 250 1013 273 Q973 259 950 296 Q906 290 872 294 Q836 276 840 268 Q799 259 787 218Z' }
];

const terrain = [
  { x: 140, y: 250, rx: 135, ry: 91 },
  { x: 395, y: 145, rx: 115, ry: 98 },
  { x: 557, y: 326, rx: 96, ry: 70 },
  { x: 684, y: 114, rx: 113, ry: 87 },
  { x: 934, y: 204, rx: 95, ry: 65 }
];

export function AtlasMap({ chapters, activeChapter, interactive = false, cover = false }) {
  const id = useId().replaceAll(':', '');
  const viewBox = activeChapter ? `${activeChapter.x - 180} ${activeChapter.y - 100} 360 240` : '0 0 1000 430';
  const titleId = `${id}-title`;

  return (
    <figure className="map">
      <div className="map-art">
        <svg viewBox={viewBox} role="img" aria-labelledby={titleId} preserveAspectRatio={cover ? 'xMidYMid slice' : 'xMidYMid meet'}>
          <title id={titleId}>{activeChapter ? `Map of ${activeChapter.region}` : 'AI Engineering Atlas with five chapter regions'}</title>
          <defs>
            <pattern id={`${id}-grid`} width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M34 0H0V34" className="map-grid" fill="none" />
            </pattern>
            {islands.map((island, index) => (
              <clipPath id={`${id}-clip-${index}`} key={island.slug}><path d={island.d} /></clipPath>
            ))}
          </defs>
          <rect x="-300" y="-300" width="1600" height="1100" fill="var(--map-water)" />
          <rect x="-300" y="-300" width="1600" height="1100" fill={`url(#${id}-grid)`} />
          {islands.map((island, index) => {
            const area = terrain[index];
            return (
              <g key={island.slug}>
                <path d={island.d} className="map-island" fill={`var(--map-${island.slug})`} />
                <g clipPath={`url(#${id}-clip-${index})`}>
                  {[0.35, 0.55, 0.75, 0.95].map((scale) => (
                    <ellipse key={scale} cx={area.x} cy={area.y} rx={area.rx * scale} ry={area.ry * scale} className="map-contour" />
                  ))}
                </g>
              </g>
            );
          })}
          <polyline points={chapters.map((chapter) => `${chapter.x},${chapter.y}`).join(' ')} className="map-route" />
          {chapters.map((chapter) => <circle key={chapter.slug} cx={chapter.x} cy={chapter.y} r="5" className="map-route-dot" />)}
          {!activeChapter && <><text x="35" y="46" className="map-compass">N ↑</text><text x="320" y="407" className="map-label">The Open Sea</text></>}
          {activeChapter && <><circle cx={activeChapter.x} cy={activeChapter.y} r="16" fill="var(--map-pin)" stroke="var(--highlight)" strokeWidth="4" /><text x={activeChapter.x - 155} y={activeChapter.y - 70} className="map-compass">N ↑</text></>}
        </svg>
        {interactive && chapters.map((chapter, index) => (
          <Link
            key={chapter.slug}
            className="map-pin"
            to={`/book/${chapter.slug}`}
            aria-label={`Chapter ${index + 1}: ${chapter.title}`}
            style={{ left: `${chapter.x / 10}%`, top: `${chapter.y / 4.3}%` }}
          >
            {index + 1}
          </Link>
        ))}
      </div>
      <figcaption>{activeChapter ? `Regional map · ${activeChapter.region}` : 'Five regions. One route from idea to production.'}</figcaption>
    </figure>
  );
}
