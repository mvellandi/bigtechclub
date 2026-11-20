export function BookLoading({ label }: { label: string }) {
  return <p className="rr-loading" role="status">{label}…</p>;
}

export function BookError({ retry }: { retry: () => void }) {
  return (
    <div className="rr-message" role="alert">
      <p className="rr-overline">Reading Room</p>
      <h1>The book could not be opened.</h1>
      <p>Check the connection and try the request again.</p>
      <button className="rr-retry" type="button" onClick={retry}>Try again</button>
    </div>
  );
}
