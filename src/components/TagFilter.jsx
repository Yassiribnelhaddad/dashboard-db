const KURZ = {
  Monday: "Mo", Tuesday: "Di", Wednesday: "Mi", Thursday: "Do",
  Friday: "Fr", Saturday: "Sa", Sunday: "So",
};

export default function TagFilter({ tage, aktiv, onWechsel }) {
  return (
    <div className="filter">
      <button
        className={aktiv === "woche" ? "aktiv" : ""}
        onClick={() => onWechsel("woche")}
      >
        Ganze Woche
      </button>

      {tage.map((t) => (
        <button
          key={t.datum}
          className={aktiv === t.datum ? "aktiv" : ""}
          onClick={() => onWechsel(t.datum)}
        >
          {KURZ[t.wochentag]}
        </button>
      ))}
    </div>
  );
}
