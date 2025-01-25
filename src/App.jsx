import { useEffect, useState } from 'react';
import './App.css';
import Logo from "./assets/logo.png";
import { fetch as apiFetch } from './services/ApiRequest';

function App() {
  const [link, setLink] = useState('');
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setDisabled(true);
      try {
        const res = await apiFetch(id);

        if (res.status === 200) {
          if (res.data.status === "ok") {
            setResponse(res.data);
          } else if (res.data.status === "fail") {
            alert("Invalid video ID");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDisabled(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);

  return (
    <div className="App">
      <div id="logo">
        <img src={Logo} alt="Logo" />
        <h2>MP3 DOWNLOADER</h2>
      </div>

      <div id="body">
        <input
          type="text"
          placeholder="YouTube link here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span>It might take a moment to convert your video</span>
      </div>

      <button
        onClick={() => {
          const text = link.split("v=")[1] ;
          if (text) {
            setId(text);
          } else {
            alert("Invalid YouTube link");
          }
        }}
        disabled={disabled}
        className={disabled ? "btn-disabled" : ""}
      >Download</button>
    </div>
  );
}

export default App;