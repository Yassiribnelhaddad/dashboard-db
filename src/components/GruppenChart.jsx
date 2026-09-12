import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LabelList, ResponsiveContainer,
} from "recharts";

export default function GruppenChart({ daten }) {
  return (
    <section className="block">
      <h2>Welche Züge sind am unpünktlichsten?</h2>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={daten} layout="vertical" margin={{ left: 10, right: 60 }}>
          <CartesianGrid stroke="#e1e0d9" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="zuggruppe" width={120} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(w) => w.toLocaleString("de-DE") + " % pünktlich"} />
          <Bar dataKey="prozent_pkt" fill="#2a78d6" barSize={22}>
            <LabelList
              dataKey="prozent_pkt"
              position="right"
              formatter={(w) => w.toLocaleString("de-DE") + " %"}
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="hinweis">Nur jeder zweite Fernzug war pünktlich.</p>
    </section>
  );
}
