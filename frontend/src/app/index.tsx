import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useResponsive } from '@/hooks/use-responsive';
import { useRouter } from 'expo-router';

import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const produtos = [
  { id: 1, nome: 'Cerveja Sagres', preco: 1.00, imgKey: 'sagres', sub: 'Lager - 33cl', img: require('../../assets/images/sagres.jpeg') },
  { id: 2, nome: 'Cerveja Super Bock', preco: 1.50, imgKey: 'superbock', sub: 'Lager - 33cl', img: require('../../assets/images/superbock.jpeg') },
  { id: 3, nome: 'Cerveja Heineken', preco: 2.25, imgKey: 'heineken', sub: 'Lager - 33cl', img: require('../../assets/images/heineken.jpeg') },
  { id: 4, nome: 'Cerveja Argus', preco: 1.00, imgKey: 'argus', sub: 'Lager - 33cl', img: require('../../assets/images/argus.jpeg') },
  { id: 5, nome: 'Cerveja Sagres', preco: 1.00, imgKey: 'sagres', sub: 'Lager - 33cl', img: require('../../assets/images/sagres.jpeg') },
  { id: 6, nome: 'Cerveja Super Bock', preco: 1.50, imgKey: 'superbock', sub: 'Lager - 33cl', img: require('../../assets/images/superbock.jpeg') },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { isMobile, isTablet, containerPadding, spacing } = useResponsive();

  const headerPadding = isMobile ? 14 : 20;
  const headerHeight = isMobile ? 60 : 80;
  const logoSize = isMobile ? 40 : 50;
  const fontSize = isMobile ? { sm: 11, md: 13, lg: 15, xl: 18 } : { sm: 12, md: 14, lg: 16, xl: 20 };
  const cardWidth = isMobile ? '48%' : isTablet ? '30%' : '23%';

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]}>
      {/* Header */}
      <View style={[styles.header, { padding: headerPadding, minHeight: headerHeight }]}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: logoSize, height: logoSize, borderRadius: 10 }}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={[styles.headerSub, { fontSize: fontSize.sm }]}>Boa tarde,</Text>
          <Text style={[styles.headerName, { fontSize: fontSize.lg }]}>{user?.nome || 'Usuário'}</Text>
        </View>
        <TouchableOpacity
          style={[styles.cartBtn, { width: logoSize * 0.9, height: logoSize * 0.9 }]}
          onPress={() => router.push('/cart')}
        >
          <Text style={[styles.cartIcon, { fontSize: fontSize.lg }]}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={[styles.searchBox, { marginHorizontal: containerPadding, paddingHorizontal: 12 }]}>
          <Text style={[styles.searchIcon, { fontSize: fontSize.lg }]}>🔍</Text>
          <TextInput
            placeholder="Pesquisar bebidas"
            placeholderTextColor="#888"
            style={[styles.searchInput, { fontSize: fontSize.md }]}
          />
        </View>

        {/* Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.cats, { paddingHorizontal: containerPadding }]}>
          {['Cerveja', 'Vodka', 'Whisky'].map((cat, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              style={[styles.catBtn, i === 0 && styles.catBtnActive, { paddingVertical: spacing / 2, minHeight: 44 }]}
              onPress={() => router.push(`/catalog?cat=${cat.toLowerCase()}`)}
            >
              <Text style={[styles.catText, i === 0 && styles.catTextActive, { fontSize: fontSize.md }]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner */}
        <View style={[styles.banner, { marginHorizontal: containerPadding, padding: spacing }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.bannerLabel, { fontSize: fontSize.sm }]}>Promoção do dia</Text>
            <Text style={[styles.bannerTitle, { fontSize: fontSize.xl }]}>Grade de Cerveja</Text>
            <View style={styles.bannerBadge}>
              <Text style={[styles.bannerBadgeText, { fontSize: fontSize.sm }]}>20% off</Text>
            </View>
          </View>
          <Image source={require('../../assets/images/banner.jpeg')} style={[styles.bannerImg, { width: isMobile ? 60 : 80, height: isMobile ? 60 : 80 }]} />
        </View>

        {/* Mais pedidos */}
        <Text style={[styles.sectionTitle, { marginHorizontal: containerPadding, fontSize: fontSize.lg }]}>Mais pedidos</Text>
        <View style={[styles.grid, { paddingHorizontal: containerPadding / 2, marginBottom: 20 }]}>
          {produtos.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.card, { width: cardWidth }]}
              activeOpacity={0.8}
              onPress={() => router.push({
                pathname: '/detail',
                params: { nome: p.nome, preco: p.preco, imgKey: p.imgKey, sub: p.sub }
              })}
            >
              <Image source={p.img} style={[styles.cardImg, { height: isMobile ? 80 : 120 }]} resizeMode="cover" />
              <Text style={[styles.cardNome, { fontSize: fontSize.sm }]}>{p.nome}</Text>
              <Text style={[styles.cardPreco, { fontSize: fontSize.md }]}>{p.preco.toFixed(2)}€</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={(e) => {
                  e.stopPropagation();
                  addItem({ nome: p.nome, preco: p.preco, img: p.img });
                }}
                style={styles.addBtn}
              >
                <Text style={styles.addBtnText}>+ Adicionar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { paddingBottom: isMobile ? 20 : 10 }]}>
        <TouchableOpacity activeOpacity={0.7} style={[styles.navItem, { minHeight: 56 }]} onPress={() => router.push('/')}>
          <Text style={[styles.navIcon, styles.navActive, { fontSize: fontSize.lg }]}>🏠</Text>
          <Text style={[styles.navLabel, styles.navActive, { fontSize: fontSize.sm }]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[styles.navItem, { minHeight: 56 }]} onPress={() => router.push('/catalog')}>
          <Text style={[styles.navIcon, { fontSize: fontSize.lg }]}>⊞</Text>
          <Text style={[styles.navLabel, { fontSize: fontSize.sm }]}>Catálogo</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[styles.navItem, { minHeight: 56 }]} onPress={() => router.push('/cart')}>
          <Text style={[styles.navIcon, { fontSize: fontSize.lg }]}>🛒</Text>
          <Text style={[styles.navLabel, { fontSize: fontSize.sm }]}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[styles.navItem, { minHeight: 56 }]} onPress={() => router.push('/profile')}>
          <Text style={[styles.navIcon, { fontSize: fontSize.lg }]}>👤</Text>
          <Text style={[styles.navLabel, { fontSize: fontSize.sm }]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C' },
  header: { backgroundColor: '#F5C800', flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerText: { flex: 1 },
  headerSub: { color: '#633806', fontWeight: '400' },
  headerName: { fontWeight: '600', color: '#412402' },
  cartBtn: { backgroundColor: '#412402', borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  cartIcon: { fontWeight: '600' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C2C2C', marginVertical: 12, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', fontWeight: '400' },
  cats: { marginBottom: 14, flexDirection: 'row' },
  catBtn: { backgroundColor: '#2C2C2C', borderRadius: 20, paddingHorizontal: 16, marginRight: 8 },
  catBtnActive: { backgroundColor: '#F5C800' },
  catText: { color: '#aaa', fontWeight: '400' },
  catTextActive: { color: '#412402', fontWeight: '600' },
  banner: { backgroundColor: '#2C2C2C', borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  bannerLabel: { color: '#F5C800', marginBottom: 4, fontWeight: '500' },
  bannerTitle: { fontWeight: '600', color: '#fff', marginBottom: 8 },
  bannerBadge: { backgroundColor: '#F5C800', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  bannerBadgeText: { fontWeight: '600', color: '#412402' },
  bannerImg: { borderRadius: 35 },
  sectionTitle: { fontWeight: '600', color: '#fff', marginVertical: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { backgroundColor: '#2C2C2C', borderRadius: 12, padding: 10, margin: '1%' },
  cardImg: { width: '100%', borderRadius: 8, marginBottom: 8 },
  cardNome: { fontWeight: '500', color: '#fff' },
  cardPreco: { color: '#F5C800', marginTop: 4, fontWeight: '600' },
  addBtn: { backgroundColor: '#F5C800', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginTop: 8, minHeight: 40 },
  addBtnText: { color: '#412402', fontSize: 12, fontWeight: '700' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#2C2C2C', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#444' },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  navIcon: { color: '#888', fontWeight: '600' },
  navLabel: { color: '#888', fontWeight: '500' },
  navActive: { color: '#F5C800' },
});