import React, { useState, useEffect } from "react";


import Header from '../containers/Header';
import Footer from '../components/Footer';
import UploadPhotos from "../containers/UploadPhotos"
import SuccessMessage from "../components/SuccessMessage";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../scripts/url";
import { useTheme } from "../scripts/useTheme";
import UploadVideos from "../containers/UploadVideos";

const ControlPanel = (props) => {

    const token = localStorage.getItem('token');

    const [textArea, uploadtextArea] = useState('');
    const [text, uploadtext] = useState(null);
    const [file, uploadfile] = useState([]);
    const [select, uploadSelect] = useState(null);
    const [response, setResponse] = useState(false);

    const [error, setError] = useState(undefined);
    const [favorite, setFavorite] = useState(false);    
    
    
    const [title, setTitle] = useState(null);
    const [textAreaV, uploadtextAreaV] = useState('');
    const [textV, uploadtextV] = useState(null);
    const [selectV, uploadSelectV] = useState(null);
    const [thumbnail, uploadThumbnail] = useState(null);
    const [responseV, setResponseV] = useState(false);
    const [errorV, setErrorV] = useState(undefined);
    const [favoriteV, setFavoriteV] = useState(false);    


    const navigate = useNavigate();

    const theme = useTheme();

    const uploadContent = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("select", select);
        formData.append("text", text);
        formData.append("textArea", textArea);
        formData.append("favorite", favorite);

        switch (select) {
            case "Nunti":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`nunti`, file[i]);
                }
                break;
            case "Botezuri":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`botezuri`, file[i]);
                }
                break;
            case "Diverse":
                for (let i = 0; i < file.length; i++) {
                    formData.append(`diverse`, file[i]);
                }
                break;
            default:
                console.error("Nu exista!");
        }



        try {
            const response = await fetch(`${urlBase}/galerie`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            if (response.ok) {
                setResponse(true);
            } else {
                const errorData = await response.json();
                console.error("Eroare:", response.status, errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            props.disconnection();
            navigate('/login');
            console.error(error.message)

        };
    };

    const uploadVideoZ = async (e) => {
        e.preventDefault();
    
        if (!selectV || !thumbnail || !textV) {
            setErrorV("Completează toate câmpurile!");
            return;
        }
    
        const formData = new FormData();
        formData.append("category", selectV); 
        formData.append("thumbnail", thumbnail); 
        formData.append("title", textV); 
        formData.append("description", textAreaV); 
        formData.append("favorite", favoriteV); 
        formData.append("titlex", title); 


          try {
            const response = await fetch(`${urlBase}/galerie/video`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                setResponseV(true); 
                setErrorV(null); 
            } else {
                const errorData = await response.json();
                console.error("Eroare:", response.status, errorData.error);
                setErrorV(errorData.error); 
                console.log(errorData.error);
            }
        } catch (error) {
            props.disconnection();
            navigate('/login');
            console.error(error.message);
        }
    };

    useEffect(() => {

        if (response) {
            uploadtext(null);
            uploadfile(null);
            uploadtextArea(null);
            uploadSelect(undefined);
            setFavorite(false);
        }
        else if (responseV) {
            uploadtextV(null);
            uploadThumbnail(null);
            uploadtextAreaV(null);
            uploadSelectV(undefined);
            setFavoriteV(false);
            setTitle(null);
        }

    }, [response, responseV])


    return (

        <section className={theme.mod.bgB}>
            <Header theme={theme} fileMod={theme.mod.bgHeader} disconnection={props.disconnection} status={props.status} />
            <main>
                <div className=" pt-5">
                    {!response & !responseV ?
                        <div className="row w-100 m-0 mb-5 align-items-center justify-content-center">
                            <div className="col-12 col-md-5">

                                <form method="post" action="/galerie" encType="multipart/form-data" onSubmit={uploadContent}>

                                    < UploadPhotos
                                        theme={theme}
                                        uploadfile={uploadfile}
                                        uploadContent={uploadContent}
                                        uploadtext={uploadtext}
                                        uploadtextArea={uploadtextArea}
                                        uploadSelect={uploadSelect}
                                        setFavorite={setFavorite}
                                        error={error} />
                                </form>
                            </div>
                            <div className="col-12 col-md-5 pt-4">
                                <div className="d-flex flex-column align-items-center">
                                    <div className={`box-mdl ${theme.mod.bg}`}>
                                        <form method="post" action="/galerie/video" encType="multipart/form-data" onSubmit={uploadVideoZ}>
                                        < UploadVideos
                                        theme={theme}
                                        uploadfile={uploadThumbnail}
                                        uploadContent={uploadVideoZ}
                                        uploadtext={uploadtextV}
                                        uploadtextx={setTitle}
                                        uploadtextArea={uploadtextAreaV}
                                        uploadSelect={uploadSelectV}
                                        setFavorite={setFavoriteV}
                                        error={errorV} />
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div> : <SuccessMessage setResponse={setResponse} setResponseV={setResponseV} />}

                </div>
            </main>
            <Footer theme={theme} />
        </section>
    );
}
export default ControlPanel;
