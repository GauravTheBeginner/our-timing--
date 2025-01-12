// Storage path utilities
export function createAvatarPath(userId: string, fileName: string): string {
  const fileExt = fileName.split('.').pop();
  return `${userId}/avatar.${fileExt}`;
}

export function getAvatarFolder(userId: string): string {
  return userId;
}