import { defineComponent, h, onMounted, onUnmounted } from 'vue'
import type { Theme } from 'vitepress'
import { onContentUpdated } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Card from './components/Card.vue'
import CardGrid from './components/CardGrid.vue'
import Checklist from './components/Checklist.vue'
import CopyBlock from './components/CopyBlock.vue'
import EvidenceFigure from './components/EvidenceFigure.vue'
import HomeHero from './components/HomeHero.vue'

import './style.css'

/**
 * 가로로 넘치는 표만 키보드로 스크롤할 수 있게 초점 대상으로 만든다.
 * 넘치지 않는 표까지 탭 순서에 넣으면 오히려 방해가 되므로 실제 폭을 보고 판단한다.
 */
function markScrollableTables() {
  for (const el of document.querySelectorAll<HTMLElement>('.sw-table')) {
    if (el.scrollWidth > el.clientWidth + 1) {
      el.setAttribute('tabindex', '0')
      el.setAttribute('role', 'group')
      el.setAttribute('aria-label', '가로로 스크롤할 수 있는 표')
    } else {
      el.removeAttribute('tabindex')
      el.removeAttribute('role')
      el.removeAttribute('aria-label')
    }
  }
}

const Layout = defineComponent({
  name: 'SohwaLayout',
  setup() {
    const update = () => requestAnimationFrame(markScrollableTables)

    onContentUpdated(update)
    onMounted(() => window.addEventListener('resize', update))
    onUnmounted(() => window.removeEventListener('resize', update))

    return () => h(DefaultTheme.Layout)
  },
})

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Card', Card)
    app.component('CardGrid', CardGrid)
    app.component('Checklist', Checklist)
    app.component('CopyBlock', CopyBlock)
    app.component('EvidenceFigure', EvidenceFigure)
    app.component('HomeHero', HomeHero)
  },
} satisfies Theme
