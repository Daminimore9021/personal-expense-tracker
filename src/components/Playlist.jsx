import React, { useState, useEffect, useRef } from 'react';

const VIDEOS = [
    {
        src: "v1.mp4",
        title: "How to plan and Budget Monthly Expenses || Home Budgeting Tips for Indian Households",
        desc: "Guide for Indian Households",
        icon: "bx-play-circle"
    },
    {
        src: "v2.mp4",
        title: "Investing: How to live (and save) at any salary - 10k, 20k, 50k, 100k",
        desc: "Budgeting for 10k, 20k, 50k salary",
        icon: "bx-play-circle"
    },
    {
        src: "v3.mp4",
        title: "7 Tips for Money Management & Saving Money || Make a Financial Plan Wisely",
        desc: "Learn to make plans wisely",
        icon: "bx-play-circle"
    },
    {
        src: "v4.mp4",
        title: "Budgeting & Investing Guide: 30,000 INR/Month Salary",
        desc: "Step-by-step investing & saving",
        icon: "bx-play-circle"
    },
    {
        src: "v5.mp4",
        title: "The Smart Rule of Money Management || 50-20-30 Rule",
        desc: "Modern money allocation standard",
        icon: "bx-play-circle"
    },
    {
        src: "v6.mp4",
        title: "Managing Your Money like the RICH!",
        desc: "Key mindset shifts for wealth",
        icon: "bx-play-circle"
    },
    {
        src: "v7.mp4",
        title: "7 Simple Tips To Manage Your Money Better || Money Management Hacks",
        desc: "Actionable saving tips",
        icon: "bx-play-circle"
    }
];

export default function Playlist() {
    const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);
    const videoPlayerRef = useRef(null);

    // Auto-play video when source changes
    useEffect(() => {
        if (videoPlayerRef.current) {
            videoPlayerRef.current.load();
            videoPlayerRef.current.play().catch(err => {
                console.log("Auto-play blocked or video source change: ", err);
            });
        }
    }, [activeVideo]);

    return (
        <section id="view-videos" className="tab-content active">
            <div className="playlist-grid">
                {/* Main Video Player Card */}
                <div className="card player-card">
                    <div className="main-video-container">
                        <video 
                            ref={videoPlayerRef}
                            src={activeVideo.src} 
                            controls 
                            className="main-video"
                        ></video>
                    </div>
                    <div className="video-info">
                        <h3>{activeVideo.title}</h3>
                        <p>{activeVideo.desc}</p>
                    </div>
                </div>

                {/* Playlist Selection Card */}
                <div className="card playlist-list-card">
                    <h3>Budgeting & Money Guides</h3>
                    <div className="video-list-container">
                        {VIDEOS.map((v, index) => (
                            <div 
                                className={`playlist-item ${activeVideo.src === v.src ? 'active' : ''}`}
                                key={index}
                                onClick={() => setActiveVideo(v)}
                            >
                                <i className={`bx ${v.icon} video-icon`}></i>
                                <div className="video-details">
                                    <h4>{v.title.split("||")[0]}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
