export type WorkItem = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  link: string
  category: string
  tags: string[]
}

export const worksItems: WorkItem[] = [
  {
    id: 'british',
    title: '학원 운영 페이지',
    description: `학원 운영을 위한
문의 관리 + 게시판 + 관리자 시스템 구축`,
    image: '/thumbnail/thumb_british.png',
    imageAlt: '브랜드 리뉴얼 프로젝트',
    link: 'https://british-speak.vercel.app/',
    category: '웹 서비스',
    tags: ['학원 운영 시스템', '문의 관리 구조', '반응형'],
  },
  {
    id: 'solmont',
    title: '패션 브랜드 소개 랜딩페이지',
    description: `브랜드의 철학과 감성을 중심으로 구성한
패션 브랜드 소개 랜딩 페이지입니다.
이미지와 스토리텔링을 통해 브랜드 가치를 전달합니다.`,
    image: '/thumbnail/thumb_solmont.png',
    imageAlt: '예약 관리 시스템',
    link: 'https://solmontproject.vercel.app/',
    category: '랜딩 페이지',
    tags: ['브랜드 아이덴티티', '스토리텔링', '반응형'],
  },
  {
    id: 'solfood',
    title: '요식업 소개 및 판매 웹페이지',
    description: `방문자를 실제 주문 고객으로 전환하도록 설계된
전환 중심 레스토랑 랜딩 페이지입니다.
브랜드 신뢰와 매출 상승을 동시에 고려했습니다.`,
    image: '/thumbnail/thumb_solfood.png',
    imageAlt: '요식업 소개 및 판매 웹페이지',
    link: 'https://solfood-eight.vercel.app/',
    category: '프로모션 페이지',
    tags: ['반응형', '인터랙션', '모바일 최적화'],
  },
]
