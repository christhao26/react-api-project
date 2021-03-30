import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CountryList from './CountryList';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [countryListDefault, setCountryListDefault] = useState();
  const [countryList, setCountryList] = useState();

  const fetchData = async () => {
    return await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
         setCountryList(data) 
         setCountryListDefault(data)
       });}

  const updateInput = async (input) => {
     const filtered = countryListDefault.filter(country => {
      return country.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setCountryList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <h1>Country List</h1>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <CountryList countryList={countryList}/>
    </>
   );
}

export default SearchPage










import React, { Component } from 'react';
import Book from "./Book"






class Shelf extends Component {

    constructor(props){
        super(props)
        this.state={
            books:[],
            searchInput:"",
            myurl:[],
            filter:"",
              clear:true  }
    }
handleInputChange=(e)=>{
    this.setState({searchInput:e.target.value})
}
clear=()=>{
    this.setState({searchInput:"",filter:"",clear:true})
  
    
    
}

filters=()=>{
   
   let url=""
   const title=this.state.searchInput.replace(/\s/g, '+')
   const filter=this.state.filter.replace(/\s/g, '+')
   if(title!="" && filter=="")
         url=`http://openlibrary.org/search.json?title=${title}`
    else if(title=="" && filter!="")
          url=`http://openlibrary.org/search.json?author=${filter}`
    else if(title!=="" && filter!=="")
{            url=`http:/openlibrary.org/search.json?author=${filter}&title=${title}`
        alert(url+"   "+"http://openlibrary.org/search.json?author=Victoria+Aveyard&title=red+queen")
}

    return url

}
componentDidUpdate(){
    
    if(this.state.clear){
        alert(this.state.clear)
        fetch('http://openlibrary.org/search.json?')
        .then(async response => {
            const data = await response.json();
         // check for error response
         if (!response.ok) {
             // get error message from body or default to response statusText
             const error = (data && data.message) || response.statusText;
             return Promise.reject(error);
         }
         this.setState({ books: data.docs}) 
     })
     .catch(error => {
         this.setState({ errorMessage: error.toString() });
         console.error('There was an error!', error);
     });
     this.setState({clear:false})
    }
}
 HandleSearch=()=>{
    
    const title=this.state.searchInput.replace(/\s/g, '+')
    const filter=this.state.filter.replace(/\s/g, '+')
    var url=this.filters()
     fetch(url)
      .then(async response => {
          const data = await response.json();
       // check for error response
       if (!response.ok) {
           // get error message from body or default to response statusText
           const error = (data && data.message) || response.statusText;
           return Promise.reject(error);
       }
       this.setState({ books: data.docs}) 
   })
   .catch(error => {
       this.setState({ errorMessage: error.toString() });
       console.error('There was an error!', error);
   });
}

handleFilterChange=(e)=>{
    const text=e.target.value
     this.setState({filter:text})
 }     

 


    render() {
        return (
            < div className=" text-center ">
                <nav className="navbar navbar-dark  text-center">
                    
                     <img src="https://www.vhv.rs/dpng/d/593-5939450_library-icon-library-icon-transparent-background-hd-png.png" style = {{borderRadius:"50%",height: 100, width: 150, resizeMode : 'stretch',}} />

                    <h1 style={{color:"white",float:"left"}}>I love Aaya</h1>
                 </nav>

          <section className="jumbotron text-center">
             <div className="container align-middle ">
               <form className="form-inline mx-4">
                 
                    <div className="form-group mx-4 ">
                        <label className="mx-2">Author Name</label>
                         <input value={this.state.filter} onChange={this.handleFilterChange}/> 
                    </div>
                    <div className="form-group">
                        <label className="mx-2">Title</label>
                         <input value={this.state.searchInput} onChange={this.handleInputChange}/> 
                    </div>
                    <button  className="btn btn-warning mx-2" onClick={this.HandleSearch} onMouseDown={this.HandleSearch}>Search</button>
                    <button  className="btn btn-danger " onClick={this.clear}>Clear</button>
                  </form>
               </div>
          </section>


      
       <div className=" container ">
           <div className="row">
       {this.state.books.map((book)=>  <div><Book  key={book.key}  title={book.title} author={book['author_name']}  firstLine={book['first_sentence']}src={`http://covers.openlibrary.org/b/olid/${book['cover_edition_key']}-L.jpg`} /> <a href={`https://openlibrary.org/books/${book['cover_edition_key']}/${book.title.replace(/\s/g, '_')}`} target="blank">Preview...</a></div>)}
        </div> 
</div>

            <footer className="text-muted fixed-bottom text-center  py-2 footer">

                <div className="container">
                  <p >
                   <a href="#root">Back to top</a>
                 </p>
             </div>
            </footer>
            </div>
            
        );
    }
}

export default Shelf;
const options = [
    'Title', 'Author'
  ];
  