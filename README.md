## Table of Contents

- [AltV Server Manager](#altv-server-manager)
- [Features to be Implemented](#features-to-be-implemented)
- [Completed Features](#completed-features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Starting](#starting)
- [License](#license)
- [Contribution](#contribution)

<h1 id="altv-server-manager">AltV Server Manager</h1>

AltV Server Manager is a web application designed to simplify the management of AltV servers. It provides a user-friendly interface for server administrators, allowing them to monitor and control their servers with ease.

<img src="screenshot.png" />

<h2 id="features-to-be-implemented">Features to be Implemented</h2>

- [ ] Start server button
- [ ] Stop server button
- [ ] Restart server button
- [ ] Live console
- [ ] Server configuration editor
- [ ] Player list
- [ ] Player management (e.g., banning)

<h2 id="completed-features">Completed Features</h2>

- [x] Discord Login
- [x] Server creation
- [x] Downloading the latest altv server based on the operating system (Windows/Linux) under `server-data`
- [x] Accessing the server page in the backend
- [x] Automatic port assignment during server creation
- [x] Synchronize the port in the configuration file with the database port whenever a change is detected
- [x] Server status indicators in the navigation sidebar:
  - Green: The server is installed.
  - Yellow: The server is currently being installed.
  - Red: The server is neither installed nor being installed, and needs to be installed by pressing the install button.

<h2 id="getting-started">Getting Started 🚀</h2>

Before you begin, ensure that you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
* You have installed [Git](https://git-scm.com/downloads) on your machine.

<h3 id="installation">Installation 🛠️</h3>

1. Clone this repository:
   ```bash
   git clone https://github.com/caglarop/altv-server-manager.git
   ```
2. Navigate to the directory:
   ```bash
   cd altv-server-manager
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or if you prefer using Yarn:
   ```bash
   yarn install
   ```

<h3 id="configuration">Configuration ⚙️</h3>

1. Copy the `.env.example` file and rename it to `.env`. Fill it with the necessary environment variables as per the provided settings.
2. Run the following commands to migrate the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
   or if you prefer using Yarn:
   ```bash
   yarn prisma generate
   yarn prisma migrate dev
   ```

<h3 id="starting">Starting 🎬</h3>

To start the panel, run the following command:
```bash
npm run dev
```
or if you prefer using Yarn:
```bash
yarn dev
```

After starting the development server, open your web browser and navigate to `http://localhost:3000`. From there, you can add your AltV servers and start managing them.

<h2 id="license">License 📜</h2>

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<h2 id="contribution">Contribution 🤝</h2>
Contributions are welcome! If you have a feature request, bug report, or proposal for code improvement, please feel free to open an issue or submit a pull request.
