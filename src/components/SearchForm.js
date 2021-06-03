import React, {useState} from 'react';



function SearchForm({ setLatLong, searchText, getAddress}) {
    const [textForSearch, setTextForSearch] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        searchText(textForSearch)
        getAddress(true)

    }


    return (
        <div className="pb-2 text-center">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="where are you going?"
                    className="py-1 px-2 rounded-1-lg mt-2"
                    onChange={(e) =>setTextForSearch(e.target.value)}
                />
                    <button
                        type="submit"
                        className="bg-green-400 my-2 py-1 px-2 rounded-r-lg text-dark"

                    > Search </button>
            </form>


        </div>
    );
}

export default SearchForm;
