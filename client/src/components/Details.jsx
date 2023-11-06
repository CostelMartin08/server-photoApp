import React from 'react';
import './details.css'

const Details = (props) => {

    const theme = props.theme.mod;

    return (
        <section className={theme.bgHeader}>
            <div className='container py-3'>
                <div className="row">
                    <div className='col-12 col-md-6 d-flex align-items-center justify-content-left p-0 ' >
                        <div className='m-3'>
                            <h2 className='mt-2 title-font text-light'>Despre mine</h2>
                            <hr className={`${theme.bg} pt-1 mx-1`}></hr>
                            <p className='ms-3 text-font text-light'>
                                Pasiunea pentru arte în general și pentru fotografie în particular m-a ajutat să îmi formez o perspectiva diferită asupra lumii, oamenilor
                                și a emoțiilor. Am ales fotografia de eveniment deoarece iubesc să imortalizez trăirile, bucuria și entuziasmul unei zile importante.
                                Mă numesc Andrei, un tânar implicat, serios la nevoie și energic. Aștept cu nerăbdare să ne cunoaștem, pentru ca prin intermediul unui aparat de fotografiat
                                să pot face ca amintirile voastre să fie de neuitat.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <picture id="picture">
                            <img className='photo my-4' src="/uploads/myPhoto.webp" alt="fotoBalanAndrei" />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Details;