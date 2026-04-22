export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
