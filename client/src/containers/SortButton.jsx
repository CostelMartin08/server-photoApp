import React, { useEffect } from "react";

const SortButton = (props) => {

    const theme = props.theme.mod;

    const sortAlbums = (type) => {
        const favoriteAlbums = [];
        const nonFavoriteAlbums = [];
        props.data.forEach((sortat) => {
            if (sortat.favorit === "true") {
                favoriteAlbums.push(sortat);
            } else {
                nonFavoriteAlbums.push(sortat);
            }
        });
        const shuffledFavoriteAlbums = favoriteAlbums.sort(() => Math.random() - 0.5);

        let sortedAlbums = [];

        switch (type) {
            case "title":
                sortedAlbums = props.data.slice().sort((a, b) => {
                    const aValueT = a.title;
                    const bValueT = b.title;
                    if (aValueT < bValueT) {
                        return -1;
                    } else if (aValueT > bValueT) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;

            case "time":
                sortedAlbums = props.data.slice().sort((a, b) => {
                    const aValueD = a.data;
                    const bValueD = b.data;
                    if (aValueD > bValueD) {
                        return -1;
                    } else if (aValueD < bValueD) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;

            case "relevance":
                sortedAlbums = [...shuffledFavoriteAlbums, ...nonFavoriteAlbums];
                break;

            default:
                sortedAlbums = props.data.slice();
                break;
        }

        props.updateSort(sortedAlbums);

    };

    useEffect(() => {

        sortAlbums("relevance");

    }, [props.data]);

    return (
        <div className='row'>
            <div className="text-right mb-3 col-12 col-md-12">
                <div className="btn-group">
                    <button
                        type="button"
                        className='btn btn-secondary py-2 border-0 dropdown-toggle'
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i
                            className="fa-solid fa-filter fa-xl">
                        </i>
                    </button>
                    <ul className={`card-font bg-dropdown ${theme.bg}  dropdown-menu dropdown-menu-end`}>
                        <li>
                            <button
                                onClick={() => sortAlbums("title")}
                                type="button"
                                className='dropdown-item text-light'
                            >Alfabetic
                            </button>
                        </li>
                        <li>
                            <button onClick={() => sortAlbums("time")}
                                type="button"
                                className='dropdown-item text-light'
                            >Recente
                            </button>
                        </li>
                        <li>
                            <button onClick={() => sortAlbums("relevance")}
                                type="button"
                                className='dropdown-item text-light'
                            >Relevanță
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SortButton;