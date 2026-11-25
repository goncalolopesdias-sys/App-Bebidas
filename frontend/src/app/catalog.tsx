import { useCart } from '@/context/cart-context';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categorias: any = {
  cerveja: {
    banner: { titulo: 'Grade de Cerveja', badge: '20% off' },
    produtos: [
      { id: 'c1', nome: 'Cerveja Sagres', preco: 1.00, imgKey: 'sagres', sub: 'Lager - 33cl', img: require('../../assets/images/sagres.jpeg') },
      { id: 'c2', nome: 'Cerveja Super Bock', preco: 1.50, imgKey: 'superbock', sub: 'Lager - 33cl', img: require('../../assets/images/superbock.jpeg') },
      { id: 'c3', nome: 'Cerveja Heineken', preco: 2.25, imgKey: 'heineken', sub: 'Lager - 33cl', img: require('../../assets/images/heineken.jpeg') },
      { id: 'c4', nome: 'Cerveja Argus', preco: 1.00, imgKey: 'argus', sub: 'Lager - 33cl', img: require('../../assets/images/argus.jpeg') },
    ],
  },
  vodka: {
    banner: { titulo: 'Absolut Vodka', badge: 'Leve 3 pague 2' },
    produtos: [
      { id: 'v1', nome: 'Absolut Vodka', preco: 21.49, imgKey: 'absolut', sub: 'Vodka - 70cl', img: require('../../assets/images/absolut.jpeg') },
      { id: 'v2', nome: 'Smirnoff Red Vodka', preco: 21.69, imgKey: 'smirnoff', sub: 'Vodka - 70cl', img: require('../../assets/images/smirnoff.jpeg') },
      { id: 'v3', nome: 'Grey Goose Vodka', preco: 55.00, imgKey: 'greygoose', sub: 'Vodka - 70cl', img: require('../../assets/images/GreyGoose.jpeg') },
      { id: 'v4', nome: 'Ultimat Vodka', preco: 31.60, imgKey: 'ultimat', sub: 'Vodka - 70cl', img: require('../../assets/images/UltimateVodka.png') },
    ],
  },
  whisky: {
    banner: { titulo: 'Glenfiddich 12 Anos', badge: '10% off' },
    produtos: [
      { id: 'w1', nome: "Jack Daniel's", preco: 25.99, imgKey: 'jackdaniels', sub: 'Whisky - 70cl', img: require('../../assets/images/jackdaniels.jpeg') },
      { id: 'w2', nome: 'Johnnie Walker', preco: 22.50, imgKey: 'johnniewalker', sub: 'Whisky - 70cl', img: require('../../assets/images/johnniewalker.jpeg') },
      { id: 'w3', nome: 'Jameson', preco: 19.99, imgKey: 'jameson', sub: 'Whisky - 70cl', img: require('../../assets/images/jameson.jpeg') },
      { id: 'w4', nome: 'Glenfiddich', preco: 45.00, imgKey: 'glenfiddich', sub: 'Whisky - 70cl', img: require('../../assets/images/glenfiddich.jpeg') },
    ],
  },
};

export default function CatalogScreen() {
  const router = useRouter();
  const { cat: catParam } = useLocalSearchParams();
  const { addItem } = useCart();
  const { isMobile, containerPadding, spacing } = useResponsive();
  const [catAtiva, setCatAtiva] = useState((catParam as string) || 'cerveja');

  const fontSize = isMobile ? { sm: 11, md: 13, lg: 15, xl: 18 } : { sm: 12, md: 14, lg: 16, xl: 20 };
  const cardWidth = isMobile ? '48%' : '23%';
  const cat = categorias[catAtiva];

  const handleAddToCart = (produto: any) => {
    addItem({ nome: produto.nome, preco: produto.preco, img: produto.img });
    Alert.alert('Sucesso', `${produto.nome} adicionado ao carrinho!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Catálogo</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/cart')}>
          <Text style={styles.backIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.cats, { paddingHorizontal: containerPadding }]}>
          {['cerveja', 'vodka', 'whisky'].map((c, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              style={[styles.catBtn, catAtiva === c && styles.catBtnActive, { paddingVertical: spacing / 2, minHeight: 44 }]}
              onPress={() => setCatAtiva(c)}
            >
              <Text style={[styles.catText, catAtiva === c && styles.catTextActive, { fontSize: fontSize.md }]}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner */}
        <View style={[styles.banner, { marginHorizontal: containerPadding, padding: spacing }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.bannerLabel, { fontSize: fontSize.sm }]}>Promoção do dia</Text>
            <Text style={[styles.bannerTitle, { fontSize: fontSize.xl }]}>{cat.banner.titulo}</Text>
            <View style={styles.bannerBadge}>
              <Text style={[styles.bannerBadgeText, { fontSize: fontSize.sm }]}>{cat.banner.badge}</Text>
            </View>
          </View>
          <View style={[styles.bannerImgPlaceholder, { width: isMobile ? 60 : 80, height: isMobile ? 60 : 80 }]}>
            <Text style={{ fontSize: 32 }}>🍺</Text>
          </View>
        </View>

        {/* Produtos */}
        <Text style={[styles.sectionTitle, { marginHorizontal: containerPadding, fontSize: fontSize.lg }]}>Mais pedidos</Text>
        <View style={[styles.grid, { paddingHorizontal: containerPadding / 2, marginBottom: 20 }]}>
          {cat.produtos.map((p: any, i: number) => (
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
                  handleAddToCart(p);
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
          <Text style={[styles.navIcon, { fontSize: fontSize.lg }]}>🏠</Text>
          <Text style={[styles.navLabel, { fontSize: fontSize.sm }]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[styles.navItem, { minHeight: 56 }]} onPress={() => router.push('/catalog')}>
          <Text style={[styles.navIcon, styles.navActive, { fontSize: fontSize.lg }]}>⊞</Text>
          <Text style={[styles.navLabel, styles.navActive, { fontSize: fontSize.sm }]}>Catálogo</Text>
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
  header: { backgroundColor: '#F5C800', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  backBtn: { width: 38, height: 38, backgroundColor: '#412402', borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, color: '#fff' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#412402' },
  cats: { marginVertical: 14, flexDirection: 'row' },
  catBtn: { backgroundColor: '#2C2C2C', borderRadius: 20, paddingHorizontal: 16, marginRight: 8 },
  catBtnActive: { backgroundColor: '#F5C800' },
  catText: { color: '#aaa', fontWeight: '400' },
  catTextActive: { color: '#412402', fontWeight: '600' },
  banner: { backgroundColor: '#2C2C2C', borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  bannerLabel: { color: '#F5C800', marginBottom: 4, fontWeight: '500' },
  bannerTitle: { fontWeight: '600', color: '#fff', marginBottom: 8 },
  bannerBadge: { backgroundColor: '#F5C800', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  bannerBadgeText: { fontWeight: '600', color: '#412402' },
  bannerImgPlaceholder: { borderRadius: 35, backgroundColor: '#412402', alignItems: 'center', justifyContent: 'center' },
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