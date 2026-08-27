import Image from 'next/image';
import Link from 'next/link';

import styles from './weekend-map-landing.module.scss';

type TDestination = {
  name: string;
  description: string;
  image: string;
  alt: string;
};

const DESTINATIONS: TDestination[] = [
  {
    name: '경주',
    description: '고요한 회랑을 따라 걷는 저녁 산책',
    image: '/images/weekend-map/card-gyeongju.jpg',
    alt: '붉은 기둥과 청록색 단청이 이어진 경주의 회랑',
  },
  {
    name: '서울',
    description: '도심 가까이에서 만나는 오래된 풍경',
    image: '/images/weekend-map/card-seoul.jpg',
    alt: '초록 지붕을 올려다본 서울 궁궐의 모습',
  },
  {
    name: '제주',
    description: '파도 소리와 바람만 남는 해안의 오후',
    image: '/images/weekend-map/card-jeju.jpg',
    alt: '검은 바위와 푸른 바다가 이어진 제주 해안',
  },
];

export default function WeekendMapLanding() {
  return (
    <main>
      <section className={styles['hero']}>
        <div className={styles['hero-content']}>
          <p className={styles['eyebrow']}>WEEKEND MAP</p>
          <h1 className={styles['title']}>이번 주말, 조금 낯선 풍경으로.</h1>
          <p className={styles['description']}>
            멀리 떠나지 않아도 좋은 하루가 될 수 있도록, 지금 가기 좋은 국내 여행지를 골랐습니다.
          </p>
          <Link className={styles['cta']} href="#recommendations">
            이번 주 추천 보기
          </Link>
        </div>
        <div className={styles['hero-image']}>
          <Image
            alt="노을빛 아래 펼쳐진 전주 한옥마을 전경"
            fill
            preload
            sizes="(max-width: 767px) 100vw, 50vw"
            src="/images/weekend-map/hero-jeonju.jpg"
          />
        </div>
      </section>

      <section className={styles['recommendations']} id="recommendations">
        <div className={styles['section-heading']}>
          <p className={styles['eyebrow']}>THIS WEEK&apos;S PICKS</p>
          <h2>가볍게 떠나기 좋은 세 곳</h2>
        </div>
        <ul className={styles['destination-list']}>
          {DESTINATIONS.map((destination) => (
            <li className={styles['destination-card']} key={destination.name}>
              <div className={styles['card-image']}>
                <Image
                  alt={destination.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  src={destination.image}
                />
              </div>
              <div className={styles['card-content']}>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
