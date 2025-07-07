import { SocialMediaPost, MediaItem } from '../types/social-media';

/**
 * Formatea un post de redes sociales para Telegram
 */
export function formatPostForTelegram(post: SocialMediaPost): string {
  const platformEmoji = getPlatformEmoji(post.platform);
  const author = post.author;
  const content = post.content || '';
  const stats = formatStats(post);
  
  let message = `${platformEmoji} <b>${post.platform.toUpperCase()}</b>\n`;
  message += `👤 <b>Autor:</b> ${author}\n`;
  
  if (content) {
    message += `\n📝 <b>Contenido:</b>\n${content}\n`;
  }
  
  if (stats) {
    message += `\n${stats}\n`;
  }
  
  message += `\n🔗 <a href="${post.url}">Ver original</a>`;
  
  return message;
}

/**
 * Obtiene el emoji correspondiente a la plataforma
 */
export function getPlatformEmoji(platform: string): string {
  const emojis: Record<string, string> = {
    twitter: '🐦',
    instagram: '📷',
    tiktok: '🎵'
  };
  
  return emojis[platform] || '📱';
}

/**
 * Formatea las estadísticas del post
 */
export function formatStats(post: SocialMediaPost): string {
  const stats = [];
  
  if (post.likes !== undefined) {
    stats.push(`❤️ ${post.likes.toLocaleString()}`);
  }
  
  if (post.shares !== undefined) {
    stats.push(`🔄 ${post.shares.toLocaleString()}`);
  }
  
  if (post.comments !== undefined) {
    stats.push(`💬 ${post.comments.toLocaleString()}`);
  }
  
  return stats.length > 0 ? stats.join(' | ') : '';
}

/**
 * Obtiene el tipo de medio principal del post
 */
export function getMainMediaType(post: SocialMediaPost): 'image' | 'video' | 'gif' | null {
  if (!post.media || post.media.length === 0) {
    return null;
  }
  
  return post.media[0].type;
}

/**
 * Filtra medios por tipo
 */
export function filterMediaByType(media: MediaItem[], type: 'image' | 'video' | 'gif'): MediaItem[] {
  return media.filter(item => item.type === type);
}

/**
 * Obtiene la URL del thumbnail principal
 */
export function getMainThumbnail(post: SocialMediaPost): string | null {
  if (!post.media || post.media.length === 0) {
    return null;
  }
  
  return post.media[0].thumbnail || post.media[0].url;
}

/**
 * Formatea la duración de un video
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Crea un mensaje de error formateado
 */
export function formatErrorMessage(platform: string, error: string): string {
  const emoji = getPlatformEmoji(platform);
  return `${emoji} <b>Error al procesar ${platform.toUpperCase()}</b>\n\n❌ ${error}`;
} 