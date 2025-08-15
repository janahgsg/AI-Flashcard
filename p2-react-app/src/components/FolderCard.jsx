import { useNavigate } from 'react-router-dom'

import '../styles/FolderCard.css'
import folder_icon from '/src/assets/icons/folder.png'
import trash_icon from '/src/assets/icons/delete.png'

const FolderCard = ({ folder }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/folder/${folder.id}`)
  }
  return (
    <div className="folder-card" onClick={handleClick}>
      <div className="folder-action">
        <button className='delete-btn'><img src={trash_icon} alt='trash-icon'/></button>
      </div>
        <div className="folder-icon"><img src={folder_icon} alt='folder icon'/></div>
        <h3>{folder.name}</h3>
        <p>{folder.subject}</p>
        <p>{folder.description}</p>        
    </div>
  )
}

export default FolderCard