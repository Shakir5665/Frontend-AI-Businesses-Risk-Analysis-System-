import RecommendationCard from './RecommendationCard';

const RecommendationList = ({ recommendations = [] }) => {
  if (!recommendations.length) {
    return (
      <p className="text-sm text-center py-6" style={{ color: 'var(--color-text-secondary)' }}>
        No recommendations available.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((item, index) => (
        <RecommendationCard key={item.id || index} item={item} index={index} />
      ))}
    </div>
  );
};

export default RecommendationList;
