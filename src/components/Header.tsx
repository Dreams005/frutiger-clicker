import "../css/Header.css";

const Header: React.FC = () => {
  const text = "Frutiger Clicker";

  return (
    <div className="container-header">
      <header className="wave-header">
        Welcome to{" "}
        <strong>
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="wave-letter"
              style={{ "--i": i } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
        </strong>
      </header>
    </div>
  );
};

export default Header;
