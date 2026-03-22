import { formatDistanceToNow } from "date-fns";
import type { BuildLog } from "@/lib/supabase";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-indigo-600",
    "bg-violet-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-amber-600",
    "bg-sky-600",
    "bg-emerald-600",
    "bg-rose-600",
  ];
  const index =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

export default function BuildCard({ log }: { log: BuildLog }) {
  const initials = getInitials(log.name);
  const avatarColor = getAvatarColor(log.name);
  const timeAgo = formatDistanceToNow(new Date(log.created_at), {
    addSuffix: true,
  });

  return (
    <article className="bg-[#ede8de] border border-[#d6cfc2] rounded-xl p-5 flex gap-4 hover:border-[#c4bdb0] transition-colors">
      {/* Avatar */}
      <div
        className={`${avatarColor} flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold`}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#2a2a2a] text-sm">{log.name}</span>
          <span className="text-[#8a8070] text-xs">{timeAgo}</span>
        </div>

        <p className="text-[#4a4540] text-sm leading-relaxed">{log.description}</p>

        {log.project_link && (
          <a
            href={log.project_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#7a6f5a] hover:text-[#2a2a2a] text-xs font-medium mt-1 transition-colors group"
          >
            View Project
            <svg
              className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
