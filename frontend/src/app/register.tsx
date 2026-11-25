import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const { registar } = useAuth();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = async () => {
  setErro('');
  if (!nome || !email || !senha) {
    setErro('Preenche todos os campos!');
    return;
  }
  if (senha.length < 4) {
    setErro('A password deve ter pelo menos 4 caracteres!');
    return;
  }
  try {
    await registar(nome, email, senha);
    router.push('/');
  } catch (err) {
    setErro(err instanceof Error ? err.message : 'Erro ao criar conta');
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍺</Text>
          <Text style={styles.title}>Registar</Text>
          <Text style={styles.subtitle}>Cria a tua conta gratis!</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Escolhe um username"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={styles.input}
              placeholder="O teu email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Cria uma password"
              placeholderTextColor="#888"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerBtnText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
          <Text style={styles.loginText}>Já tens conta? <Text style={styles.loginTextBold}>Clique aqui</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#412402' },
  content: { flex: 1, justifyContent: 'space-around', paddingHorizontal: 20 },
  header: { alignItems: 'center', marginTop: 40 },
  logo: { fontSize: 60, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: '#F5C800', letterSpacing: 1, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#EF9F27', textAlign: 'center' },
  form: { backgroundColor: '#2a2a2a', borderRadius: 20, padding: 20, marginVertical: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#fff', marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3a3a3a', borderRadius: 12, paddingHorizontal: 14, marginBottom: 16, borderWidth: 1, borderColor: '#444' },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, color: '#fff', fontSize: 14, paddingVertical: 14 },
  registerBtn: { backgroundColor: '#F5C800', borderRadius: 12, paddingVertical: 16, alignItems: 'center', minHeight: 56, marginTop: 8 },
  registerBtnText: { color: '#412402', fontSize: 16, fontWeight: '800' },
  erro: { color: '#ff6b6b', fontSize: 12, marginBottom: 12 },
  loginLink: { alignItems: 'center', marginBottom: 20 },
  loginText: { fontSize: 13, color: '#aaa' },
  loginTextBold: { color: '#EF9F27', fontWeight: '700' },
});