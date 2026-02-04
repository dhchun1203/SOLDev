# SOLDev Portfolio

SOLDev 웹 개발 서비스를 소개하는 **단일 페이지 애플리케이션(SPA)** 포트폴리오 사이트입니다.  
백엔드 없이 정적 프론트엔드만으로 구성되어 있으며, 미니멀하고 깔끔한 디자인을 지향합니다.

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| **프레임워크** | React 19 |
| **언어** | TypeScript |
| **빌드/개발** | Vite 7 |
| **스타일** | CSS (CSS Variables 기반 테마) |
| **배포** | 정적 빌드 (Vercel 등 호스팅 가능) |

- **백엔드**: 없음 (정적 SPA)
- **라우팅**: 앵커 링크 기반 단일 페이지

---

## 주요 기능

### 페이지 구성

1. **히어로 (Hero)**  
   - 오픈 특가 메시지, CTA 버튼, 히어로 카드(포트폴리오 활용 안내)

2. **오픈 특가 안내 (Services)**  
   - 오픈 특가 조건, 포트폴리오 활용 안내

3. **진행 방식 & 기술 사양 (Portfolio)**  
   - 진행 방식(5단계), 기술 사양(React/Next.js, 반응형, Vercel, SEO, 인터랙티브 UI), 분쟁 방지 안내

4. **포트폴리오 (Works)**  
   - 제작 프로젝트 카드(이미지, 카테고리, 설명, 태그) — 현재 더미 이미지 사용

5. **가격 (Pricing)**  
   - 베이직 패키지 / 서비스형 패키지 (오픈 특가·정상가 표시)

6. **푸터**  
   - 브랜드(로고·설명), 네비게이션, 저작권

### UI/UX

- **다크 모드**  
  - 헤더 토글 스위치로 전환  
  - `localStorage` 저장 및 `prefers-color-scheme` 초기 감지  
  - CSS Variables로 라이트/다크 테마 전환

- **반응형**  
  - 모바일 / 태블릿 / 데스크탑 브레이크포인트  
  - 그리드 열 수 및 레이아웃 조정

- **스크롤 인터랙션**  
  - Intersection Observer로 섹션 헤더·카드 등에 fade-in / slide-up 애니메이션  
  - 스크롤 시 헤더 스타일 변경 (`scrolled` 클래스)  
  - 300px 이상 스크롤 시 **맨 위로** 버튼 표시 (우측 하단, 부드러운 스크롤)

- **인터랙션**  
  - 네비게이션·버튼·카드 호버 효과  
  - GPU 가속(`transform3d`, `will-change`)으로 전환 부드럽게 처리

---

## 프로젝트 구조

```
Portfolio/
├── public/           # 정적 자산
├── src/
│   ├── App.tsx       # 메인 SPA 컴포넌트 (헤더, 섹션, 푸터, 다크모드/스크롤 로직)
│   ├── App.css       # 섹션·카드·버튼·반응형·다크모드 스타일
│   ├── index.css     # 전역 스타일, CSS Variables(라이트/다크)
│   ├── main.tsx      # 진입점
│   └── assets/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (HMR)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 요약

- **SOLDev** 브랜드의 **오픈 특가** 포트폴리오/웹 제작 안내용 SPA  
- **React + TypeScript + Vite** 기반, **CSS Variables**로 다크 모드 및 테마 관리  
- **반응형 + 스크롤 애니메이션 + 토글 다크모드 + ScrollToTop** 등 인터랙티브 요소 포함  
- 백엔드 없이 정적 배포 가능 (Vercel 등)
