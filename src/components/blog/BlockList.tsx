export default function BlockList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}) {
  if (items.length === 0) return null;

  if (ordered) {
    return (
      <ol className="mt-4 space-y-2">
        {items.map((item, key) => (
          <li key={key} className="flex gap-3 leading-relaxed">
            <span className="shrink-0 font-medium tabular-nums text-[#775B46]">
              {key + 1}.
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, key) => (
        <li key={key} className="flex gap-3 leading-relaxed">
          <span
            aria-hidden
            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E2826A]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
