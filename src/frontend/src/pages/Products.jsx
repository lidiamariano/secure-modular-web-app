import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const Products = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  const fetchProdutos = async () => {
    const { data } = await apiRequest("/products");
    setProdutos(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await apiRequest(`/api/products/${id}`, "DELETE", null, true);
      fetchProdutos();
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Produtos</h2>
        <Link
          to="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Produto
        </Link>
      </div>
      {produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Descrição</th>
              <th className="p-2 border">Preço</th>
              <th className="p-2 border">Quantidade</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.description}</td>
                <td className="p-2 border">R$ {Number(p.value).toFixed(2)}</td>
                <td className="p-2 border">{p.quantity}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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

export default Products;
