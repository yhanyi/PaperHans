# PaperHans

This is the code repository for PaperHans project, NUS Orbital 2024.

**Team Han2**:

A0269924M Han Yu (@xhamyo)

A0269842N Yeoh Han Yi (@yhanyi)

Proposed Level of Achievement: Apollo 11

**Relevant Links**:

Deployment:             

Project README (full):  https://drive.google.com/file/d/1uRRdJKrzKOWWU5ee1RHzcjpWaHNvb5w-

Project CHANEGLOG:      https://drive.google.com/file/d/15P26tytC90mvTy_gadeJlTv1AqfpX2uK

Project Poster:         https://drive.google.com/file/d/13idQZ0195KBFSjNdOY-2ujmaKp7ZGFeh

Project Video:          https://drive.google.com/file/d/140W2JeR3sWgXMgSB0ukrpVTcokI_kUfi

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