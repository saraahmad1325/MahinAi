class User {
  final String id;
  final String email;
  final String fullName;
  final String role;

  const User({required this.id, required this.email, required this.fullName, required this.role});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'] as String,
      email: json['email'] as String,
      fullName: json['fullName'] as String,
      role: json['role'] as String,
    );
  }
}
