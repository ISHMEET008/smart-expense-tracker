import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

export default function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {

      setLoading(true);

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(response.data.message);

      navigate("/dashboard", {
  state: {
    isNewUser: true,
  },
});

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-[#050816] flex justify-center items-center px-4">

      <div className="bg-[#11182d] p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-center text-slate-400 mt-2">
          Join Smart Expense Tracker 🚀
        </p>

        <form
          className="space-y-5 mt-8"
          onSubmit={handleSubmit}
        >

          <div>
            <label className="text-white">Full Name</label>

            <div className="bg-[#1d2942] rounded-xl mt-2 flex items-center px-4">

              <User className="text-slate-400" />

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent p-4 outline-none text-white"
                placeholder="Enter Name"
              />

            </div>

          </div>

          <div>

            <label className="text-white">Email</label>

            <div className="bg-[#1d2942] rounded-xl mt-2 flex items-center px-4">

              <Mail className="text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent p-4 outline-none text-white"
                placeholder="Enter Email"
              />

            </div>

          </div>

          <div>

            <label className="text-white">Password</label>

            <div className="bg-[#1d2942] rounded-xl mt-2 flex items-center px-4">

              <Lock className="text-slate-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent p-4 outline-none text-white"
                placeholder="Create Password"
              />

            </div>

          </div>

          <div>

            <label className="text-white">
              Confirm Password
            </label>

            <div className="bg-[#1d2942] rounded-xl mt-2 flex items-center px-4">

              <Lock className="text-slate-400" />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent p-4 outline-none text-white"
                placeholder="Confirm Password"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:scale-105 duration-300"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-purple-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}