import type { Metadata } from 'next';

import BookShelfClient from './_component/BookShelfClient';

export const metadata: Metadata = {
  title: '책의 서랍 | Performance Inspector',
  description: '검색과 필터 변경 시 목록 렌더링 반응성을 측정하기 위한 도서 탐색 페이지입니다.',
};

export default function BookShelfPage() {
  return <BookShelfClient />;
}
