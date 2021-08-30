import React, {useState, useEffect, useRef} from 'react'
import SearchResults from './SearchResults';

const Favourite = () => {

    const [localFavourites, setLocalFavourites] = useState([]);
    const [filterKeyValue, setFilterKeyValue] = useState([]);

    const selectRef = useRef();

    const saved = localStorage.getItem("favourites");
    const myFav = JSON.parse(saved);

    useEffect(()=>{
        findFilterValue();
        setLocalFavourites(myFav);  
    },[])

    const removeFav = (word, type) => {
        let newLocalFav = [];
        for(let local of myFav){
            if(local.word === word && local.type === type){
                continue;
            }else{
                let newItem = {
                    pronunciation: local.pronunciation , 
                    word: local.word,
                    type: local.type,
                    definition: local.definition,
                    image_url: local.image_url,
                    example: local.example
                }
                newLocalFav.push(newItem);
            }
        }
        localStorage.setItem('favourites', JSON.stringify(newLocalFav));
        setLocalFavourites(newLocalFav);
        selectRef.current.value = 'all';
    }

    

    const filterFav = () =>{
        
        let filterValue = selectRef.current.value;
        if(filterValue === 'all'){
            setLocalFavourites(myFav);
        }else{
            let newFilteredFav = [];
            for(let el of myFav){
                if(el.type === filterValue){
                    newFilteredFav.push(el);
                }
            }
            setLocalFavourites(newFilteredFav);
        } 
    }

    const findFilterValue = () =>{
        
        if(myFav && myFav?.length > 0){
            let tempValue = [];
            for(let el of myFav){
                if(!tempValue.includes(el.type)){
                    tempValue.push(el.type);
                }
            }
            setFilterKeyValue(tempValue);
        }
        
    }

    return (
        <div>
            <div>
                <h2>My Favourites</h2>
                <div>
                    <select ref={selectRef} onChange={()=>{filterFav()}} className="form-select" aria-label="Default select example">
                        <option selected value="all">Filter by All type</option>
                        {/* <option value="noun">noun</option>
                        <option value="pronoun">pronoun</option>
                        <option value="verb">verb</option>
                        <option value="adjective">adjective</option>
                        <option value="adverb">adverb</option> 
                        <option value="abbreviation">abbreviation</option>
                        <option value="preposition">preposition</option> 
                        <option value="conjunction">conjunction</option>  */}
                        {
                            filterKeyValue && filterKeyValue.length > 0 ? 
                                filterKeyValue.map((el,index)=>(
                                    <option key={index} value={el}>{el}</option>
                                ))
                                :    
                                null
                        }
                    </select>
                </div>
            </div>
            
            <div style={flexStyle}>
                {
                    localFavourites && localFavourites?.length > 0 ?
                        localFavourites.map((el, index)=>(
                            <SearchResults 
                                key={index} 
                                pronunciation={el.pronunciation}
                                word={el.word}
                                type={el.type}
                                definition={el.definition}
                                example={el.example}
                                image_url={el.image_url}
                                from = "favourite"
                                removeFav={removeFav}
                             />
                        ))
                    : 
                    <div>
                        <h3>No Favourites Found!</h3> 
                    </div>  
                }

            </div>
        </div>
    )
}

export default Favourite

const flexStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: '40px',
    marginBottom: '40px'
}
