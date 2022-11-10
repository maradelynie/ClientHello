import "./style.scss";
import { useState, useEffect } from "react";
import ModalCadastroTorneio from "../../components/ModalCadastroTorneio";
import { useNavigate } from "react-router-dom";
import Backdrop from "../../components/backdrop";
import Alert from "../../components/alert";

function Home() {
  const navigate = useNavigate();
  const [backdropStatus, setBackdropStatus] = useState(false);
  const [AlertMessage, setMessageStatus] = useState("");
  const [modalCadastroTorneio, setModalCadastroTorneio] = useState(false);

  useEffect(() => {
    console.log("aquiiiiiii");
  }, []);

  return (
    <div className="home_container">
      <Backdrop open={backdropStatus} />
      <Alert
        open={!!AlertMessage}
        close={() => setMessageStatus("")}
        message={AlertMessage}
      />
      <button type="button" onClick={() => navigate("/load")}>
        Carregar jogo
      </button>
      <button type="button" onClick={() => setModalCadastroTorneio(true)}>
        Novo Jogo
      </button>
      <button type="button" onClick={() => navigate("/match/quickplay")}>
        Jogo Rápido
      </button>
      {modalCadastroTorneio ? (
        <ModalCadastroTorneio
          setBackdropStatus={setBackdropStatus}
          open={modalCadastroTorneio}
          close={() => setModalCadastroTorneio(false)}
          setMessageStatus={setMessageStatus}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
