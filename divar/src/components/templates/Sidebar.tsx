import styles from "./sidebar.module.css";

export default function Sidebar(props: { category: any }): JSX.Element {
  return (
    <div className={styles.sidebar}>
      <h4>دسته ها</h4>
      <ul>
        {props.category.data.map((category: any) => (
          <li key={category._id}>
            <img src={`${category.icon}` + ".svg"} alt="image-category" />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
