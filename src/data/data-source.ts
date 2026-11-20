import book from './fixtures/book.json';
import members from './fixtures/members.json';
import program from './fixtures/program.json';

const latency = 140;
interface DataOptions {
  signal?: AbortSignal;
}

function respond<T>(value: T, signal?: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(structuredClone(value)), latency);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('The request was aborted.', 'AbortError'));
    }, { once: true });
  });
}

export const dataSource = Object.freeze({
  getHome({ signal }: DataOptions = {}) {
    return respond({ book, members: members.slice(0, 3), program }, signal);
  },
  getBook({ signal }: DataOptions = {}) {
    return respond(book, signal);
  },
  getMembers({ signal }: DataOptions = {}) {
    return respond(members, signal);
  },
  async getMember(slug: string, { signal }: DataOptions = {}) {
    const entries = await respond(members, signal);
    return entries.find((member) => member.slug === slug) ?? null;
  },
  getProgram({ signal }: DataOptions = {}) {
    return respond(program, signal);
  }
});
