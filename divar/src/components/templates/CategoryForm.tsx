import { useState } from "react";
import styles from "./category.module.css";
import { addCategory } from "../../services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CategoryForm(): JSX.Element {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<{
    name: string;
    slug: string;
    icon: string;
  }>({
    name: "",
    slug: "",
    icon: "",
  });

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-category"],
        refetchType: "active",
      }),
  });

  const changeHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {!!error && <p>مشکلی پیش آمده.</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت انجام شد.</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}
