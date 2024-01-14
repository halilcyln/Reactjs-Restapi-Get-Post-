// Card.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Card() {
  const [cards, setCards] = useState([]);
  const { id } = useParams(); // Use usePar
  const [cardDetail, setCardDetail] = useState(null);
  const [newCard, setNewCard] = useState({
    title: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setCards(response.data);
      } catch (error) {
        console.error('Veri alınamadı', error);
      }
    };

    fetchData();
  }, []);

  const addCard = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newCard);
      setCards([...cards, response.data]);
      setNewCard({
        title: '',
        price: 0,
        image: '',
      });
      console.log('Card added successfully', response.data);
    } catch (error) {
      console.error('Error adding card', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };
  

    


  return (
    <div className="App">
      <div    className="mb-3">
        <h2>Add New Card</h2>
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={newCard.title}
          onChange={handleInputChange}
        />
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={newCard.price}
          onChange={handleInputChange}
        />
        <label htmlFor="image" className="form-label">
          Image URL:
        </label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="image"
          value={newCard.image}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-2" onClick={addCard}>
          Add Card
        </button>
      </div>

      <div className="row w-100">
  {cards.map((card) => (
    <div key={card.id}  className="col-xl-3 col-md-3 col-sm-6 mb-3">
      <div className="card h-100 d-flex flex-column">
        <div className="card-body flex-grow-1">
          <h2 className="card-title">{card.title}</h2>
          <p className="card-text">{card.price} TL</p>
          <img
            style={{ width: '100px', height: '100px' }}
            src={card.image}
            alt={card.title}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default Card;
