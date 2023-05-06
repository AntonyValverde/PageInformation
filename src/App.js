import logo from './logo.svg';
import './App.css';
import head_Page from './components/PageHead';
import { useState, useEffect } from "react"
import Loading from "./components/Loading"
import Profile from './components/profile';


function App() {
  const perfil = './perfil.jpg';
  const [items, setItems] = useState([])
  // Change this to any username whose repositories you want to get
  const [user] = useState("AntonyValverde")

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=6&sort=updated`
      )
      const data = await res.json()
      setItems(data)
      console.log(data)
    }

    fetchRepos()
  }, [user])

  return (
    <body>


      <header className='headerr'>
        <head_Page></head_Page>
        <h1 className="h11">Informacion Personal</h1>
      </header>
      <nav className='contenedor' >

        <div className='cuadro'>
          <div className='imagen'>
            <img src={perfil} alt="Mi imagen" />

          </div>
          <div className='info'>
            <h2>Nombre:</h2>
            <p>Antony Valverde</p>
            <h2>Numero:</h2>
            <p>8575-5357</p>
            <h2>Email:</h2>
            <p>antonyvalverde2003@gmail.com</p>
            <h2>Carrera:</h2>
            <p>Ingeniero en sistemas</p>
            <h2>Lugar de estudio:</h2>
            <p>Universidad Nacional De Costa Rica</p>
          </div>
        </div>
      </nav>
      <div>

        <main className='contenedor'>

          <section>

            <article>
              <a href='https://www.linkedin.com/in/antony-valverde-26a709274/' className='mi-boton' >Link In</a>

            </article>
            <article>
              <div className="carousel-container">
                <div className="carousel-item">
                  <div className='cuadrado'>
                    {!items ? (
                      <Loading />
                    ) : (
                      <div className="">
                        {items.map((item) => (
                          <Profile key={item.id} {...item} />
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </article>


          </section>

        </main>

      </div>

      <footer className="PageFooter">
        <div >
          <h4 className="contact">Contactenos: 85755357</h4>
           
          <p className="parr">antonyvalverde2003@gmail.com</p>
           
           
          <p className="text4">Universidad Nacional De Costa Rica</p>
          <h6 className="copy">Copyright ® 2023</h6>

        </div>

      </footer>

    </body >



  );
}

export default App;
