# Oasis: A Virtual Metaverse Platform

**Oasis** is a next-generation virtual platform designed to facilitate immersive experiences for users through real-time interaction and collaboration. Drawing inspiration from platforms like [Zep](https://zep.us) and [Gather](https://gather.town), Oasis provides features such as proximal chat, gamification, video/audio communication, screen sharing, and collaborative tools. Whether for casual socializing or work, Oasis aims to make virtual spaces feel real and engaging.

---

## 🚀 Features

- **Proximal Chat**: Engage in conversations with users who are in close proximity in the virtual environment.
- **Gamification**: Add fun and engagement through interactive elements like challenges, quests, or game-like features.
- **Voice & Video Communication**: Real-time video and microphone features for seamless interaction with other users.
- **Screen Sharing**: Share your screen with others in the virtual space for presentations, tutorials, or group work.
- **Collaborative Tools**: Tools for users to work together on tasks, whether it's drawing, document editing, or other interactive features.
- **Room Creation**: Users can create custom rooms to suit their specific needs, whether it's a personal hangout or a work-related collaboration space.
- **Interactive Avatars**: Customize avatars to represent yourself in the virtual space, adding to the immersive experience.

---

## 💡 Technologies

Oasis is built using a modern stack, leveraging powerful tools to create a seamless user experience.

- **TypeScript**: Strongly-typed, modern JavaScript for enhanced developer experience and code safety.
- **PeerJS & WebRTC**: Real-time peer-to-peer communication for video/audio chat and other interactive features.
- **Colyseus**: Real-time multiplayer framework to handle room-based interactions.
- **Vite**: Blazing fast build tool for front-end development.
- **React**: A JavaScript library for building user interfaces.
- **Yarn**: A fast and reliable package manager for managing dependencies.
- **Phaser**: A fast, robust framework for building games and interactive applications.
- **Express**: A web framework for Node.js, used to build the back-end services.
- **Material UI (MUI)**: A popular React UI framework for building clean, responsive user interfaces.

---

## 📦 Installation

To get started with Oasis locally, follow these steps:

1. Clone the repository:
`git clone https://github.com/nsvoriginals/oasis.git`

2. Navigate to the project directory:
`cd oasis`
text
3. Install dependencies using Yarn:
`yarn install`

4. Build and run the project:
`yarn dev`

The app should now be running locally at `http://localhost:5173`.

### 🛠️ Running with Docker

If you prefer to run Oasis in a Docker container, follow these steps:

1. Build the Docker image:
`docker build -t nsvoriginals/oasis-finalserver .`
text
2. Run the container

`docker run -p 2567:2567 nsvoriginals/oasis-finalserver`
text
This will expose the server on port 5000.

### 🌐 Deployment

To deploy Oasis to a cloud service or other hosting providers, follow these guidelines:

1. Set up a cloud service like AWS or DigitalOcean.


2. Deploy the Docker container on your preferred platform, ensuring all necessary environment variables are set.


3. If using WebRTC, ensure that your platform supports proper networking and peer-to-peer connections.


4.You can access the live project at `https://oasisclient.vercel.app/`

## 📈 Future Goals

Oasis is constantly evolving. Some future enhancements and goals include:

- More Interactive Tools: Adding additional features for users to collaborate more effectively.
- Better Scaling: Improvements to handle larger groups of users in virtual spaces.
- User Customization: More options for users to personalize their avatars and rooms.
- AR/VR Support: Integrating augmented and virtual reality to provide an even more immersive experience.


## 📷 Demo or Screenshots

![Oasis Screenshot](Screenshot%202024-12-15%20234753.png)

## 🔧 Contributing

We welcome contributions to improve Oasis! To contribute, please fork the repository and submit a pull request.

## 🤝 License

This project is licensed under the MIT License - see the LICENSE file for details.
