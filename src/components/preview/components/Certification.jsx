const Certification = ({ title, certifications }) => {
  return (
    certifications.length > 0 && (
      <div>
        <h2 className="section-title">{title}</h2>
        <ul className="sub-content text-body list-disc ul-padding space-y-1">
          {certifications.map((certification, index) => (
            <li key={index}>{certification}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Certification;
