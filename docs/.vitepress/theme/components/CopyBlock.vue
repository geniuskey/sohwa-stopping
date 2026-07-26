<script setup lang="ts">
import { ref, useId } from 'vue'

defineProps<{
  /** 블록 위에 붙는 짧은 이름. 예: "민원 제목" */
  label?: string
  /** 복사 버튼에 붙일 구체적인 설명. 없으면 label 을 사용한다. */
  copyLabel?: string
}>()

const bodyId = useId()
const body = ref<HTMLElement | null>(null)
const status = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

function inlineText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.nodeValue ?? ''
  if (node.nodeType !== Node.ELEMENT_NODE) return ''
  const el = node as Element
  if (el.tagName === 'BR') return '\n'
  return Array.from(el.childNodes).map(inlineText).join('')
}

function clean(value: string) {
  return value
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .join('\n')
    .trim()
}

function isList(node: Node) {
  return (
    node.nodeType === Node.ELEMENT_NODE &&
    ((node as Element).tagName === 'OL' || (node as Element).tagName === 'UL')
  )
}

function listLines(list: Element, depth: number): string[] {
  const ordered = list.tagName === 'OL'
  const start = ordered ? (list as HTMLOListElement).start || 1 : 0
  const indent = '  '.repeat(depth)
  const lines: string[] = []
  let index = 0

  for (const li of Array.from(list.children)) {
    if (li.tagName !== 'LI') continue

    const nested = Array.from(li.childNodes).filter(isList) as Element[]
    const own = Array.from(li.childNodes)
      .filter((node) => !isList(node))
      .map(inlineText)
      .join('\n')

    lines.push(`${indent}${ordered ? `${start + index}.` : '-'} ${clean(own)}`)
    for (const child of nested) lines.push(...listLines(child, depth + 1))
    index += 1
  }

  return lines
}

/** innerText 는 ol/ul 의 번호와 기호를 빼고 복사한다. 기관 회신에서 항목별로 답변받으려면 번호가 남아야 한다. */
function serialize(root: HTMLElement) {
  const blocks: string[] = []

  for (const child of Array.from(root.children)) {
    if (isList(child)) {
      blocks.push(listLines(child, 0).join('\n'))
      continue
    }

    const text = clean(inlineText(child))
    if (text) blocks.push(text)
  }

  return blocks.join('\n\n')
}

async function copy() {
  const text = body.value ? serialize(body.value) : ''
  if (!text) return

  try {
    await navigator.clipboard.writeText(text)
    status.value = '문안을 복사했습니다.'
  } catch {
    status.value = '복사하지 못했습니다. 문장을 직접 선택해 복사해 주세요.'
  }

  clearTimeout(timer)
  timer = setTimeout(() => (status.value = ''), 4000)
}
</script>

<template>
  <section class="sw-copy" :aria-labelledby="label ? `${bodyId}-label` : undefined">
    <div class="sw-copy__head">
      <p v-if="label" :id="`${bodyId}-label`" class="sw-copy__label">{{ label }}</p>
      <button
        type="button"
        class="sw-copy__button"
        :aria-label="`${copyLabel ?? label ?? '문안'} 복사`"
        :aria-describedby="bodyId"
        @click="copy"
      >
        문안 복사
      </button>
    </div>

    <div :id="bodyId" ref="body" class="sw-copy__body">
      <slot />
    </div>

    <p class="sw-copy__status" role="status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<style scoped>
.sw-copy {
  margin: 24px 0;
  border: 1px solid var(--sw-line);
  border-radius: 12px;
  background: var(--sw-panel-muted);
  padding: 16px 18px;
}

.sw-copy__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.sw-copy__label {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-2);
}

.sw-copy__button {
  flex-shrink: 0;
  min-height: 40px;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.sw-copy__button:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.sw-copy__body {
  font-size: 15.5px;
  line-height: 1.75;
  word-break: keep-all;
}

.sw-copy__body :deep(> :first-child) {
  margin-top: 0;
}

.sw-copy__body :deep(> :last-child) {
  margin-bottom: 0;
}

.sw-copy__status {
  margin: 0;
  min-height: 1.4em;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-tip-1);
}

.sw-copy__status:empty {
  min-height: 0;
}
</style>
