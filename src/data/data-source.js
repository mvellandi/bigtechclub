import book from './fixtures/book.json';
import members from './fixtures/members.json';
import program from './fixtures/program.json';

const latency = 140;

function respond(value, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(structuredClone(value)), latency);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('The request was aborted.', 'AbortError'));
    }, { once: true });
  });
}

export const dataSource = Object.freeze({
  getHome({ signal } = {}) {
    return respond({ book, members: members.slice(0, 3), program }, signal);
  },
  getBook({ signal } = {}) {
    return respond(book, signal);
  },
  getMembers({ signal } = {}) {
    return respond(members, signal);
  },
  async getMember(slug, { signal } = {}) {
    const entries = await respond(members, signal);
    return entries.find((member) => member.slug === slug) ?? null;
  },
  getProgram({ signal } = {}) {
    return respond(program, signal);
  }
});
