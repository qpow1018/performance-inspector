import Image from 'next/image';

import styles from './lifestyle-shop-landing.module.scss';

type TProduct = {
  name: string;
  brand: string;
  price: string;
  image: string;
  alt: string;
};

const PRODUCTS: TProduct[] = [
  {
    name: '스틸 다이얼 워치',
    brand: 'OBJECT STANDARD',
    price: '148,000원',
    image: '/images/lifestyle-shop/watch.jpg',
    alt: '밝은 배경 위에 놓인 은색 손목시계',
  },
  {
    name: '데일리 러너',
    brand: 'COMMON PACE',
    price: '89,000원',
    image: '/images/lifestyle-shop/sneakers.jpg',
    alt: '주황색과 흰색이 섞인 운동화',
  },
  {
    name: '스톤 캔들',
    brand: 'SLOW HOURS',
    price: '32,000원',
    image: '/images/lifestyle-shop/candle.jpg',
    alt: '유리 용기에 담긴 향초',
  },
  {
    name: '실버 라인 링',
    brand: 'FORM AND FORM',
    price: '56,000원',
    image: '/images/lifestyle-shop/jewelry.jpg',
    alt: '손가락에 낀 은색 반지',
  },
  {
    name: '라운드 라운지 체어',
    brand: 'HOME FORM',
    price: '420,000원',
    image: '/images/lifestyle-shop/chair.jpg',
    alt: '밝은 실내에 놓인 나무 의자',
  },
  {
    name: '코튼 라운지 체어',
    brand: 'HOME FORM',
    price: '368,000원',
    image: '/images/lifestyle-shop/lounge-chair.jpg',
    alt: '밝은 거실에 놓인 푹신한 의자',
  },
];

export default function LifestyleShopLanding() {
  return (
    <main className={styles['main']}>
      <section className={styles['intro']}>
        <div className={styles['intro-content']}>
          <p className={styles['eyebrow']}>LIFESTYLE SHOP</p>
          <h1>매일 곁에 둘 물건을 고릅니다.</h1>
          <p>쓰임과 질감이 오래 남는 생활의 물건을 모았습니다.</p>
        </div>
        <div className={styles['feature-image']}>
          <Image
            alt="밝은 실내에 놓인 나무 의자"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            src="/images/lifestyle-shop/chair.jpg"
            unoptimized
          />
        </div>
      </section>

      <section className={styles['product-section']}>
        <div className={styles['section-heading']}>
          <div>
            <p className={styles['eyebrow']}>NEW ARRIVALS</p>
            <h2>새로 들어온 물건</h2>
          </div>
          <p>6 items</p>
        </div>
        <ul className={styles['product-list']}>
          {PRODUCTS.map((product) => (
            <li className={styles['product-card']} key={product.name}>
              <div className={styles['product-image']}>
                <Image
                  alt={product.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, 33vw"
                  src={product.image}
                  unoptimized
                />
              </div>
              <div className={styles['product-info']}>
                <p>{product.brand}</p>
                <h3>{product.name}</h3>
                <span>{product.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
