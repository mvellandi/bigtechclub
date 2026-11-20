import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Heart, Link as LinkIcon, Pin, Radio } from 'lucide-react';
import type { Profile } from '../../data-source';
import './live-desk.css';

function Avatar({ small = false }: { small?: boolean }) {
  return <span className={small ? 'ld-avatar ld-avatar-small' : 'ld-avatar'} aria-hidden="true">bc<span>.</span></span>;
}

function Post({ post, profile, latest = false }: { post: Profile['posts'][number]; profile: Profile; latest?: boolean }) {
  const [liked, setLiked] = useState(false);
  const date = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  return (
    <article className={latest ? 'ld-post ld-latest' : 'ld-post'} aria-labelledby={`post-${post.id}`}>
      {latest && <p className="ld-latest-label"><Radio size={15} aria-hidden="true" /> Latest update</p>}
      {!latest && post.pinned && <p className="ld-pinned"><Pin size={14} aria-hidden="true" /> Pinned post</p>}
      <div className="ld-post-layout">
        <Avatar small />
        <div className="ld-post-body">
          <div className="ld-byline">
            <strong id={`post-${post.id}`}>{profile.name}</strong>
            <span>{profile.handle} · <time dateTime={post.date}>{date.format(new Date(post.date))}</time></span>
          </div>
          <p className="ld-post-text">{post.text}</p>
          <a className="ld-resource" href={post.link}>
            <span>{post.label}</span><ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <button className="ld-like" aria-label={`Like ${latest ? 'latest update' : 'post'}`} aria-pressed={liked} onClick={() => setLiked(!liked)}>
            <Heart size={17} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" /> {post.likes + Number(liked)}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function LiveDesk({ profile }: { profile: Profile }) {
  const [following, setFollowing] = useState(false);
  const session = profile.session;
  if (!session) throw new Error('Live Desk requires session data');

  const posts = [...profile.posts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const [latest, ...earlier] = posts;
  const complete = session.state === 'recap';

  return (
    <div className="live-desk">
      <main>
        <header className="ld-header">
          <a className="ld-back" href="../" aria-label={import.meta.env.DEV ? 'Back to workspace' : 'Return to Big Tech Club'}>
            <ArrowLeft size={19} aria-hidden="true" />{import.meta.env.DEV ? 'Workspace' : 'Big Tech Club'}
          </a>
          <div className="ld-channel"><Radio size={18} aria-hidden="true" /><span><strong>Live desk</strong><small>Twitter profile</small></span></div>
        </header>

        <section className={`ld-session ld-session-${session.state}`} aria-labelledby="session-topic">
          <div className="ld-session-meta">
            <span className="ld-status">{complete ? <Check size={15} aria-hidden="true" /> : <Radio size={15} aria-hidden="true" />}{session.label}</span>
            <span>AI engineering · Session 014</span>
          </div>
          <h2 id="session-topic">{session.topic}</h2>
          <p>{session.summary}</p>
          <span className="ld-session-index" aria-hidden="true">BTC / LIVE—014</span>
        </section>

        <section className="ld-identity" aria-labelledby="profile-name">
          <div className="ld-profile-actions">
            <Avatar />
            <button className="ld-follow" aria-label="Follow Big Tech Club" aria-pressed={following} onClick={() => setFollowing(!following)}>
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
          <h1 id="profile-name">{profile.name}</h1>
          <span className="ld-handle">{profile.handle}</span>
          <p>{profile.bio}</p>
          <div className="ld-profile-links">
            <a href="../club-web/"><LinkIcon size={15} aria-hidden="true" /> Club website</a>
            <span><strong>{profile.followers + Number(following)}</strong> followers</span>
          </div>
        </section>

        <section className="ld-feed" aria-labelledby="session-updates">
          <div className="ld-feed-heading"><h2 id="session-updates">Session updates</h2><span>{posts.length} posts</span></div>
          {latest && <Post post={latest} profile={profile} latest />}
          {earlier.length > 0 && <h3 className="ld-earlier">Earlier in the session</h3>}
          {earlier.map(post => <Post key={post.id} post={post} profile={profile} />)}
        </section>
      </main>
    </div>
  );
}
