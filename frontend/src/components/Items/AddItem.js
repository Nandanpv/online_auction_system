// frontend/src/components/AddItem.js
import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', 1); // Replace with actual user ID
        formData.append('category_id', 1); // Replace with actual category ID
        formData.append('title', title);
        formData.append('description', description);
        formData.append('starting_bid', startingBid);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Item added:', response.data);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Starting Bid"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItem;

