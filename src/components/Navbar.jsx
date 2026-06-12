import { NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", icon: "\u2694", xp: 50 },
  { to: "/gallery", label: "Gallery", icon: "\uD83C\uDFF0", xp: 80 },
];

function Navbar({ score, addScore }) {
  const [pop, setPop] = useState(null);

  const handleClick = (i) => {
    setPop(i);
    addScore(links[i].xp);
    setTimeout(() => setPop(null), 400);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        {links.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            onClick={() => handleClick(i)}
          >
            <span className="nav-icon">{link.icon}</span>
            <span className="nav-label">{link.label}</span>
            {pop === i && <span className="xp-fly">+{link.xp}XP</span>}
          </NavLink>
        ))}
      </div>
      <div className="nav-score">
        <span className="score-icon">&#11088;</span>
        <span className="score-value">{score}</span>
        <span className="score-label">XP to Know Me</span>
      </div>
    </nav>
  );
}

export default Navbar;
