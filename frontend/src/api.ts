const API_URL = 'http://172.20.10.3:5000/api';

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.erro || 'Erro ao fazer login');
  return data;
}

export async function register(nome: string, email: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.erro || 'Erro ao criar conta');
  return data;
}

export async function getProdutos(categoria?: string) {
  const url = categoria ? `${API_URL}/produtos?categoria=${categoria}` : `${API_URL}/produtos`;
  const res = await fetch(url);
  return res.json();
}

export async function criarPedido(token: string, itens: any[], total: number) {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itens, total }),
  });
  return res.json();
}