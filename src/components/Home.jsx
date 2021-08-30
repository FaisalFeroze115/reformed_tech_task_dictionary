import React, {useState} from 'react'
import { Button, InputGroup, FormControl  } from 'react-bootstrap';
import SearchResults from './SearchResults';
import {checkCharacter} from '../utils'


const Home = () => {
    const [searchData, setSearchData] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const getData = async (e) => {
        e.preventDefault();

        let isIncludeCharacter = checkCharacter(searchWord);
        if(!searchWord){
            alert('Please Enter Something to Search');
            return;
        }else if(isIncludeCharacter){
            alert('Characters are not accepted');
            return;
        }

        const fetchData = await fetch(`https://owlbot.info/api/v4/dictionary/${searchWord}`,{
          method: 'GET',
          headers: {
            'Authorization': 'Token 3b033d375daeddac0d8dc16c0f351fe3a49fc8c7',
            'Accept': 'application/json',
          }
        });
        const result = await fetchData.json();
        //console.log(result)
        setSearchData(result);
        
      }

    return (
        <div>
            <div>
                <form onSubmit={(e)=>{getData(e)}}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Search Anything...</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(e)=> setSearchWord(e.target.value)}
                            value={searchWord}
                        />
                        <Button type="submit" variant="dark">Search</Button>
                        <Button onClick={()=>{setSearchData([]); setSearchWord('')}} variant="danger">Clear</Button>
                    </InputGroup>
                </form>
                
            </div>

            <div>
                <div style={flexStyle}>
                    {
                        searchData && searchData?.definitions?.length > 0 ? 
                            searchData?.definitions.map((el, index) => (
                                <SearchResults 
                                    key={index} 
                                    pronunciation={searchData.pronunciation}
                                    word={searchData.word}
                                    type={el.type}
                                    definition={el.definition}
                                    example={el.example}
                                    image_url={el.image_url}
                                />
                            ))
                            : searchData.length > 0 ?
                                <div>
                                    { searchData[0].message }
                                    
                                </div>
                                : searchData?.detail ?
                                    <div>
                                        { searchData.detail }
                                    </div>
                                    :
                                    <div>
                                        Please Search Something....
                                    </div>
                           
                        
                    }
                </div>
            </div>


        </div>
    )
}

export default Home

const flexStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: '40px',
    marginBottom: '40px'
}