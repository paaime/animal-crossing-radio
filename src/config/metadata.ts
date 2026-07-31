import type { Metadata } from 'next';
import { SITE_NAME, OG_IMAGE } from './site';

type OpenGraph = NonNullable<Metadata['openGraph']>;

interface IPageMetadata {
  title: string;
  description: string;
  path: string;
  openGraph?: Partial<OpenGraph>;
}

export function pageMetadata({
  title,
  description,
  path,
  openGraph,
}: IPageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      images: [OG_IMAGE],
      ...openGraph,
    } as OpenGraph,
  };
}
