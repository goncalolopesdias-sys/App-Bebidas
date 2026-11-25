import { useCart } from '@/context/cart-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const imagens: any = {
  sagres: require('../../assets/images/sagres.jpeg'),
  superbock: require('../../assets/images/superbock.jpeg'),
  heineken: require('../../assets/images/heineken.jpeg'),
  argus: require('../../assets/images/argus.jpeg'),
  absolut: require('../../assets/images/absolut.jpeg'),
  smirnoff: require('../../assets/images/smirnoff.jpeg'),
  greygoose: require('../../assets/images/GreyGoose.jpeg'),
  ultimat: require('../../assets/images/UltimateVodka.png'),
  jackdaniels: require('../../assets/images/jackdaniels.jpeg'),
  johnniewalker: require('../../assets/images/johnniewalker.jpeg'),
  jameson: require('../../assets/images/jameson.jpeg'),
  glenfiddich: require('../../assets/images/glenfiddich.jpeg'),
};

export default function DetailScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const { nome, preco, imgKey, sub } = useLocalSearchParams();
  const [qty, setQty] = useState(1);

  const precoNum = parseFloat(preco as string);
  const img = imagens[imgKey as string] || imagens['sagres'];

  const isVodka = ['absolut', 'smirnoff', 'greygoose', 'ultimat'].includes(imgKey as string);
  const isWhisky = ['jackdaniels', 'johnniewalker', 'jameson', 'glenfiddich'].includes(imgKey as string);

  const tags = isVodka
    ? ['Premium', 'Suave', 'Refinada']
    : isWhisky
    ? ['Envelhecido', 'Complexo', 'Sofisticado']
    : ['Refrescante', 'Encorpada', 'Clássica'];

  const descricao = isVodka
    ? 'Uma vodka premium com sabor suave e refinado. Destilada com os melhores ingredientes para uma experiência única e sofisticada. Perfeita para cocktails ou pura com gelo.'
    : isWhisky
    ? 'Um whisky de qualidade superior com notas de baunilha, caramelo e carvalho. Envelhecido em barris selecionados para um sabor rico e complexo. Perfeita para apreciar puro ou com gelo.'
    : 'Uma das cervejas mais icónicas de Portugal. Com um sabor suave e equilibrado, notas refinadas e um final limpo e refrescante. Perfeita para qualquer ocasião.';

  const handleAdd = () => {
    addItem({
      nome: nome as string,
      preco: precoNum,
      img,
    });
    router.push('/cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem hero */}
      <View style={styles.hero}>
        <Image source={img} style={styles.heroImg} resizeMode="cover" />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favBtn}>
          <Text style={styles.favIcon}>🤍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body}>
        {/* Nome e preço */}
        <View style={styles.headerRow}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.preco}>{precoNum.toFixed(2)}€</Text>
        </View>
        <Text style={styles.sub}>{sub || 'Lager - 33cl'}</Text>

        {/* Tags */}
        <View style={styles.tags}>
          {tags.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Descrição */}
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.desc}>{descricao}</Text>

        {/* Quantidade */}
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNum}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.total}>Total: <Text style={styles.totalVal}>{(precoNum * qty).toFixed(2)}€</Text></Text>
        </View>

        {/* Botão */}
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>🛒 Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2a2a2a' },
  hero: { width: '100%', height: 280, position: 'relative' },
  heroImg: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18, color: '#fff' },
  favBtn: { position: 'absolute', top: 16, right: 16, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  favIcon: { fontSize: 18 },
  body: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  nome: { fontSize: 22, fontWeight: '800', color: '#fff', flex: 1 },
  preco: { fontSize: 22, fontWeight: '800', color: '#F5C800' },
  sub: { fontSize: 13, color: '#aaa', marginBottom: 12 },
  tags: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  tag: { borderWidth: 1, borderColor: '#444', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { fontSize: 11, color: '#aaa' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 8 },
  desc: { fontSize: 13, color: '#aaa', lineHeight: 22, marginBottom: 20 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  qtyBtn: { width: 36, height: 36, backgroundColor: '#3a3a3a', borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#444' },
  qtyBtnText: { fontSize: 20, color: '#fff' },
  qtyNum: { fontSize: 18, fontWeight: '700', color: '#fff', minWidth: 24, textAlign: 'center' },
  total: { fontSize: 13, color: '#aaa' },
  totalVal: { color: '#fff', fontWeight: '700' },
  addBtn: { width: '100%', padding: 16, backgroundColor: '#F5C800', borderRadius: 14, alignItems: 'center', marginBottom: 20 },
  addBtnText: { fontSize: 16, fontWeight: '800', color: '#412402' },
});