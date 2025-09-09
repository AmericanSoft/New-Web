import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChessBishop, FaPlusCircle } from "react-icons/fa";
import logo from '../../public/logo.png'

type AlertProps = React.PropsWithChildren<{
  type?: "success" | "error";
  title?: string;
}>;

const Divider = () => (
  <div className="flex items-center my-4">
    <div className="h-px w-full bg-gray-300" />
    <p className="mx-3 text-sm font-light text-gray-500">OR</p>
    <div className="h-px w-full bg-gray-300" />
  </div>
);

const Alert: React.FC<AlertProps> = ({ type = "error", title, children }) => {
  const isSuccess = type === "success";
  return (
    <div
      className={[
        "rounded border-l-4 p-4 text-sm mb-3",
        isSuccess
          ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200"
          : "bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-900/20 dark:text-rose-200",
      ].join(" ")}
    >
      {title ? <div className="font-semibold mb-1">{title}</div> : null}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    color?: "primary" | "green" | "neutral";
    iconLeft?: React.ReactNode;
  }
> = ({ fullWidth, color = "primary", iconLeft, className, children, ...rest }) => {
  const palette =
    color === "green"
      ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
      : color === "neutral"
      ? "bg-gray-700 hover:bg-gray-800 focus:ring-gray-500"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-md px-6 py-3 text-white",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-transparent",
        "transition",
        palette,
        fullWidth ? "w-full" : "",
        className || "",
      ].join(" ")}
      {...rest}
    >
      {iconLeft ? <span className="mr-2 flex items-center">{iconLeft}</span> : null}
      {children}
    </button>
  );
};

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = ({ label, className, ...rest }) => (
  <label className="block text-sm mb-4">
    {label ? <span className="text-gray-700 dark:text-gray-200">{label}</span> : null}
    <input
      className={[
        "mt-1 block w-full rounded-md border",
        "border-gray-300 dark:border-gray-600",
        "bg-white dark:bg-[#2d303e]",
        "text-gray-900 dark:text-gray-100",
        "placeholder:text-gray-400 dark:placeholder:text-gray-400",
        "px-3 py-2 text-sm outline-none",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        className || "",
      ].join(" ")}
      {...rest}
    />
  </label>
);

const emailValidate = (value: string) => {
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!emailRegex.test(value)) return "Wrong email";
  return undefined;
};
const passwordValidate = (value: string) => {
  if (!value || value.length < 6) return "Password must be more than 6 characters";
  return undefined;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ onSubmit لازم تستقبل Event وتقرأ من state
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors([]);
    setLoading(true);

    try {
      // فاليديشن بسيطة قبل الإرسال
      const errs: string[] = [];
      const e1 = emailValidate(email);
      const p1 = passwordValidate(password);
      if (e1) errs.push(e1);
      if (p1) errs.push(p1);
      if (errs.length) {
        setFormErrors(errs);
        return;
      }

      const response = await fetch(
        "https://american-softwares.com/api/public/index.php/api/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // خد بالك: لو السيرفر رجّع HTML (تحويل/صفحة ويب)، البارسينج التالي هيكشف ده
      const contentType = response.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const msg =
          typeof payload === "string"
            ? payload
            : payload?.message || `Login failed. Status ${response.status}`;
        throw new Error(msg);
      }

      if (!payload?.token || !payload?.user) {
        console.warn("Unexpected response:", payload);
        throw new Error("Unexpected response from API (no token/user).");
      }

      // ✅ حفظ البيانات
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", payload.user?.role || "admin"); // مؤقتًا

      navigate("/admindashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setFormErrors([err?.message || "Server error. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center font-light mb-6 gap-4">
        <div className="mr-2 text-[1.3em] text-blue-400" />
        <img src={logo} className="w-20 h-20"></img>
        <span className="text-gray-700 dark:text-gray-300">Amircan Software </span>
      </div>

      <h1 className="text-[1.6em] font-semibold text-slate-700 dark:text-slate-200 mb-4">
        Log in
      </h1>

      <form onSubmit={onSubmit} className="space-y-2">
        {formErrors.length > 0 && (
          <Alert title="Failed to login">
            {formErrors.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </Alert>
        )}

        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="you@example.com"
          type="email"
        />

        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          type="password"
          placeholder="••••••••"
        />

        <Button type="submit" fullWidth disabled={loading} className="mt-2">
          {loading ? "Signing in..." : "Log in"}
        </Button>
      </form>

      <Divider />

      <Button
        fullWidth
        color="green"
        iconLeft={<FaPlusCircle />}
        onClick={() => navigate("/registration")}
      >
         Create account
      </Button>
    </>
  );
};

export default LoginForm;
