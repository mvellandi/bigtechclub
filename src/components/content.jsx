import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function MemberCard({ member, search = '' }) {
  return (
    <Card className="member-card">
      <CardHeader>
        <div className="member-top">
          <span className="avatar" aria-hidden="true">{member.initials}</span>
          <Badge>{member.specialty}</Badge>
        </div>
        <CardTitle><Link to={`/members/${member.slug}${search}`}>{member.name}</Link></CardTitle>
        <CardDescription>{member.interest}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="member-focus">{member.focus}</p>
      </CardContent>
      <div className="card-footer member-place">
        <MapPin aria-hidden="true" />{member.city} · {member.region}
      </div>
    </Card>
  );
}

export function ChapterList({ chapters }) {
  return (
    <ol className="chapter-list">
      {chapters.map((chapter, index) => (
        <li key={chapter.slug}>
          <Link to={`/book/${chapter.slug}`}>
            <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
            <span><strong>{chapter.title}</strong><small>{chapter.region}</small></span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
