import type { Metadata } from 'next';

import LifestyleShopLanding from './_component/LifestyleShopLanding';

export const metadata: Metadata = {
  title: '라이프스타일 숍 | Performance Inspector',
  description: '상품 목록의 이미지 전달 성능을 측정하기 위한 라이프스타일 편집숍 페이지입니다.',
};

export default function LifestyleShopPage() {
  return <LifestyleShopLanding />;
}
