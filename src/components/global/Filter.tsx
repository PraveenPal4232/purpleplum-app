interface Props {
  CategoryData: any;
  handleCategory: any;
}

const Filter: React.FC<Props> = ({ CategoryData, handleCategory }) => {
  return (
    <aside id="filter">
      <h3 className="text-center">Filter Categories</h3>
      <ul className="filter-categories">
        {CategoryData.map((category: any) => (
          <li className="filter-categories-item" key={category}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category}
              id={`category-${category}`}
              onClick={() => handleCategory(category)}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor={`category-${category}`}
            >
              {category}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Filter;
