import { describe, expect, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import { $fetch, setup } from '@nuxt/test-utils';

describe('test', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('../playground/basic', import.meta.url)),
    });

    it('Renders the sample nodes', async () => {
        let html: string = await $fetch('/');

        // Remove comment nodes from rendered html
        html = html.replace(/<!--\[-->/g, '');
        html = html.replace(/<!--]-->/g, '');

        expect(html).toContain('<h1>Heading 1</h1>');
        expect(html).toContain('<h2>Heading 2</h2>');
        expect(html).toContain('<h3>Heading 3</h3>');
        expect(html).toContain('<h4>Heading 4</h4>');
        expect(html).toContain('<h5>Heading 5</h5>');
        expect(html).toContain('<h6>Heading 6</h6>');
    });
});
