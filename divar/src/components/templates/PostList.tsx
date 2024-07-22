import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./postList.module.css";
import { getPosts } from "../../services/user";
import Loader from "../modules/Loader";
import { sp } from "../../utils/numbers";
import { useEffect } from "react";

export default function PostList(): JSX.Element {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["my-post-list"], getPosts, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["my-post-list"],
        refetchType: "active",
      }),
  });
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data?.data.posts.map((post: any) => (
            <div key={post._id} className={styles.post}>
              <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
