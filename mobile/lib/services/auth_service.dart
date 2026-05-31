import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import 'api_service.dart';

class AuthState {
  final User user;
  final String accessToken;

  const AuthState({required this.user, required this.accessToken});
}

class AuthService {
  AuthService(this.api);

  final ApiService api;

  Future<AuthState> login(String email, String password) async {
    final response = await api.post('/api/auth/login', {'email': email, 'password': password});
    final token = response['accessToken'] as String;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', token);
    return AuthState(user: User.fromJson(response['user'] as Map<String, dynamic>), accessToken: token);
  }

  Future<void> register(String fullName, String email, String password) async {
    await api.post('/api/auth/register', {'fullName': fullName, 'email': email, 'password': password});
  }

  Future<String?> getSavedToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('accessToken');
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('accessToken');
  }
}
