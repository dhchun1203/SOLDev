export type PriceFeature = {
  text: string
  included: boolean
  variant?: 'featured' | 'growth'
}

export type PricePackage = {
  id: string
  name: string
  tagline: string
  price: string
  priceUnit?: string
  originalPrice?: string
  variant?: 'basic' | 'featured' | 'growth'
  features: PriceFeature[]
  meta: string[]
  ctaLabel: string
  ctaVariant: 'primary' | 'ghost'
}

export const pricingPackages: PricePackage[] = [
  {
    id: 'basic',
    name: '베이직 패키지',
    tagline: '원 페이지 랜딩 사이트가 필요하신 경우',
    price: '20',
    priceUnit: '만 원',
    originalPrice: '정상가 40만 원',
    variant: 'basic',
    features: [
      { text: '소개용 1페이지 랜딩(반응형 + SEO 기본)', included: true },
      { text: 'PC/태블릿/모바일 반응형', included: true },
      { text: '기본 인터랙티브 요소(버튼/스크롤 UI)', included: true },
      { text: 'SEO 기본 구조 적용', included: true },
      { text: '배포 + 도메인 연결 지원', included: true },
      { text: '예약/문의 기능', included: false },
      { text: '관리자 페이지', included: false },
    ],
    meta: ['제작 기간: 약 3영업일', '수정 3회 포함'],
    ctaLabel: '상담 신청',
    ctaVariant: 'ghost',
  },
  {
    id: 'featured',
    name: '서비스 패키지',
    tagline: '예약·문의까지 한 번에 필요하신 경우',
    price: '40',
    priceUnit: '만 원',
    originalPrice: '정상가 80만 원',
    variant: 'featured',
    features: [
      { text: '소개 랜딩 + 예약/문의 + 관리자 페이지', included: true, variant: 'featured' },
      { text: '예약/문의 데이터 저장(DB 연동)', included: true, variant: 'featured' },
      { text: '관리자 로그인/내역 조회/상태 변경', included: true, variant: 'featured' },
      { text: '반응형 + 터치 친화 UI', included: true, variant: 'featured' },
      { text: 'SEO 구조 설계 + 배포 지원', included: true, variant: 'featured' },
    ],
    meta: ['제작 기간: 약 5영업일', '수정 5회 포함', '고도화 기능은 추가 개발(별도 협의)'],
    ctaLabel: '상담 신청',
    ctaVariant: 'primary',
  },
  {
    id: 'growth',
    name: '그로스 패키지',
    tagline: '5페이지 규모 + API 연동이 필요한 경우',
    price: '80',
    priceUnit: '만 원',
    originalPrice: '정상가 120만 원',
    variant: 'growth',
    features: [
      { text: '5페이지 구성(메인·상세·예약/문의·콘텐츠·대시보드)', included: true, variant: 'growth' },
      { text: '서비스형 패키지 전체 포함', included: true, variant: 'growth' },
      { text: '외부 API 연동(CRM/슬랙/결제 등 1~2개 시스템)', included: true, variant: 'growth' },
      { text: '관리자·대시보드 포함', included: true, variant: 'growth' },
      { text: '챗봇 연동', included: true, variant: 'growth' },
    ],
    meta: ['제작 기간: 약 7~10영업일', '수정 8회 포함', '연동 범위·시스템은 협의'],
    ctaLabel: '상담 신청',
    ctaVariant: 'primary',
  },
]
