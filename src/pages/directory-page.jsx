import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MemberCard } from '@/components/content';
import { EmptyState, ErrorState, LoadingGrid, PageIntro } from '@/components/page';
import { SelectField } from '@/components/select-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dataSource } from '@/data/data-source';
import { useData } from '@/hooks/use-data';
import { usePageTitle } from '@/hooks/use-page-title';

const anyOption = { value: 'all', label: 'Any' };

export function DirectoryPage() {
  usePageTitle('Member directory');
  const { status, data: members, retry } = useData(dataSource.getMembers);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = useMemo(() => {
    if (!members) return { place: [], specialty: [], interest: [] };
    const unique = (values) => [...new Set(values)].sort();
    return {
      place: [anyOption, ...unique([...members.map((member) => member.region), ...members.map((member) => member.city)]).map((value) => ({ value, label: value }))],
      specialty: [anyOption, ...unique(members.map((member) => member.specialty)).map((value) => ({ value, label: value }))],
      interest: [anyOption, ...unique(members.map((member) => member.interest)).map((value) => ({ value, label: value }))]
    };
  }, [members]);

  if (status === 'loading') return <LoadingGrid count={6} label="Loading members" />;
  if (status === 'error') return <ErrorState retry={retry} />;

  const filters = Object.fromEntries(Object.entries(options).map(([key, entries]) => {
    const value = searchParams.get(key);
    return [key, entries.some((entry) => entry.value === value) ? value : 'all'];
  }));
  const results = members.filter((member) =>
    (filters.place === 'all' || member.city === filters.place || member.region === filters.place) &&
    (filters.specialty === 'all' || member.specialty === filters.specialty) &&
    (filters.interest === 'all' || member.interest === filters.interest)
  );
  const active = Object.entries(filters).filter(([, value]) => value !== 'all');
  const search = active.length ? `?${new URLSearchParams(filters).toString()}` : '';

  function updateFilter(key, value) {
    const next = { ...filters, [key]: value || 'all' };
    Object.keys(next).forEach((name) => {
      if (next[name] === 'all') delete next[name];
    });
    setSearchParams(next, { replace: true });
  }

  return (
    <>
      <PageIntro eyebrow="People make the club" title="Member directory" intro="Find practitioners by where they are based, the work they do, and the subjects they want to explore." />
      <div className="filters" role="group" aria-label="Member filters">
        <SelectField label="Location or region" name="place" value={filters.place} onChange={(value) => updateFilter('place', value)} options={options.place} />
        <SelectField label="Specialty" name="specialty" value={filters.specialty} onChange={(value) => updateFilter('specialty', value)} options={options.specialty} />
        <SelectField label="Interest" name="interest" value={filters.interest} onChange={(value) => updateFilter('interest', value)} options={options.interest} />
        <Button variant="outline" onClick={() => setSearchParams({}, { replace: true })} disabled={!active.length}>Reset filters</Button>
      </div>
      <div className="results-meta">
        <p role="status"><strong>{results.length}</strong> {results.length === 1 ? 'member' : 'members'}</p>
        <div className="active-filters">{active.map(([key, value]) => <Badge key={key} variant="secondary">{value}</Badge>)}</div>
      </div>
      {results.length ? (
        <div className="member-grid">{results.map((member) => <MemberCard key={member.slug} member={member} search={search} />)}</div>
      ) : (
        <EmptyState title="No members on this trail">Try a wider region or remove one of the filters.<br /><Button variant="outline" onClick={() => setSearchParams({})}>Reset all filters</Button></EmptyState>
      )}
    </>
  );
}
