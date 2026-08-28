import type { Metadata } from 'next';

import LifestyleShopClient from './_component/LifestyleShopClient';

export const metadata: Metadata = {
  title: 'Everyday Market | Performance Inspector',
  description: '여러 상품 섹션과 API 요청이 있는 범용 마켓 홈 화면입니다.',
};

export default function LifestyleShopPage() {
  return <LifestyleShopClient />;
}
