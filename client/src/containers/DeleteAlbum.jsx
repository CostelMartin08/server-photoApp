import React from 'react';
import { urlBase } from '../scripts/url';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteAlbum = ({ loadingData, setVisibility, param }) => {

    const token =localStorage.getItem('token');
    const { category } = useParams();
    const navigate = useNavigate();

    const deletionConfirmed = async (id) => {
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
                setVisibility(false);
            } else {
                const responseData = await response.json();
                console.error('Eroare:', responseData.error);
            }
        } catch (error) {
            console.error('Eroare la stergerea evenimentului!');
            navigate('/login');
        }
    };

    const cancelFunction = () => {

        setVisibility(false);

    }


    return (

        <>

            <div className='card-body'>

                <div className='card-del card p-3 p-md-0'>
                    <h5 className='h3'>Ștergere</h5>
                    <p className='text-size'>Albumul selectat va fi șters doar din baza de date, <br />fotografiile rămân stocate pe server dar ascunse publicului. <br /> Dorești să continui?</p>

                    <div className='d-flex justify-content-center gap-4'>
                        <button
                            onClick={() => deletionConfirmed(param)}
                            className='btn btn-danger'>Șterge</button>

                        <butoon
                            onClick={() => cancelFunction()}
                            className="btn btn-outline-light">Renunță</butoon>
                    </div>
                </div>

            </div>



        </>
    )
}

export default DeleteAlbum;