// // // frontend/src/components/Dashboard.js
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import '../styles/Dashboard.css'

// // const Dashboard = () => {
// //     const [items, setItems] = useState([]);
// //     const [newItem, setNewItem] = useState({
// //         title: '',
// //         description: '',
// //         start_date: '',
// //         end_date: '',
// //         starting_bid: '',
// //         category_id: 2 // Default category ID, adjust as needed
// //     });

// //     useEffect(() => {
// //         fetchItems();
// //     }, []);

// //     const fetchItems = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:5000/api/items');
// //             setItems(response.data);
// //         } catch (error) {
// //             console.error('Error fetching items:', error);
// //         }
// //     };

// //     const handleAddItem = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const userId = 1; // Replace with actual user ID from context or state
// //             await axios.post('http://localhost:5000/api/items', { ...newItem, user_id: userId });
// //             fetchItems(); // Refresh the item list
// //             setNewItem({ title: '', description: '', start_date: '', end_date: '', starting_bid: '', category_id: 1 });
// //         } catch (error) {
// //             console.error('Error adding item:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>BiDBazZAR</h1>
// //             <h2>Add New Item</h2>
// //             <form onSubmit={handleAddItem}>
// //                 <input type="text" placeholder="Title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} required />
// //                 <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
// //                 <input type="datetime-local" value={newItem.start_date} onChange={(e) => setNewItem({ ...newItem, start_date: e.target.value })} required />
// //                 <input type="datetime-local" value={newItem.end_date} onChange={(e) => setNewItem({ ...newItem, end_date: e.target.value })} required />
// //                 <input type="number" placeholder="Starting Bid" value={newItem.starting_bid} onChange={(e) => setNewItem({ ...newItem, starting_bid: e.target.value })} required />
// //                 <button type="submit">Add Item</button>
// //             </form>

// //             <h2>Available Items</h2>
// //             <ul>
// //                 {items.map(item => (
// //                     <li key={item.id}>
// //                         <h3>{item.title}</h3>
// //                         <p>{item.description}</p>
// //                         <p>Starting Bid: ${item.starting_bid}</p>
// //                         <button onClick={() => alert(`Bid on item ${item.id}`)}>Bid</button>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default Dashboard;
// // frontend/src/components/Dashboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//     const [items, setItems] = useState([]);
//     const [newItem, setNewItem] = useState({ title: '', description: '', starting_bid: 0 });
//     const [bidAmounts, setBidAmounts] = useState({});

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         const response = await axios.get('http://localhost:5000/api/items');
//         setItems(response.data);
//     };

//     const handleAddItem = async (e) => {
//         e.preventDefault();
//         const userId = 1; // Replace with actual user ID from context or state
//         await axios.post('http://localhost:5000/api/items', { ...newItem, user_id: userId });
//         fetchItems(); // Refresh the item list
//         setNewItem({ title: '', description: '', starting_bid: 0 }); // Reset form
//     };

//     const handleBidSubmit = async (itemId) => {
//         const bidAmount = bidAmounts[itemId];
//         const transactionDate = new Date().toISOString();
//         await axios.post('http://localhost:5000/api/transactions', { bid_id: itemId, transaction_date: transactionDate, amount: bidAmount });
//         // Optionally refresh items or show a success message
//     };

//     return (
//         <div>
//             <h2>Add New Item</h2>
//             <form onSubmit={handleAddItem}>
//                 <input type="text" placeholder="Title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} required />
//                 <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
//                 <input type="number" placeholder="Starting Bid" value={newItem.starting_bid} onChange={(e) => setNewItem({ ...newItem, starting_bid: e.target.value })} required />
//                 <button type="submit">Add Item</button>
//             </form>

//             <h2>Available Items</h2>
//             {items.map(item => (
//                 <div key={item.id}>
//                     <h3>{item.title}</h3>
//                     <p>{item.description}</p>
//                     <p>Starting Bid: ${item.starting_bid}</p>
//                     <input type="number" placeholder="Enter your bid" onChange={(e) => setBidAmounts({ ...bidAmounts, [item.id]: e.target.value })} />
//                     <button onClick={() => handleBidSubmit(item.id)}>Place Bid</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Dashboard;
// frontend/src/components/BiddingDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Optional: Add your CSS file for styling

const Dashboard = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items from the API
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="bidding-dashboard">
            <nav className="navbar">
                <h1>Online Auction</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/feedback">Feedback</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
            <h2>Available Items</h2>
            <div className="item-list">
                {items.map(item => (
                    <div key={item.id} className="item-card">
                        <img src={item.image_url} alt={item.title} /> {/* Assuming image_url is a field in your items table */}
                        <h3>{item.title}</h3>
                        <p>Price: ${item.starting_bid}</p>
                        <p>Highest Bid: ${item.highest_bid || 0}</p>
                        <p>Highest Bidder: {item.highest_bidder || 'None'}</p>
                        <p>Bids: {item.bids_count || 0}</p>
                        <button onClick={() => handleBid(item.id)}>Place Bid</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const handleBid = (itemId) => {
    // Logic to handle placing a bid
    console.log(`Placing bid for item ID: ${itemId}`);
};

export default Dashboard;
