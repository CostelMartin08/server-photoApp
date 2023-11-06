import React, { useState, useEffect } from "react";
import Header from '../containers/Header';
import Footer from '../components/Footer';
import UploadPhotos from "../containers/UploadPhotos"
import SuccessMessage from "../components/SuccessMessage";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../scripts/url";
import { useTheme } from "../scripts/useTheme";

const ControlPanel = (props) => {

    const token = localStorage.getItem('token');
    const [textArea, uploadtextArea] = useState('');
    const [text, uploadtext] = useState(null);
    const [file, uploadfile] = useState([]);
    const [select, uploadSelect] = useState(null);
    const [response, setResponse] = useState(false);
    const [video, uploadVideo] = useState(null);
    const [error, setError] = useState(undefined);
    const [favorite, setFavorite] = useState(false);
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
        const formData = new FormData();
        formData.append("inputVideo", video);

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
                setResponse(true);
            }
            else {
                const errorData = await response.json();
                console.error("Eroare:", response.status, errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            props.disconnection();
            navigate('/login');
            console.error(error.message)
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

    }, [response])


    return (
        <section className={theme.mod.bgB}>
            <Header theme={theme} fileMod={theme.mod.bgHeader} disconnection={props.disconnection} status={props.status} />
            <main>
                <div className=" pt-5">
                    {!response ?
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
                                            <span
                                                className="form-title text-white"
                                            >Încarcă video
                                            </span>
                                            <p
                                                className="text-danger"
                                            >{props.error}
                                            </p>
                                            <div className="drop-container my-3 ">
                                                <input
                                                    className={`file-input text-white ${theme.mod.bgHeader}`}
                                                    type="text"
                                                    onChange={(e) => uploadVideo(e.target.value)}
                                                    name="inputVideo"
                                                    id="VideoInput"
                                                    placeholder="Introdu URL-ul" >
                                                </input>
                                            </div>
                                            <label className="drop-container text-white" htmlFor="select">Destinatia:
                                                <select name="select" id="select" className={`file-input text-white ${theme.mod.bgHeader}`}>
                                                    <option value="">Alege colecția</option>
                                                    <option value="Diverse">Portofoliu Video</option>

                                                </select>
                                            </label>
                                            <button className="btn btn-outline-light w-100 py-2 my-3" type="submit">Postează</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div> : <SuccessMessage setResponse={setResponse} />}

                </div>
            </main>
            <Footer theme={theme} />
        </section>
    );
}
export default ControlPanel;
