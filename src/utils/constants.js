/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// Những domain được phép truy cập tới tài nguyên của Server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173' // Không cần localhost nữa vì ở file config/cors đã luôn luôn cho phép môi trường dev
  // sau nay deploy len domain chinh thuc
  'https://trello-web-one-gamma.vercel.app'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}