# PaperHans

This is the code repository for PaperHans project, NUS Orbital 2024.

**Team Han2**:

A0269924M Han Yu (@xhamyo)

A0269842N Yeoh Han Yi (@yhanyi)

Proposed Level of Achievement: Apollo 11

**Relevant Links**:

Deployment:             https://paperhans.vercel.app/

Project README (full):  https://docs.google.com/document/d/1YYhPiGj3DJEe8xhyofTemyj72_vM5KJCrqd1i6EiiDM

Project CHANEGLOG:      https://shorturl.at/pKfKn

Project Poster:         https://drive.google.com/file/d/1uerqaLgKDD7drkws2qjrKc0zp6OUBqp0/view?usp=drive_link

Project Video:          https://drive.google.com/file/d/1Ue0KMkW2lMzn7q4H1Z6YpGY2aUsGw7b7/view?usp=drive_link

**Setup**

Run `sh start.sh` from the root directory of the project to automatically build.

Note: Our API keys are currently deployed onto the Vercel as well. We'll implement a feature to collect and store API keys for each user.

To manually run:

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
pip3 install flask flask-cors uvicorn fastapi
pip3 install torch torchvision torchaudio transformers
```

4. Run the development backend.

```zsh
cd backend
uvicorn playground_io:app --reload
```

5. Run the development frontend.

```zsh
cd ..
npm run dev
```

6. Go to http://localhost:3000 on your preferred browser.