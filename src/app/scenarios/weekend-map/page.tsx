import type { Metadata } from 'next';

import WeekendMapLanding from './_component/WeekendMapLanding';

export const metadata: Metadata = {
  title: '주말의 지도 | Performance Inspector',
  description: 'Lighthouse 기준선 측정을 위한 국내 여행 큐레이션 페이지입니다.',
};

export default function WeekendMapPage() {
  return <WeekendMapLanding />;
}
