import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import { getCategory } from "../services/admin";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";

export default function HomePage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: posts, isLoading: postsLoading } = useQuery(
    ["post-list"],
    getAllPosts
  );
  const { data: category, isLoading: categorysLoading } = useQuery(
    ["get-category"],
    getCategory
  );

  // تغییر صفحه
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // محاسبه داده‌های نمایش داده شده در صفحه فعلی
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts?.data.posts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      {postsLoading || categorysLoading ? (
        <Loader />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar category={category} />
          <Main
            data={posts}
            pagination={{ paginate, currentItems, itemsPerPage }}
          />
        </div>
      )}
    </>
  );
}
