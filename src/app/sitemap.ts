import { IBlog } from "@/types/Blog";
import { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const postEntries: MetadataRoute.Sitemap = blogs.map((blog: IBlog) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
            priority: 0.7,
            lastModified: new Date(blog.date).toISOString(),
        };
    });

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
            priority: 0.9,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/latest`,
            priority: 0.8,
        },
        ...postEntries,
    ]
}