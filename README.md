# CS50 Readability Extension 


## Browser extension which evaluates the readability of text

Getting Started
### Setup
1. `Clone` or fork the repository<br/>
2. `npm install`<br/>
3. Create a production build:<br/>
`npm run build`<br/>

4. `Load Extension` in Chrome<br/>
Open Chrome and navigate to chrome://extensions/.<br/>

Enable "Developer mode" using the toggle switch in the top right corner.<br/>
Click "Load unpacked" and select the build directory.<br/>
Your React app should now be loaded as a Chrome extension!<br/>


🗂️ Project Structure<br/>

`public/`: Contains static files required for browser actions and the manifest.json.<br/>
`manifest.json`: Essential for the app to be recognised as an extension <br/>
`src/`: Contains the React app source code.<br/>
`vite.config.ts`: Vite configuration file.<br/>
`tsconfig.json`: TypeScript configuration file.<br/>
`package.json`: Contains the project dependencies and scripts.<br/>
