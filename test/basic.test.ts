import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { $fetch, setup } from '@nuxt/test-utils';

const fetchPage = async (): Promise<string> => {
    let html: string = await $fetch('/');

    // Remove html comment nodes
    html = html.replace(/<!--\[-->/g, '');
    html = html.replace(/<!--\]-->/g, '');

    return html;
};

describe('basic blocks text rendering', async (): Promise<void> => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    });

    it('renders the heading nodes', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<h1>Heading 1</h1>');
        expect(html).toContain('<h2>Heading 2</h2>');
        expect(html).toContain('<h3>Heading 3</h3>');
        expect(html).toContain('<h4>Heading 4</h4>');
        expect(html).toContain('<h5>Heading 5</h5>');
        expect(html).toContain('<h6>Heading 6</h6>');
    });

    it('renders the text nodes', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<p>Paragraph</p>');
        expect(html).toContain('<p>Paragraph with <br>line <br>breaks</p>');
        expect(html).toContain('<p><strong>Bold</strong></p>');
        expect(html).toContain('<p><em>Italic</em></p>');
        expect(html).toContain('<p><u>Underline</u></p>');
        expect(html).toContain('<p><del>Strikethrough</del></p>');
        expect(html).toContain('<p><code>Code</code></p>');
        expect(html).toContain('<p><a href="https://www.example.com/">Link</a></p>');
    });

    it('renders the list nodes', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<ul>'
        + '<li>Unordered list item 1</li>'
        + '<li>Unordered list item 2</li>'
        + '<li>Unordered list item 3</li>'
        + '</ul>');

        expect(html).toContain('<ol>'
        + '<li>Ordered list item 1</li>'
        + '<li>Ordered list item 2</li>'
        + '<li>Ordered list item 3</li>'
        + '</ol>');
    });

    it('renders the quote node', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<blockquote>Quote</blockquote>');
    });

    it('renders the code node', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<pre>Code</pre>');
    });

    it('renders the image node', async (): Promise<void> => {
        const html: string = await fetchPage();

        expect(html).toContain('<img '
        + 'src="example_image_df80dd3023.jpg" '
        + 'alt="Image alternative text" '
        + 'width="480" '
        + 'height="320"'
        + '>');
    });
});
