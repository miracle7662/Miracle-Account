import logo from '@/assets/images/logos/logo.jpg'

const Logo = () => {
  return (
    <>
      <div className="barnd-logo">
        <div className="logo-icon">
          <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="logo-text">MIRACLE</div>
      </div>
    </>
  );
};

const LogoWhite = () => {
  return (
    <>
      <div className="barnd-logo">
        <div className="logo-icon">
          <img src={logo} alt="White Logo" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="logo-text text-white">Miracle</div>
      </div>
    </>
  );
};

export default Logo;
export { LogoWhite };