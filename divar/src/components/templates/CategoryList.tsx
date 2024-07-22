import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./categoryList.module.css";
import { deleteCategory, getCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import trash from "/trash.svg";

export default function CategoryList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["get-category"], getCategory);
  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-category"],
        refetchType: "active",
      }),
  });

  const deleteHandler = (id: string, event: any) => {
    event.preventDefault();
    mutate(id);
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data.map((i: any) => (
          <div key={i._id} className={styles.container}>
            <div className={styles.section_1}>
              <img src={`../../${i.icon}` + ".svg"} />
              <h5>{i.name}</h5>
            </div>
            <div className={styles.section_2}>
              <p>slug: {i.slug}</p>
              <button
                onClick={(event) => deleteHandler(i._id, event)}
                disabled={isLoading}
              >
                <img src={trash} alt="delete-slugs" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
