'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import styles from './lifestyle-shop-before-client.module.scss';

type TProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  original_price: number | null;
  thumbnail_path: string;
  rating: number;
  review_count: number;
  badge: string | null;
};

type TProductResponse = {
  products: TProduct[];
};

type TProductSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  products: TProduct[];
};

const CATEGORY_SECTIONS = [
  { category: 'beauty', title: '뷰티를 위한 작은 루틴' },
  { category: 'fragrances', title: '공간의 분위기를 바꾸는 향' },
  { category: 'home-decoration', title: '집을 더 편안하게 만드는 물건' },
] as const;

async function getProducts(path: string) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error('상품 정보를 불러오지 못했습니다.');
  }

  return (await response.json()) as TProductResponse;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR').format(price * 1400) + '원';
}

function ProductCard({ product }: { product: TProduct }) {
  return (
    <article className={styles['product-card']}>
      <div className={styles['product-image']}>
        <Image
          alt={product.name}
          fill
          sizes="(max-width: 767px) 52vw, 280px"
          src={product.thumbnail_path}
          unoptimized
        />
      </div>
      <div className={styles['product-info']}>
        <p>{product.brand}</p>
        <h3>{product.name}</h3>
        <span>{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}

function ProductSection({ eyebrow, title, description, products }: TProductSectionProps) {
  return (
    <section className={styles['product-section']}>
      <div className={styles['section-heading']}>
        <div>
          {eyebrow && <p className={styles['eyebrow']}>{eyebrow}</p>}
          <h2>{title}</h2>
          {description && <p className={styles['description']}>{description}</p>}
        </div>
        <button type="button">전체 보기</button>
      </div>
      <div className={styles['product-scroll']}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function LifestyleShopBeforeClient() {
  const [kitchenProducts, setKitchenProducts] = useState<TProduct[]>([]);
  const [popularProducts, setPopularProducts] = useState<TProduct[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, TProduct[]>>({});
  const [newProducts, setNewProducts] = useState<TProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadHomeProducts() {
      try {
        const [kitchen, popular, ...rest] = await Promise.all([
          getProducts('/api/products?categories=kitchen-accessories,groceries&limit=12'),
          getProducts('/api/products?sort=popular&limit=10'),
          ...CATEGORY_SECTIONS.map((section) =>
            getProducts(`/api/products?category=${section.category}&limit=6`),
          ),
          getProducts('/api/products?sort=new&limit=12'),
        ]);

        setKitchenProducts(kitchen.products);
        setPopularProducts(popular.products);
        setCategoryProducts(
          Object.fromEntries(
            CATEGORY_SECTIONS.map((section, index) => [section.category, rest[index].products]),
          ),
        );
        setNewProducts(rest.at(-1)?.products ?? []);
      } catch {
        setErrorMessage('상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }

    void loadHomeProducts();
  }, []);

  return (
    <main className={styles['main']}>
      <section className={styles['hero']}>
        <div className={styles['hero-content']}>
          <p className={styles['eyebrow']}>EVERYDAY MARKET</p>
          <h1>매일의 선택을 조금 더 즐겁게.</h1>
          <p>주방에서 휴식까지, 지금 필요한 물건을 한곳에서 살펴보세요.</p>
          <button type="button">이번 주 추천 보기</button>
        </div>
        <div className={styles['hero-image']}>
          <Image
            alt="밝은 실내에 놓인 나무 의자"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            src="/images/lifestyle-shop/chair.jpg"
            unoptimized
          />
        </div>
      </section>

      {errorMessage ? (
        <p className={styles['error-message']}>{errorMessage}</p>
      ) : (
        <div className={styles['content']}>
          <ProductSection
            eyebrow="KITCHEN & GROCERY"
            title="주방과 식료품을 위한 추천"
            description="매일 쓰는 물건부터 새롭게 발견한 식료품까지 모았습니다."
            products={kitchenProducts}
          />
          <ProductSection
            eyebrow="POPULAR NOW"
            title="오늘의 인기 상품"
            description="많이 살펴보고 오래 사랑받은 상품입니다."
            products={popularProducts}
          />
          <section className={styles['category-section']}>
            <div className={styles['section-heading']}>
              <div>
                <p className={styles['eyebrow']}>FOR YOUR TASTE</p>
                <h2>취향별 추천</h2>
              </div>
            </div>
            <div className={styles['category-list']}>
              {CATEGORY_SECTIONS.map((section) => (
                <ProductSection
                  key={section.category}
                  products={categoryProducts[section.category] ?? []}
                  title={section.title}
                />
              ))}
            </div>
          </section>
          <ProductSection
            eyebrow="JUST ARRIVED"
            title="새로 들어온 상품"
            description="새로운 선택지를 가장 먼저 만나보세요."
            products={newProducts}
          />
          <section className={styles['catalog-cta']}>
            <p>100개의 상품을 더 둘러보세요.</p>
            <button type="button">전체 상품 보기</button>
          </section>
        </div>
      )}
    </main>
  );
}
