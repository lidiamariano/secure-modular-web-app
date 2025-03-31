import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const payload = {
      name: nome,
      email,
      password: senha,
    };

    const { status, data } = await apiRequest("/register", "POST", payload);

    if (status === 201) {
      setSucesso("Cadastro realizado com sucesso. Faça login.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setErro(data.error || "Erro ao registrar");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>
      {erro && <p className="text-red-600 mb-4">{erro}</p>}
      {sucesso && <p className="text-green-600 mb-4">{sucesso}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">E-mail</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
