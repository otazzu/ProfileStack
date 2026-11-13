const DateRange = ({startYear, endYear, id}) => {
  if (!startYear) {
    return <span id={id} className="sub-content"></span>;
  }

  const formatDate = (value) => {
    const match = /^(\d{4})-(\d{2})/.exec(value);
    if (match) {
      return `${match[2]}/${match[1]}`;
    }
    const yearOnly = /^(\d{4})/.exec(value);
    return yearOnly ? yearOnly[1] : null;
  };

  const startStr = formatDate(startYear);
  const endStr = endYear ? formatDate(endYear) : null;

  return (
    <span id={id} className="sub-content">
      {startStr} - {endStr || "Presente"}
    </span>
  );
};

export default DateRange;
