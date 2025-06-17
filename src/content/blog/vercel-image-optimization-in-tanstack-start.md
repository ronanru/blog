---
title: "How to set up Vercel Image Optimization in TanStack Start"
description: "Using Vercel Build Output API to add the <Image /> component to an unsupported framework"
pubDate: "2025-06-17"
image: "vercel-image-optimization-in-tanstack-start/main-image.webp"
imageAltText: 'TanStack start logo, Vercel logo at the top of the image. At the bottom of the image, HTML code `<img src="/image.jpeg" ...` being transformed to `<img src="/_vercel/image?url=%2Fimage.jpeg&...`'
---

While Vercel only provides packages with the `<Image />` component for Next.js, Nuxt, and Astro, you can enable Image Optimization in any framework with the [Vercel Build Output API](https://vercel.com/docs/build-output-api).

## Step 1: Editing the Vercel config

The first thing we need to do is tell Vercel that we want to use the Image Optimization API. To do that, we need to modify the bundler to add additional parameters to the `.vercel/output/config.json` file after the build. TanStack Start uses [Nitro](https://nitro.build/) under the hood, and it provides an easy way to do this. All you need to do is create the `nitro.config.ts` file with the following content:

```ts
export default defineNitroConfig({
  vercel: {
    config: {
      images: {
        domains: ["yourdomain.example.com"], // Change to your domain
        sizes: [
          16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920,
          2048, 3840,
        ],
        minimumCacheTTL: 60,
        formats: ["image/webp"],
        // Next.js uses the same values for sizes, cacheTTL, and formats
      },
    },
  },
});
```

## Step 2: Implementing the optimization strategy

Now that we've set the config option, when you deploy your app to Vercel, it will proxy the `/_vercel/image` endpoint to the image optimization service. Now we just need to implement the component to take advantage of it. The `next/image` package source code has thousands of lines of code, because it needs to support multiple optimization services and multiple different strategies for optimization. Most apps don't need that and we can simplify the logic to this simple hook.

```tsx
import { useMemo } from "react";

const imageWidths = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
] as const;

type ImgWidth = (typeof imageWidths)[number];

const getVercelOptimizedUrl = (url: string, width: ImgWidth) => {
  const searchParams = new URLSearchParams();
  searchParams.append("url", url);
  searchParams.append("w", width.toString());
  searchParams.append("q", "75");
  return `/_vercel/image?${searchParams.toString()}`;
};

export const useVercelOptimizedImageProps = (
  src: string,
  width: number,
  height: number,
) =>
  useMemo(() => {
    if (
      !import.meta.env.VITE_VERCEL_ENV ||
      import.meta.env.VITE_VERCEL_ENV === "development"
    )
      return { src, width, height };
    const widths = [
      ...new Set(
        [width, width * 2].map(
          (w) => imageWidths.find((p) => p >= w) || imageWidths.at(-1)!,
        ),
      ),
    ] as [ImgWidth, ...Array<ImgWidth>];
    return {
      srcSet: widths
        .map((w, i) => `${getVercelOptimizedUrl(src, w)} ${i + 1}x`)
        .join(", "),
      width: widths[0],
      height: Math.round((widths[0] * height) / width),
    };
  }, [src, width, height]);

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const Image = ({
  src,
  width,
  height,
  loading = "lazy",
  ...props
}: ImageProps) => {
  const imgProps = useVercelOptimizedImageProps(src, width, height);
  return <img loading={loading} {...imgProps} {...props} />;
};
```

This component will work exactly the same as the `next/image` component in 99% of cases.

I hope this post helped you!

If you liked it, follow me on [X, the everything app (Formerly Twitter) (Blaze your glory!)](https://x.com/matveydev) or on [BlueSky](https://bsky.app/profile/matvey.dev).
