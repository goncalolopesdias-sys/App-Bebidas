import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  // Botão Primário (Amarelo/Grande)
  primaryBtn: {
    backgroundColor: '#F5C800',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    activeOpacity: 0.8,
  },
  primaryBtnText: {
    color: '#412402',
    fontSize: 14,
    fontWeight: '700',
  },

  // Botão Secundário (Cinza)
  secondaryBtn: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
  },

  // Botão Pequeno (Quantidade)
  smallBtn: {
    backgroundColor: '#F5C800',
    borderRadius: 8,
    minWidth: 40,
    minHeight: 40,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#412402',
  },

  // Botão de Navegação (Touch-friendly)
  navBtn: {
    flex: 1,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navBtnIcon: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  navBtnLabel: {
    fontSize: 11,
    fontWeight: '500',
  },

  // Botão Categoria
  categoryBtn: {
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryBtnActive: {
    backgroundColor: '#F5C800',
  },
  categoryBtnText: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
  },
  categoryBtnTextActive: {
    color: '#412402',
    fontWeight: '700',
  },

  // Botão Card
  cardBtn: {
    borderRadius: 12,
    backgroundColor: '#2C2C2C',
    padding: 12,
    minHeight: 240,
  },
});
