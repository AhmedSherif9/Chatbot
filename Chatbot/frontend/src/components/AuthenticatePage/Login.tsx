import TextField from "@mui/material/TextField";
import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<LoginFormValues>();
  const { errors } = formState;

  const { login } = useAuth() || {};
  // can not destructure null (calling context from unwrapped component)
  // now, login is undefined if useAuth is null

  const submit = async (data: LoginFormValues) => {
    try {
      toast.loading("Logging In", {
        id: "login",
        duration: 9000,
      });
      await login?.(data);
      toast.success("Logged In Successfully", { id: "login", duration: 3000 });
      navigate("/");
    } catch (error) {
      const err = error as Error;
      toast.error(`${err.message}`, { id: "login", duration: 3000 });
    }
  };

  return (
    <article className="w-4/12 p-5 rounded-2xl shadow-all-sides-form">
      <h1 className="text-center text-3xl font-serif pb-5">Login</h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex flex-col items-center gap-y-5"
      >
        <TextField
          id="email"
          label="email"
          variant="outlined"
          className="w-full"
          {...register("email", {
            required: {
              value: true,
              message: "*email is required",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "*please enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message?.toString() || ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#00fffc",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "grey",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#00fffc",
            },
          }}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          className="w-full"
          {...register("password", {
            required: {
              value: true,
              message: "*password is required",
            },
            validate: (value) => {
              let errorMessage = "";

              if (!/[A-Z]/.test(value)) {
                errorMessage +=
                  "*password must contain at least 1 uppercase letter";
              }

              if (!/[a-z]/.test(value)) {
                if (errorMessage.includes("*password must contain at least")) {
                  errorMessage += ", 1 lowercase letter";
                } else {
                  errorMessage +=
                    "*password must contain at least 1 lowercase letter";
                }
              }

              if (!/\d/.test(value)) {
                if (errorMessage.includes("*password must contain at least")) {
                  errorMessage += ", 1 digit";
                } else {
                  errorMessage += "*password must contain at least 1 digit";
                }
              }

              if (value.length < 8) {
                if (errorMessage.includes("*password must contain at least")) {
                  errorMessage += ", 8 characters";
                } else {
                  errorMessage +=
                    "*password must contain at least 8 characters";
                }
              }

              return errorMessage || true;
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message?.toString() || ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#00fffc",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "grey",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#00fffc",
            },
          }}
        />
        <button className="w-full bg-cyan rounded-lg px-4 py-2">
          <div className="text-sm text-gray-500 flex justify-center items-center gap-2">
            LOGIN <CiLogin className="scale-150" />
          </div>
        </button>
      </form>
    </article>
  );
};

export default Login;
