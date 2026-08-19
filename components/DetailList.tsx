type Detail = { label: string; value: string };

export default function DetailList({ details }: { details: Detail[] }) {
  return (
    <div className="detail-list">
      {details.map((detail) => (
        <div className="detail" key={detail.label}>
          <span>{detail.label}</span>
          <b>{detail.value}</b>
        </div>
      ))}
    </div>
  );
}
