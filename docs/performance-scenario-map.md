# 성능 시나리오 지도

## 목적

이 프로젝트는 성능 기법 목록을 보여주는 데모가 아니다. 각 사용자 흐름에서 성능 저하를 재현하고, 같은 조건에서 측정·원인 분석·개선·재검증하는 Next.js 실험장이다.

모든 사례는 다음 기록을 남긴다.

1. 사용자 흐름과 측정 조건
2. 재현한 병목과 관찰 도구
3. 원인 가설과 근거
4. 적용한 변경과 선택 이유
5. 같은 조건에서의 전후 결과

Lighthouse는 통제된 실험실 환경의 진단 도구다. 실제 사용자 경험을 대표하는 필드 데이터와 동일시하지 않는다. 특히 Lighthouse는 사용자 입력이 없으므로 INP를 직접 측정하지 못하며, 실험실에서는 TBT를 보조 지표로 사용한다.

## 분류

### 시나리오 페이지

헤더 메뉴에 표시할 대상이다. 각 페이지는 하나의 대표 사용자 흐름과 성능 문제를 가진다.

| 우선순위 | 시나리오           | 대표 사용자 흐름                            | 핵심 관찰                                       | 개선 후 검증                               |
| -------- | ------------------ | ------------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| 1        | 기준 소개 페이지   | 처음 방문해 서비스 내용을 읽는다            | Lighthouse 기준선, LCP 후보, 요청 순서          | production build에서 동일 조건 재측정      |
| 1        | 이미지 전달        | 이미지가 많은 콘텐츠를 탐색한다             | 전송 바이트, LCP 이미지 우선순위, CLS           | 이미지 형식·크기·우선순위 변경 전후 비교   |
| 1        | 긴 목록            | 많은 항목을 스크롤하고 다음 목록을 읽는다   | 프레임, 메인 스레드, DOM 수, 메모리             | 스크롤 trace와 DOM/heap 비교               |
| 1        | 렌더링 상호작용    | 필터·정렬·선택으로 화면을 갱신한다          | React commit 비용, 긴 작업, 반응성              | React Profiler와 Performance trace 비교    |
| 1        | JavaScript 전달    | 필요할 때만 무거운 UI를 연다                | 초기 client JavaScript, import chain, 로딩 시점 | 번들 분석과 production route 로딩 비교     |
| 2        | 레이아웃 안정성    | 비동기 콘텐츠와 이미지가 표시된 뒤 읽는다   | CLS, 레이아웃 이동 원인                         | 공간 예약 전후 비교                        |
| 2        | 서버 응답과 렌더링 | 서버 데이터를 받아 첫 화면을 연다           | TTFB, 서버 응답, loading UI                     | production 서버와 요청 trace 비교          |
| 2        | Server/Client 경계 | 상호작용이 필요한 부분만 hydrate한다        | client bundle, hydration 범위                   | 경계 변경 전후 bundle/trace 비교           |
| 2        | 메모리 수명        | 화면을 반복 진입·이탈하거나 장시간 사용한다 | heap, detached node, listener/timer 잔존        | heap snapshot 또는 allocation profile 비교 |

### 실무 화면 기반 시나리오

앞의 시나리오는 병목의 종류를 기준으로 나눈다. 아래 시나리오는 실제 서비스에서 자주 마주치는 화면 형태를 기준으로 병목을 재현한다. 한 화면에 여러 문제가 있을 수 있으므로, 각 구현에서는 대표 사용자 흐름과 대표 병목 하나를 먼저 정한다.

| 시나리오 | 대표 사용자 흐름 | 자주 발생하는 병목 | 연결되는 기존 시나리오 |
| --- | --- | --- | --- |
| 상품 목록 | 많은 상품을 훑고 계속 스크롤한다 | 카드 이미지 전송량, 누적 DOM, 스크롤 중 렌더링, 레이아웃 이동 | 이미지 전달, 긴 목록, 레이아웃 안정성 |
| 메인 페이지 | 처음 방문해 여러 섹션을 읽고 주요 행동을 찾는다 | 큰 초기 DOM, 여러 컴포넌트의 hydration, 폰트·서드파티 스크립트, 초기 JavaScript | JavaScript 전달, 렌더링 상호작용, Server/Client 경계 |
| 기능 복합 화면 | 한 화면에서 여러 기능과 데이터를 사용한다 | API 요청 waterfall, 중복 요청, 느린 서버 응답, 각 위젯의 독립 로딩 | 서버 응답과 렌더링 |
| 검색·필터·정렬 | 검색어를 입력하거나 조건을 바꿔 결과를 좁힌다 | 입력마다 발생하는 재렌더링·요청, 큰 목록 재계산, 늦은 상호작용 반응 | 렌더링 상호작용, 긴 목록, 서버 응답과 렌더링 |
| 지도·차트·에디터 | 무거운 화면을 열고 확대·이동·편집한다 | 큰 브라우저 전용 라이브러리, Canvas·SVG·DOM 갱신, 메인 스레드 긴 작업 | JavaScript 전달, 렌더링 상호작용 |
| 마이페이지·대시보드 | 로그인 뒤 요약 정보와 여러 위젯을 확인한다 | 사용자·권한·위젯 데이터의 의존 요청, 초기 로딩 중 빈 화면, 중복 데이터 요청 | 서버 응답과 렌더링, Server/Client 경계 |
| 서드파티가 많은 페이지 | 콘텐츠를 읽거나 결제·상담 같은 외부 기능을 사용한다 | 분석·광고·상담·결제 스크립트, 웹 폰트, 렌더 차단 자원 | JavaScript 전달, 이미지 전달 |
| 장시간 사용하는 관리 화면 | 화면을 반복 진입·이탈하거나 오래 켜 둔다 | 폴링·구독·타이머·차트 인스턴스·object URL의 해제 누락 | 메모리 수명 |
| 잦은 페이지 전환 | 목록과 상세를 오가며 여러 화면을 탐색한다 | 큰 route chunk, 전환 시 데이터 재요청, 부적절한 prefetch | JavaScript 전달, 서버 응답과 렌더링 |

상품 목록의 많은 이미지와 메인 페이지의 큰 DOM은 비슷해 보일 수 있지만, 관찰하는 흐름이 다르다. 상품 목록은 스크롤 중 누적되는 비용을, 메인 페이지는 첫 화면이 준비되는 비용을 중심으로 측정한다. API 요청 수 자체도 문제의 증거가 아니며, 중요한 콘텐츠가 늦어지는지, 요청이 순차 의존하는지, 같은 데이터를 중복 요청하는지를 함께 확인한다.

### 공통 측정·운영 기반

헤더 메뉴를 위한 페이지가 아니다. 여러 시나리오의 결과를 측정하거나 운영에서 관찰하기 위한 기반이다.

| 주제                | 역할                                         | 도입 시점                   | 주의점                                                      |
| ------------------- | -------------------------------------------- | --------------------------- | ----------------------------------------------------------- |
| Lighthouse          | 기준선과 개선 기회 진단                      | 첫 시나리오부터             | 점수만으로 결론 내리지 않고 조건을 기록한다                 |
| Chrome DevTools     | Network, Performance, Memory trace 분석      | 해당 병목이 생길 때         | 스크롤·입력·메모리는 실제 사용자 흐름을 재현해 기록한다     |
| React Profiler      | React 렌더링/commit 비용 분석                | 렌더링 상호작용 시나리오    | 측정 근거 없이 memoization을 먼저 적용하지 않는다           |
| Bundle Analyzer     | route·client bundle과 import chain 분석      | JavaScript 전달 시나리오    | 큰 패키지와 client boundary를 함께 확인한다                 |
| Core Web Vitals/RUM | 실제 방문자의 LCP, INP, CLS 분포 수집        | 배포 후 실제 방문이 생길 때 | 현재 단계에서는 실제 사용자 데이터가 있다고 주장하지 않는다 |
| Sentry              | 오류, trace, Web Vitals를 운영 관점에서 관찰 | 운영 환경을 만들 때         | 샘플링·개인정보·비용을 먼저 설계한다                        |
| AWS/CloudWatch 로그 | SSR/API 지연을 요청 로그와 함께 조사         | AWS에 배포한 뒤             | request ID와 지연 시간 구조화, 민감정보 제외가 전제다       |
| CI/배포             | Lighthouse 회귀, 빌드 시간, 배포 흐름 관리   | 시나리오가 안정된 뒤        | 기능 구현 전부터 도입하지 않는다                            |

## 시나리오별 측정 원칙

### 기준 소개 페이지

- production build와 production server를 기준으로 Lighthouse를 실행한다.
- 기기, 네트워크, 브라우저, 캐시 상태, 실행 횟수를 기록한다.
- Lighthouse 결과는 개선 후보를 찾기 위한 기준선이며 실제 사용자 경험의 증거가 아니다.

### 이미지 전달

- 첫 화면의 LCP 후보 이미지는 무조건 lazy loading하지 않는다.
- 화면 밖 이미지만 lazy loading 후보로 둔다.
- 이미지에는 intrinsic dimension 또는 CSS `aspect-ratio`로 표시 공간을 예약해 CLS를 방지한다.
- 이미지 형식, 실제 표시 크기, 요청 우선순위, 전송 바이트를 함께 본다.

### 긴 목록

- Lighthouse의 최초 로드만으로 스크롤 성능을 판단하지 않는다.
- DevTools Performance trace에서 스크롤 중 프레임과 메인 스레드 작업을 확인한다.
- 단순히 가상화를 적용하기보다, 현재 DOM 수와 렌더링 비용이 병목인지 먼저 확인한다.

### 렌더링 상호작용

- 필터·정렬·선택 같은 구체적인 입력 흐름을 고정한다.
- React Profiler와 Performance trace로 commit 비용과 긴 작업을 확인한다.
- `useMemo`, `useCallback`, `memo`는 원인이 확인된 뒤에만 적용한다.

### JavaScript 전달

- route별 client JavaScript와 import chain을 확인한다.
- Server Component는 기본적으로 client bundle을 만들지 않으며, Client Component와 브라우저 전용 라이브러리의 범위를 특히 확인한다.
- dynamic import는 필요한 UI나 라이브러리를 사용 시점까지 미룰 때 사용한다.

### 서버 응답과 렌더링

- API/SSR 지연은 production 환경의 TTFB, Network timing, 서버 로그를 함께 본다.
- Server Component에서 내부 Route Handler를 다시 호출해 불필요한 서버 요청을 만들지 않는다.
- AWS 로그 확인은 배포와 구조화된 로그가 준비된 이후의 확장 항목이다.

### 메모리 수명

- 페이지 진입·이탈 또는 기능 반복 후 heap이 회수되는지 확인한다.
- 타이머, 이벤트 리스너, 구독, object URL, detached DOM node를 점검 대상에 둔다.
- heap snapshot과 allocation profile로 누수 후보를 분리한다.

## 1차 완성 범위

초기에는 아래 다섯 시나리오를 완성한다.

1. 기준 소개 페이지
2. 이미지 전달
3. 긴 목록
4. 렌더링 상호작용
5. JavaScript 전달

레이아웃 안정성은 이미지 전달 시나리오에 먼저 포함한다. 서버 응답·Server/Client 경계·메모리는 1차 시나리오의 측정 방식이 정리된 뒤 독립한다.

## 공식 참고 자료

- [Core Web Vitals workflows with Google tools](https://web.dev/articles/vitals-tools)
- [Why lab and field data can be different](https://web.dev/articles/lab-and-field-data-differences)
- [Web Vitals](https://web.dev/articles/vitals)
- [Next.js production guide](https://nextjs.org/docs/app/guides/production-checklist)
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/overview)
- [Chrome DevTools Memory](https://developer.chrome.com/docs/devtools/memory)
- [Browser-level image lazy loading](https://web.dev/articles/browser-level-image-lazy-loading)
- [Optimize CLS](https://web.dev/articles/optimize-cls)
- [CloudWatch Logs Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html)
