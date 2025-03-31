import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    const { data } = await apiRequest("/api/users", "GET", null, true);
    setUsuarios(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await apiRequest(`/api/users/${id}`, "DELETE", null, true);
      fetchUsuarios();
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Usuários</h2>
      {usuarios.length === 0 ? (
        <p className="text-gray-500">Nenhum usuário encontrado.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">E-mail</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/users/edit/${u.id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
