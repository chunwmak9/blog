import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function Gallery({ addScore }) {
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState({});
  const [xpPop, setXpPop] = useState(null);

  useEffect(() => {
    fetch("gallery.md")
      .then((res) => res.text())
      .then((text) => {
        const parts = text.split(/(?=^## )/m);
        const parsed = parts.map((block) => {
          const lines = block.trim().split("\n");
          const title = lines.find((l) => l.startsWith("## "));
          const rest = lines.filter((l) => !l.startsWith("## ")).join("\n").trim();
          return { title: title ? title.replace("## ", "") : null, content: rest };
        }).filter((s) => s.title);
        setSections(parsed);
      });
  }, []);

  const toggle = (idx) => {
    setOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
    if (!open[idx]) {
      addScore(30);
      setXpPop(idx);
      setTimeout(() => setXpPop(null), 400);
    }
  };

  return (
    <div className="content gallery">
      <h1>Gallery</h1>
      {sections.map((s, i) => (
        <div key={i} className={`gallery-block ${open[i] ? "open" : ""}`}>
          <button className="gallery-toggle" onClick={() => toggle(i)}>
            <span className="gallery-arrow">{open[i] ? "▼" : "▶"}</span>
            {s.title}
            {xpPop === i && <span className="xp-fly">+30XP</span>}
          </button>
          <div className="gallery-body">
            <ReactMarkdown>{s.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
