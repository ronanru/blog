---
title: 'How I made my resume with HTML and Tailwind CSS'
description: 'Learn how I made my resume with HTML and Tailwind CSS and how you can do the same.'
pubDate: '2023-03-04'
image: 'resume-html-tailwind-css/main-image.webp'
imageAltText: 'HTML + Tailwind CSS = PDF'
---

My first resume was hastily put together using LibreOffice Writer. However, I soon realized that to increase my chances of getting hired, I needed to create a standout resume that would set me apart from other applicants. Since I didn't want to spend money on an expensive template or learn how to use a PDF editor, I decided to find a way to create a PDF using web technologies. In this post, I will share how I used HTML and Tailwind CSS to create my resume.

## Starting the project

I prefer using Tailwind CSS, and the easiest way to create a basic web page with Tailwind is by using [Astro](https://astro.build). I began by creating a new Astro project with `npm create astro@latest` using the Empty template. Then, I added Tailwind by running `npx astro add tailwind`. Now, I have a blank web page that I can customize with HTML and Tailwind.

## Creating a page

The webpage is responsive, but the resume must be strictly standard size. I tackled this with a very interesting trick. Did you know [you can use centimeters and inches as a css unit](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#absolute_length_units)? I added `h-[297mm] w-[210mm]` classes to an element to make it the exact size of a standard A4 paper. Here's the basic template:

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Cool Resume</title>
  </head>
  <body class="grid min-h-screen place-items-center bg-gray-400">
    <main
      class="m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg"
    >
      <!-- Put your content here -->
    </main>
  </body>
</html>
```

![A blank A4 page](/images/resume-html-tailwind-css/blank-page.webp)

## Adding Tech Logos

After filling in the resume, I wanted to also add logos for different programming languages and technologies I have in my resume.

![A list of programming languages with logos](/images/resume-html-tailwind-css/icons.webp)

Luckily, I found that in astro you can do it easily with the `astro-icon` package. This package uses [Iconify](https://iconify.design/), an icon library that combines dozens of different icon packs into one. The most interesting icon pack for me was the [SVG Logos](https://icon-sets.iconify.design/logos/) as it includes all logos for different tech companies, programming languages, etc. Now, adding these icons is as simple as:

```html
<Icon pack="logos" name="rust" class="inline h-5 w-5" /> Rust,
<Icon pack="logos" name="python" class="inline h-5 w-5" /> Python
```

## Converting site to PDF

Now that my new resume looks great, the question was how to convert it to a PDF. In the print menu (<kbd>Ctrl</kbd>+<kbd>P</kbd>) you can choose a special "Save as PDF" printer and save the page as a PDF. However, when I did it for the first time, I noticed it wasn't perfect, the margins were a lot bigger, background for some elements was missing, etc. Some issues I fixed with CSS, for some I just needed to adjust a setting in the printing menu. Tailwind has a [`print:`](https://tailwindcss.com/docs/hover-focus-and-other-states#print-styles) prefix for styles that should only be applied while printing. I used it to remove all margins and set the page to use the full width and height while printing. Here's what my updated template looks like:

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Cool Resume</title>
  </head>
  <body class="grid min-h-screen place-items-center bg-gray-400 print:min-h-0">
    <main
      class="m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none"
    >
      <!-- Put your content here -->
    </main>
  </body>
</html>
```

Also, to convert the page correctly, in the print options, under "More Settings" I set "Margins" to "None" and enables the "Background graphics" option.

![A screenshot of the print options](/images/resume-html-tailwind-css/print-options.webp)

After making these changes, it converted my resume without any issues.

## Conclusion

I hope this post was useful for you. [Here](https://github.com/ronanru/resume) is my finished resume. If you use a method described in this post to make a resume, please share it with me [on Twitter](https://twitter.com/ryabchikovm). Thanks for reading!
