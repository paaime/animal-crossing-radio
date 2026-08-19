export default function TagList({
  tags,
  className = '',
}: {
  tags: string[];
  className?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="relative inline-block">
          <span
            aria-hidden
            className="absolute inset-x-[-4px] bottom-px h-2 rounded-full bg-[#FFCC00]"
          />
          <span className="relative text-xs font-medium text-[#775B46]">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
