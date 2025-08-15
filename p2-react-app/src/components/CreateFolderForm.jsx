import { useState } from 'react'

const CreateFolderForm = ({ onSave, onClose }) => {

  const [formData, setFormData] = useState({
      name:'',
      subject:'',
      description: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]:value}));
  };

  const handleSubmit= (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Folder name is required');
      return;
    }

    const newFolder = {
        id: Date.now(),
        ...formData,
        flashcards: []
    };

    onSave(newFolder);
  };

  return (
    <div className='create-folder-form'>
        <div className="folder-content">
            {/*Header */}
            <h2 className="modal-title">Create New Folder</h2>
            <p className="modal-subtitle">Organize your flashcard sets into folders</p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="folder-form">
                <div className="folder-row">
                    <label className='name'>Folder Name <span>*</span></label>
                    <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='e.g., Biology Final Exam' required/>
                </div>
                <div className="folder-row">
                    <label className='subject'>Subject</label>
                    <input type='text' name='subject' value={formData.subject} onChange={handleChange} placeholder='e.g., Biology'/>
                </div>
                <div className="folder-row">
                    <label className='description'>Description</label>
                    <input type='text' name='description' value={formData.description} onChange={handleChange} placeholder='Brief description'/>
                </div>
            </div>
            
            <div className="form-actions">
                <button type='submit' className='save-btn'>Save</button>
                <button type='button' className='close-btn' onClick={onClose}>Cancel</button>
            </div>
        </form>

    </div>
  )
}

export default CreateFolderForm