import React from 'react';

type CategoriesProps = {
  value: number;
  setCategoryId: (i: number) => void;
};
const categories = [
  'All',
  'Meat',
  'Vegetarian',
  'Grill',
  'Spicy',
];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, setCategoryId }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((name, i) => (
            <li
              className={value === i ? 'active' : ''}
              onClick={() => {
                setCategoryId(i);
              }}
              key={name}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  })

export default Categories;
