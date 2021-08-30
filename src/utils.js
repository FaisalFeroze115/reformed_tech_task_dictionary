export const convertExample = (example) =>{
    let splitExample = example.split(' ');
    let newExample = [];
    for(let i=0; i<splitExample.length ; i++){
        if(i == 0){
            newExample.push(splitExample[i][0].toUpperCase() + splitExample[i].slice(1));
        }else{
            if(i == splitExample.length-1 && splitExample[splitExample.length-1] != '.'){
                newExample.push(splitExample[i] + '.');
            }else{
                newExample.push(splitExample[i]);
            }            
        }
    }
    newExample = newExample.join(' ');
    return newExample;
}

export const checkCharacter = (searchWord)=> {
    if(searchWord.includes('!') || searchWord.includes('@') || searchWord.includes('#') ||
        searchWord.includes('$') || searchWord.includes('%') || searchWord.includes('^') ||
        searchWord.includes('*') || searchWord.includes('.') || searchWord.includes('(') ||
        searchWord.includes(')') || searchWord.includes('-') || searchWord.includes('=') || 
        searchWord.includes('+') || searchWord.includes('_') || searchWord.includes(';') ||
        searchWord.includes(':') || searchWord.includes('<') || searchWord.includes('>') ||
        searchWord.includes(',') || searchWord.includes('?') || searchWord.includes('/') ||
        searchWord.includes('|') || searchWord.includes('}') || searchWord.includes('{') ||
        searchWord.includes('[') || searchWord.includes(']') || searchWord.includes(`'`) ||
        searchWord.includes(`"`) || searchWord.includes(`~`) || searchWord.includes('`') || 
        searchWord.includes(` `)){
            return true;
        }else{
            return false;
        }
}

