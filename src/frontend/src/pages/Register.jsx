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
      setSucesso("Cadastro realizado com sucesso. Redirecionando...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setErro(data.error || "Erro ao registrar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full pt-[80px]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Crie sua conta
        </h2>

        {erro && <p className="text-red-600 text-sm mb-4 text-center">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm mb-4 text-center">{sucesso}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              className="w-full text-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              className="w-full text-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full text-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Fazer login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
