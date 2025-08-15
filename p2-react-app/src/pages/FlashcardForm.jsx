import { useState } from 'react'
import '../styles/FlashcardForm.css'

const FlashCardForm = ({ onSave }) => {

  const [formData, setFormData] = useState({
    subject: "",
    subtopic: "",
    specificItem: "",
    numberOfCards: 5,
    difficulty: "Easy",
    questionType: "Factual",
    answerFormat: "Short",
    educationLevel: "Middle School",
    language: "English",
    customKeywords: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setErrorMessage('API ket not found.');
      setLoading(false);
      return;
    }

    const prompt = 
    `Create ${formData.numberOfCards} ${formData.difficulty} ${formData.questionType} flashcards
      for ${formData.subject} > ${formData.subtopic} ${formData.specificItem ? "> " + formData.specificItem : ""}
      Education Level: ${formData.educationLevel}
      Answer Format: ${formData.answerFormat}
      Language: ${formData.language}
      ${formData.customKeywords ? "Include keywords: " + formData.customKeywords : ""}
      Give each flashcard as {question: "...", answer: "..."} in JSON array format only, no extra text.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}]
          })
        }
      );

      const data = await response.json();
      let textOutput = data?.candidates?.[0].content?.parts?.[0]?.text || '';

      textOutput = textOutput
      .replace(/```json\s*/i, '')
      .replace(/```/g, '')
      .trim();

      try {
        const parsed =JSON.parse(textOutput);
        if (Array.isArray(parsed)) {
          onSave(parsed);
        } else {
          setErrorMessage('AI returned JSON but not an array' + textOutput);
        }
      } catch {
        setErrorMessage('AI did not return valid JSON. Output:'+ textOutput);
      }
    } catch (error) {
      setErrorMessage('Error calling API: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flashcard-form'>
      <div className="flashcard-form-content">
        {/*Header*/}
        <div className="flashcard-header">
          <div className="header-content">
             <h1>AI Flashcard Generator</h1>
             <p>Create personalized study cards powered by artificial intelligence</p>
          </div>       
        </div>

        {/*Form*/}
        <form onSubmit={handleSubmit} className='flashcard-form-generator'>
          <div className="form-grid">
  
            <div className="form-field">
              <label htmlFor='subject'>Subject <span>*</span></label>
              <input type='text' name='subject' value={formData.subject} onChange={handleChange}  placeholder='e.g., Science' required/>
            </div>

            <div className="form-field">
              <label htmlFor='subtopic'>Subtopic</label>
              <input type='text' name='subtopic' value={formData.subtopic} onChange={handleChange}  placeholder='e.g., Solar System'/>
            </div>

            <div className="form-field">
              <label htmlFor='specificItem'>Specific Item</label>
              <input type='text' name='specificItem' value={formData.specificItem} onChange={handleChange} placeholder='e.g., Uranus'/>
            </div>

            <div className="form-field">
              <label htmlFor='educationLevel'>Education Level <span>*</span></label>
              <select name='educationLevel' value={formData.educationLevel} onChange={handleChange}>
                <option>Elementary</option>
                <option>Middle School</option>
                <option>High School</option>
                <option>College</option>
                <option>Graduate</option>
                <option>work</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor='language'>Language</label>
              <input type='text' name='language' value={formData.language} onChange={handleChange}/>
            </div>

            <div className="form-field">
              <label htmlFor='numberOfCards'>Number of Cards</label>
              <select name='numberOfCards' value={formData.numberOfCards} onChange={handleChange}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor='difficulty'>Difficulty</label>
              <select name='difficulty' value={formData.difficulty} onChange={handleChange}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor='questionType'>Question Type</label>
              <select name='questionType' value={formData.questionType} onChange={handleChange}>
                <option>Factual</option>
                <option>Conceptual</option>
                <option>Application</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor='answerFormat'>Answer Format</label>
              <select name='answerFormat' value={formData.answerFormat} onChange={handleChange}>
                <option>short Answer</option>
                <option>Full Sentence</option>
              </select>
            </div>

            <div className="form-field full-width">
              <label htmlFor='customKeywords'>Custom Keywords (optional)</label>
              <textarea type='text' name='customKeywords' value={formData.customKeywords} onChange={handleChange}/>
            </div>
          </div>

          <div className="btn-container">
            <button type='submit' className='generate-btn' disabled={loading}>
             {loading ? 'Generating...' : 'Generate FlashCards'}
          </button>
          </div>
        </form>

        {errorMessage && <pre>{errorMessage}</pre>}
      </div>
    </div>
       
      
  )
}

export default FlashCardForm