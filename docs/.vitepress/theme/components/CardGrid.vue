<script setup lang="ts">
defineProps<{
  /** 카드 묶음 전체를 설명하는 이름. 스크린리더에서 목록의 성격을 알린다. */
  label?: string
}>()
</script>

<template>
  <ul class="sw-grid" :aria-label="label">
    <slot />
  </ul>
</template>

<style scoped>
.sw-grid {
  list-style: none;
  padding: 0;
}
</style>
