import React, { useEffect, useRef, useState } from "react";
import { signUp } from "../services/authentication.services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { AuthError } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import dots from "../assets/icons/dots.json";
import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";

interface SignUpDialogFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpDialog: React.FC = () => {
  const [formData, setFormData] = useState<SignUpDialogFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwords_mismatch"));
      return;
    }
    if (formData.password.length < 6) {
      setError(t("auth.password_error"));
      return;
    }
    if (formData.username.length < 4) {
      setError(t("auth.username_error"));
      return;
    }
    const result = await signUp(formData.email, formData.password);
    console.log("result", result);
    if (result === null || result instanceof AuthError) {
      const error = result as AuthError;

      if (error.message !== null) setError(error.message);
      else setError("Une erreur s'est produite lors de l'inscription.");
      return;
    }

    navigate(ROUTES.Login);
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
          className="bg-(--color-beige) rounded-[40px]  py-10 px-20 w-[90%] max-w-[500px] shadow-lg relative"
        >
          <div className="mb-6">
            <h2 className="text-center text-(--color-gray) text-[25px] font-semibold ">
              {t("auth.become_educator")}
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
              <label className="block  text-sm mb-1">
                {t("auth.username")}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-[40px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                required
              />
            </div>

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

            <div className="text-(--color-gray)">
              <label className="block  mb-1 text-sm">
                {t("auth.confirm_password")}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
                className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center  bg-(--color-main) hover:bg-(--color-hover-main) hover:scale-110  transition-transform duration-200    rounded-full text-[16px]"
              >
                {t("auth.sign_up")}
              </button>
            </div>
            <div className="flex justify-center">
              <a
                className="text-blue-500 text-sm  mx-1 underline hover:text-blue-700"
                href="/login"
              >
                {t("auth.already_have_account")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpDialog;
