import { Dispatch, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { sp } from "../../utils/numbers";

export default function Modal(props: {
  data: { id: string; data: Array<any> };
  view: Dispatch<React.SetStateAction<boolean>>;
}) {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    setPost(props.data?.data.filter((item) => item._id === props.data.id));
  }, []);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>مشخصات آگهی</h2>
          <span
            className={styles.close_button}
            onClick={() => props.view(false)}
          >
            &times;
          </span>
        </div>
        <div className={styles.first_section}>
          <div className={styles.modal_body}>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${
                post && post[0].images[0]
              }`}
              alt="image-post"
            />
            <div className={styles.info}>
              <h3>{post && post[0].options.title}</h3>
              <p
                style={{
                  width: "80%",
                  textAlign: "right",
                  margin: "10px 0",
                  fontSize: ".8rem",
                }}
              >
                {post && post[0].options.content}
              </p>
              <p>{post && post[0].options.city}</p>
              <p>{post && sp(post[0].amount)} تومان</p>
            </div>
          </div>
        </div>
        <div className={styles.date}>
          <p>
            ساخته شده در:{" "}
            {new Date(post && post[0].createdAt).toLocaleDateString("fa-IR")}
          </p>
          <p>
            بروز شده در:{" "}
            {new Date(post && post[0].updatedAt).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </div>
  );
}
