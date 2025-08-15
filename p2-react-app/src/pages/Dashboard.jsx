import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import FolderList from "../components/FolderList"
import CreateFolderForm from "../components/CreateFolderForm";
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  //load folders from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("folders");
      setFolders(data ? JSON.parse(data) : []);
    } catch (err) {
      console.error("Error parsing folders from localStorage", err);
      setFolders([]);
    }
    setIsLoaded(true);
  }, []);

  //save folders to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    console.log('Saving to localStorage:', folders)
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders, isLoaded]);

  //add new folder
  const addFolder = (newFolder) => {
    const folderWithFlashcards = { ...newFolder, flashcards: [] };
    setFolders((prev) => [...prev, folderWithFlashcards]);
    setShowForm(false);
  };

  return (
    <div className='dashboard'>

      <Navbar />

      <div className="dashboard-content">

        {/*Header*/}
        <div className="dashboard-header">
          <h1>My study Folders</h1>
          <p>Organize your flashcard sets and track your learning progress</p>
        </div>


        <button className="add-btn" onClick={() => setShowForm(true)}>+ Create Folder</button>
      
        {/*Search*/}
        <div className="search-section">
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input type="text" className="search-input"/>
          </div>
        </div>

        {/*Folders Grid*/}
        <div className="folders-container">
          <FolderList folders={folders}/>
        </div>

        {/*Show form modal if needed*/}
        {showForm && <CreateFolderForm onSave={addFolder} onClose={() => setShowForm(false)} />}

      </div>
    </div>
  )
}

export default Dashboard