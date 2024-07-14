import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';
import './assets/ProblemSet.css'

function ProblemSet() {

    const [selectedProblemSet, setSelectedProblemSet] = useState(null);

    const problemSets = [
        { id: 0, title: '1. Two Sum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.'},
        { id: 1, title: '2. Longest Substring Without Repeating Characters', description: 'Given a string s, find the length of the longest substring without repeating characters.' },
        { id: 2, title: '3. Median of Two Sorted Arrays', description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.The overall run time complexity should be O(log (m+n)).' },
        { id: 3, title: '4. Longest Palindromic Substring',description: 'Given a string s, return the longest palindromic substring in s.'},
        { id: 4, title: '5. Reverse Integer',description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.Assume the environment does not allow you to store 64-bit integers (signed or unsigned).'},
        { id: 5, title: '6. Palindrome Number',description: 'Given an integer x, return true if x is a palindrome, and false otherwise.'},
    ];
    return (
        <div className='main'>
            <div className="top-bar">
                <div className="left">
                    <a href="/home">Home</a>
                    <a href="/problemset">Problemset</a>
                </div>
                <div className="right">
                    <a href="/profile">Profile</a>
                </div>
            </div>
            <center>
                <div className="problem-set-list">
                    <h1>Problem Sets</h1>
                    <div className="problem-set-list-container">
                        <div className="alignit">
                            {problemSets.map((problemSet) => (
                                <Link key={problemSet.id} to={`/problemset/${problemSet.id}`} className="problem-set-item">
                                    <h3>{problemSet.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default ProblemSet;