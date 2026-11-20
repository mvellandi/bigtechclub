import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowUpRight, Heart, Link as LinkIcon, Pin } from 'lucide-react';
import { profileSource } from './data-source';
import './profile.css';

type Profile = Awaited<ReturnType<typeof profileSource.getProfile>>;

function Avatar() {
  return <span className="avatar" aria-hidden="true">bc<span>.</span></span>;
}

function Post({ post, profile }: { post: Profile['posts'][number]; profile: Profile }) {
  const [liked, setLiked] = useState(false);
  const date = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return (
    <article>
      {post.pinned && <small className="pin"><Pin size={14} /> Pinned post</small>}
      <div className="post">
        <Avatar />
        <div>
          <strong>{profile.name}</strong> <span className="muted">{profile.handle} · <time dateTime={post.date}>{date.format(new Date(post.date))}</time></span>
          <p>{post.text}</p>
          <a href={post.link}>{post.label} <ArrowUpRight size={14} /></a>
          <button className="like" aria-label="Like post" aria-pressed={liked} onClick={() => setLiked(!liked)}>
            <Heart size={17} fill={liked ? 'currentColor' : 'none'} /> {post.likes + Number(liked)}
          </button>
        </div>
      </div>
    </article>
  );
}

function ProfilePage({ profile }: { profile: Profile }) {
  const [following, setFollowing] = useState(false);
  return (
    <main>
      <header>
        <a href="../" aria-label="Return to Big Tech Club"><ArrowLeft /></a>
        <div><strong>Twitter profile</strong><small>Channel preview</small></div>
      </header>
      <div className="banner" aria-hidden="true"><span>Big Tech<br /><i>Club.</i></span></div>
      <section className="identity" aria-labelledby="profile-name">
        <div className="profile-actions">
          <Avatar />
          <button className="follow" aria-label="Follow Big Tech Club" aria-pressed={following} onClick={() => setFollowing(!following)}>
            {following ? 'Following' : 'Follow'}
          </button>
        </div>
        <h1 id="profile-name">{profile.name}</h1>
        <span className="muted">{profile.handle}</span>
        <p>{profile.bio}</p>
        <a href="../club-web/"><LinkIcon size={15} /> Club website</a>
        <p><strong>{profile.followers + Number(following)}</strong> <span className="muted">followers</span></p>
      </section>
      <section aria-labelledby="posts"><h2 id="posts">Posts</h2>
        {profile.posts.map(post => <Post key={post.id} post={post} profile={profile} />)}
      </section>
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);
profileSource.getProfile().then(profile => root.render(<ProfilePage profile={profile} />));
