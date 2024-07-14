import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';
import './assets/Home.css'

function Home() {

    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        if (!announcements.length) {
            const fetchedAnnouncements = [
                { id: 1, title: "Code Pirate", description: "This is first Announcement" }
            ];
            setAnnouncements(fetchedAnnouncements);
        }
    }, []);

    const handleAnnouncementClick = (announcement) => {
        setSelectedAnnouncement(announcement);
    };

    return (
        <div className='main'>
            <div className="top-bar">
                <div className="left">
                    <a href="#home">Home</a>
                    <a href="/problemset">Problemset</a>
                </div>
                <div className="right">
                    <a href="#profile">Profile</a>
                </div>
            </div>
            <div className="announcement-list">
                <h2>Announcements</h2>
                <div className="announcement-list-container">
                    <div className='announcement-left'>
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="announcement-item" onClick={() => handleAnnouncementClick(announcement)}>
                                <h3 >
                                    {announcement.title}
                                </h3>
                                <p onClick={() => handleAnnouncementClick(announcement)}>{announcement.description}</p>
                            </div>
                        ))}
                    </div>
                    {selectedAnnouncement && (
                        <div className='announcement-right'>
                            <div className="announcement-detail">
                                <h3>Full Article for: {selectedAnnouncement.title}</h3>
                                <p>
                                    {selectedAnnouncement.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
export default Home;