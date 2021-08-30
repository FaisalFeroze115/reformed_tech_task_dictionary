import React from 'react'
import { Button, Card, ListGroup, ListGroupItem  } from 'react-bootstrap';
import {convertExample} from '../utils'

const SearchResults = (props) => {
    const { pronunciation, word, type, definition, example, image_url, from, removeFav } = props;

    const addFav = () => {
        let conterted_example = '';
        if(example){
            conterted_example = convertExample(example);
        }
        
        const saved = localStorage.getItem("favourites");
        const myFav = JSON.parse(saved);

        let alreadyExist = false;
        console.log('local',myFav)

        if(myFav && myFav.length > 0){
            for(let el of myFav){
              if(el.word === word && el.type === type && el.definition === definition){
                 alreadyExist = true;
                 alert('This Item is already added to favorites!!');
                 break;
              }
            }
            if(alreadyExist){
                alreadyExist = false;
            }else{
                const newFav = [
                    ...myFav,
                    {pronunciation, word, type, definition, image_url, example: conterted_example}
                ] 
            
                console.log('multi',newFav)
                localStorage.setItem('favourites', JSON.stringify(newFav));
                alert(`${word} have been added to your favorites list`);
            }
          }else{
            const newFav = [{
                pronunciation, word, type, definition, image_url, example: conterted_example
            }];
            console.log('one',newFav);
            localStorage.setItem('favourites', JSON.stringify(newFav));
            alert(`${word} have been added to your favorites list`);
          }  
    }

    

    return (
        <div style={{marginTop: '30px'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image_url}/>
                <Card.Body>
                    <Card.Title>{word}</Card.Title>
                    <Card.Text>
                        {definition}
                    </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                    <ListGroupItem> <b>Type:</b> {type}</ListGroupItem>
                    <ListGroupItem><b>Pronunciation:</b> " {pronunciation} "</ListGroupItem>
                    <ListGroupItem><b>Example:</b> {example} </ListGroupItem>
                </ListGroup>

                <Card.Body>
                    {
                        from === 'favourite' ? 
                        <Button onClick={()=>{removeFav(word,type)}} variant="danger">Remove from Favourites</Button>
                        : 
                        <Button onClick={addFav} variant="success">Add to Favourites</Button>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default SearchResults
