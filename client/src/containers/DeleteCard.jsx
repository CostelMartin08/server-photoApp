import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { urlBase } from '../scripts/url';

const DeleteCardConfirm = ({ paramForMeniu, titleForMeniu, setVisibility, refresh}) => {


    const navigate = useNavigate();
    const { category } = useParams();
    const token = localStorage.getItem('token');

    const deletionConfirmed = async (title, param) => {

        try {
            const response = await fetch(`${urlBase}/delete/onePhoto?category=${category}&title=${encodeURIComponent(title)}&param=${param}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                refresh(true);
                setVisibility(true)
           
                
            } else {
                const responseData = await response.json();
                console.error('Eroare:', responseData.error);
            }
        } catch (error) {
            console.error('Eroare la stergerea fotografiei!');
            navigate('/login');
        }
    };

    const cancelFunction = () => {

        setVisibility(false);
        refresh(true);

    }

    return (
        <>

            <div className='card-body'>

                <div className='card-del card p-3 p-md-0'>
                    <h5 className='h3'>Ștergere</h5>
                    <p>Fotografia selectata va fi ștearsă definitiv, <br /> dorești să continui?</p>

                    <div className='d-flex justify-content-center gap-4'>
                        <button
                            onClick={() => deletionConfirmed(titleForMeniu, paramForMeniu)}
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

export default DeleteCardConfirm;