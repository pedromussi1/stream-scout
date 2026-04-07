export function Footer() {
  return (
    <footer className="mt-auto py-6 text-center text-xs text-muted border-t border-border">
      <p>
        Movie data provided by{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent transition-colors"
        >
          TMDB
        </a>
        . Streaming availability powered by{" "}
        <a
          href="https://www.justwatch.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent transition-colors"
        >
          JustWatch
        </a>
        .
      </p>
    </footer>
  );
}
