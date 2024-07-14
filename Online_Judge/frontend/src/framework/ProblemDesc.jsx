import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './assets/ProblemDesc.css'

function ProblemDesc() {

    const { id } = useParams()
    const [language, setLanguage] = useState('C++'); 
    const [cppCode, setCppCode] = useState('');
    const [javaCode, setJavaCode] = useState('');
    const [pythonCode, setPythonCode] = useState('');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const problemSets = [
        { id: 0, title: '1. Two Sum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.'},
        { id: 1, title: '2. Longest Substring Without Repeating Characters', description: 'Given a string s, find the length of the longest substring without repeating characters.' },
        { id: 2, title: '3. Median of Two Sorted Arrays', description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.The overall run time complexity should be O(log (m+n)).' },
        { id: 3, title: '4. Longest Palindromic Substring',description: 'Given a string s, return the longest palindromic substring in s.'},
        { id: 4, title: '5. Reverse Integer',description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.Assume the environment does not allow you to store 64-bit integers (signed or unsigned).'},
        { id: 5, title: '6. Palindrome Number',description: 'Given an integer x, return true if x is a palindrome, and false otherwise.'},
    ];

    const handleCodeChange = (event) => {
        switch (language) {
            case 'C++':
                setCppCode(event.target.value);
                break;
            case 'Java':
                setJavaCode(event.target.value);
                break;
            case 'Python':
                setPythonCode(event.target.value);
                break;
            default:
                break;
        }
    };

    const getCode = () => {
        switch (language) {
            case 'C++':
                return cppCode;
            case 'Java':
                return javaCode;
            case 'Python':
                return pythonCode;
            default:
                return '';
        }
    };

    return (
        <div className='main'>
            <div className='body-content'>
                <div className='description'>
                    <div className='heading'>
                        <h2 className='problem-heading'>{problemSets[id].title} </h2>
                    </div>
                    <div className='statement'>
                        <p>
                        {problemSets[id].description} 
                        </p>
                    </div>
                </div>
                <div className='code'>
                    <div className='selector'>
                        <select value={language} onChange={handleLanguageChange} className="language-selector">
                            <option value="C++">C++</option>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                        </select>
                        <button value={"Run"} className='run-btn'>Submit</button>
                        {/* <button value={"Submit"} className='submit-btn'/> */}
                    </div>
                    <div className='code-input'>
                        <textarea
                            spellCheck={false}
                            value={getCode()}
                            onChange={handleCodeChange}
                            className="code-editor"
                            placeholder={`Write your ${language} language code here...`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProblemDesc