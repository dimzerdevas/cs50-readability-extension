# 📖 CS50 Readability Extension  
A browser extension that evaluates the readability of selected text.

---

## 🏗️ Setup

1. **Clone the repository**  
```bash
   git clone https://github.com/dimzerdevas/cs50-readability-extension/
```
2. Install dependencies
 ```bash
   npm install
   ```
3. Set up API key for prompt functionality
  - Create an `.env` file using `.env.sample`  as a reference.
  - Add your `Google API key` as an environment variable `VITE_GOOGLE_API_KEY = YOUR_GOOGLE_API_KEY` <br/> 
(eg. `VITE_GOOGLE_API_KEY = 12345`)
4. Build the extension: 
```bash
   npm run build
   ```
This generates a `build` folder suitable for use as a browser extension<br/>
<br/>
5. `Load Extension` in Chrome.<br/>
  - Navigate to `chrome://extensions/`.<br/>
  - Enable `"Developer mode"` (toggle in the top right)<br/>
  - Click `"Load unpacked"`
  - Select the `build` directory.<br/>
  - The `readability helper extension` should now be installed and ready to use!<br/>

<ins>Note</ins>: Any change on source code, requires a new build (`step 4`) and loading (`step 5`)<br/>

### 📌 Usage
1. Ensure the extension is properly installed and loaded.
2. Select any text on a webpage that you’d like to evaluate.
3. `Right-click` and select `CS50: Evaluate Readability` from the context menu.
4. `Click` on the `extension` icon to open the `popup` and view the results.
   
###  🗂️ Project Structure<br/>
`public/`: Static files required by the extension
  - `manifest.json`: Defines extension metadata, entry point (index.html), and permissions.
  - `background.js`: Sets up the `CS50: Evaluate Readability` context menu item, which sends the data to the React app<br/>

`src/`: Contains the React app source code.
  - Evaluates text `readability` based on the `CS50` assignment criteria
  - Sends `prompts` to the `Gemini API` using your `Google API key`<br/>
  - Displays results in the `extension` popup
  - Persists the data in `local storage` for user convenience
