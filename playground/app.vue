<script setup lang="ts">
    const textNodes = [
        {
            'type': 'heading',
            'children': [
                {
                    'type': 'text',
                    'text': 'Heading 1',
                },
            ],
            'level': 1,
        },
    ];
</script>

<template>
    <h1>Nuxt Strapi Blocks Renderer</h1>

    <Text
        :nodes="textNodes"
    />
</template>
