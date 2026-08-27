'use client';

import { useState } from 'react';

import styles from './book-shelf-client.module.scss';

type TGenre = '소설' | '에세이' | '인문' | '예술';
type TSort = 'popular' | 'recent' | 'title';
type TBookTemplate = {
  title: string;
  author: string;
  genre: TGenre;
  color: string;
};
type TBook = TBookTemplate & {
  id: string;
  year: number;
  popularity: number;
};

const BOOK_TEMPLATES: TBookTemplate[] = [
  { title: '여름이 머문 자리', author: '김서윤', genre: '소설', color: '#e6a271' },
  { title: '작은 방의 오후', author: '박도윤', genre: '에세이', color: '#789b87' },
  { title: '생각하는 손', author: '이해인', genre: '인문', color: '#6d7a9d' },
  { title: '빛을 모으는 사람들', author: '최은하', genre: '예술', color: '#b98d79' },
  { title: '보통의 우정', author: '한지민', genre: '소설', color: '#8c789b' },
  { title: '느린 식탁', author: '오수빈', genre: '에세이', color: '#c6a66b' },
  { title: '도시를 읽는 법', author: '정우진', genre: '인문', color: '#637f86' },
  { title: '선과 면 사이', author: '윤해솔', genre: '예술', color: '#ca857b' },
  { title: '밤의 산책자', author: '서하진', genre: '소설', color: '#4e6177' },
  { title: '사소한 기록', author: '문유진', genre: '에세이', color: '#9a806e' },
  { title: '질문의 구조', author: '배현수', genre: '인문', color: '#777f6f' },
  { title: '고요한 형태', author: '신다은', genre: '예술', color: '#9e8099' },
];

const GENRES: Array<TGenre | '전체'> = ['전체', '소설', '에세이', '인문', '예술'];

const BOOKS: TBook[] = Array.from({ length: 480 }, (_, index) => {
  const template = BOOK_TEMPLATES[index % BOOK_TEMPLATES.length];
  const edition = Math.floor(index / BOOK_TEMPLATES.length) + 1;

  return {
    ...template,
    id: `${template.title}-${edition}`,
    title: `${template.title} ${edition}`,
    year: 2020 + (index % 6),
    popularity: 480 - index,
  };
});

function sortBooks(books: TBook[], sort: TSort) {
  if (sort === 'recent') {
    return books.sort((firstBook, secondBook) => secondBook.year - firstBook.year);
  }

  if (sort === 'title') {
    return books.sort((firstBook, secondBook) => firstBook.title.localeCompare(secondBook.title));
  }

  return books.sort((firstBook, secondBook) => secondBook.popularity - firstBook.popularity);
}

export default function BookShelfClient() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<TGenre | '전체'>('전체');
  const [sort, setSort] = useState<TSort>('popular');

  const filteredBooks = sortBooks(
    BOOKS.filter((book) => {
      const isMatchedQuery = `${book.title}${book.author}`.includes(query.trim());
      const isMatchedGenre = genre === '전체' || book.genre === genre;

      return isMatchedQuery && isMatchedGenre;
    }),
    sort,
  );

  return (
    <main className={styles['main']}>
      <section className={styles['intro']}>
        <p className={styles['eyebrow']}>BOOK SHELF</p>
        <h1>읽고 싶은 이야기를 찾습니다.</h1>
        <p>오늘의 기분과 취향에 맞는 책을 서랍처럼 꺼내 보세요.</p>
      </section>

      <section aria-label="도서 검색" className={styles['catalog']}>
        <div className={styles['controls']}>
          <label className={styles['search-field']}>
            <span className={styles['visually-hidden']}>책 또는 작가 검색</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="제목이나 작가를 검색하세요"
              type="search"
              value={query}
            />
          </label>
          <div aria-label="장르 필터" className={styles['genre-list']}>
            {GENRES.map((item) => (
              <button
                className={styles['genre-button']}
                data-selected={genre === item}
                key={item}
                onClick={() => setGenre(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <label className={styles['sort-field']}>
            <span>정렬</span>
            <select onChange={(event) => setSort(event.target.value as TSort)} value={sort}>
              <option value="popular">인기순</option>
              <option value="recent">최신순</option>
              <option value="title">제목순</option>
            </select>
          </label>
        </div>

        <div className={styles['result-heading']}>
          <h2>찾은 책</h2>
          <output aria-live="polite">{filteredBooks.length}권</output>
        </div>
        <ul className={styles['book-list']}>
          {filteredBooks.map((book) => (
            <li className={styles['book-card']} key={book.id}>
              <div className={styles['book-cover']} style={{ backgroundColor: book.color }}>
                <span>{book.genre}</span>
                <strong>{book.title}</strong>
                <small>{book.author}</small>
              </div>
              <div className={styles['book-info']}>
                <p>{book.genre}</p>
                <h3>{book.title}</h3>
                <span>
                  {book.author} · {book.year}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
