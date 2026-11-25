import { useCart } from '@/context/cart-context';
import { useResponsive } from '@/hooks/use-responsive';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categorias = [
  { nome: 'Cerveja', emoji: '🍺' },
  { nome: 'Vodka', emoji: '🥃' },
  { nome: 'Whisky', emoji: '🥃' },
  { nome: 'Vinho', emoji: '🍷' },
];

const produtos = [
  { nome: 'Cerveja Sagres', preco: 1.00, img: require('../../assets/images/sagres.jpeg'), categoria: 'Cerveja' },
  { nome: 'Cerveja Super Bock', preco: 1.50, img: require('../../assets/images/superbock.jpeg'), categoria: 'Cerveja' },
  { nome: 'Cerveja Heineken', preco: 2.25, img: require('../../assets/images/heineken.jpeg'), categoria: 'Cerveja' },
  { nome: 'Cerveja Argus', preco: 1.00, img: require('../../assets/images/argus.jpeg'), categoria: 'Cerveja' },
  { nome: 'Cerveja Sagres', preco: 1.00, img: require('../../assets/images/sagres.jpeg'), categoria: 'Cerveja' },
  { nome: 'Cerveja Super Bock', preco: 1.50, img: require('../../assets/images/superbock.jpeg'), categoria: 'Cerveja' },
];

export default function CatalogScreen() {
  const { isMobile, isTablet, containerPadding, spacing } = useResponsive();
  const { addItem } = useCart();
  const cardWidth = isMobile ? '48%' : isTablet ? '30%' : '23%';

  const handleAddToCart = (product: typeof produtos[0]) => {
    addItem({
      nome: product.nome,
      preco: product.preco,
      img: product.img,
    });
    Alert.alert('Sucesso', `${product.nome} adicionado ao carrinho!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: containerPadding, paddingVertical: 16 }]}>
        <Text style={styles.headerTitle}>📚 Catálogo</Text>
        <View style={[styles.searchBox, { marginTop: spacing }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            placeholder="Buscar produtos" 
            placeholderTextColor="#888" 
            style={styles.searchInput} 
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filtros por categoria */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.filterScroll, { paddingHorizontal: containerPadding }]}
        >
          {categorias.map((cat, i) => (
            <TouchableOpacity 
              key={i} 
              activeOpacity={0.7}
              style={[styles.filterBtn, i === 0 && styles.filterBtnActive, { minHeight: 50 }]}
            >
              <Text style={styles.filterEmoji}>{cat.emoji}</Text>
              <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grade de produtos */}
        <View style={[styles.grid, { paddingHorizontal: containerPadding / 2, marginBottom: 20 }]}>
          {produtos.map((p, i) => (
            <View 
              key={i}
              style={[styles.card, { width: cardWidth }]}
            >
              <Image source={p.img} style={styles.cardImg} resizeMode="cover" />
              <Text style={styles.cardName}>{p.nome}</Text>
              <Text style={styles.cardPrice}>{p.preco.toFixed(2)}€</Text>
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => handleAddToCart(p)}
                style={styles.addBtn}
              >
                <Text style={styles.addBtnText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C' },
  header: { backgroundColor: '#1C1C1C', borderBottomWidth: 1, borderBottomColor: '#2C2C2C' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C2C2C', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', fontSize: 13, fontWeight: '400' },
  filterScroll: { marginVertical: 16 },
  filterBtn: { alignItems: 'center', backgroundColor: '#2C2C2C', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 16, marginRight: 12, justifyContent: 'center', minHeight: 50 },
  filterBtnActive: { backgroundColor: '#F5C800' },
  filterEmoji: { fontSize: 22, marginBottom: 4 },
  filterText: { fontSize: 12, color: '#aaa', fontWeight: '500' },
  filterTextActive: { color: '#412402', fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 20 },
  card: { backgroundColor: '#2C2C2C', borderRadius: 12, padding: 12, margin: '1%' },
  cardImg: { width: '100%', height: 100, borderRadius: 8, marginBottom: 10 },
  cardName: { fontSize: 13, fontWeight: '600', color: '#fff' },
  cardPrice: { fontSize: 15, color: '#F5C800', fontWeight: '700', marginVertical: 6 },
  addBtn: { backgroundColor: '#F5C800', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 8, minHeight: 44 },
  addBtnText: { color: '#412402', fontSize: 12, fontWeight: '700' },
});
