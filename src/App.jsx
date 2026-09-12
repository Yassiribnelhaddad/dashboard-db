import { useEffect, useState } from "react";
import "./App.css";
import GruppenChart from "./components/GruppenChart";
import TagFilter from "./components/TagFilter";


function KennzahlKarte({ wert, titel }) {
  return (
    <div className="karte">
      <div className="wert">{wert}</div>
      <div className="titel">{titel}</div>
    </div>
  );
}

export default function App() {
  const [kennzahlen, setKennzahlen] = useState(null);
  const [gruppen, setGruppen] = useState([]);
  const [gruppenTage, setGruppenTage] = useState([]);
  const [tage, setTage] = useState([]);
  const [tag, setTag] = useState("woche");
  const [kennzahlenTage, setKennzahlenTage] = useState([]);


  useEffect(() => {
    fetch("/data/kennzahlen.json").then((r) => r.json()).then((d) => setKennzahlen(d[0]));
    fetch("/data/gruppen.json").then((r) => r.json()).then(setGruppen);
    fetch("/data/gruppen_tage.json").then((r) => r.json()).then(setGruppenTage);
    fetch("/data/tage.json").then((r) => r.json()).then(setTage);
    fetch("/data/kennzahlen_tage.json").then((r) => r.json()).then(setKennzahlenTage);

  }, []);

  if (!kennzahlen ) return <p>Lade Daten …</p>;

  const kz =
  tag === "woche"
    ? kennzahlen
    : kennzahlenTage.find((k) => k.datum === tag) || kennzahlen;

  const gruppenDaten =
    tag === "woche" ? gruppen : gruppenTage.filter((z) => z.datum === tag);

  return (
    <div className="seite">
      <header>
        <h1>Pünktlichkeit am Frankfurter Hauptbahnhof</h1>
        <p>
          6. – 12. Oktober 2025 ·{" "}
          {kz.halte_gesamt.toLocaleString("de-DE")} Halte
        </p>
      </header>

      <section className="kennzahlen">
              <KennzahlKarte wert={kz.prozent_puenktlich.toLocaleString("de-DE") + " %"} titel="pünktlich" />
              <KennzahlKarte wert={(100 - kz.prozent_puenktlich).toFixed(1).replace(".", ",") + " %"} titel="verspätet" />
              <KennzahlKarte wert={kz.prozent_ausgefallen.toLocaleString("de-DE") + " %"} titel="ausgefallen" />
              <KennzahlKarte wert={kz.mittlere_verspaetung.toLocaleString("de-DE") + " Min"} titel="⌀ Verspätung" />
      </section>
      

      <TagFilter tage={tage} aktiv={tag} onWechsel={setTag} />

      {gruppenDaten.length > 0 && <GruppenChart daten={gruppenDaten} />}

            <footer>
        <p>
          Daten:{" "}
          <a href="https://huggingface.co/datasets/piebro/deutsche-bahn-data" target="_blank" rel="noreferrer">
            piebro/deutsche-bahn-data
          </a>{" "}
          (Deutsche Bahn, Lizenz CC BY 4.0)
        </p>
        <p>
          Analyse mit SQL und Python:{" "}
          <a href="https://github.com/Yassiribnelhaddad/verspaetung-db" target="_blank" rel="noreferrer">
            github.com/Yassiribnelhaddad/verspaetung-db
          </a>
        </p>
      </footer>

    </div>
  );
}

