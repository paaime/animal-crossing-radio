export type BlogBlock =
    | {
        type: 'title' | 'paragraph' | 'subtitle' | 'subparagraph';
        content: string;
    }
    | { type: 'image'; src: string; alt?: string };

export interface IBlog {
    title: string;
    description: string;
    meta: string;
    tags: string[];
    date: string;
    cover: string;
    content: BlogBlock[];
    slug: string;
}
