<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  src: string
  alt: string
  caption: string
  sourceHref?: string
  sourceLabel?: string
}>()
</script>

<template>
  <figure class="sw-evidence-figure">
    <img :src="withBase(src)" :alt="alt" />
    <figcaption>
      {{ caption }}
      <a v-if="sourceHref" :href="sourceHref">{{ sourceLabel ?? '원문 보기' }}</a>
    </figcaption>
  </figure>
</template>
