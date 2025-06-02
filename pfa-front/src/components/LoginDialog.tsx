import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { login } from "../services/authentication.services";
import { AuthError } from "@supabase/supabase-js";
import { useUser } from "../utils/UserContext";

interface LoginDialogFormData {
  email: string;
  password: string;
}

const LoginDialog: React.FC = () => {
  const [formData, setFormData] = useState<LoginDialogFormData>({
    //TODO: remove this default email and password
    email: "bassoumifaraah@gmail.com",
    password: "111111",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const { contextLogin } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 4) {
      setError("Le mot de passe doit contenir au moins 4 caractères.");
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result === null || result instanceof AuthError) {
      const error = result as AuthError;

      if (error.message !== null) setError(error.message);
      else setError("Une erreur s'est produite lors de la connexion.");
      return;
    }
    console.log("Login successful:", result);
    contextLogin(result.user.id);
    navigate(ROUTES.Home);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      console.log("Clicked outside modal");
      navigate(ROUTES.LandingPage);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
        <div
          ref={modalRef}
          className="bg-(--color-beige) rounded-[40px] py-6 px-17 w-full max-w-[500px] shadow-lg relative"
        >
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

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center bg-(--color-main) hover:bg-(--color-hover-main) rounded-full text-[16px]"
              >
                Connection
              </button>
            </div>
            <div className="flex justify-center">
              <a
                className="text-blue-500 text-sm  mx-1 underline hover:text-blue-700"
                href="/signup"
              >
                dont_have_account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginDialog;
