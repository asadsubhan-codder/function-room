import { useState, useEffect } from "react";
import { type Link, type Video } from "./curriculum";
import { status, type Progress } from "./progress";
export function Status({ state, id }: { state: Progress; id: string }) {
  const label = status(state, id);
  return (
    <span
      className={
        "status " +
        (label === "Retained"
          ? "retained"
          : label === "Check passed"
            ? "passed"
            : label === "In progress"
              ? "started"
              : "")
      }
    >
      {label === "Retained" ? "✓ " : ""}
      {label}
    </span>
  );
}
export function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}
export function Resources({ links }: { links: Link[] }) {
  return (
    <div className="resource-list">
      {links.map((r, i) => (
        <External href={r.url} className="resource-link" key={r.url + i}>
          <span>
            <strong>{r.label}</strong>
            <small>
              {new URL(r.url).hostname}
              {/\.docx?($|#)/.test(r.url)
                ? " · Word document"
                : /\.pdf($|#)/.test(r.url)
                  ? " · PDF"
                  : ""}
            </small>
          </span>
        </External>
      ))}
    </div>
  );
}
export function Timer() {
  const [remaining, R] = useState(1500),
    [end, E] = useState<number | null>(null);
  useEffect(() => {
    if (!end) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      R(left);
      if (!left) E(null);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [end]);
  return (
    <div className="focus-timer">
      <span aria-hidden="true">◷</span>
      <span className="timer-value" aria-label="Focus time remaining">
        {String(Math.floor(remaining / 60)).padStart(2, "0")}:
        {String(remaining % 60).padStart(2, "0")}
      </span>
      <button
        aria-label={end ? "Pause focus timer" : "Start focus timer"}
        onClick={() =>
          end ? E(null) : E(Date.now() + (remaining || 1500) * 1000)
        }
      >
        {end ? "Pause" : "Focus"}
      </button>
      <button
        className="timer-reset"
        aria-label="Reset focus timer"
        onClick={() => {
          E(null);
          R(1500);
        }}
      >
        ↺
      </button>
      {remaining === 0 && (
        <span className="sr-only" role="status">
          Focus session complete. Take a break.
        </span>
      )}
    </div>
  );
}
export function VideoPlayer({ video }: { video: Video }) {
  const [play, P] = useState(false);
  return (
    <div className="video-player">
      {play && video.type === "youtube" ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : play && video.type === "video" ? (
        <video
          controls
          autoPlay
          playsInline
          preload="metadata"
          src={video.url}
          aria-label={video.title}
        >
          Open the direct source link below if playback fails.
        </video>
      ) : (
        <div className="video-poster">
          {video.type === "youtube" && (
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
            />
          )}
          <div className="poster-shade" />
          <div className="poster-content">
            <span className="eyebrow">{video.provider}</span>
            {video.type === "course" ? (
              <>
                <h3>{video.title}</h3>
                <External className="button light" href={video.url}>
                  Open guided video lesson
                </External>
              </>
            ) : (
              <>
                <button
                  className="play-button"
                  aria-label={`Play ${video.title}`}
                  onClick={() => P(true)}
                >
                  ▶
                </button>
                <span className="poster-title">{video.title}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
