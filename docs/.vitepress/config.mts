import { defineConfig } from 'vitepress'

const site = 'https://geniuskey.github.io/sohwa-stopping/'
const title = '소화초 통학 안전 대응'
const description =
  '광교 A17블록 공공주택 공사 착공 전에 소화초등학교 승하차공간·통학로·공사소음 안전대책을 문서로 확정하기 위한 학부모 실행 자료집.'

export default defineConfig({
  lang: 'ko-KR',
  title,
  titleTemplate: ':title | 소화초 통학 안전 대응',
  description,
  base: '/sohwa-stopping/',
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  sitemap: { hostname: site },

  head: [
    // head 의 경로는 base 가 자동으로 붙지 않는다.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/sohwa-stopping/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#1f4f9c' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],

  markdown: {
    lineNumbers: false,
    // 한국어 문서라 목차는 h2~h3만 노출한다.
    toc: { level: [2, 3] },
    container: {
      tipLabel: '참고',
      warningLabel: '주의',
      dangerLabel: '경고',
      infoLabel: '알아두기',
      detailsLabel: '자세히 보기',
    },
    config(md) {
      // 좁은 화면에서 표가 본문을 밀지 않도록 스크롤 컨테이너로 감싼다.
      // 실제로 넘칠 때만 테마에서 tabindex 를 붙여 키보드로도 스크롤할 수 있게 한다.
      md.renderer.rules.table_open = () => '<div class="sw-table">\n<table>\n'
      md.renderer.rules.table_close = () => '</table>\n</div>\n'
    },
  },

  themeConfig: {
    logo: undefined,
    siteTitle: '소화초 통학 안전 대응',

    outline: { level: [2, 3], label: '이 페이지 목차' },

    nav: [
      { text: '처음 오셨나요', link: '/start/' },
      { text: '실행 순서', link: '/action/' },
      { text: '접수 방법', link: '/submit/' },
      { text: '요구안', link: '/demands/' },
      {
        text: '자료',
        items: [
          { text: '주장의 근거', link: '/grounds/' },
          { text: '현장 기록', link: '/fieldwork/' },
          { text: '답변 대응', link: '/responses/' },
          { text: '바로 쓸 문안', link: '/letters/' },
          { text: '심층 조사', link: '/research/' },
        ],
      },
    ],

    sidebar: {
      '/': [
        {
          text: '시작하기',
          items: [
            { text: '처음 오셨나요', link: '/start/' },
            { text: '실행 순서', link: '/action/' },
            { text: '자주 묻는 질문', link: '/start/faq' },
          ],
        },
        {
          text: '실행',
          items: [
            { text: '접수 방법 4갈래', link: '/submit/' },
            { text: '현장 기록하기', link: '/fieldwork/' },
            { text: '증거 수집 체크리스트', link: '/fieldwork/checklist' },
            { text: '답변을 받았을 때', link: '/responses/' },
          ],
        },
        {
          text: '요구와 근거',
          items: [
            { text: '착공 전 요구안', link: '/demands/' },
            { text: '주장의 근거', link: '/grounds/' },
          ],
        },
        {
          text: '바로 쓸 문안',
          items: [
            { text: '문안 모음', link: '/letters/' },
            { text: '정보공개청구', link: '/letters/info-disclosure' },
            { text: '기관별 정보공개청구', link: '/letters/info-disclosure-packages' },
            { text: '착공 전 공동요구서', link: '/letters/joint-demand' },
            { text: '관계기관 공문', link: '/letters/official-letter' },
            { text: '호소문', link: '/letters/petition' },
            { text: '언론 제보문', link: '/letters/media-brief' },
            { text: '이행협약서 초안', link: '/letters/agreement' },
          ],
        },
        {
          text: '심층 조사',
          items: [
            { text: '조사자료 안내', link: '/research/' },
            { text: '종합 조사 업데이트', link: '/research/overview' },
            { text: '제2차 긴급회의 회의록', link: '/research/emergency-meeting-2026-07-22' },
            { text: '포켓도로와 대체공간', link: '/research/pocket-road' },
            { text: '토지변동 증거도 작업판', link: '/research/land-change-evidence' },
            { text: '광교중앙로·학교 부지 변동', link: '/research/road-history' },
            { text: '주장 강도와 근거 수준', link: '/research/claim-strength-audit' },
            { text: '법적 쟁점과 주장 구조', link: '/research/legal-issues' },
            { text: '관련 판례 정밀 검토', link: '/research/case-law' },
            { text: '학교 일조·조망', link: '/research/sunlight' },
            { text: '공사장 방음벽', link: '/research/noise-barrier' },
            { text: 'A17 공개 이미지 자료', link: '/research/visuals' },
            { text: '레퍼런스 맵', link: '/research/source-map' },
          ],
        },
        {
          text: '회의 자료',
          items: [
            { text: '기관·의원실 3쪽 요약', link: '/briefing/three-page-brief' },
          ],
        },
        {
          text: '사이트 정보',
          items: [{ text: '이 자료집에 대하여', link: '/about' }],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '검색', buttonAriaLabel: '문서 검색' },
              modal: {
                displayDetails: '자세히 보기',
                resetButtonTitle: '검색어 지우기',
                backButtonTitle: '검색 닫기',
                noResultsText: '검색 결과가 없습니다',
                footer: {
                  selectText: '선택',
                  selectKeyAriaLabel: '엔터',
                  navigateText: '이동',
                  navigateUpKeyAriaLabel: '위쪽 방향키',
                  navigateDownKeyAriaLabel: '아래쪽 방향키',
                  closeText: '닫기',
                  closeKeyAriaLabel: 'esc',
                },
              },
            },
          },
        },
      },
    },

    docFooter: { prev: '이전 문서', next: '다음 문서' },
    darkModeSwitchLabel: '화면 테마',
    lightModeSwitchTitle: '밝은 테마로 전환',
    darkModeSwitchTitle: '어두운 테마로 전환',
    sidebarMenuLabel: '문서 목록',
    returnToTopLabel: '맨 위로',
    externalLinkIcon: true,
    langMenuLabel: '언어 변경',
    skipToContentLabel: '본문 바로가기',

    notFound: {
      code: '404',
      title: '페이지를 찾을 수 없습니다',
      quote: '주소가 바뀌었거나 삭제된 문서일 수 있습니다. 아래 검색이나 홈에서 다시 찾아 주세요.',
      linkText: '홈으로 가기',
      linkLabel: '홈으로 이동',
    },

    lastUpdated: {
      text: '최종 수정',
      formatOptions: { dateStyle: 'long', timeStyle: undefined },
    },

    editLink: {
      pattern: 'https://github.com/geniuskey/sohwa-stopping/edit/main/docs/:path',
      text: '이 문서의 오류·최신 정보 제보하기',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geniuskey/sohwa-stopping' },
    ],

    footer: {
      message:
        '학부모가 직접 정리한 공개 자료입니다. 법률 자문을 대체하지 않으며, 개별 사실은 원문과 기관 회신으로 최종 확인해 주세요.',
      copyright: '자유롭게 복사·수정·배포할 수 있습니다.',
    },
  },
})
