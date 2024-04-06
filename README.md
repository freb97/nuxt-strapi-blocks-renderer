# Nuxt Strapi Blocks Renderer

[![Github Actions][github-actions-src]][github-actions-href]
[![NPM version][npm-version-src]][npm-version-href]
[![NPM downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A fully customizable Nuxt 3 module for rendering text with the new Blocks rich text editor element from Strapi CMS.

## Installation

1. Install the Blocks renderer:

    ```bash
    npm install nuxt-strapi-blocks-renderer
    ```

2. Add the module to `nuxt.config.{ts|js}`:

    ```typescript
    modules: ['nuxt-strapi-blocks-renderer']
    ```

## Usage

To render text, use the `StrapiBlocksText` component:

```vue
<StrapiBlocksText :nodes="blockNodes" />
```

In this example, the `blockNodes` are taken from the JSON response which Strapi provides when using the Blocks rich
text editor element:

```vue
<script setup lang="ts">
    import type { BlockNode } from '#strapi-blocks-renderer/types';
    import type { Restaurant } from '~/types';

    const route = useRoute();
    const { findOne } = useStrapi();

    // Fetch restaurants data from Strapi
    const response = await findOne<Restaurant>('restaurants', route.params.id);
    
    // Obtain blocks text nodes from description field
    const blockNodes: BlockNode[] = response.data.attributes.description;
</script>

<template>
    <StrapiBlocksText :nodes="blockNodes" />
</template>
```

To use the `useStrapi` composable, install the [Strapi Nuxt module](https://strapi.nuxtjs.org/).

### Advanced Usage

In situations where your project requires specific styling or behavior for certain HTML tags such as `<a>`, `<p>`,
and others, you can override the default rendering components used by the Nuxt Strapi Blocks Renderer.
This flexibility allows you to tailor the rendering to align with your project's unique design and functional needs.

#### Global Component Registration

First, ensure that your components are globally registered in your Nuxt app.
This step is crucial for your custom components to be recognized and used by the renderer.

In your Nuxt configuration (`nuxt.config.{js|ts}`), add:

```typescript
components: {
    dirs: [
        {
            path: '~/components',
        },
    ],
    global: true,
},
```

#### Customizing the Paragraph Tag

To customize the rendering of the paragraph (`<p>`) tag, you need to create a corresponding Vue component.
The name of the component follows a predefined pattern: `'StrapiBlocksText' + [NodeName] + 'Node.vue'`.
To override the default paragraph tag, we create a file called `StrapiBlocksTextParagraphNode.vue`.

```vue
<!-- components/StrapiBlocksTextParagraphNode.vue -->
<template>
    <p class="my-custom-class-for-p">
        <slot />
    </p>
</template>
```

This component assigns a custom class `my-custom-class-for-p` to the paragraph tag, which can be styled as needed.

The prefix for the custom components can be adjusted in your `nuxt.config.{js|ts}`:

```typescript
modules: ['nuxt-strapi-blocks-renderer'],
strapiBlocksRenderer: {
    prefix: 'MyCustomPrefix'
    blocksPrefix: 'MyCustomBlocksPrefix',
},
```

With this configuration, the `StrapiBlocksText` component becomes `MyCustomPrefixStrapiBlocksText` and the custom
paragraph node component would be named `MyCustomBlocksPrefixParagraphNode`.

#### Other Custom Tags

You can apply similar customizations to all other HTML tags used by the renderer.

##### Headings

Custom heading tags (`<h1>`, `<h2>`, `<h3>`, etc.):

```vue
<!-- components/StrapiBlocksTextHeading1Node.vue -->
<template>
    <h1 class="my-custom-class-for-h1">
        <slot />
    </h1>
</template>

<!-- components/StrapiBlocksTextHeading2Node.vue -->
<template>
    <h2 class="my-custom-class-for-h2">
        <slot />
    </h2>
</template>
```

This pattern also extends to the `h3`, `h4`, `h5` and `h6` tags.

##### Lists

Custom list tags (`<ol>`, `<ul>` and `<li>`):

```vue
<!-- components/StrapiBlocksTextOrderedListNode.vue -->
<template>
    <ol class="my-custom-class-for-ol">
        <slot />
    </ol>
</template>

<!-- components/StrapiBlocksTextUnorderedListNode.vue -->
<template>
    <ul class="my-custom-class-for-ul">
        <slot />
    </ul>
</template>

<!-- components/StrapiBlocksTextListItemInlineNode.vue -->
<template>
    <li class="my-custom-class-for-li">
        <slot />
    </li>
</template>
```

##### Blockquotes and Codes

Custom blockquote and code tags (`<blockquote>`, `<pre>`):

```vue
<!-- components/StrapiBlocksTextQuoteNode.vue -->
<template>
    <blockquote class="my-custom-class-for-blockquote">
        <slot />
    </blockquote>
</template>

<!-- components/StrapiBlocksTextCodeNode.vue -->
<template>
    <pre class="my-custom-class-for-pre">
        <slot />
    </pre>
</template>
```

##### Inline text nodes

Custom inline text nodes (`<strong>`, `<em>`, `<u>`, `<del>`, `<code>`):

```vue
<!-- components/StrapiBlocksTextBoldInlineNode.vue -->
<template>
    <strong class="my-custom-class-for-strong">
        <slot />
    </strong>
</template>

<!-- components/StrapiBlocksTextItalicInlineNode.vue -->
<template>
    <em class="my-custom-class-for-em">
        <slot />
    </em>
</template>

<!-- components/StrapiBlocksTextUnderlineInlineNode.vue -->
<template>
    <u class="my-custom-class-for-u">
        <slot />
    </u>
</template>

<!-- components/StrapiBlocksTextStrikethroughInlineNode.vue -->
<template>
    <del class="my-custom-class-for-del">
        <slot />
    </del>
</template>

<!-- components/StrapiBlocksTextCodeInlineNode.vue -->
<template>
    <code class="my-custom-class-for-code">
        <slot />
    </code>
</template>
```

##### Links

Custom link tag (`<a>`):

```vue
<!-- components/StrapiBlocksTextLinkInlineNode.vue -->
<script setup lang="ts">
    const props = defineProps<{
        url: string;
    }>();
</script>

<template>
    <a :href="props.url" class="my-custom-class-for-a">
        <slot />
    </a>
</template>
```

When rendering a link tag, the url gets passed as the `url` component property.

##### Images

Custom image tag (`<img>`):

```vue
<!-- components/StrapiBlocksTextImageNode.vue -->
<script setup lang="ts">
    const props = defineProps<{
        image: any;
    }>();
</script>

<template>
    <img
        class="my-custom-class-for-img"
        :src="props.image.url"
        :alt="props.image.alternativeText"
        :width="props.image.width"
        :height="props.image.height"
    >
</template>
```

When rendering an image tag, the image object gets passed as the `image` component property.
You can also use different image components here, i.e. `NuxtImg` or others.

## Development

### Dependencies

To install the dependencies, run the `install` command:

```bash
npm install
```

The project requires Node.js and NPM to run.
You can either install these manually on your system or if you have the nix package manager installed, use the
provided nix-shell with the following command:

```bash
nix-shell
```

This will automatically install the needed software and start up a shell.

### Type stubs

To generate the type stubs for the nuxt module, run the `dev:prepare` command:

```bash
npm run dev:prepare
```

### Development server

To start the development server with the provided text components, run the `dev` command:

```bash
npm run dev
```

This will boot up the playground with the default text components.
To start the development server using custom text components, overriding the provided components,
use the `dev:custom` command:

```bash
npm run dev:custom
```

### Quality

#### Linter

To run ESLint, use the following command:

```bash
npm run lint:es
```

#### Type checks

To run the TypeScript type checks, use the following command:

```bash
npm run lint:types
```

#### Unit Tests

To run the Vitest unit tests, run the following command:

```bash
npm run test
````

### Release

To release a new version of the strapi blocks renderer nuxt module, take the following steps:

1. Increment version number in the `package.json` file
2. Add changelog entry for the new version number
3. Run linters and unit tests
4. Log in to NPM using your access token
5. Run the `release` command

```bash
npm run release
```

[github-actions-src]: https://github.com/freb97/nuxt-strapi-blocks-renderer/actions/workflows/ci.yml/badge.svg
[github-actions-href]: https://github.com/freb97/nuxt-strapi-blocks-renderer/actions

[npm-version-src]: https://img.shields.io/npm/v/nuxt-strapi-blocks-renderer/latest.svg?style=flat&colorA=18181B&colorB=31C553
[npm-version-href]: https://npmjs.com/package/nuxt-strapi-blocks-renderer

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=31C553
[npm-downloads-href]: https://npmjs.com/package/nuxt-strapi-blocks-renderer

[license-src]: https://img.shields.io/github/license/freb97/nuxt-strapi-blocks-renderer.svg?style=flat&colorA=18181B&colorB=31C553
[license-href]: https://github.com/freb97/nuxt-strapi-blocks-renderer/blob/main/LICENSE
