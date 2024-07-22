import { useState } from "react";
import { sp } from "../../utils/numbers";
import styles from "./main.module.css";
import Modal from "./Modal";
import Pagination from "../../layouts/Pagination";

export default function Main(props: {
  data: any;
  pagination: {
    paginate: Function;
    currentItems: Array<any>;
    itemsPerPage: number;
  };
}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPost, setCurrentpost] = useState<{
    id: string;
    data: Array<any>;
  }>({
    id: "",
    data: [],
  });

  const detailHandler = (id: string, data: Array<any>) => {
    setIsModalOpen(true);
    setCurrentpost({ id, data });
  };

  return (
    <div className={styles.main}>
      {isModalOpen && <Modal data={currentPost} view={setIsModalOpen} />}
      <div className={styles.container}>
        {props.pagination?.currentItems?.map((post: any) => (
          <div
            key={post._id}
            className={styles.card}
            onClick={() => detailHandler(post._id, props.data.data?.posts)}
          >
            <div className={styles.info}>
              <p>{post.options.title}</p>
              <div>
                <p>{sp(post.amount)} تومان</p>
                <span>{post.options.city}</span>
              </div>
            </div>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
              alt="image-post"
            />
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={props.pagination.itemsPerPage}
        totalItems={props.data.data.posts.length}
        paginate={props.pagination.paginate}
      />
    </div>
  );
}
