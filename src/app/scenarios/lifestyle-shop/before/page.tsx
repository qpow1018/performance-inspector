import type { Metadata } from 'next';

import LifestyleShopBeforeClient from './_component/LifestyleShopBeforeClient';

export const metadata: Metadata = {
  title: 'Everyday Market Before | Performance Inspector',
  description: '여러 상품 섹션과 API 요청이 있는 범용 마켓의 기준선 화면입니다.',
};

export default function LifestyleShopBeforePage() {
  return <LifestyleShopBeforeClient />;
}
