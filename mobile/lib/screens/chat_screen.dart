import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key, required this.apiService, required this.authState, required this.onLogout});

  final ApiService apiService;
  final AuthState authState;
  final VoidCallback onLogout;

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> _messages = [];
  String? _chatId;

  Future<void> _send() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _messages.add({'role': 'user', 'content': text});
      _controller.clear();
    });

    try {
      final response = await widget.apiService.post(
        '/api/chat/message',
        {'chatId': _chatId, 'prompt': text},
        token: widget.authState.accessToken,
      );

      setState(() {
        _chatId = response['chatId'] as String;
        _messages.add({'role': 'assistant', 'content': response['reply'] as String});
      });
    } catch (e) {
      setState(() => _messages.add({'role': 'assistant', 'content': 'Error: $e'}));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Hello ${widget.authState.user.fullName}'),
        actions: [IconButton(onPressed: widget.onLogout, icon: const Icon(Icons.logout))],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return ListTile(
                  title: Text(msg['content'] ?? ''),
                  subtitle: Text(msg['role'] ?? ''),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(hintText: 'Ask Mahin AI...'),
                  ),
                ),
                IconButton(onPressed: _send, icon: const Icon(Icons.send))
              ],
            ),
          )
        ],
      ),
    );
  }
}
