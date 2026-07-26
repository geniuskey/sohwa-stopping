<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  src: string
  alt: string
  caption: string
  sourceHref?: string
  sourceLabel?: string
  fullPage?: boolean
}>()
</script>

<template>
  <figure
    :class="[
      'sw-evidence-figure',
      { 'sw-evidence-figure--full-page': fullPage },
    ]"
  >
    <img :src="withBase(src)" :alt="alt" />
    <figcaption>
      {{ caption }}
      <a v-if="sourceHref" :href="sourceHref">{{ sourceLabel ?? '원문 보기' }}</a>
    </figcaption>
  </figure>
</template>
