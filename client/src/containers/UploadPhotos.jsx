import React from "react";
import { useState } from "react";
import "./uploadPhotos.css"


const UploadPhotos = (props) => {

    const [isChecked, setIsChecked] = useState(false);
    const theme = props.theme.mod;
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        props.setFavorite(event.target.checked);
    };

    return (
        <section className="d-flex flex-column align-items-center">
            <div className={`box-mdl ${theme.bg}`}>
                <span className="form-title text-white">Încarca poze</span>
                <p className="text-danger">{props.error}</p>
                <div className='drop-container my-3'>
                    <input
                        onChange={(e) => props.uploadtext(e.target.value)}
                        className={`file-input text-white ${theme.bgHeader}`}
                        type="text"
                        name="inputText"
                        id="textInput"
                        placeholder="Introdu titlul" >
                    </input>

                    <textarea
                        onChange={(e) => props.uploadtextArea(e.target.value)}
                        className={`file-input text-white ${theme.bgHeader}`}
                        name="story"
                        id="story"
                        placeholder="Povestea evenimentului">
                    </textarea>
                </div>
                <label htmlFor="file" className='drop-container'>
                    <span className="drop-title text-white">Drop files here</span>
                    or
                    <input
                        onChange={(e) => props.uploadfile(e.target.files)}
                        type="file"
                        id="file"
                        name="file"
                        multiple
                        className={`file-input text-white ${theme.bgHeader}`}
                    />
                </label>

                <label className='drop-container' htmlFor="select">Destinatia:

                    <select
                        onChange={(e) => props.uploadSelect(e.target.value)}
                        name="select"
                        id="select"
                        className={`file-input text-white ${theme.bgHeader}`}>

                        <option value="">Alege colecția</option>
                        <option value="Nunti">Foto Nunta</option>
                        <option value="Botezuri">Foto Botez</option>
                        <option value="Diverse">Foto Diverse</option>

                    </select>
                </label>

                <div className="form-check form-switch">
                    <input
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Favorite</label>
                </div>
                <button className="btn btn-outline-light w-100 py-2 my-3" type="submit">Postează</button>
            </div>

        </section>
    );
}

export default UploadPhotos; 