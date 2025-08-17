import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FlashCardView from "../components/FlashCardView"
import FlashcardForm from './FlashCardForm';


const FolderPage = () => {

  const {id} = useParams();
  const [folders, setFolders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
 
  //load folder from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem('folders');
      setFolders(data ? JSON.parse(data) : []);
    } catch (err) {
      console.error("Error parsing folders from localStorage", err);
      setFolders([]);
    }
    setIsLoaded(true);
  }, []);

  //save folder back to localStorage if updated
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('folders', JSON.stringify(folders))
  }, [folders, isLoaded]);

  //Find the current folder
  const currentFolder = folders.find((folder) => String(folder.id) === String(id));

  if (!currentFolder) return <p>Folder not found</p>; //?

  const hasFlashCards = Array.isArray(currentFolder.flashcards) && currentFolder.flashcards.length > 0; //?

  return (
    <div>
      {hasFlashCards ? (
        <FlashCardView flashcards={currentFolder.flashcards} subject={currentFolder.subject} />
      ) : (
        <FlashcardForm
          folderId={id}
          onSave={(newFlashcards, subject) => {
            const updatedFolders = folders.map((folder) =>
              String(folder.id) === String(id)
                ? { ...folder, flashcards: newFlashcards, subject }
                : folder
            );
            setFolders(updatedFolders);
          }}
        />
      )}
    </div>
  )
}

export default FolderPage