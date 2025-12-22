

import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthContext } from '@/common'
import TitleHelmet from '@/components/Common/TitleHelmet'
import useLogin from '../useAuth/useLogin'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import masterDataService, { Company, Year } from '@/common/api/masterData'


const Login = () => {
  const { removeSession } = useAuthContext()
  const { loading, loginWithEmail, loginWithUsername, redirectUrl, isAuthenticated } = useLogin()
  const [loginType, setLoginType] = useState<'superadmin' | 'hoteladmin'>('hoteladmin')
  const [email, setEmail] = useState('superadmin@miracle.com')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('superadmin123')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Company and Year selection states
  const [companies, setCompanies] = useState<Company[]>([])
  const [years, setYears] = useState<Year[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [companyError, setCompanyError] = useState<string | null>(null)
  const [yearError, setYearError] = useState<string | null>(null)



  useEffect(() => {
    removeSession()
  }, [removeSession])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await masterDataService.getCompanies()
        setCompanies(response.data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    const fetchYears = async () => {
      try {
        const response = await masterDataService.getYears()
        setYears(response.data)
      } catch (error) {
        console.error('Error fetching years:', error)
      }
    }

    if (loginType === 'hoteladmin') {
      fetchCompanies()
      fetchYears()
    }
  }, [loginType])

  const validateEmail = (input: string) => {
    if (!input) {
      setEmailError('Email is required')
      return false
    }
    setEmailError(null)
    return true
  }

  const validateUsername = (input: string) => {
    if (!input) {
      setUsernameError('Username is required')
      return false
    }
    setUsernameError(null)
    return true
  }

  const validatePassword = (input: string) => {
    if (!input) {
      setPasswordError('Password is required')
      return false
    }
    setPasswordError(null)
    return true
  }

  const validateCompany = (input: string) => {
    if (!input) {
      setCompanyError('Company selection is required')
      return false
    }
    setCompanyError(null)
    return true
  }

  const validateYear = (input: string) => {
    if (!input) {
      setYearError('Year selection is required')
      return false
    }
    setYearError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loginType === 'superadmin') {
      const isEmailValid = validateEmail(email)
      const isPasswordValid = validatePassword(password)
      if (isEmailValid && isPasswordValid) {
        loginWithEmail(e, { email, password })
      }
    } else {
      const isUsernameValid = validateUsername(username)
      const isPasswordValid = validatePassword(password)
      const isCompanyValid = validateCompany(selectedCompany)
      const isYearValid = validateYear(selectedYear)
      if (isUsernameValid && isPasswordValid && isCompanyValid && isYearValid) {
        // The companyName is derived but not part of the login function's expected parameters.
        // It will likely be set in the session by the useLogin hook.
        loginWithUsername(e, { username, password, company: selectedCompany, year: selectedYear })
      }
    }
  }

  if (isAuthenticated) {
    return <Navigate to={redirectUrl} replace />
  }

  return (
    <>
      <TitleHelmet title="Login" />
      <div style={{ 
        display: 'flex', 
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Left Side - Subji Mandi ERP Branding */}
        <div style={{
          width: '50%',
          background: 'linear-gradient(180deg, #FFF8E7 0%, #FFE4B5 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          position: 'relative'
        }} 
        className="d-none d-lg-flex">
          
          <div style={{ 
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            maxWidth: '500px',
            transform: 'scale(0.95)'
          }}>
            
            {/* Logo and Header */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                marginBottom: '0.5rem' 
              }}>
                {/* Vegetable Cart Icon */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: '#4CAF50',
                  borderRadius: '50% 50% 0 0',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '2rem' }}>🥬</div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '8px',
                    fontSize: '1rem'
                  }}>🍅</div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '8px',
                    fontSize: '1rem'
                  }}>🥕</div>
                </div>
              </div>
              
              <h1 style={{ 
                fontSize: '2.2rem', 
                fontWeight: 'bold', 
                marginBottom: '0.3rem',
                color: '#2E7D32'
              }}>
                <span style={{ color: '#4CAF50' }}>Subji</span>{' '}
                <span style={{ color: '#D32F2F' }}>Mandi</span>
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#666',
                fontWeight: '600',
                letterSpacing: '1.5px',
                margin: 0
              }}>
                ERP Software
              </p>
            </div>

            {/* Circular Features Diagram */}
            <div style={{ 
              position: 'relative',
              width: '320px',
              height: '320px',
              margin: '0 auto'
            }}>
              
              {/* Center Circle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'white',
                border: '4px solid #4CAF50',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 2
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>🌱</div>
                <div style={{ 
                  fontSize: '0.65rem', 
                  fontWeight: 'bold',
                  color: '#D32F2F',
                  textAlign: 'center',
                  lineHeight: '1.1'
                }}>MANDI<br/>ERP</div>
              </div>

              {/* Circular Ring */}
              <svg width="320" height="320" style={{ position: 'absolute', top: 0, left: 0 }}>
                <circle cx="160" cy="160" r="125" fill="none" stroke="#E8505B" strokeWidth="35" strokeDasharray="25 8" opacity="0.8"/>
                <circle cx="160" cy="160" r="125" fill="none" stroke="#5B9BD5" strokeWidth="35" strokeDasharray="25 8" opacity="0.8" strokeDashoffset="105"/>
                <circle cx="160" cy="160" r="125" fill="none" stroke="#70AD47" strokeWidth="35" strokeDasharray="25 8" opacity="0.8" strokeDashoffset="210"/>
              </svg>

              {/* Top - Accounting */}
              <div style={{
                position: 'absolute',
                top: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#2C3E50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>📰</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#D32F2F' }}>Accounting</div>
              </div>

              {/* Right - Buyers */}
              <div style={{
                position: 'absolute',
                right: '-5px',
                top: '30%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FF9800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>👤</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#FF9800' }}>Buyers</div>
              </div>

              {/* Bottom Right - Grower */}
              <div style={{
                position: 'absolute',
                right: '12%',
                bottom: '2%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#C2185B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>📈</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#C2185B' }}>Grower</div>
              </div>

              {/* Bottom Left - Loading */}
              <div style={{
                position: 'absolute',
                left: '12%',
                bottom: '2%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#5E35B1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>🚚</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#5E35B1' }}>Loading</div>
              </div>

              {/* Left - Order */}
              <div style={{
                position: 'absolute',
                left: '-5px',
                top: '30%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#D32F2F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>🛒</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#D32F2F' }}>Order</div>
              </div>

              {/* Top Left - Total Control */}
              <div style={{
                position: 'absolute',
                left: '5%',
                top: '5%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#8BC34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>🔒</div>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#8BC34A', lineHeight: '1.1' }}>Total<br/>Control</div>
              </div>

              {/* Top Right - Crates */}
              <div style={{
                position: 'absolute',
                right: '5%',
                top: '5%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#1976D2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.3rem',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>📦</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1976D2' }}>Crates</div>
              </div>
            </div>

            {/* Shop Illustration */}
            <div style={{ 
              marginTop: '1.5rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              {/* Awning */}
              <div style={{
                width: '180px',
                height: '25px',
                background: 'repeating-linear-gradient(90deg, #FF5252 0px, #FF5252 22px, #FFD700 22px, #FFD700 44px, #FF5252 44px)',
                borderRadius: '0 0 8px 8px',
                position: 'relative',
                marginBottom: '-4px',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '8px',
                  background: '#8B4513',
                  borderRadius: '4px 4px 0 0'
                }}></div>
              </div>

              {/* Shop Counter */}
              <div style={{
                width: '180px',
                height: '100px',
                background: 'linear-gradient(180deg, #FFB366 0%, #FF8C42 100%)',
                borderRadius: '0 0 8px 8px',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                {/* Vegetables Display */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '0.8rem',
                  fontSize: '1.8rem'
                }}>
                  <div>🥬</div>
                  <div>🍅</div>
                  <div>🥕</div>
                </div>
                
                {/* Crate */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '15px',
                  fontSize: '2rem'
                }}>🧺</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '1.5rem',
              padding: '0.7rem 1rem',
              background: '#C62828',
              color: 'white',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              letterSpacing: '0.8px'
            }}>
              SOFTWARE BY MIRACLE INFOTECH
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          width: '50%',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }} 
        className="col-lg-6 col-12">
          
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                color: '#2c3e50', 
                fontSize: '1.6rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>Login to your account</h2>
              <p style={{ 
                color: '#95a5a6', 
                fontSize: '0.9rem',
                margin: 0
              }}>Enter your details to access your account</p>
            </div>

            {/* Login Type Toggle */}
            <div style={{ marginBottom: '1.2rem' }}>
              <div className="btn-group w-100" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="loginType"
                  id="superadmin"
                  checked={loginType === 'superadmin'}
                  onChange={() => setLoginType('superadmin')}
                />
                {/* <label className="btn btn-outline-primary" htmlFor="superadmin">
                  SuperAdmin Login
                </label> */}

                <input
                  type="radio"
                  className="btn-check"
                  name="loginType"
                  id="hoteladmin"
                  checked={loginType === 'hoteladmin'}
                  onChange={() => setLoginType('hoteladmin')}
                />
                <label className="btn btn-outline-primary" htmlFor="hoteladmin">
                 Admin Login
                </label>
              </div>
            </div>

            {loginType === 'hoteladmin' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <select
                    className={`form-select ${companyError ? 'is-invalid' : ''}`}
                    value={selectedCompany}
                    onChange={(e) => {
                      setSelectedCompany(e.target.value)
                      validateCompany(e.target.value)
                    }}
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company.companyid} value={company.companyid}>
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                  {companyError && <div className="invalid-feedback d-block">{companyError}</div>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <select
                    className={`form-select ${yearError ? 'is-invalid' : ''}`}
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value)
                      validateYear(e.target.value)
                    }}
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year.yearid} value={year.yearid}>
                        {year.Year}
                      </option>
                    ))}
                  </select>
                  {yearError && <div className="invalid-feedback d-block">{yearError}</div>}
                </div>
              </>
            )}

            <form onSubmit={handleSubmit}>
              {loginType === 'superadmin' ? (
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    placeholder="superadmin@miracle.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      validateEmail(e.target.value)
                    }}
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      fontSize: '0.9rem'
                    }}
                  />
                  {emailError && <div className="invalid-feedback d-block">{emailError}</div>}
                </div>
              ) : (
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      validateUsername(e.target.value)
                    }}
                    style={{
                      padding: '0.7rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      fontSize: '0.9rem'
                    }}
                  />
                  {usernameError && <div className="invalid-feedback d-block">{usernameError}</div>}
                </div>
              )}

              <div style={{ marginBottom: '1rem', position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    validatePassword(e.target.value)
                  }}
                  style={{
                    padding: '0.7rem 1rem',
                    paddingRight: '3rem',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  type="button"
                  className="btn position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1.1rem'
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                 {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {passwordError && <div className="invalid-feedback d-block">{passwordError}</div>}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.2rem' 
              }}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{ cursor: 'pointer' }}
                  />
                  <label 
                    className="form-check-label" 
                    htmlFor="rememberMe" 
                    style={{ 
                      color: '#6c757d', 
                      fontSize: '0.85rem', 
                      cursor: 'pointer' 
                    }}>
                    Remember me
                  </label>
                </div>
                <Link to="/auth/minimal/forgot-password" style={{ 
                  color: '#4CAF50', 
                  textDecoration: 'none', 
                  fontSize: '0.85rem', 
                  fontWeight: '500' 
                }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-semibold"
                disabled={loading}
                style={{
                  padding: '0.7rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                  border: 'none',
                  fontSize: '0.95rem',
                  marginBottom: '1rem'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Loading...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ color: '#95a5a6', fontSize: '0.85rem' }}>Don't have an account? </span>
                <Link to="/auth/minimal/register" style={{ 
                  color: '#4CAF50', 
                  textDecoration: 'none', 
                  fontWeight: '600', 
                  fontSize: '0.85rem' 
                }}>
                  Create Account
                </Link>
              </div>

              <div style={{ position: 'relative', margin: '1.2rem 0' }}>
                <hr style={{ borderColor: '#e0e0e0' }} />
                <span 
                  className="position-absolute bg-white px-3"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '0.8rem',
                    color: '#95a5a6'
                  }}>
                  OR
                </span>
              </div>

              {/* <div className="d-grid flex-wrap d-sm-flex gap-2">
                <button type="button" className="btn btn-neutral px-3 flex-fill">
                  <i className="fi fi-brands-google"></i>
                  <span className="ms-2">Login with Google</span>
                </button>
                <button type="button" className="btn btn-neutral px-3 flex-fill">
                  <i className="fi fi-brands-facebook"></i>
                  <span className="ms-2">Login with Facebook</span>
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login