import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  ApiService({required this.baseUrl});

  final String baseUrl;

  Future<Map<String, dynamic>> post(String path, Map<String, dynamic> body, {String? token}) async {
    final response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer ' + token,
      },
      body: jsonEncode(body),
    );

    final parsed = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 400) {
      throw Exception(parsed['message'] ?? 'Request failed');
    }
    return parsed;
  }

  Future<Map<String, dynamic>> get(String path, {String? token}) async {
    final response = await http.get(
      Uri.parse('$baseUrl$path'),
      headers: {
        if (token != null) 'Authorization': 'Bearer ' + token,
      },
    );

    final parsed = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 400) {
      throw Exception(parsed['message'] ?? 'Request failed');
    }
    return parsed;
  }
}
