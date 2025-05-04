
import React, { useState } from "react";
import "./LoginSignup.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(form.email)) {
      toast.error("Email should be a valid @gmail.com address.");
      return false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordPattern.test(form.password)) {
      toast.error("Password should be at least 8 characters, with uppercase, lowercase, number, and special character.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const payload = isLogin ? { email: form.email, password: form.password } : form;

    try {
        const res = await fetch(`http://localhost:5000${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message);

            if (isLogin) {
                localStorage.setItem("user", JSON.stringify({ email: form.email }));
                navigate("/predict"); // Redirect to prediction page
            } else {
                navigate("/"); // Redirect to home after signup
            }
        } else {
            toast.error(data.message);
            alert(data.message); // Show alert for duplicate email or other issues
        }
    } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
    }
};

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? "Click here to Signup" : "Click here to Login"}
        </span>
      </p>
    </div>
  );
}

export default LoginSignup;