<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type Group = { group: string; note?: string; items: string[] }

const props = defineProps<{
  /** localStorage 키. 페이지마다 고유해야 한다. */
  storageKey: string
  groups: Group[]
}>()

const flat = computed(() =>
  props.groups.flatMap((g, gi) => g.items.map((_, ii) => `${gi}-${ii}`)),
)

const checked = ref<Record<string, boolean>>({})
const restored = ref(false)

const done = computed(() => flat.value.filter((k) => checked.value[k]).length)
const total = computed(() => flat.value.length)

onMounted(() => {
  try {
    const raw = localStorage.getItem(props.storageKey)
    if (raw) checked.value = JSON.parse(raw)
  } catch {
    checked.value = {}
  }
  restored.value = true
})

watch(
  checked,
  (value) => {
    if (!restored.value) return
    try {
      localStorage.setItem(props.storageKey, JSON.stringify(value))
    } catch {
      /* 저장 실패는 무시한다. 체크 자체는 화면에서 계속 동작한다. */
    }
  },
  { deep: true },
)

function reset() {
  checked.value = {}
}
</script>

<template>
  <div class="sw-check">
    <div class="sw-check__bar">
      <p class="sw-check__count" role="status" aria-live="polite">
        {{ total }}개 중 <strong>{{ done }}개</strong> 확인함
      </p>
      <button type="button" class="sw-check__reset" @click="reset">
        체크 모두 지우기
      </button>
    </div>

    <p class="sw-check__hint">
      체크 상태는 이 브라우저에만 저장됩니다. 다른 사람과 공유되지 않습니다.
    </p>

    <fieldset v-for="(group, gi) in groups" :key="gi" class="sw-check__group">
      <legend class="sw-check__legend">{{ group.group }}</legend>
      <p v-if="group.note" class="sw-check__note">{{ group.note }}</p>
      <ul class="sw-check__list">
        <li v-for="(item, ii) in group.items" :key="ii">
          <label class="sw-check__item">
            <input
              v-model="checked[`${gi}-${ii}`]"
              type="checkbox"
              class="sw-check__box"
            />
            <span>{{ item }}</span>
          </label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<style scoped>
.sw-check {
  margin: 24px 0;
}

.sw-check__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--sw-line);
  border-radius: 10px;
  background: var(--sw-panel-muted);
}

.sw-check__count {
  margin: 0;
  font-size: 15px;
}

.sw-check__count strong {
  color: var(--vp-c-brand-1);
}

.sw-check__reset {
  min-height: 38px;
  padding: 6px 14px;
  border: 1px solid var(--sw-line);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}

.sw-check__reset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.sw-check__hint {
  margin: 8px 2px 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.sw-check__group {
  margin: 22px 0 0;
  padding: 0;
  border: 0;
}

.sw-check__legend {
  padding: 0;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sw-check__note {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.sw-check__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.sw-check__item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 11px 14px;
  border: 1px solid var(--sw-line);
  border-radius: 10px;
  background: var(--sw-panel);
  font-size: 15px;
  line-height: 1.6;
  word-break: keep-all;
  cursor: pointer;
}

.sw-check__item:hover {
  border-color: var(--vp-c-brand-1);
}

.sw-check__item:has(.sw-check__box:checked) {
  background: var(--vp-c-tip-soft);
  border-color: var(--vp-c-tip-1);
}

.sw-check__item:has(.sw-check__box:focus-visible) {
  outline: 3px solid var(--sw-focus);
  outline-offset: 2px;
}

.sw-check__box {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin: 2px 0 0;
  accent-color: var(--vp-c-tip-1);
  cursor: pointer;
}
</style>
