# sohwa-stopping

광교 소화초등학교 인근 A17블록 공공주택 공사에 따른 통학 차량 정차공간 상실, 통학로 안전, 공사소음 문제에 대응하기 위한 학부모 자료집입니다.

공개 사이트: <https://geniuskey.github.io/sohwa-stopping/>

## 구조

VitePress 기반 정적 사이트이며 `docs/` 안의 마크다운이 그대로 페이지가 됩니다.

```
docs/
  index.md              홈
  start/                처음 오셨나요, 자주 묻는 질문
  action/               실행 순서
  submit/               접수 방법 4갈래
  demands/              착공 전 요구안 체크리스트
  grounds/              주장의 근거
  fieldwork/            현장 기록과 증거 체크리스트
  responses/            답변을 받았을 때
  letters/              바로 쓸 문안 6종
  research/             심층 조사 자료와 레퍼런스 맵
  about.md              면책과 기여 안내
  .vitepress/           설정, 테마, 공용 컴포넌트
```

## 개발

```bash
pnpm install
pnpm dev      # 로컬 개발 서버
pnpm build    # 정적 빌드 (내부 링크가 깨지면 실패)
pnpm preview  # 빌드 결과 확인
```

`main`에 push하면 GitHub Actions가 빌드해 GitHub Pages로 배포합니다.

## 기여

내용 오류나 최신 정보는 이슈 또는 PR로 알려주세요. 각 문서 하단의 "이 문서의 오류·최신 정보 제보하기" 링크로 바로 편집할 수 있습니다.

학생 얼굴, 차량번호 등 개인정보가 포함된 자료는 저장소에 올리지 않습니다.
