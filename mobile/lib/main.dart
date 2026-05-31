import 'package:flutter/material.dart';
import 'models/user.dart';
import 'screens/chat_screen.dart';
import 'screens/login_screen.dart';
import 'services/api_service.dart';
import 'services/auth_service.dart';

const apiBaseUrl = String.fromEnvironment('API_BASE_URL', defaultValue: 'http://10.0.2.2:8080');

void main() {
  runApp(const MahinAiApp());
}

class MahinAiApp extends StatefulWidget {
  const MahinAiApp({super.key});

  @override
  State<MahinAiApp> createState() => _MahinAiAppState();
}

class _MahinAiAppState extends State<MahinAiApp> {
  late final ApiService _apiService;
  late final AuthService _authService;
  AuthState? _authState;

  @override
  void initState() {
    super.initState();
    _apiService = ApiService(baseUrl: apiBaseUrl);
    _authService = AuthService(_apiService);
    _bootstrapAuth();
  }

  Future<void> _bootstrapAuth() async {
    final token = await _authService.getSavedToken();
    if (token == null) return;
    try {
      final profile = await _apiService.get('/api/users/me', token: token);
      setState(() {
        _authState = AuthState(user: User.fromJson(profile['user'] as Map<String, dynamic>), accessToken: token);
      });
    } catch (_) {
      await _authService.logout();
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mahin AI',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.indigo),
      home: _authState == null
          ? LoginScreen(
              authService: _authService,
              onLoggedIn: (state) => setState(() => _authState = state),
            )
          : ChatScreen(
              apiService: _apiService,
              authState: _authState!,
              onLogout: () async {
                await _authService.logout();
                setState(() => _authState = null);
              },
            ),
    );
  }
}
