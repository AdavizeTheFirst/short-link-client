import { useHistory } from "react-router-dom"
import { getToken } from "../../utils/auth"
import Navbar from '../../components/Navbar'
import { Flash } from "../../components/Flash/flash"
import { useMediaQuery } from "react-responsive";

const Signin = () => {
  const history = useHistory()
  if(localStorage.getItem('token')) {
    setTimeout(() => {
      window.flash('You are logged in', 'warning')
    }, 100)
    history.push('/dashboard')
  }
  const handleClick = async e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    if (!email || !password) window.flash('All fields are required', 'error')
    else {
      try {
        let user = await getToken({email, password})
        localStorage.setItem('token', user.data.token)
        localStorage.setItem('name', user.data.user.name)
        localStorage.setItem('email', user.data.user.email)
        setTimeout(() => {
          window.flash('Logged in successfully', 'success')
        }, 100)
        // history.push('/dashboard')
      } catch (error) {
        error.message = 'Request failed with status code 400' ? 
          window.flash('Invalid email or password', 'error') : 
          window.flash(error.message, 'error')
      }
    }
  }

  const isDesktop = useMediaQuery({
    query: "(min-width: 760px)",
  });
  let formWidth = {};

  if (isDesktop) {
    formWidth = {
      width: "40%",
    };
  }

  return (
    <div>
      <Navbar />
      <Flash />
      Signin Page
      <form action="" onSubmit={handleClick} style={formWidth}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email:  </label>
          <input type="email" name="email" />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:  </label>
          <input type="password" name="password" />
          <a className="forgot-password" href="">
              Forgot password?
            </a>
        </div>

        {/* button */}
        <button>Login</button>
      </form>
    </div>
  )
}

export default Signin
