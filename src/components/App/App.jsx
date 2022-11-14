// import React from "react"
import React, { useState, useEffect } from "react"
import { Section } from './App.styled';
import Modal from "../Modal/Modal";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { fetchImagesWithQuery } from "services/API";
// import { useEffect, useState } from 'react';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  // const [showButton, setShowButton] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // перший render
    if (query === '') {
      return;
    }
    setStatus('pending');
    const fetchImages = async () => {
      try {
        const res = await fetchImagesWithQuery(query, page);
        if (page === 1) {
          setImages(res.data.hits);
        } else {
          setImages(prevState => [...prevState, ...res.data.hits]);
        }
        setTotalHits(res.data.totalHits);
        setQuery(query);
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };
    fetchImages();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const imageClick = largeImageURL => {
    setLargeImage(largeImageURL);
  };

  const onClose = () => {
    setLargeImage('');
  };

  if (status === 'idle') {
    return (
      <Section>
        <Searchbar onSubmit={handleFormSubmit} />
        {/* <MessageError message={"Введіть назву для пошуку"}/> */}
      </Section>
    );
  }
  // -----Спинер/загрузка-----
  if (status === 'pending') {
    return (
      <Section>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery onSelect={imageClick} images={images} />
        <Loader />
      </Section>
    );
  }
  // ----якщо помилка-----
  if (status === 'rejected') {
    return (
      <Section>
        <Searchbar onSubmit={handleFormSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
      </Section>
    );
  }
  // ----правильний запрос, все працює-----
  if (status === 'resolved') {
    return (
      <Section>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery onSelect={imageClick} images={images} />
        {largeImage.length > 0 && (
          <Modal imageModal={largeImage} closeModal={onClose} />
        )}
        {images.length !== totalHits && (
          <Button text="Load More..." clickHandler={loadMore} />
        )}
      </Section>
    );
  }
}


 

// class App extends React.Component {
//   state = {
//     images: [],
//     status: 'idle',
//     // loading: false,
//     error: null,
//     page: 1,
//     query: '',
//     largeImage: '',
//     // showButton: false,
//     totalHits: 0,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.query;
//     const prevPage = prevState.page;
//     const { query, page } = this.state;

//     if (prevQuery !== query || prevPage !== page) {
//       this.setState({ status: 'pending' });

//       try {
//         const res = await fetchImagesWithQuery(query, page);

//         this.setState(prevState => ({
//           images: [...prevState.images, ...res.data.hits],
//           totalHits: res.data.totalHits,
//           query: query,
//           status: 'resolved',
//         }));
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }
//   }

//   handleFormSubmit = query => {
//     this.setState({ query, page: 1, images: [] });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   ImageClick = largeImageURL => {
//     this.setState({ largeImage: largeImageURL });
//   };

//   onClose = () => {
//     this.setState({
//       largeImage: '',
//     });
//   };



//   render() {
//     const { images, error, largeImage, status, totalHits } = this.state;
//     // ----початок пуста сторінка----
//     if (status === 'idle') {
//       return (
//         <Section>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           {/* <MessageError message={"Введіть назву для пошуку"}/> */}
//         </Section>
//       );
//     }
//     // -----Спинер/загрузка-----
//     if (status === 'pending') {
//       return (
//         <Section>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ImageGallery onSelect={this.ImageClick} images={images} />
//           <Loader />
//         </Section>
//       );
//     }
//     // ----якщо помилка-----
//     if (status === 'rejected') {
//       return (
//         <Section>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           {error && <p>Whoops, something went wrong: {error.message}</p>}
//         </Section>
//       );
//     }
//     // ----правильний запрос, все працює-----
//     if (status === 'resolved') {
//       return (
//         <Section>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ImageGallery onSelect={this.ImageClick} images={images} />
//           {largeImage.length > 0 && (
//             <Modal imageModal={largeImage} closeModal={this.onClose} />
//           )}
//           {images.length !== totalHits && (
//             <Button text="Load More..." clickHandler={this.loadMore} />
//           )}
//         </Section>
//       );
//     }
//   }
// }

// export default App;



// return (
    //   <>
    //     <Searchbar onSubmit={this.handleFormSubmit} />
    //     {/* <p>{this.state.searchQuery}</p> */}

    //     {error && <p>Whoops, something went wrong: {error.message}</p>}
        
    //     {loading && <p>Загружаю...</p>}
    //     {images.length > 0 && (
    //     // <p>{this.state.searchQuery}</p>
    //       <ImageGallery query={this.state.query}>
    //         <ImageGalleryItem onSelect={this.ImageClick} images={images} />
    //       </ImageGallery>
    //     )}
    //      {!loading && (
    //           <Button text="Load More" clickHandler={this.loadMore} />
    //         )}
    //     <div>
    //       {largeImage.length > 0 && (
    //         <Modal imageModal={largeImage} closeModal={this.onClose} />
    //       )}
    //     </div>
    //     {/* <ToastContainer autoClose={3000}/> */}
    //   </>
    // );


    // async componentDidUpdate(prevProps, prevState) {
    //   const prevQuery = prevState.query;
    //   const prevPage = prevState.page;
    //   const { query, page } = this.state;
  
    //   if (prevQuery !== query || prevPage !== page) {
    //     this.setState({ status: 'pending' });
  
    //     try {
    //       const images = await fetchImagesWithQuery(query, page);
    //       const {
    //         data: { hits },
    //       } = images;
    //       this.setState({ images: hits, status: 'resolved' });
    //     } catch (error) {
    //       this.setState({ error, status: 'rejected' });
    //     }
    //   }
    // }