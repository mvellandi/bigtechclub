import React from 'react';
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'react-email';

export interface ChapterAnnouncementProps {
  bookTitle: string;
  chapterTitle: string;
  chapterNumber: number;
  chapterUrl: string;
  preheader: string;
  excerpt: { heading: string; text: string };
}

export function ChapterAnnouncement(props: ChapterAnnouncementProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.chapterTitle + ' · Big Tech Club'}</title>
      </Head>
      <Preview useTitleTag={false}>{props.preheader}</Preview>
      <Body style={{ backgroundColor: '#f5f2e9', margin: 0, fontFamily: 'Arial, sans-serif', color: '#233c34' }}>
        <Container style={{ maxWidth: 560, margin: '0 auto', backgroundColor: '#fffdf6' }}>
          <Section style={{ backgroundColor: '#214237', padding: '20px 28px', color: '#fffdf6' }}>
            <Text style={{ margin: 0, fontSize: 18, fontWeight: 'bold' }}>Big Tech Club</Text>
          </Section>
          <Section style={{ padding: '24px 28px 36px' }}>
            <Text style={{ fontSize: 14, color: '#526354' }}>{props.bookTitle} · Chapter {props.chapterNumber}</Text>
            <Heading as="h1" style={{ fontFamily: 'Georgia, serif', fontSize: 42, lineHeight: '1.1', margin: '18px 0' }}>{props.chapterTitle}</Heading>
            <Text style={{ fontSize: 20, lineHeight: '1.45' }}>{props.preheader}</Text>
            <Heading as="h2" style={{ fontFamily: 'Georgia, serif', fontSize: 23, margin: '28px 0 0' }}>{props.excerpt.heading}</Heading>
            <Text style={{ fontSize: 16, lineHeight: '1.6', margin: '8px 0 24px' }}>{props.excerpt.text}</Text>
            <Button href={props.chapterUrl} style={{ backgroundColor: '#214237', color: '#ffffff', padding: '14px 20px', fontWeight: 'bold' }}>
              Read chapter {props.chapterNumber}
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
