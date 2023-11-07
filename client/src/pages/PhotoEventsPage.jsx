import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { urlBase } from "../scripts/url";
import { useTheme } from "../scripts/useTheme";
import Header from '../containers/Header';
import Banner from "../components/Banner";
import SortButton from "../containers/SortButton";
import Footer from '../components/Footer';


const PhotoEvents = (props) => {

  const { loadingData, sendData, status, logout } = props;
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const { category } = useParams();
  const [data, setdata] = useState([]);
  const [sort, setSort] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    switch (category) {
      case 'Nunti':
      case "Botezuri":
      case "Diverse":
        loadingData(category);
        break;

      default:
        navigate("/notFound");
        break;
    }
  }, [category, navigate])



  useEffect(() => {
    if (Array.isArray(sendData)) {
      setdata(sendData);
    }

  }, [sendData])



  const oneDelete = async (id) => {
    try {
      const response = await fetch(`${urlBase}/delete/${category}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        loadingData(category);
      } else {
        const responseData = await response.json();
        console.error('Eroare:', responseData.error);
      }
    } catch (error) {
      console.error('Eroare la stergerea evenimentului!');
      logout();
      navigate('/login');
    }
  };

  const updateSortState = (sortedAlbums) => {
    setSort(sortedAlbums);
  };


  return (
    <section className={theme.mod.bgB}>
      <Header
        theme={theme}
        fileMod={theme.mod.bgHeader}
      />
      <Banner />
      <main className='container px-5 my-5'>
        <SortButton
          theme={theme}
          updateSort={updateSortState}
          data={data}
        />

        <div className="row g-4">
          {sort.map((album, index) => (
            <div
              key={album._id}
              className="col-sm-12 col-md-6 col-lg-4 position-relative">
              <Link
                to={`${album.title}`}
                className="card shadow">

                <img
                  className="full-width-image"
                  src={`https://balanandrei.ro/images/${category}/${album.title}/${album.content}`}
                  alt={`galerie-foto${index}`}
                />
                <span
                  className="text-card card-font ms-3 mb-3 h5"
                  aria-label={album.title}>
                  {album.title}
                </span>
              </Link>
              {status ?
                <button
                  onClick={() => oneDelete(album._id)}
                  className="button position-absolute me-3 bottom-0 end-0">
                  <i className="fa-solid fa-trash fa-xl">
                  </i>
                </button>
                : null}
            </div>))}
        </div>
      </main>

      <Footer
        theme={theme}
      />

    </section>
  );
}

export default PhotoEvents;
