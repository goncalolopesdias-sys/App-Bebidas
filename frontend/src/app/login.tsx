import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    setErro('');
    try {
      await login(email, senha);
      router.push('/');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍺</Text>
          <Text style={styles.title}>LOGIN</Text>
          <Text style={styles.subtitle}>Bem vindo de volta!</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>👤</Text>
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
              placeholder="A tua password"
              placeholderTextColor="#888"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <Text style={styles.forgot}>Esqueci-me da password</Text>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity
            style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginBtnText}>
              {isLoading ? 'A entrar...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Continuar com Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerLink}>
          <Text style={styles.registerText}>Não tens conta? <Text style={styles.registerTextBold}>Clique aqui</Text></Text>
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
  title: { fontSize: 28, fontWeight: '800', color: '#F5C800', letterSpacing: 2, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#EF9F27', textAlign: 'center' },
  form: { backgroundColor: '#2a2a2a', borderRadius: 20, padding: 20, marginVertical: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#fff', marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3a3a3a', borderRadius: 12, paddingHorizontal: 14, marginBottom: 16, borderWidth: 1, borderColor: '#444' },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, color: '#fff', fontSize: 14, paddingVertical: 14 },
  forgot: { textAlign: 'right', color: '#EF9F27', fontSize: 12, marginBottom: 20, marginTop: -8 },
  loginBtn: { backgroundColor: '#F5C800', borderRadius: 12, paddingVertical: 16, alignItems: 'center', minHeight: 56 },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnText: { color: '#412402', fontSize: 16, fontWeight: '800' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#444' },
  dividerText: { fontSize: 12, color: '#888' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#3a3a3a', borderRadius: 12, paddingVertical: 14, borderWidth: 1, borderColor: '#444' },
  googleIcon: { fontSize: 16, fontWeight: '800', color: '#4285F4' },
  googleText: { fontSize: 14, color: '#fff', fontWeight: '600' },
  erro: { color: '#ff6b6b', fontSize: 12, marginBottom: 12 },
  demo: { backgroundColor: '#2C2C2C', borderRadius: 12, padding: 16 },
  demoTitle: { fontSize: 12, fontWeight: '600', color: '#F5C800', marginBottom: 8 },
  demoText: { fontSize: 12, color: '#aaa', marginBottom: 4 },
  registerLink: { alignItems: 'center', marginBottom: 20 },
  registerText: { fontSize: 13, color: '#aaa' },
  registerTextBold: { color: '#EF9F27', fontWeight: '700' },
});