import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlBase } from '../scripts/url';


const AddNewPhoto = ({ data, refresh, theme }) => {

    const token = localStorage.getItem('token');
    const status = localStorage.getItem('status');
    const { category } = useParams();
    const [file, setFile] = useState([]);
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(false);

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setHidden(true);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();


        formData.append('file', file);

        try {
            const response = await fetch(`${urlBase}/addNew/${category}/${data.title}/${data._id}`, {

                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: formData
            });

            if (response.ok) {
                setHidden(false);
                refresh(true);

            } else {

                const responseData = await response.json();
                console.error('Eroare:', responseData.error);

            }
        } catch (error) {
            console.error(error);
            navigate('/login')

        }

    }



    return (
        <>
            {status ?
                <form
                    className='d-flex justify-content-end align-items-center gap-3 mx-4 mb-3'
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}>

                    <div className='input-div'>

                        <input
                            className='input'
                            type='file'
                            name="file"
                            onChange={handleFileChange}
                        ></input>
                        <svg
                            className='icon'
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={`${theme.mod.sVg2}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>

                    </div>
                    {hidden ?
                        <button

                            className='btn-set btn btn btn-success px-3'
                            type='submit'><i class="fa-solid fa-upload"></i>

                        </button> : null}
                </form> : null}
        </>
    )
}

export default AddNewPhoto;