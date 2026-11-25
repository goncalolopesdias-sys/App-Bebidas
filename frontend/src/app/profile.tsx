import { useAuth } from '@/context/auth-context';
import { useResponsive } from '@/hooks/use-responsive';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, logout, token } = useAuth();
  const { containerPadding, spacing } = useResponsive();
  const router = useRouter();
  const [mostrarToken, setMostrarToken] = useState(false);

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que quer sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const verToken = () => {
    setMostrarToken(!mostrarToken);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com seta */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={[styles.profileHeader, { paddingHorizontal: containerPadding, paddingVertical: spacing * 2 }]}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.nome || 'Usuário'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'email@exemplo.com'}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Text style={styles.editBtnText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {mostrarToken && token && (
          <View style={{ backgroundColor: '#2C2C2C', margin: 16, padding: 14, borderRadius: 10 }}>
            <Text style={{ color: '#aaa', fontSize: 11, marginBottom: 6 }}>Token (seleciona e copia):</Text>
            <Text selectable style={{ color: '#F5C800', fontSize: 11 }}>{token}</Text>
          </View>
        )}

        {/* Stats */}
        <View style={[styles.statsContainer, { paddingHorizontal: containerPadding, marginVertical: spacing }]}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>€25</Text>
            <Text style={styles.statLabel}>Crédito</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={[styles.menuContainer, { paddingHorizontal: containerPadding }]}>
          {[
              { icon: '🔔', title: 'Notificações', subtitle: 'Ver as tuas notificações', route: '/notifications' },
              { icon: '🔑', title: 'Ver Token (Admin)', subtitle: 'Para o painel de gestão', route: null },
              { icon: '📋', title: 'Histórico de pedidos', subtitle: 'Ver seus pedidos', route: null },
              { icon: '❤️', title: 'Favoritos', subtitle: 'Seus produtos favoritos', route: null },
              { icon: '📍', title: 'Endereços', subtitle: 'Gerenciar endereços', route: null },
              { icon: '💳', title: 'Forma de pagamento', subtitle: 'Seus cartões', route: null },
              { icon: '⚙️', title: 'Configurações', subtitle: 'Preferências da conta', route: null },
              { icon: '🆘', title: 'Suporte', subtitle: 'Fale conosco', route: null },
            ].map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              style={[styles.menuItem, { minHeight: 56 }]}
              onPress={() => {
                if (item.title === 'Ver Token (Admin)') { verToken(); return; }
                if (item.route) router.push(item.route as any);
              }}
            >
    <Text style={styles.menuIcon}>{item.icon}</Text>
    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
    </View>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
))}

          <TouchableOpacity onPress={handleLogout} activeOpacity={0.7} style={[styles.menuItem, styles.logoutItem, { minHeight: 56 }]}>
            <Text style={styles.menuIcon}>🚪</Text>
            <View style={styles.menuText}>
              <Text style={[styles.menuTitle, styles.logoutText]}>Sair</Text>
              <Text style={styles.menuSubtitle}>Desconectar da conta</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { marginTop: spacing * 2, paddingBottom: spacing * 2 }]}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/catalog')}>
          <Text style={styles.navIcon}>⊞</Text>
          <Text style={styles.navLabel}>Catálogo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/cart')}>
          <Text style={styles.navIcon}>🛒</Text>
          <Text style={styles.navLabel}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Text style={[styles.navIcon, styles.navActive]}>👤</Text>
          <Text style={[styles.navLabel, styles.navActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2C2C2C', padding: 14, borderBottomWidth: 1, borderBottomColor: '#444' },
  backBtn: { width: 38, height: 38, backgroundColor: '#444', borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, color: '#fff' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#fff' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#2C2C2C', borderBottomWidth: 1, borderBottomColor: '#444' },
  avatarContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F5C800', alignItems: 'center', justifyContent: 'center' },
  avatar: { fontSize: 32 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 4 },
  profileEmail: { fontSize: 12, color: '#aaa' },
  editBtn: { backgroundColor: '#F5C800', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8, minHeight: 36 },
  editBtnText: { color: '#412402', fontSize: 12, fontWeight: '700' },
  statsContainer: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#2C2C2C', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 11, color: '#aaa', marginTop: 4, fontWeight: '500' },
  menuContainer: { marginVertical: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C2C2C', paddingVertical: 16, paddingHorizontal: 14, borderRadius: 10, marginBottom: 10, gap: 12 },
  logoutItem: { borderWidth: 1, borderColor: '#ff6b6b' },
  menuIcon: { fontSize: 20 },
  menuText: { flex: 1 },
  menuTitle: { fontSize: 13, fontWeight: '600', color: '#fff' },
  logoutText: { color: '#ff6b6b' },
  menuSubtitle: { fontSize: 11, color: '#aaa', marginTop: 2 },
  menuArrow: { fontSize: 16, color: '#888' },
  footer: { alignItems: 'center' },
  versionText: { fontSize: 12, color: '#666' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#2C2C2C', paddingVertical: 10, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: '#444' },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  navIcon: { fontSize: 20, color: '#888' },
  navLabel: { fontSize: 10, color: '#888' },
  navActive: { color: '#F5C800' },
});