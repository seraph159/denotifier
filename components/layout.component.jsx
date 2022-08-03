import Navbar from "./navbar.component"
import Footer from "./footer.component"


const Layout = ({children}) => {

    return (
      <div>
        {children}
        <Footer />
      </div>
    )
  }
  
  export default Layout
  