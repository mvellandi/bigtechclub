import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BackLink, PageIntro } from '@/components/page';
import { SelectField } from '@/components/select-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePageTitle } from '@/hooks/use-page-title';

const formats = [
  { value: 'segment', label: 'Programmed segment' },
  { value: 'short', label: 'Short interview or topic contribution' }
];

export function ContributePage() {
  usePageTitle('Contribute to a session');
  const [searchParams] = useSearchParams();
  const [format, setFormat] = useState(searchParams.get('format') === 'short' ? 'short' : 'segment');
  const [preview, setPreview] = useState(null);
  const previewHeading = useRef(null);

  function showPreview(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setPreview({
      format: formats.find((item) => item.value === format)?.label,
      topic: fields.get('topic').trim(),
      example: fields.get('example').trim(),
      takeaway: fields.get('takeaway').trim()
    });
    requestAnimationFrame(() => previewHeading.current?.focus());
  }

  return (
    <div className="narrow">
      <BackLink to="/live">Live program</BackLink>
      <PageIntro eyebrow="Bring a useful example" title="Contribute to a session" intro="Tell the hosts what you would share and what viewers would learn. This prototype creates a local preview and sends nothing." />
      <form className="pitch-form" onSubmit={showPreview}>
        <SelectField label="Contribution format" name="format" value={format} onChange={setFormat} options={formats} />
        <div className="field"><label htmlFor="topic">Working title</label><Input id="topic" name="topic" required maxLength={100} placeholder="A clear, specific session title" /></div>
        <div className="field"><label htmlFor="example">What example would you bring?</label><Textarea id="example" name="example" rows={4} maxLength={500} required placeholder="Describe the workflow, code, evaluation, or incident you would show." /></div>
        <div className="field"><label htmlFor="takeaway">What should viewers take away?</label><Textarea id="takeaway" name="takeaway" rows={4} maxLength={500} required placeholder="Name the practical outcome for the audience." /></div>
        <div><Button type="submit">Preview application</Button></div>
        <p className="fine">Your application stays in this browser view. No data is transmitted.</p>
      </form>
      {preview && (
        <section className="section rule" aria-labelledby="preview-heading">
          <p className="eyebrow">{preview.format}</p>
          <h2 id="preview-heading" ref={previewHeading} tabIndex={-1}>{preview.topic}</h2>
          <h3>Example</h3><p className="intro pitch-preview">{preview.example}</p>
          <h3>Audience takeaway</h3><p className="intro pitch-preview">{preview.takeaway}</p>
        </section>
      )}
    </div>
  );
}
