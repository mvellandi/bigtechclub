import React from 'react';
import { render, toPlainText } from 'react-email';
import type { Plugin } from 'vite';
import { ChapterAnnouncement } from './chapter-announcement.tsx';
import { announcement, subject } from './fixture.ts';

async function exportMessage() {
  const html = await render(<ChapterAnnouncement {...announcement} />);
  return [
    { name: 'index.html', type: 'text/html', body: html },
    { name: 'chapter-announcement.txt', type: 'text/plain', body: toPlainText(html) + '\n' },
    { name: 'message.json', type: 'application/json', body: JSON.stringify({ subject, preheader: announcement.preheader }, null, 2) + '\n' },
  ];
}

export function emailExports(): Plugin {
  return {
    name: 'chapter-announcement',
    async configureServer(server) {
      const files = await exportMessage();
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0];
        const file = files.find(file => path === '/email/' + file.name || (file.name === 'index.html' && path === '/email/'));
        if (!file) return next();
        response.setHeader('Content-Type', file.type + '; charset=utf-8');
        response.end(file.body);
      });
    },
    async generateBundle() {
      for (const file of await exportMessage()) {
        this.emitFile({ type: 'asset', fileName: 'email/' + file.name, source: file.body });
      }
    },
  };
}
