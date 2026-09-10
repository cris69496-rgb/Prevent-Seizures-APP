import { useState } from "react";
import { PlayCircle } from "lucide-react";

type Props = {
  youtubeId: string;
  title: string;
  className?: string;
};

/**
 * Fachada ligera: primero muestra la miniatura y solo carga el reproductor
 * de YouTube cuando la persona pulsa play (mejor rendimiento en móvil).
 */
export function YouTubeEmbed({ youtubeId, title, className = "" }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className={`aspect-video w-full bg-black ${className}`}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&hl=es`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Reproducir video: ${title}`}
      className={`relative block aspect-video w-full overflow-hidden bg-black ${className}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/20">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-[var(--shadow-soft)]">
          <PlayCircle className="h-9 w-9 text-brand" />
        </span>
      </span>
    </button>
  );
}
