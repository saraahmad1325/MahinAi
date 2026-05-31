import bcrypt from 'bcryptjs';

export const hashValue = async (value: string): Promise<string> => bcrypt.hash(value, 12);
export const compareValue = async (value: string, hash: string): Promise<boolean> => bcrypt.compare(value, hash);
