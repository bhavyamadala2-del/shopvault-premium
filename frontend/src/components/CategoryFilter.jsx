const CATEGORY_ICONS = {
  all: '🛍️',
  "men's clothing": '👔',
  "women's clothing": '👗',
  'jewelery': '💎',
  'electronics': '💻',
};

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, products }) => {
  const getCount = (cat) => {
    if (cat === 'all') return products.length;
    return products.filter(p => p.category === cat).length;
  };

  return (
    <aside className="sidebar">
      <p className="sidebar-title">Categories</p>
      <ul className="category-list">
        {['all', ...categories].map((cat) => (
          <li key={cat}>
            <button
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              <span className="category-icon">
                {CATEGORY_ICONS[cat] || '🏷️'}
              </span>
              <span>{cat === 'all' ? 'All Products' : cat}</span>
              <span className="category-count">{getCount(cat)}</span>
            </button>
          </li>
        ))}
      </ul>

      <hr className="sidebar-divider" />

      <p className="sidebar-title">Filters</p>

      <div className="price-range">
        <label>
          Max Price <span>$1000</span>
        </label>
        <input type="range" min="0" max="1000" defaultValue="1000" />
      </div>

      <hr className="sidebar-divider" />

      <p className="sidebar-title">Sort By</p>
      <select className="sort-select" defaultValue="default">
        <option value="default">Featured</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </aside>
  );
};

export default CategoryFilter;
