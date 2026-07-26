<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  image?: string
  imageAlt?: string
  imageCaption?: string
  actions?: { text: string; link: string; theme?: 'brand' | 'alt' }[]
}>()
</script>

<template>
  <section class="sw-hero" :class="{ 'sw-hero--with-image': image }" aria-labelledby="sw-hero-title">
    <div class="sw-hero__content">
      <p v-if="eyebrow" class="sw-hero__eyebrow">{{ eyebrow }}</p>
      <h1 id="sw-hero-title" class="sw-hero__title">{{ title }}</h1>
      <p v-if="lead" class="sw-hero__lead">{{ lead }}</p>

      <p v-if="actions?.length" class="sw-hero__actions">
        <a
          v-for="action in actions"
          :key="action.link"
          class="sw-hero__action"
          :class="`sw-hero__action--${action.theme ?? 'brand'}`"
          :href="withBase(action.link)"
          >{{ action.text }}</a
        >
      </p>
    </div>

    <figure v-if="image" class="sw-hero__visual">
      <img :src="withBase(image)" :alt="imageAlt ?? ''" />
      <figcaption v-if="imageCaption">{{ imageCaption }}</figcaption>
    </figure>
  </section>
</template>

<style scoped>
.sw-hero--with-image {
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(300px, 0.94fr);
  align-items: center;
  gap: clamp(28px, 5vw, 64px);
}

.sw-hero__visual {
  margin: 0;
}

.sw-hero__visual img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid var(--sw-line);
  border-radius: 14px;
  background: var(--sw-panel-muted);
}

.sw-hero__visual figcaption {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

.sw-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
}

.sw-hero__action {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 15.5px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.sw-hero__action--brand {
  background: var(--vp-button-brand-bg);
  color: #fff;
}

.sw-hero__action--brand:hover {
  background: var(--vp-button-brand-hover-bg);
}

.sw-hero__action--alt {
  border-color: var(--sw-line);
  background: var(--sw-panel);
  color: var(--vp-c-text-1);
}

.sw-hero__action--alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (max-width: 860px) {
  .sw-hero--with-image {
    grid-template-columns: 1fr;
  }

  .sw-hero__visual {
    order: -1;
  }
}
</style>
