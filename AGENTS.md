# AGENTS.md

## 프로젝트 참고사항

- 패키지 매니저는 npm입니다. 의존성을 변경하면 `package-lock.json`도 함께 관리하세요.
- Sass 변수는 `next.config.mjs`에서 전역 주입됩니다.
- 성능 시나리오는 서로 독립된 App Router 경로로 관리합니다.

## 명령어

저장소 루트에서 실행하세요.

```bash
npm run dev
npm run lint
npm run format:check
npm run build
npm run build:turbopack
```

참고:

- 일반적인 코드 변경 후에는 `npm run lint`를 실행하세요.
- 수정한 파일의 포맷이 필요할 때만 `npm run format`을 실행하세요.
- `npm run build`는 Webpack production build입니다.
- 현재 환경에서는 Sass 처리 중 Turbopack build가 실패할 수 있으므로, 일반 검증에는 `npm run build`를 우선 사용하세요.
- Turbopack 자체를 확인해야 할 때만 `npm run build:turbopack`을 사용하고, 실패하면 해당 사실을 보고하세요.

## 수정 제외 경로

명시적인 요청이 없다면 다음 파일과 디렉터리를 수정하지 마세요.

- `node_modules/`
- `.next/`
- `next-env.d.ts`
- `tsconfig.tsbuildinfo`

## 작업 스킬

- 프론트엔드 TypeScript, React, Next.js route, 클라이언트 저장소, UI, SCSS 작성·수정·리뷰·리팩터링에는 프로젝트 스킬 `$following-performance-inspector-frontend-style`을 적용하세요.

## 검증 체크리스트

작업을 마치기 전에 변경 범위에 맞는 가장 작은 검증을 선택하세요.

- TypeScript, React, SCSS 관련 소스 변경: `npm run lint`.
- 포맷팅 영향이 있거나 많은 파일을 수정한 경우: `npm run format:check`.
- Next 설정, 라우팅, metadata, production 성능 측정 조건에 영향이 있으면 `npm run build`.
- 시각적 라우트를 바꾼 경우 가능하면 해당 경로를 로컬에서 확인하세요.

검증 명령을 실행하지 못했다면 이유를 명확히 보고하세요.
