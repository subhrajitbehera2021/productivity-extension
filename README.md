# FocusTrack - Productivity Management Chrome Extension

## CODTECH Internship Task - 4

### Intern Details

**Name:** Subhrajit Behera

**Internship Organization:** CODTECH IT Solutions

**Task:** Build a Chrome Extension for Productivity Management

---

# Project Overview

FocusTrack is a productivity management browser extension developed using React and Chrome Extension Manifest V3. The extension helps users improve productivity by tracking website usage, monitoring time spent on websites, blocking distracting websites, and generating productivity reports.

The extension runs directly inside the browser and provides real-time monitoring of user activity.

---

# Objectives

* Monitor website usage.
* Track productive and unproductive browsing time.
* Block distracting websites.
* Generate productivity reports.
* Improve focus and time management.

---

# Features

## Website Time Tracking

Tracks time spent on websites such as:

* GitHub
* ChatGPT
* Stack Overflow
* YouTube
* Instagram
* Facebook

The extension automatically records browsing duration.

---

## Productivity Dashboard

Displays:

* Total Time
* Productive Time
* Distracting Time
* Website Usage Statistics

---

## Website Blocking

Users can block distracting websites such as:

* youtube.com
* instagram.com
* facebook.com
* twitter.com

When a blocked website is visited, the extension redirects the user to a productivity reminder page.

---

## Blocked Site Management

Users can:

* Add blocked websites
* Remove blocked websites
* Customize focus preferences

---

## Local Data Storage

Uses:

chrome.storage.local


to save:

* Website usage data
* Blocked websites
* Productivity statistics

---

# Technologies Used

## Frontend

* React.js
* Vite
* CSS3

## Browser Extension

* Chrome Extension Manifest V3
* Chrome Storage API
* Chrome Tabs API
* Service Workers

## Browser

* Brave Browser
* Google Chrome

---

# Project Structure

productivity-extension/

│
├── public/
│   ├── manifest.json
│   ├── background.js
│   ├── blocked.html
│   └── blocked.css
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md


---

# How It Works

## Step 1

User opens websites.


YouTube
GitHub
ChatGPT
Stack Overflow


---

## Step 2

Background Service Worker monitors active tabs.


Website Opened
      ↓
Background Script Detects Website
      ↓
Timer Starts


---

## Step 3

Time spent on each website is recorded.


github.com → 10 min
chatgpt.com → 15 min
youtube.com → 25 min


---

## Step 4

Data is stored locally.


chrome.storage.local


---

## Step 5

React Dashboard displays statistics.


Total Time
Productive Time
Distracting Time


---

## Step 6

Blocked websites are automatically redirected.


User Opens YouTube
        ↓
Extension Detects Blocked Site
        ↓
Blocked Page Displayed


---

# Installation

## Clone Repository


git clone <repository-url>


---

## Install Dependencies


npm install


---

## Start Development


npm run dev


---

## Build Extension


npm run build


Build files are generated inside:


dist/

---

## Load Extension in Browser

### Brave Browser

Open:


brave://extensions


### Google Chrome

Open:


chrome://extensions


Then:

1. Enable Developer Mode
2. Click Load Unpacked
3. Select the dist folder

---

# Functionalities

## Productivity Tracking

Tracks:

* Website usage
* Active browsing time

---

## Productivity Reports

Displays:

* Daily browsing report
* Productive websites
* Distracting websites

---

## Focus Mode

Blocks:

* YouTube
* Facebook
* Instagram
* Twitter

Users can customize blocked websites.

---

# Future Enhancements

## Backend Integration

* Node.js
* Express.js

---

# Learning Outcomes

Through this project, I learned:

* React Development
* Chrome Extension Development
* Manifest V3
* Service Workers
* Browser APIs
* Website Tracking
* Browser Storage
* Productivity Analytics
* Extension Deployment

---

# Conclusion

FocusTrack is a productivity-focused browser extension that helps users manage their time effectively by monitoring website usage, blocking distractions, and providing useful productivity insights. The project demonstrates practical implementation of React and Chrome Extension technologies while solving a real-world productivity problem.

---

## Developed By

**Subhrajit Behera**

CODTECH Internship Task - 4

FocusTrack - Productivity Management Chrome Extension
