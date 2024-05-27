# PaperHans

This is the code repository for our Orbital 2024 project.

**Team**:

A0269924M Han Yu (@xhamyo)

A0269842N Yeoh Han Yi (@yhanyi)

**Setup**

1. First `cd` into the project directory.

Also need to add instructions on installing dependencies.

For example,

```zsh
pip3 install flask flask-cors uvicorn
```

```zsh
cd PaperHans
```

1. Run the development server.
   Note: Need include better instructions on initializing backend.

First, cd into the `backend` folder to start the FastAPI server:

```zsh
cd backend
uvicorn playground_io:app --reload
```

Then cd back to the root of the project.

```zsh
cd ..
npm run dev
```

1. Go to http://localhost:3000 on your preferred browser.
2. Alternatively, go to Vercel link that PaperHans is deployed on. (TO BE UPDATED)
