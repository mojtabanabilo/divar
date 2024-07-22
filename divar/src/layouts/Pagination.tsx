import styles from "./pagination.module.css";

export default function Pagination(props: {
  itemsPerPage: number;
  totalItems: number;
  paginate: Function;
}): JSX.Element {
  const pageNumbers: Array<number> = [];

  // محاسبه تعداد صفحات
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => props.paginate(number)}
              className={styles.pageLink}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
