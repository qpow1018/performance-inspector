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
          <Link className={styles['navigation-link']} href="/lighthouse">
            주말의 지도
          </Link>
        </nav>
      </div>
    </header>
  );
}
