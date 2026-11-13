const Language = ({ title, languages }) => {
  return (
    languages.length > 0 && (
      <div>
        <h2 className="section-title">{title}</h2>
        {languages.map((lang, index) => {
          const language = typeof lang === "string" ? lang : lang.language;
          const proficiency = typeof lang === "string" ? "" : lang.proficiency;
          return (
            <div key={index} className="flex flex-row items-center justify-between">
              <p className="content text-black font-bold text-[12px]">{language}</p>
              <p className="sub-content text-meta text-[11px]">{proficiency}</p>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Language;
