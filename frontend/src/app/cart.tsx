import { criarPedido } from '@/api';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const { items, updateQuantidade, removeItem, clearCart, subtotal } = useCart();
  const { token, isLoggedIn } = useAuth();
  const router = useRouter();
  const [aProcessar, setAProcessar] = useState(false);

  async function doPay() {
    if (!isLoggedIn || !token) {
      Alert.alert('Sessão necessária', 'Precisas de fazer login para finalizar o pedido.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ir para login', onPress: () => router.push('/login') },
      ]);
      return;
    }

    setAProcessar(true);
    try {
      const itensPedido = items.map((item: any) => ({
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade,
      }));

      await criarPedido(token, itensPedido, subtotal);
      clearCart();
      Alert.alert('Sucesso', 'Pagamento efetuado com sucesso! ✅');
      router.push('/');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível processar o pedido. Tenta novamente.');
    } finally {
      setAProcessar(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>O meu carrinho</Text>
        <TouchableOpacity style={styles.backBtn} onPress={clearCart}>
          <Text style={styles.backIcon}>🗑</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>O teu carrinho está vazio</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {items.map((item: any, idx: number) => (
              <View key={idx} style={styles.cartItem}>
                <View style={styles.itemImg}>
                  <Text style={{ fontSize: 28 }}>🍺</Text>
                </View>
                <View style={styles.itemInfo}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.nome}</Text>
                    <Text style={styles.itemPrice}>{item.preco.toFixed(2)}€</Text>
                  </View>
                  <Text style={styles.itemSub}>Lager - 33cl</Text>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantidade(item.id, item.quantidade - 1)}>
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyNum}>{item.quantidade}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantidade(item.id, item.quantidade + 1)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryVal}>{subtotal.toFixed(2)}€</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Entrega</Text>
                <Text style={[styles.summaryVal, { color: '#4CAF50' }]}>Grátis</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryTotal}>{subtotal.toFixed(2)}€</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.payContainer}>
            <TouchableOpacity style={[styles.payBtn, aProcessar && { opacity: 0.6 }]} onPress={doPay} disabled={aProcessar}>
              <Text style={styles.payText}>{aProcessar ? 'A processar...' : '💳 Pagar agora'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2a2a2a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#3a3a3a' },
  backBtn: { width: 38, height: 38, backgroundColor: '#444', borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, color: '#fff' },
  title: { fontSize: 17, fontWeight: '700', color: '#fff' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyIcon: { fontSize: 60 },
  emptyText: { fontSize: 16, color: '#777' },
  scroll: { flex: 1, padding: 14 },
  cartItem: { flexDirection: 'row', backgroundColor: '#3a3a3a', borderRadius: 14, padding: 12, marginBottom: 10, gap: 12 },
  itemImg: { width: 70, height: 70, backgroundColor: '#444', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemInfo: { flex: 1 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between' },
  itemName: { fontSize: 14, fontWeight: '700', color: '#fff' },
  itemPrice: { fontSize: 14, fontWeight: '700', color: '#F5C800' },
  itemSub: { fontSize: 11, color: '#aaa', marginBottom: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 28, height: 28, backgroundColor: '#444', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 16, color: '#fff' },
  qtyNum: { fontSize: 14, fontWeight: '700', color: '#fff', minWidth: 20, textAlign: 'center' },
  summary: { backgroundColor: '#3a3a3a', borderRadius: 14, padding: 14, marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: '#aaa' },
  summaryVal: { fontSize: 13, color: '#fff' },
  divider: { borderTopWidth: 1, borderTopColor: '#444', marginVertical: 8 },
  summaryTotal: { fontSize: 15, fontWeight: '800', color: '#fff' },
  payContainer: { padding: 14 },
  payBtn: { width: '100%', padding: 16, backgroundColor: '#F5C800', borderRadius: 14, alignItems: 'center' },
  payText: { fontSize: 16, fontWeight: '800', color: '#412402' },
});