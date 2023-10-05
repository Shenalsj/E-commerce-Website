import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchCategories } from "../../features/category/categorySlice";
import CategoryProducts from "./CategoryProducts";



const Category = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={category.id === selectedCategory ? "selected" : ""}
            >
              {category.name}
            </button>
          ))}
          {selectedCategory !== null && (
            <CategoryProducts categoryId={selectedCategory} /> 
           
          )}
    
        </div>
      )}
    </div>
  );
};


export default Category;
