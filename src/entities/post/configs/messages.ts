export const POST_MESSAGE = {
  ERROR: {
    TITLE_REQUIRED: '제목은 필수입니다.',
    CONTENT_REQUIRED: '내용은 필수입니다.',
    CATEGORY_REQUIRED: '카테고리는 필수입니다.',
    SLUG_REQUIRED: '슬러그는 필수입니다.',
    SLUG_MIN_LENGTH: '슬러그는 최소 3자 이상이어야 합니다.',
    SLUG_MAX_LENGTH: '슬러그는 30자를 초과할 수 없습니다.',
    SLUG_INVALID_FORMAT:
      'Slug는 소문자, 한글, 숫자, 하이픈(-)만 사용할 수 있습니다.',
    CREATE_FAILED: '포스트 생성 실패',
    UPDATE_FAILED: '포스트 수정 실패',
  },
} as const;
