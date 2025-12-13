export function Loading() {
  return (
    <div className="loading-container">
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
