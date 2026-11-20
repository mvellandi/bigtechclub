import { useState } from 'react';
import { CalendarDays, MessageSquare, Play, Radio, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@ui-sdk/react/tabs';
import { ErrorState, LoadingGrid, PageIntro } from '@/components/page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

function Program({ entries }) {
  return <ol className="schedule">{entries.map((entry) => <li key={entry.time}><time>{entry.time}</time><span>{entry.title}</span></li>)}</ol>;
}

function DemoPlayer({ title = 'Big Tech Club Live' }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="player">
      <div>
        <Video aria-hidden="true" />
        <h2>{playing ? 'Problem brief · 00:00' : title}</h2>
        <p>{playing ? 'The demo player is running.' : 'Prototype player · No media is streamed.'}</p>
        <Button variant="outline" aria-pressed={playing} onClick={() => setPlaying((value) => !value)}><Play aria-hidden="true" />{playing ? 'Pause demo' : 'Play demo'}</Button>
      </div>
    </div>
  );
}

function LiveChat({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  function postMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const field = form.elements.message;
    const message = field.value.trim();
    if (!message) return;
    setMessages((entries) => [...entries, { author: 'You (demo)', message }]);
    form.reset();
  }

  return (
    <section className="section rule">
      <div className="section-heading"><div><p className="eyebrow">Local demo</p><h2>Chat</h2></div><MessageSquare aria-hidden="true" /></div>
      <ul className="chat" aria-live="polite" aria-relevant="additions">{messages.map((entry, index) => <li key={`${entry.author}-${index}`}><strong>{entry.author}:</strong> {entry.message}</li>)}</ul>
      <form className="chat-form" onSubmit={postMessage}>
        <div className="field"><label htmlFor="chat-message">Your demo message</label><Input id="chat-message" name="message" required maxLength={240} autoComplete="off" placeholder="Add a question or observation" /></div>
        <Button type="submit" variant="secondary">Post locally</Button>
      </form>
    </section>
  );
}

export function LivePage() {
  usePageTitle('Live program');
  const { status, data: program, retry } = useData(dataSource.getProgram);
  const [recording, setRecording] = useState(null);

  if (status === 'loading') return <LoadingGrid label="Loading the live program" />;
  if (status === 'error') return <ErrorState retry={retry} />;

  return (
    <>
      <PageIntro eyebrow="Big Tech Club Live" title="Bring a question. See the work." intro="Demos, practical interviews, and considered conversations about AI engineering. All sessions in this prototype are simulated." />
      <Tabs defaultValue="live">
        <TabsList className="tabs-list" aria-label="Program states">
          <TabsTab className="tabs-tab" value="live">Live</TabsTab>
          <TabsTab className="tabs-tab" value="upcoming">Upcoming</TabsTab>
          <TabsTab className="tabs-tab" value="archive">Archive</TabsTab>
        </TabsList>
        <TabsPanel className="tabs-panel" value="live">
          <section>
            <div className="cluster"><Badge variant="secondary"><Radio aria-hidden="true" /> {program.live.eyebrow}</Badge><span className="fine">{program.live.date}</span></div>
            <h2 className="section">{program.live.title}</h2>
            <p className="intro">{program.live.description}</p>
            <DemoPlayer />
            <LiveChat initialMessages={program.live.chat} />
            <section className="section rule"><p className="eyebrow">Run of show</p><h2>Program</h2><Program entries={program.live.program} /></section>
          </section>
        </TabsPanel>
        <TabsPanel className="tabs-panel" value="upcoming">
          <section>
            <div className="cluster"><Badge><CalendarDays aria-hidden="true" /> Upcoming</Badge><span className="fine">{program.upcoming.date}</span></div>
            <h2 className="section">{program.upcoming.title}</h2>
            <p className="intro">{program.upcoming.description}</p>
            <div className="actions"><Button asChild><Link to="/live/apply?format=segment">Pitch a segment</Link></Button><Button asChild variant="outline"><Link to="/live/apply?format=short">Apply for a short contribution</Link></Button></div>
            <section className="section rule"><p className="eyebrow">Planned run of show</p><h2>Program</h2><Program entries={program.upcoming.program} /></section>
          </section>
        </TabsPanel>
        <TabsPanel className="tabs-panel" value="archive">
          <section>
            <p className="eyebrow">Past field notes</p><h2>Session archive</h2>
            {recording && <DemoPlayer key={recording.slug} title={recording.title} />}
            <div className="archive-list section">{program.archive.map((item) => (
              <article className="archive-item" key={item.slug}>
                <div><h3>{item.title}</h3><p className="fine">{item.guest} · {item.date} · {item.duration}</p></div>
                <Button variant="outline" size="sm" onClick={() => setRecording(item)}><Play aria-hidden="true" />Play recording</Button>
              </article>
            ))}</div>
          </section>
        </TabsPanel>
      </Tabs>
    </>
  );
}
