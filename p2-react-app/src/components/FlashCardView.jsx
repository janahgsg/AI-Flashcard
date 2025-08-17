import { useEffect, useMemo, useState } from 'react'
import '../styles/FlashCardView.css'

const FlashCardView = ({ flashcards, subject }) => {

  //Local copy of flashcards to reshuffle the cards
  const [deck, setDeck] = useState([...flashcards]);
  //prev and next button
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setDeck([...flashcards]);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [flashcards]);

  const currentCard = deck[currentIndex] || {question: '', answer: ''};

  //Progress through the decks
  const progress = useMemo(() => {
    if (deck.length === 0) return 0;
    return ((currentIndex + 1) / deck.length) * 100;
  }, [currentIndex, deck.length]);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  }
  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? deck.length - 1 : prev - 1));
  };

  const resetCards = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  }

  const shuffleCards = () => {
    setDeck((prev) => {
      const copy = [...prev];
      copy.sort(() => Math.random() - 0.5);
      return copy;
    });
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  if (deck.length === 0) return <p>No flashcards yet.</p>;
  
  return (
    <div className='flashcard-view'>
      <div className="flashcard-content">
        {/*Header*/}
        <div className="flashcard-view-header">
          <div className="flashcard-view-content">
           
            <div className="title">
              {subject || "Untitled"}
            </div>

            <div className="card-controls">
              <button className='control-btn' onClick={shuffleCards}>Shuffle</button>
              <button className='control-btn' onClick={resetCards}>Reset</button>
            </div>
         
          </div>

          <div className="progress-section">
            <div className="progress-status">
              {/* Card counter */}
              <div className='card-counter'>
                Card <span className='current'>{currentIndex + 1}</span> of <span className='total-cards'>{deck.length}</span>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ "--progress-width": `${progress}%` }}></div>
            </div>
          </div>
          
        </div>



          
          <div className="flashcard-container">

            {/*Flashcard*/}
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped((prev) => !prev)}
            role='button' tabIndex={0}>
              
              <div className="flashcard">
                {/*Card front*/}
                <div className="card-face card-front">
                  <span className="card-type">Question</span>
                  <div className="card-content">
                    {currentCard.question}
                  </div>
                  <span className='flip'>Tap to reveal answer</span>
                </div>

                {/*Card back*/}
                <div className="card-face card-back">
                  <span className="card-type">Answer</span>
                  <div className="card-content">
                    {currentCard.answer}
                  </div>
                  <span className='flip'>Tap to see question</span>
                </div>
              </div>
            
            </div>
          </div>



        {/*Navigation*/}
        <div className="navigation-controls">
          <button className='nav-btn' onClick={prevCard} disabled={currentIndex === 0}>Previous</button>
          <button className='nav-btn primary' onClick={nextCard} disabled={currentIndex === deck.length -1}>Next</button>
        </div>
        


      </div>
      
    </div>
  )
}

export default FlashCardView