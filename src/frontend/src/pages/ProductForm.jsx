import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    description: "",
    value: "",
    quantity: ""
  });

  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiRequest(`/products`, "GET").then(({ data }) => {
        const produto = data.find(p => String(p.id) === id);
        if (produto) {
          setForm({
            description: produto.description,
            value: produto.value,
            quantity: produto.quantity
          });
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const method = isEdit ? "PUT" : "POST";
    const path = isEdit ? `/api/products/${id}` : `/api/products`;

    const { status, data } = await apiRequest(path, method, form, true);

    if (status === 200 || status === 201) {
      setSucesso("Produto salvo com sucesso!");
      setTimeout(() => navigate("/products"), 1000);
    } else {
      setErro(data.error || "Erro ao salvar produto");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Produto" : "Novo Produto"}
      </h2>
      {erro && <p className="text-red-600 mb-3">{erro}</p>}
      {sucesso && <p className="text-green-600 mb-3">{sucesso}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Descrição</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Preço</label>
          <input
            type="number"
            name="value"
            value={form.value}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Quantidade</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
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

export default ProductForm;
