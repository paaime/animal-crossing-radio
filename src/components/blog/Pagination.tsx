import Link from 'next/link';

function pageHref(page: number): string {
  return page <= 1 ? '/blog' : `/blog?page=${page}`;
}

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const linkClass = 'custom-pointer text-sm text-[#775B46] hover:underline';
  const disabledClass = 'text-sm text-[#a29886]';

  return (
    <nav
      aria-label="Blog pages"
      className="mt-10 flex items-center justify-between"
    >
      {page > 1 ? (
        <Link href={pageHref(page - 1)} rel="prev" className={linkClass}>
          ← Previous
        </Link>
      ) : (
        <span className={disabledClass}>← Previous</span>
      )}

      <p className="text-sm text-[#7a6f61]">
        Page {page} of {totalPages}
      </p>

      {page < totalPages ? (
        <Link href={pageHref(page + 1)} rel="next" className={linkClass}>
          Next →
        </Link>
      ) : (
        <span className={disabledClass}>Next →</span>
      )}
    </nav>
  );
}
