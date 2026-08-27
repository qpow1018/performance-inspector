import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['content']}>
        <Link className={styles['brand']} href="/">
          Performance Inspector
        </Link>
      </div>
    </header>
  );
}
