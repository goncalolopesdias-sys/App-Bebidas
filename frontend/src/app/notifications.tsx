import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const notificacoes = {
  hoje: [
    { id: 1, icon: '🛒', titulo: 'Pedido a caminho! 🚀', desc: 'O teu pedido de 2x Super Bock está a ser entregue. Chegada prevista em 15 min.', tempo: 'há 5 minutos', bg: '#FAEEDA', cor: '#412402' },
    { id: 2, icon: '🎁', titulo: 'Promoção exclusiva! 🎉', desc: '30% de desconto em todas as cervejas artesanais hoje até às 22h. Não percas!', tempo: 'há 1 hora', bg: '#EAF3DE', cor: '#3B6D11' },
    { id: 3, icon: '⭐', titulo: 'Ganhaste pontos! ⭐', desc: 'Adicionámos 120 pontos à tua conta pelo último pedido. Total: 1.240 pts.', tempo: 'há 2 horas', bg: '#EEEDFE', cor: '#3C3489' },
  ],
  anteriores: [
    { id: 4, icon: '✅', titulo: 'Pedido entregue!', desc: 'O teu pedido de Limonada foi entregue com sucesso.', tempo: 'ontem às 19h30', bg: '#2C2C2C', cor: '#aaa' },
    { id: 5, icon: '🎁', titulo: 'Bem-vindo à família! 🎁', desc: 'Ganhaste 10% de desconto na tua primeira encomenda.', tempo: 'há 3 dias', bg: '#2C2C2C', cor: '#aaa' },
  ],
};

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3 novas</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hoje */}
        <Text style={styles.sectionLabel}>HOJE</Text>
        {notificacoes.hoje.map((n) => (
          <View key={n.id} style={[styles.notif, { backgroundColor: n.bg }]}>
            <View style={[styles.notifIcon, { backgroundColor: n.cor }]}>
              <Text style={styles.notifIconText}>{n.icon}</Text>
            </View>
            <View style={styles.notifBody}>
              <Text style={[styles.notifTitulo, { color: n.cor }]}>{n.titulo}</Text>
              <Text style={[styles.notifDesc, { color: n.cor }]}>{n.desc}</Text>
              <Text style={styles.notifTempo}>{n.tempo}</Text>
            </View>
            <View style={styles.dot} />
          </View>
        ))}

        {/* Anteriores */}
        <Text style={styles.sectionLabel}>ANTERIORES</Text>
        {notificacoes.anteriores.map((n) => (
          <View key={n.id} style={[styles.notif, { backgroundColor: n.bg, borderWidth: 1, borderColor: '#444' }]}>
            <View style={[styles.notifIcon, { backgroundColor: '#444' }]}>
              <Text style={styles.notifIconText}>{n.icon}</Text>
            </View>
            <View style={styles.notifBody}>
              <Text style={[styles.notifTitulo, { color: '#aaa' }]}>{n.titulo}</Text>
              <Text style={[styles.notifDesc, { color: '#777' }]}>{n.desc}</Text>
              <Text style={styles.notifTempo}>{n.tempo}</Text>
            </View>
          </View>
        ))}
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
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C' },
  header: { backgroundColor: '#412402', padding: 16, paddingTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, color: '#FAEEDA' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#F5C800' },
  badge: { backgroundColor: '#F5C800', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#412402' },
  scroll: { flex: 1, padding: 16 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#777', letterSpacing: 0.5, marginBottom: 10, marginTop: 4 },
  notif: { flexDirection: 'row', gap: 10, padding: 13, borderRadius: 16, marginBottom: 10, position: 'relative' },
  notifIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifIconText: { fontSize: 18 },
  notifBody: { flex: 1 },
  notifTitulo: { fontSize: 14, fontWeight: '700', marginBottom: 3 },
  notifDesc: { fontSize: 12, lineHeight: 18, marginBottom: 5 },
  notifTempo: { fontSize: 10, color: '#BA7517' },
  dot: { width: 8, height: 8, backgroundColor: '#E24B4A', borderRadius: 4, position: 'absolute', top: 13, right: 13 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#2C2C2C', paddingVertical: 10, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: '#444' },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  navIcon: { fontSize: 20, color: '#888' },
  navLabel: { fontSize: 10, color: '#888' },
});