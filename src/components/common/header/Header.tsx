import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['content']}>
        <Link className={styles['brand']} href="/">
          Performance Inspector
        </Link>
        <nav aria-label="페이지 메뉴" className={styles['navigation']}>
          <Link className={styles['navigation-link']} href="/scenarios/lifestyle-shop">
            Everyday Market
          </Link>
          <Link className={styles['navigation-link']} href="/scenarios/book-shelf">
            책의 서랍
          </Link>
        </nav>
      </div>
    </header>
  );
}
