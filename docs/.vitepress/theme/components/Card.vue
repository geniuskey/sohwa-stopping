<script setup lang="ts">
import { withBase } from 'vitepress'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    /** 사이트 내부 경로 또는 http(s) 주소 */
    link?: string
    /** 제목 위에 붙는 짧은 라벨. 예: "접수 담당" */
    meta?: string
    /** 제목의 heading 레벨. 주변 문서 구조에 맞춘다. */
    level?: 2 | 3 | 4
    /** 링크 문구를 바꾸고 싶을 때 */
    cta?: string
  }>(),
  { level: 3 },
)

const isExternal = computed(() => /^https?:\/\//.test(props.link ?? ''))
const href = computed(() =>
  props.link ? (isExternal.value ? props.link : withBase(props.link)) : undefined,
)
</script>

<template>
  <li class="sw-card">
    <p v-if="meta" class="sw-card__meta">{{ meta }}</p>

    <component :is="`h${level}`" class="sw-card__title">
      <a
        v-if="href"
        :href="href"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noreferrer' : undefined"
        >{{ title }}<span v-if="isExternal" class="sw-card__ext"> (새 창)</span></a
      >
      <template v-else>{{ title }}</template>
    </component>

    <div class="sw-card__body">
      <slot />
    </div>

    <p v-if="href && cta" class="sw-card__link">
      <a
        :href="href"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noreferrer' : undefined"
        >{{ cta }} →<span v-if="isExternal" class="sw-card__ext"> (새 창)</span></a
      >
    </p>
  </li>
</template>

<style scoped>
.sw-card__title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
  word-break: keep-all;
}

.sw-card__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.sw-card__title a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sw-card__body :deep(> :first-child) {
  margin-top: 0;
}

.sw-card__body :deep(> :last-child) {
  margin-bottom: 0;
}

.sw-card__body :deep(p) {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  word-break: keep-all;
}

.sw-card__body :deep(ul) {
  margin: 0;
  padding-left: 1.15rem;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.sw-card__link a {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  text-decoration: none;
}

.sw-card__link a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* 시각적으로는 숨기고 보조기술에는 읽히게 한다. */
.sw-card__ext {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
