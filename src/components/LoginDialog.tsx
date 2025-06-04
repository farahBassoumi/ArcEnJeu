import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { login } from "../services/authentication.services";
import { AuthError } from "@supabase/supabase-js";
import { useUser } from "../utils/UserContext";
import { useTranslation } from "react-i18next";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import dots from "../assets/icons/dots.json";
interface LoginDialogFormData {
  email: string;
  password: string;
}

const LoginDialog: React.FC = () => {
  const [formData, setFormData] = useState<LoginDialogFormData>({
    email: "",
    password: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const { contextLogin } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 4) {
      setError(t("auth.password_error"));
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result === null || result instanceof AuthError) {
      const error = result as AuthError;

      if (error.message !== null) setError(error.message);
      else setError(t("auth.login_error"));
      return;
    }
    contextLogin(result.user.id);
    navigate(ROUTES.Home);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
          <div className="mb-6">
            {" "}
            <h2 className="text-center text-(--color-gray) text-[28px] font-semibold ">
              {t("auth.title")}
            </h2>
            <div className=" overflow-visible">
              <Lottie
                lottieRef={lottieRef}
                animationData={dots}
                loop={true}
                autoplay={true}
                className="w-[50x] h-[50px]"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="text-(--color-gray)">
              <label className="block mb-1 text-sm">{t("auth.email")}</label>
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
              <label className="block mb-1 text-sm">{t("auth.password")}</label>

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
                className=" hover:scale-110  transition-transform duration-200   text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center bg-(--color-main) hover:bg-(--color-hover-main) rounded-full text-[16px]"
              >
                {t("auth.login")}
              </button>
            </div>
            <div className="flex justify-center">
              <a
                className="text-blue-500 text-sm  mx-1 underline hover:text-blue-700"
                href="/signup"
              >
                {t("auth.dont_have_account")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginDialog;
