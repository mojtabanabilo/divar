import styles from "./addPost.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../utils/cookies";
import toast from "react-hot-toast";

export default function Addpost(): JSX.Element {
  const [form, setForm] = useState<any>({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });
  const { data } = useQuery(["get-category"], getCategory);

  const addHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const token = getCookie("accessToken");

    for (const i in form) {
      formData.append(i, form[i]);
    }

    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch((err) => {
        console.log(err);
        toast.error("مشکلی پیش آمده است.");
      });
  };

  const changeHandler = (e: any) => {
    if (e.target.name !== "images") {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((i: any) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler}>ایجاد</button>
    </form>
  );
}
