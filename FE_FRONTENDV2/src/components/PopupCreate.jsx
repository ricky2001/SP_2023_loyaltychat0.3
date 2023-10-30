import React, { useState } from 'react';

function PopupCreate({ onClose, onSubmit }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  return (
    <div className="popup">
      <input
        type="text"
        placeholder="Enter text..."
        value={text}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PopupCreate;
