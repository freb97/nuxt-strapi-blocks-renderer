import { fileURLToPath } from 'node:url';
import { $fetch, setup } from '@nuxt/test-utils';
import { describe, expect, it } from 'vitest';

const fetchPage = async (): Promise<string> => {
    let html: string = await $fetch('/');

    // Remove html comment nodes
    html = html.replace(/<!--\[-->/g, '');
    html = html.replace(/<!--\]-->/g, '');

    return html;
};

describe('custom blocks text rendering', async (): Promise<void> => {
    await setup({
        rootDir: fileURLToPath(new URL('../playground/custom', import.meta.url)),
    });

    it('renders the custom heading nodes', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<h1 class="text-4xl font-bold mb-6">Heading 1</h1>');
        expect(html).toContain('<h2 class="text-3xl font-bold mb-6">Heading 2</h2>');
        expect(html).toContain('<h3 class="text-2xl font-bold mb-4">Heading 3</h3>');
        expect(html).toContain('<h4 class="text-xl font-bold mb-4">Heading 4</h4>');
        expect(html).toContain('<h5 class="text-lg font-bold mb-4">Heading 5</h5>');
        expect(html).toContain('<h6 class="text-base font-bold mb-4">Heading 6</h6>');
    });

    it('renders the custom text nodes', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<p class="mb-4">Paragraph</p>');
        expect(html).toContain('<p class="mb-4">Paragraph with <br>line <br>breaks</p>');
        expect(html).toContain('<p class="mb-4"><strong class="font-bold">Bold</strong></p>');
        expect(html).toContain('<p class="mb-4"><em class="italic">Italic</em></p>');
        expect(html).toContain('<p class="mb-4"><u class="underline">Underline</u></p>');
        expect(html).toContain('<p class="mb-4"><del class="line-through">Strikethrough</del></p>');
        expect(html).toContain('<p class="mb-4"><code class="font-mono">Code</code></p>');

        expect(html).toContain('<p class="mb-4">'
            + '<a class="text-blue-500 underline" href="https://www.example.com/" target="_blank" rel="noopener noreferrer">Link</a>'
            + '</p>');
    });

    it('renders the custom list nodes', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<ul class="list-disc mb-4">'
            + '<li class="mb-1 last:mb-0">Unordered list item 1</li>'
            + '<li class="mb-1 last:mb-0">Unordered list item 2</li>'
            + '<li class="mb-1 last:mb-0">Unordered list item 3</li>'
            + '</ul>');

        expect(html).toContain('<ol class="list-decimal mb-4">'
            + '<li class="mb-1 last:mb-0">Ordered list item 1</li>'
            + '<li class="mb-1 last:mb-0">Ordered list item 2</li>'
            + '<li class="mb-1 last:mb-0">Ordered list item 3</li>'
            + '</ol>');
    });

    it('renders the custom quote node', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<blockquote class="border-l-2 border-gray-300 pl-4 py-2 italic mb-4">Quote</blockquote>');
    });

    it('renders the custom code node', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<pre class="bg-gray-100 p-4 rounded-md mb-4 lang-typescript">Code</pre>');
    });

    it('renders the custom image node', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<img '
            + 'class="bg-gray-100 rounded-md overflow-hidden mb-4" '
            + 'src="example_image_df80dd3023.jpg" '
            + 'alt="Image alternative text" '
            + 'width="480" '
            + 'height="320"'
            + '>');
    });
});
