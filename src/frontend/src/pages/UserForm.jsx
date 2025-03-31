import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    apiRequest("/api/users", "GET", null, true).then(({ data }) => {
      const usuario = data.find((u) => String(u.id) === id);
      if (usuario) {
        setForm({
          name: usuario.name,
          email: usuario.email,
          password: "",
        });
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const payload = { ...form };
    if (!payload.password) delete payload.password;

    const { status, data } = await apiRequest(`/api/users/${id}`, "PUT", payload, true);

    if (status === 200) {
      setSucesso("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/users"), 1000);
    } else {
      setErro(data.error || "Erro ao atualizar usuário");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
      {erro && <p className="text-red-600 mb-3">{erro}</p>}
      {sucesso && <p className="text-green-600 mb-3">{sucesso}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Nova senha (opcional)</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
