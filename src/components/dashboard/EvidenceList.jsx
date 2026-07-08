import EvidenceCard from './EvidenceCard';

const EvidenceList = ({ evidence = [] }) => {
  if (!evidence.length) {
    return (
      <p className="text-sm text-center py-6" style={{ color: 'var(--color-text-secondary)' }}>
        No evidence available.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {evidence.map((item, index) => (
        <EvidenceCard key={item.id || index} item={item} index={index} />
      ))}
    </div>
  );
};

export default EvidenceList;
