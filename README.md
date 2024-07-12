# File Management REST API

## Description
This application is a RESTful API built with Node.js, Express.js, and various Node modules to manage files. The API allows users to perform basic file operations such as listing, creating, reading, updating, and deleting files.

## Application Features
The application allows users to:
- List all files in the "data" directory on the homepage.
- Create a new file with a specified name and content.
- View the content of a specific file by clicking on its name.
- Update/Modify the name of a file.
- Delete a file.

## Getting Started

### Prerequisites
Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation
1. **Clone the Repository**
   ```sh  
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. Install Dependencies
   ```sh 
   npm install
   
3. Run the Application
    ```sh 
   node server.js

Interacting with the Application

	1.	List All Files:
    	Navigate to http://localhost:3000/ in your web browser to see a list of all files in the “data” directory.

	2.	Create a New File:
		Go to http://localhost:3000/create to open the form for creating a new file. Enter the file name and content, then submit the form to create the file.

	3.	View File Content:
		Click on the name of a file listed on the homepage to view its content.

	4.	Update/Modify a File Name:
		To update the name of a file, navigate to the file’s detail view and use the provided options to modify the file name.

	5.	Delete a File:
		In the file’s detail view, use the provided options to delete the file.


If you wish to explore further, you can add additional features such as:

	•	File Upload: Allow users to upload files to the server.
	•	File Retrieval: Enable users to retrieve and download files.
	•	File Search: Implement search functionality to find files by name or metadata.
	•	File Compression: Provide options to compress files before upload or download compressed files.
	•	File Encryption: Add file encryption for secure storage and transmission.

Enjoy using the File Management REST API!