import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const get: APIRoute = async (context) => {
  const posts = await getCollection("blog");
  return rss({
    title: "Matvey's Blog",
    description: "A blog about web development",
    site: context.site?.toString() as string,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.slug}/`,
    })),
  });
};
