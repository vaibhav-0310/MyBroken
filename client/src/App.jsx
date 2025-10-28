import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const startListening = () => {
    setListening(true);
    setMessage("");
    setReply("");
    recognition.start();
    console.log("🎤 Listening...");
  };

  recognition.onresult = async (event) => {
    const text = event.results[0][0].transcript;
    setMessage(text);
    console.log(`💬 You said: ${text}`);

    try {
      const response = await axios.post("http://localhost:8000/api/ask", {
        query: text,
      });
      const answer = response.data.answer || "I'm here for you. You're not alone.";
      setReply(answer);
      console.log("📨 Server Response:", answer);

      // Speak the response aloud
      if (synth && answer) {
        const utterThis = new SpeechSynthesisUtterance(answer);
        utterThis.lang = "hi-IN"; // You can switch to "en-IN" or "en-US"
        utterThis.pitch = 1;
        utterThis.rate = 0.95;
        synth.speak(utterThis);
      }
    } catch (error) {
      console.error("❌ Error querying backend:", error);
      setReply("I'm sorry, something went wrong. But I'm still here for you. 💜");
    } finally {
      setListening(false);
    }
  };

  recognition.onerror = (event) => {
    console.error("⚠ Speech recognition error:", event.error);
    setListening(false);
    setReply("I couldn't hear you clearly. Take your time and try again when you're ready. 🌸");
  };

  recognition.onspeechend = () => {
    recognition.stop();
    console.log("🛑 Speech ended.");
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white/70">
        <h1 className="text-3xl text-center mb-4">
          💔 You're Not Alone
        </h1>
        <p className="text-gray-600 text-center mb-6 italic">
          "I'm here to listen, comfort, and remind you that healing takes time. Speak your heart whenever you're ready."
        </p>

        <div className="text-center">
          <button
            onClick={startListening}
            disabled={listening}
            className={listening ? "animate-pulse" : ""}
          >
            {listening ? "🎤 Listening..." : "💬 Talk to Me"}
          </button>
        </div>

        {message && (
          <div className="mt-6 text-left">
            <p className="font-medium text-rose-700">You said:</p>
            <p className="bg-rose-50 italic">
              "{message}"
            </p>
          </div>
        )}

        {reply && (
          <div className="mt-6 text-left">
            <p className="font-medium text-green-700">Here for you:</p>
            <p className="bg-green-50">
              {reply}
            </p>
          </div>
        )}

        {!message && !reply && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 italic" style={{ fontSize: "0.95rem", opacity: 0.8 }}>
              Press the button and share what's on your mind. I'm listening with empathy and care.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-500 text-sm italic">
        Made with 💖 to help you heal, one word at a time.
      </footer>
    </div>
  );
}

export default App;