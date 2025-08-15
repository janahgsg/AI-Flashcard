import FolderCard from "./FolderCard"
import '../styles/FolderList.css'

const FolderList = ({ folders }) => {
  
  //checks if the folders is empty
  if (folders.length === 0) {
    return <p>No folders yet. Create one to get started!</p>;
  }

  return (
    <div className='folder-list'>
        <div className="folders-grid">
            {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
            ))};
        </div>
    </div>
  )
}

export default FolderList