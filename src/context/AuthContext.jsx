import React from "react";

// Criamos o contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa o usuário logado com um perfil de exemplo
  const [user, setUser] = useState({
    nome: 'Tamy Temponi',
    nomeBebe: 'Alice',
    idadeBebe: '1 ano',
    avatar: '👩‍🎨',
    isLogged: true
  });

  // Função para simular o Login
  const login = (nome, nomeBebe) => {
    setUser({
      nome: nome || 'Mãe Cadastrada',
      nomeBebe: nomeBebe || 'Bebê',
      idadeBebe: '1 ano',
      avatar: '👩‍🎨',
      isLogged: true
    });
  };

  // Função para Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso do contexto nos componentes
export function useAuth() {
  return useContext(AuthContext);
}