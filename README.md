
![GitHub stars](https://img.shields.io/github/stars/caglarop/altv-server-manager?style=social)
![GitHub forks](https://img.shields.io/github/forks/caglarop/altv-server-manager?style=social)
![GitHub issues](https://img.shields.io/github/issues/caglarop/altv-server-manager)
![GitHub pull requests](https://img.shields.io/github/issues-pr/caglarop/altv-server-manager)

## 📚 Table of Contents

- [AltV Server Manager](#altv-server-manager)
- [Features to be Implemented](#features-to-be-implemented)
- [Completed Features](#completed-features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Starting](#starting)
- [License](#license)
- [Contribution](#contribution)

# AltV Server Manager

AltV Server Manager is a web application designed to simplify the management of AltV servers. It provides a user-friendly interface for server administrators, allowing them to monitor and control their servers with ease.

<img src="screenshot.png" />

## Features to be Implemented

- [ ] Start server button
- [ ] Stop server button
- [ ] Restart server button
- [ ] Live console
- [ ] Server configuration editor
- [ ] Player list
- [ ] Player management (e.g., banning)

## Completed Features

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

## 🚀 Getting Started {#getting-started}

Before you begin, ensure that you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
* You have installed [Git](https://git-scm.com/downloads) on your machine.

### 🛠️ Installation {#installation}

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

### ⚙️ Configuration {#configuration}

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

### 🎬 Starting {#starting}

To start the panel, run the following command:
```bash
npm run dev
```
or if you prefer using Yarn:
```bash
yarn dev
```

After starting the development server, open your web browser and navigate to `http://localhost:3000`. From there, you can add your AltV servers and start managing them.

## 📜 License {#license}

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contribution {#contribution}
Contributions are welcome! If you have a feature request, bug report, or proposal for code improvement, please feel free to open an issue or submit a pull request.
