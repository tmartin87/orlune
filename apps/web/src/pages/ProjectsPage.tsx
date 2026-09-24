import { useNavigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

export function ProjectsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main>
      <h1>Projects</h1>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}