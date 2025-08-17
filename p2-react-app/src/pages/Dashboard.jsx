import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

import Navbar from "../components/Navbar"
import FolderList from "../components/FolderList"
import CreateFolderForm from "../components/FolderForm"
import search_icon from'/src/assets/icons/search_icon.png'
import '../styles/Dashboard.css'
import Contact from "../components/Contact"

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();

  // 👇 check query param "create"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("create") === "true") {
      setShowForm(true);
    }
  }, [location]);

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

  //delete a folder
  const deleteFolder = (id) => {
    setFolders((prev) => prev.filter((folder) => String(folder.id) !== String(id)));
  };

  //filter folders
  const filterFolders = folders.filter((folder) => folder.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='dashboard'>

      <Navbar />

      <div className="dashboard-content">

        {/*Header*/}
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <h1>My study Folders</h1>
            <p>Organize your flashcard sets and track your learning progress</p>
          </div>
          <button className="add-btn" onClick={() => setShowForm(true)}>+ Create Folder</button>
        </div>
      
        {/*Search*/}
        <div className="search-section">
          <div className="search-container">
            <div className="search-icon"><img src={search_icon} alt="search-con"/></div>
            <input type="text" value={searchTerm} className="search-input" onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
        </div>

        {/*Folders Grid*/}
        <div className="folders-container">
          <FolderList folders={filterFolders} onDelete={deleteFolder}/>
        </div>

        {/*Show form modal if needed*/}
        {showForm && <CreateFolderForm onSave={addFolder} onClose={() => setShowForm(false)} />}

      </div>
      <section id="contact">
        <Contact />
      </section>
    </div>
  )
}

export default Dashboard