import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 4) {
      setError("Le mot de passe doit contenir au moins 4 caractères.");
      return;
    }

    setTimeout(() => {
      setSuccess("Inscription réussie !");
      setFormData({
        email: "",
        password: "",
      });
    }, 100);
    navigate(ROUTES.Home);
    setOpen(false);
  };

  return (
    <>
      <button
        className="text-(--color-gray) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[300px] w-full flex items-center justify-center bg-(--color-beige) text-[#242424] rounded-full"
        onClick={() => setOpen(true)}
      >
        Connexion
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-(--color-beige) rounded-[40px] py-6 px-17 w-full max-w-[500px] shadow-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-center text-(--color-gray) text-[28px] font-semibold mb-6">
              Créez des jeux pour les enfants
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="text-(--color-gray)">
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[40px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                  required
                />
              </div>

              <div className="text-(--color-gray)">
                <label className="block mb-1 text-sm">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[40px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                  required
                />
              </div>

              {error && <p className="text-red-300 text-center ">{error}</p>}
              {success && (
                <p className="text-(--color-hover-main) text-center font-medium">
                  {success}
                </p>
              )}

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center bg-(--color-main) hover:bg-(--color-hover-main) rounded-full text-[16px]"
                >
                  Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
