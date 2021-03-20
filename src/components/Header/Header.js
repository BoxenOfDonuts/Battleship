import './Header.css';

const Header = ({ header }) => {
  const headerArray = Array.from(header).map((letter, index) => {
    return <span key={letter + index}>{letter}</span>;
  });

  return (
    <div className="header">
      <h1>{headerArray}</h1>
    </div>
  );
};

export default Header;
