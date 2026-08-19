import Link from 'next/link';

export default function Callout({
  label,
  content,
  href,
  linkLabel,
}: {
  label?: string;
  content: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <aside className="relative mt-10 rounded-2xl bg-white/70 p-6">
      {label && (
        <span className="absolute -top-3 left-5 inline-block w-fit rotate-[-6deg] before:absolute before:-inset-1 before:block before:rounded-full before:bg-[#E2826A]">
          <span className="relative px-3 text-sm font-medium tracking-wide text-white">
            {label}
          </span>
        </span>
      )}
      <p className="mt-2 leading-relaxed">{content}</p>
      {href && (
        <Link
          href={href}
          className="custom-pointer mt-4 inline-block rounded-full bg-[#E2826A] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          {linkLabel ?? 'Find out more'}
        </Link>
      )}
    </aside>
  );
}
