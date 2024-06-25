# PaperHans

This is the code repository for our Orbital 2024 project.

Deployed at https://paperhans.vercel.app/

**Team**:

A0269924M Han Yu (@xhamyo)

A0269842N Yeoh Han Yi (@yhanyi)

Proposed Level of Achievement: Apollo 11

**Table of Contents**:

1. Setup

2. Project Poster and Video Links

3. Project Scope

4. Milestone 1: Problem Motivation and Proposed Core Features

**1. Setup** (Updated as of 25 June 2024)

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

**2. Project Poster and Video Links** (Updated as of 2 June 2024)

Project Poster: https://drive.google.com/file/d/1uerqaLgKDD7drkws2qjrKc0zp6OUBqp0/view?usp=drive_link

Project Video: https://drive.google.com/file/d/1Ue0KMkW2lMzn7q4H1Z6YpGY2aUsGw7b7/view?usp=drive_link

**3. Project Scope**

We aim to provide cryptocurrency enthusiasts with a digital platform to gain insights into the market to make key trading decisions.

It will leverage large language models to update users with real-time information and general market sentiments. It will further leverage on machine learning models to provide users with critical buy-sell signals to make important trading decisions.

A playground environment will also allow seasoned traders to hone their trading intuition by configuring machine-learning models with parameters that simulate automated paper trading. This provides all users, regardless of experience, a risk-free avenue to sharpen their knowledge and apply trading strategies to their decisions.

**4. Milestone 1: Problem Motivation and Proposed Core Features**

Problem Motivation: As of 2023, there is an estimated 420 million users (4.2% of the global population) exposed to cryptocurrency. With the recent resurgence of cryptocurrency in 2024, an influx of novice traders into the volatile market is expected.

Proposed Core Features:

1. Educational Resources - Leverages large language models to provide educational resources within the application to empower users with the knowledge needed for informed trading decisions. Offers tutorials, market insights, and real-time news updates.

2. Playground Environment - Lumibot Trader allows users to customise trading strategies while Pytorch handles market analysis to provide general sentimental analysis for users to make trading decisions.

3. Key Trading Signals - Leverages machine learning models which incorporate advanced trading tools such as technical analysis charts, real-time market data, and customizable indicators to generate key trading signals. Implements warning features like limit orders, stop-loss, and take-profit to enhance trading strategies.

4. Security and Compliance - Firebase provides a robust and battle-tested backend to store user data with a first level of authentication. Clerk API may also be considered as a second layer of security for MFA.

Implementation details:
We plan to develop this webapp using the NextJS framework, using Typescript and TailwindCSS for the front-end, and Firebases for the back-end and user authentication. We also plan to handle our crypto and market news using the Alpaca API, which will provide the backtesting service as well. We will create trading strategies using the Lumibot Python package to implement custom classes of trade strategies, and part of this will also leverage LLMs developed in Pytorch to provide market sentiment analysis.
