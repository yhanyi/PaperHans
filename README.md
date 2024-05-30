# PaperHans

This is the code repository for our Orbital 2024 project.

**Team**:

A0269924M Han Yu (@xhamyo)

A0269842N Yeoh Han Yi (@yhanyi)

**Setup** (Updated as of 27 May 2024)

NOTE: Many functionalities are temporarily hardcoded. The tearsheet is a sample output from the trading script. Update the ALPACA_CREDS with your own Alpaca keys and credentials in `trading_script.py` for local testing.

1. First `cd` into the project directory.

```zsh
cd PaperHans
```

2. Install frontend dependencies.

```zsh
npm install
```

3. Install python dependencies.

```zsh
pip3 install flask flask-cors uvicorn fastapi # Backend
pip3 install torch torchvision torchaudio transformers # ML / Sentiment analysis
```

Note: Look to Dockerize installation processes.

4. Run the development backend. To do this, first cd into the `backend` folder.

```zsh
cd backend
uvicorn playground_io:app --reload
```

5. Then cd back to the root of the project to run the development frontend.

```zsh
cd ..
npm run dev
```

6. Go to http://localhost:3000 on your preferred browser.
7. Alternatively, go to Vercel link that PaperHans is deployed on. (TO BE UPDATED)
