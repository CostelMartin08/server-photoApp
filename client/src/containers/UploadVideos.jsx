import React from "react";
import { useState } from "react";
import "./uploadPhotos.css"


const UploadVideos = (props) => {

    const [isChecked, setIsChecked] = useState(false);
    const theme = props.theme.mod;
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        props.setFavorite(event.target.checked);
    };

    return (
        <section className="d-flex flex-column align-items-center">
            <div className={`box-mdl ${theme.bg}`}>
                <span className="form-title text-white">Încarca video</span>
                <p className="text-danger">{props.error}</p>
                <div className='drop-container my-3'>
                   <input
                        onChange={(e) => props.uploadtextx(e.target.value)}
                        className={`file-input text-white ${theme.bgHeader}`}
                        type="text"
                        name="inputTextVx"
                        id="textInputVx"
                        placeholder="Introdu titlul" >
                    </input>
                    <input
                        onChange={(e) => props.uploadtext(e.target.value)}
                        className={`file-input text-white ${theme.bgHeader}`}
                        type="text"
                        name="inputTextV"
                        id="textInputV"
                        placeholder="Introdu url-ul" >
                    </input>

                    <textarea
                        onChange={(e) => props.uploadtextArea(e.target.value)}
                        className={`file-input text-white ${theme.bgHeader}`}
                        name="storyV"
                        id="storyV"
                        placeholder="Povestea evenimentului">
                    </textarea>
                </div>
                <label htmlFor="fileV" className='drop-container'>
                    <span className="drop-title text-white">Thumbnail</span>
                    <input
                        onChange={(e) => props.uploadfile(e.target.files[0])}
                        type="file"
                        id="fileV"
                        name="fileV"
                        className={`file-input-2 text-white ${theme.bgHeader}`}
                    />
                </label>

                <label className='drop-container' htmlFor="selectV">Destinatia:

                    <select
                        onChange={(e) => props.uploadSelect(e.target.value)}
                        name="selectV"
                        id="selectV"
                        className={`file-input text-white ${theme.bgHeader}`}>

                        <option value="">Alege colecția</option>
                        <option value="Nunti">Nunta</option>
                        <option value="Botezuri">Botez</option>
                        <option value="Comercial">Comerciale</option>

                    </select>
                </label>

                <div className="form-check form-switch">
                    <input
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefaultV"
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Favorite</label>
                </div>
                <button className="btn btn-outline-light w-100 py-2 my-3" type="submit">Postează</button>
            </div>

        </section>
    );
}

export default UploadVideos; 