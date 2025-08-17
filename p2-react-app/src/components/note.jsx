import { useEffect, useMemo, useState } from "react";
import "../styles/FlashCardView.css";

const FlashCardView = ({ flashcards }) => {
  /**
   * 🔹 deck = local copy of flashcards
   * We don’t use flashcards directly because:
   *  - If we shuffle, we’d accidentally mutate the original prop (bad practice)
   *  - Keeping a local copy lets us reset/shuffle independently
   */
  const [deck, setDeck] = useState(() => [...flashcards]);

  /**
   * 🔹 currentIndex = which card the user is currently on
   * Starts at 0 (first card). Updates when pressing Next/Previous/Reset/Shuffle.
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * 🔹 isFlipped = whether the current card is showing its front (Q) or back (A)
   * Starts as false (showing Question side). Clicking the card toggles this.
   */
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * 🔹 useEffect runs whenever flashcards prop changes (e.g. AI generated new ones)
   * What it does:
   *   1. Copies the new flashcards into our deck
   *   2. Resets to the first card
   *   3. Makes sure card starts unflipped
   */
  useEffect(() => {
    setDeck([...flashcards]);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [flashcards]);

  /**
   * 🔹 currentCard = the card object we are currently showing
   * Defensive fallback: if deck is empty, show blank question/answer
   */
  const currentCard = deck[currentIndex] || { question: "", answer: "" };

  /**
   * 🔹 progress = how far through the deck the user is (0 → 100%)
   * useMemo optimizes this so we don’t recalc unless index or deck changes
   */
  const progress = useMemo(() => {
    if (deck.length === 0) return 0;
    return ((currentIndex + 1) / deck.length) * 100;
  }, [currentIndex, deck.length]);

  // 👉 Moves to the next card, loops back at the end
  const nextCard = () => {
    setIsFlipped(false); // always start on Q side
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  // 👉 Moves to the previous card, loops back to last if at start
  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? deck.length - 1 : prev - 1));
  };

  // 👉 Resets to the very first card
  const resetCards = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  /**
   * 🔹 shuffleCards = randomizes the order of deck using Fisher-Yates algorithm
   * After shuffle:
   *   - Reset to first card
   *   - Reset flip state
   */
const shuffleCards = () => {
  setDeck(prev => {
    const copy = [...prev];                 // don't mutate state directly
    copy.sort(() => Math.random() - 0.5);   // quick 'n simple shuffle
    return copy;
  });
  setIsFlipped(false);
  setCurrentIndex(0);
};

  // 👉 If no cards exist, show fallback
  if (deck.length === 0) return <p>No flashcards yet.</p>;

  return (
    <div className="flashcard-container">
      <h2>Flashcards</h2>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      {/* Card (click to flip) */}
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped((prev) => !prev)} // toggle between Q/A
        role="button"
        tabIndex={0}
      >
        <div className="face front">
          <strong>Q:</strong>&nbsp;{currentCard.question}
        </div>
        <div className="face back">
          <strong>A:</strong>&nbsp;{currentCard.answer}
        </div>
      </div>

      {/* Buttons to navigate */}
      <div className="controls">
        <button onClick={prevCard}>Previous</button>
        <button onClick={resetCards}>Reset</button>
        <button onClick={shuffleCards}>Shuffle</button>
        <button onClick={nextCard}>Next</button>
      </div>

      {/* Card counter */}
      <p>
        Card {currentIndex + 1} of {deck.length}
      </p>
    </div>
  );
};

export default FlashCardView;
