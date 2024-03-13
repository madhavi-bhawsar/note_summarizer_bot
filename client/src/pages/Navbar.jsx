const Navbar = ({ username, handleLogout }) => (
    <nav style={navbarStyle}>
      <div style={navWrapperStyle}>
        <span style={brandLogoStyle}>Welcome {username}</span>
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
  
  const navbarStyle = {
    backgroundColor: "#333",
    position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  };
  
  const navWrapperStyle = {
    padding: "20px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  const brandLogoStyle = {
    fontSize: "1.5rem",
    color: "white",    
  };
  
  const buttonStyle = {
    marginTop: "10px",
    fontSize: "18px",
  };

  export default Navbar;