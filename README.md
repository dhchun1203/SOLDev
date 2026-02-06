# SOLDev Portfolio

SOLDev 웹 개발 서비스를 소개하는 **단일 페이지 애플리케이션(SPA)** 포트폴리오 사이트입니다.  
백엔드 없이 정적 프론트엔드만으로 구성되어 있으며, 미니멀하고 깔끔한 디자인을 지향합니다.

**배포 (Live)**  
[https://sol-dev-eight.vercel.app/](https://sol-dev-eight.vercel.app/)

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| **프레임워크** | React 19 |
| **언어** | TypeScript |
| **빌드/개발** | Vite 7 |
| **스타일** | CSS (CSS Variables 기반 테마) |
| **배포** | Vercel ([sol-dev-eight.vercel.app](https://sol-dev-eight.vercel.app/)) |

- **백엔드**: 없음 (정적 SPA)
- **라우팅**: 앵커 링크 기반 단일 페이지

---

## 주요 기능

### 페이지 구성

1. **코스믹 히어로 (상단 비주얼)**  
   - 다크 그라데이션 + 별 패턴 애니메이션 배경 (40초 주기, GPU 레이어·그라데이션 수 최소화로 성능 최적화)  
   - 배지, 글로우 타이틀 "실제로 쓰이는 웹서비스", 강조 문구  
   - CTA: 포트폴리오 보기 / 가격 확인하기  
   - 뷰포트 100vh 풀 화면, 헤더 뒤로 배경이 겹치도록 구성

2. **히어로 (Hero)**  
   - 오픈 특가 메시지, CTA 버튼, 히어로 카드(포트폴리오 활용 안내)

3. **오픈 특가 안내 (Services)**  
   - 오픈 특가 조건, 포트폴리오 활용 안내

4. **제공 내용 & 진행 방식·기술 사양 (Portfolio)**  
   - **이런 결과물을 제공합니다**: 카드 2개 (웹서비스 형태, 방문자→관리자 흐름)  
   - **진행 방식 & 기술 사양**: 5단계 프로세스, React/Next.js·반응형·Vercel·SEO, 분쟁 방지 안내

5. **포트폴리오 (Works)**  
   - 제작 프로젝트 카드(이미지, 카테고리, 설명, 태그)

6. **가격 (Pricing)**  
   - 베이직 패키지 / 서비스형 패키지 (오픈 특가·정상가 표시)

7. **푸터**  
   - 브랜드(로고·설명), 네비게이션(헤더와 동일 메뉴), 저작권

### 네비게이션

- **메뉴 항목** (섹션과 일치): 소개 → 오픈 특가 → 제공 내용 → 포트폴리오 → 가격  
- **데스크톱**: 헤더에 로고 + 네비 링크 + 다크모드 토글 + 문의하기  
- **모바일**: 헤더에는 로고 + 햄버거 버튼만 노출, 나머지는 **왼쪽 슬라이드 사이드 메뉴** (햄버거 클릭 시 열림, X 형태로 전환 애니메이션). 오버레이·링크 클릭 시 메뉴 닫힘, body 스크롤 잠금 적용.

### UI/UX

- **헤더**  
  - **최상단**: 배경 투명, 로고·네비·버튼 밝은 색  
  - **스크롤 시**: 반투명 배경 + **backdrop-filter** (`blur(8px) saturate(150%)`) 유리 효과, 테두리·상단 광택  
  - 코스믹 섹션 `margin-top: -75px`로 배경이 헤더 뒤까지 겹침

- **다크 모드**  
  - 헤더·사이드 메뉴 토글 스위치로 전환  
  - `localStorage` 저장 및 `prefers-color-scheme` 초기 감지  
  - CSS Variables로 라이트/다크 테마 전환

- **반응형**  
  - **모바일 (≤767px)**: 1열 그리드, 사이드 메뉴, 푸터 터치 영역·safe-area 적용  
  - **태블릿 (768px~1023px)**: 2열 그리드  
  - **데스크톱 (≥1024px)**: 2~3열 그리드  
  - `viewport-fit=cover`로 노치·홈 인디케이터 영역 대응

- **섹션 헤더**  
  - 왼쪽 테일 그라데이션 악센트 바, font-weight 700, 호버 시 바 두께 확장

- **스크롤 인터랙션**  
  - Intersection Observer로 섹션 헤더·카드 fade-in / slide-up  
  - 스크롤 시 헤더 `scrolled` 클래스·스타일 변경  
  - **ScrollToTop**: 300px 이상 스크롤 시 우측 하단 표시, RAF 스로틀·상태 변경 시에만 리렌더

- **성능**  
  - 코스믹 별: 그라데이션 5개, `will-change: transform`, 40초 애니메이션  
  - 헤더 블러 `blur(8px)`로 부담 완화 (그래픽 가속 권장)  
  - 스크롤 핸들러 `requestAnimationFrame` + 300px 구간에서만 `setShowScrollTop` 호출

---

## 코드·빌드 최적화

- **상수·컴포넌트**: 네비 링크 `NAV_LINKS` 단일 소스, 다크모드 아이콘 `DarkModeIcon` 재사용  
- **콜백**: `closeMenu`, `toggleDarkMode`, `scrollToTop` `useCallback` 메모이제이션  
- **Vite**: `target: es2020`, `manualChunks`로 react/react-dom vendor 분리, CSS minify

---

## 프로젝트 구조

```
SOLDev/
├── public/
├── src/
│   ├── App.tsx       # 메인 SPA (헤더, 사이드 메뉴, 섹션, 푸터, 다크/스크롤/메뉴 로직)
│   ├── App.css       # 레이아웃·반응형·다크·애니메이션 스타일
│   ├── index.css     # 전역, CSS Variables(라이트/다크)
│   ├── main.tsx
│   └── assets/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
└── eslint.config.js
```

---

## 로컬 실행

```bash
npm install
npm run dev    # 개발 서버 (HMR)
npm run build  # 프로덕션 빌드
npm run preview
```

---

## 요약

- **SOLDev** 오픈 특가·포트폴리오/웹 제작 안내용 SPA  
- **React + TypeScript + Vite**, CSS Variables 다크 모드  
- **모바일**: 로고 + 햄버거, 왼쪽 슬라이드 메뉴  
- **헤더**: 스크롤 시 유리 효과(backdrop-filter), 반응형·터치·safe-area  
- **성능**: 코스믹·스크롤·빌드 최적화, 브라우저 그래픽 가속 권장  
- 정적 배포 가능 (Vercel 등)
