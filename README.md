In order to run the code (both the frontend and the backend) the following prerequisites need to be satisfied:

Recent version of Node.js.

Install npm. 

Install Python 3.

MongoDB Atlas account.

If needed download Visual Studio.

If you are using a macbook, run /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" to download homebrew.

Check the documentation for downloading the following.

Git: https://git-scm.com/downloads/win.

Node.js (includes npm): https://nodejs.org.

Python 3: https://www.python.org/downloads.

Run brew install node, brew install python, and brew install git on any terminal (can be outside the folder of this project)

Download the summer_bsp repository from the github (https://github.com/erikmayilyan/summer_bsp) 

Create an .env file in the backend and have the following three keys: MONGO_URI, STRIPE_SECRET_KEY, GEMINI_API_KEY. 

To obtain the MONGO_URI you will have to create a free cluster at mongodb.com/atlas. 
Create an IP or use 0.0.0.0/0 for testing purposes, create a database user, obtain and then paste the connection string. 
The string should look something like: mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/summer_bsp?retryWrites=true&w=majority

To obtain the STRIPE_SECRET_KEY you will have to create a stripe account, then go to the dashboard, then developers, and finally get the API key from there. 
Use the test key method. (sk_test_….).

To obtain the GEMINI_API_KEY you will have to go to https://aistudio.google.com/api-keys. 

After you have obtained all three keys, put them in the .env file in the following format:

MONGO_URI=...
STRIPE_SECRET_KEY=...
GEMINI_API_KEY=...

Run npm install on both frontend and backend separately to have all the dependencies. 
For the chatbot, you will have to install fastapi uvicorn pydantic python-dotenv google-genai. 
Execute the following lines in the terminal: npm install and pip install fastapi uvicorn pydantic python-dotenv google-genai.

To run the frontend, execute npm run dev on the terminal. To run the backend, open two windows in the terminal. 
In the first one execute node app.js and in the second one is 
uvicorn main:app --reload

If you want to access the admin dashboard, then you will have to manually change the user’s role to “admin” in MongoDB itself.
