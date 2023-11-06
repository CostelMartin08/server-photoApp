import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import FormMessage from "../components/FormMessage";
import { urlBase } from "../scripts/url";
import { useTheme } from "../scripts/useTheme";
import './albumDetails.css';

const ContactPage = () => {

    const [formData, setFormData] = useState({
        nume: ' ',
        email: '',
        telefon: '',
        subiect: ' ',
        data: ' ',
        mesaj: ' ',
    });
    const [clean, setClean] = useState(false);
    const [view, setView] = useState(false);
    const theme = useTheme();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const submitEvent = (e) => {
        e.preventDefault();

        fetch(`${urlBase}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setClean(true);
                setView(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {

        const initialFormData = {
            nume: '',
            email: '',
            telefon: '',
            subiect: '',
            data: '',
            mesaj: '',
        };

        setFormData(initialFormData);

        return () => {
            setClean(false);
        }
    }, [clean])


    return (
        <div className={theme.mod.bgB}>
            <Header
                theme={theme}
                fileMod={theme.mod.bgHeader}
            />

            <section className={`container`}>
                {!view ?
                    <div className="my-5">
                        <div className="">
                            <div className="d-flex flex-column align-items-left p-0">
                                <h3 className={`title-font `}>
                                    Informații Contact
                                    <hr className={`${theme.mod.bg} pt-1 mx-1`} />
                                </h3>
                            </div>
                            <div className="ms-2 text-center fs-5">
                                <p className={`text-font-contact ${theme.mod.contrastText}`}>Ai mai jos datele mele de contact. Mă poți contacta atât telefonic cât și printr-un e-mail sau mesaj pe Instagram.
                                    De asemenea formularul de mai jos îți stă la dispoziție.</p>
                            </div>
                        </div>
                        <div className="container row m-0">

                            <div className="col-md-7">
                                <div className="form-container">
                                    <form
                                        onSubmit={submitEvent}
                                        className="form card-font">
                                        <div className="input-group mb-3">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="nume">Numele Tău</label>
                                            <input
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="nume"
                                                value={formData.nume}
                                                type="text"
                                                id="nume"
                                                required
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="email">Email</label>
                                            <input
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="email"
                                                value={formData.email}
                                                type="email"
                                                id="email"
                                                required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="tel">Telefon</label>
                                            <input
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="telefon"
                                                value={formData.telefon}
                                                type="tel"
                                                id="tel"
                                                required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="subiect">Subiect</label>
                                            <input
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="subiect"
                                                value={formData.subiect}
                                                type="text"
                                                id="subiect"
                                                required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="date">Data evenimentului</label>
                                            <input
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="data"
                                                value={formData.data}
                                                type="date"
                                                id="date" />
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className={theme.mod.contrastText}
                                                htmlFor="textarea">Mesaj</label>
                                            <textarea
                                                className={theme.mod.bgB}
                                                onChange={handleChange}
                                                name="mesaj"
                                                value={formData.mesaj}
                                                type="text"
                                                id="textarea"
                                                maxLength={250} />
                                        </div>
                                        <button
                                            type="submit"
                                            className="sign mt-4">Trimite</button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-5 d-flex flex-column pt-5 gap-4 " >


                                <a className={`${theme.mod.contrastText} text-decoration-none d-inline-flex `}
                                    href="tel:+40742490856">
                                    <i className={`p-4 fa-solid fa-phone fa-2xl ${theme.mod.contrastText}`}></i>

                                    <span className="font-italic my-auto">+40742490856</span>

                                </a>


                                <a className={`${theme.mod.contrastText} text-decoration-none d-inline-flex `}
                                    href="mailto:andreib3100@gmail.com">
                                    <i className={`p-4 fa-solid fa-envelope fa-2xl ${theme.mod.contrastText}`}></i>


                                    <span className="font-italic my-auto">andreib3100@gmail.com</span>

                                </a>

                                <a className={`${theme.mod.contrastText} text-decoration-none d-inline-flex `}
                                    href="https://www.instagram.com/andrei.vdr/">
                                    <i className={`p-4 fa-brands fa-instagram fa-2xl ${theme.mod.contrastText}`}></i>

                                    <span className="font-italic my-auto">andrei.vdr</span>
                                </a>

                                <a className={`${theme.mod.contrastText} text-decoration-none d-inline-flex `}
                                    href="https://www.facebook.com/profile.php?id=100065019240579">
                                    <i className={`p-4 fa-brands fa-facebook fa-2xl ${theme.mod.contrastText}`}></i>

                                    <span className="font-italic my-auto">Andrei Balan</span>
                                </a>

                                <a className={`${theme.mod.contrastText} text-decoration-none d-inline-flex `}
                                    href="https://www.youtube.com/@andrei_balan">
                                    <i className={`p-4 fa-brands fa-youtube fa-2xl ${theme.mod.contrastText}`}></i>

                                    <span className="font-italic my-auto">Andrei Balan</span>
                                </a>


                            </div>
                        </div>
                    </div> : <FormMessage />}
            </section>

            <Footer
                theme={theme}
            />
        </div>
    );
}

export default ContactPage;