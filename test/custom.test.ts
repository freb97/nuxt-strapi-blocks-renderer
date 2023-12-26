import { describe, expect, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import { $fetch, setup } from '@nuxt/test-utils';

const fetchPage = async (): Promise<string> => {
    let html: string = await $fetch('/');

    // Remove html comment nodes
    html = html.replace(/<!--\[-->/g, '');
    html = html.replace(/<!--]-->/g, '');

    return html;
};

describe('Custom blocks text rendering', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/custom', import.meta.url)),
    });

    it('Renders the custom heading nodes', async () => {
        const html: string = await fetchPage();

        expect(html).toContain('<h1 style="color:red;">Heading 1</h1>');
        expect(html).toContain('<h2 style="color:red;">Heading 2</h2>');
        expect(html).toContain('<h3 style="color:red;">Heading 3</h3>');
        expect(html).toContain('<h4 style="color:red;">Heading 4</h4>');
        expect(html).toContain('<h5 style="color:red;">Heading 5</h5>');
        expect(html).toContain('<h6 style="color:red;">Heading 6</h6>');
    });

    it('Renders the custom text nodes', async () => {
        const html: string = await fetchPage();

        expect(html).toContain('<p style="color:red;">Paragraph</p>');
        expect(html).toContain('<p style="color:red;"><strong style="color:red;">Bold</strong></p>');
        expect(html).toContain('<p style="color:red;"><em style="color:red;">Italic</em></p>');
        expect(html).toContain('<p style="color:red;"><u style="color:red;">Underline</u></p>');
        expect(html).toContain('<p style="color:red;"><del style="color:red;">Strikethrough</del></p>');
        expect(html).toContain('<p style="color:red;"><code style="color:red;">Code</code></p>');

        expect(html).toContain('<p style="color:red;">' +
            '<a style="color:red;" href="https://www.example.com/">Link</a>' +
        '</p>');
    });

    it('Renders the custom list nodes', async () => {
        const html: string = await fetchPage();

        expect(html).toContain('<ul style="color:red;">' +
            '<li style="color:red;">Unordered list item 1</li>' +
            '<li style="color:red;">Unordered list item 2</li>' +
            '<li style="color:red;">Unordered list item 3</li>' +
        '</ul>');

        expect(html).toContain('<ol style="color:red;">' +
            '<li style="color:red;">Ordered list item 1</li>' +
            '<li style="color:red;">Ordered list item 2</li>' +
            '<li style="color:red;">Ordered list item 3</li>' +
        '</ol>');
    });

    it('Renders the custom quote node', async () => {
        const html: string = await fetchPage();

        expect(html).toContain('<blockquote style="color:red;">Quote</blockquote>');
    });

    it('Renders the custom code node', async () => {
        const html: string = await fetchPage();

        expect(html).toContain('<pre style="color:red;">        Code\n    </pre>');
    });

    it('Renders the custom image node', async () => {
        const html: string = await fetchPage();

        expect(html).toContain('<img ' +
            'style="background:red;" ' +
            'src="example_image_df80dd3023.jpg" ' +
            'alt="Image alternative text" ' +
            'width="480" ' +
            'height="320"' +
        '>');
    });
});
