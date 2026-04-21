# PRD: 강의지역 맛집 파인더 (LectureFoodFinder)
> **작성 목적:** Claude Code 기반 구현을 위한 실행 가능한 제품 요구사항 문서  
> **버전:** v1.0 | **작성일:** 2026-04-20 | **대상:** 청람M&C 대표 개인 사용

---

## 0. 문서 사용 가이드 (Claude Code 전용)

```
이 PRD를 Claude Code에 전달하는 방법:
1. 이 파일 전체를 Claude Code 세션에 붙여넣기
2. 또는: "PRD에 따라 MVP를 구현해줘" + 파일 첨부
3. 섹션별 구현 시: "Section 5 API 설계대로 구현해줘"
```

**Claude Code 작업 우선순위:**
1. `MUST` → 반드시 구현 (MVP 범위)
2. `SHOULD` → 가능하면 구현 (v1.1)
3. `COULD` → 여유 시 구현 (v2.0)
4. `WON'T` → 이번 버전 제외

---

## 1. 서비스 정의

### 1.1 한 줄 정의
> **"강의 나가는 날, 목적지 근처 맛집을 자동으로 찾아주는 나만의 밥집 비서"**

### 1.2 핵심 문제
| 문제 | 현재 해결 방식 | 불편함 |
|------|--------------|--------|
| 낯선 지역 밥집 탐색 | 네이버지도 직접 검색 | 매번 반복, 필터 재설정 |
| 강의 전후 시간 맞춤 | 없음 | 빠른 식사 vs 여유 식사 구분 불가 |
| 혼밥 최적 장소 | 없음 | 분위기·좌석 정보 없음 |
| 재방문 기록 | 메모장 | 체계적 관리 안 됨 |

### 1.3 타겟 사용자
- **1순위 (본인):** 청람M&C 대표, 연 100회+ 외부 강의, 혼밥 多
- **2순위 (확장):** 외부 출강이 잦은 강사·컨설턴트·영업직

### 1.4 성공 기준 (MVP)
- [ ] 목적지 입력 → 맛집 리스트 10초 내 표시
- [ ] 재방문 맛집 즐겨찾기 저장
- [ ] 강의 전/후 맥락별 필터 1-tap 작동

---

## 2. 핵심 사용자 시나리오

### 시나리오 A: 출발 전 탐색 (주 사용)
```
1. 앱 실행 → "오늘 강의지" 입력 (예: "수원 경기도인재개발원")
2. 강의 시간 선택 (오전/오후/저녁)
3. 맛집 리스트 확인 → 마음에 드는 곳 즐겨찾기
4. 지도 앱으로 이동 (네이버지도/카카오맵 연동)
```

### 시나리오 B: 현장 즉흥 탐색
```
1. 강의 종료 → 앱 실행
2. "지금 위치" 버튼 탭 → 반경 500m 리스트 즉시 표시
3. "빠른 식사" 필터 → 단일 메뉴·회전율 높은 곳 우선
4. 전화걸기 / 길찾기
```

### 시나리오 C: 재방문 관리
```
1. 맛집 상세 → "다시 오고 싶어" 별점 + 메모 저장
2. 다음 번 같은 지역 강의 시 → "여기 가봤던 데" 뱃지 표시
3. 즐겨찾기 목록 → 지역별/카테고리별 정렬
```

---

## 3. 기능 요구사항

### 3.1 MUST (MVP 필수)

#### F-01: 장소 검색
- 텍스트로 목적지 입력 (기관명, 주소 모두 가능)
- 자동완성 지원 (Kakao Local API)
- 최근 검색 5개 저장

#### F-02: 맛집 리스트
- 목적지 반경 500m / 1km / 2km 선택
- 기본 정렬: 거리순
- 표시 항목: 이름, 카테고리, 거리, 평점, 영업 여부

#### F-03: 맥락 필터 (1-tap)
- 🚀 빠른 식사 (30분 내): 분식·국밥·한식 백반 우선
- 🍽️ 여유 식사 (1시간): 전 카테고리
- ☕ 카페: 카페·디저트만
- 🌙 저녁/회식: 고기·술집 포함

#### F-04: 즐겨찾기
- 맛집 저장/삭제
- 저장 시 간단 메모 (선택)
- 로컬 저장 (서버 불필요)

#### F-05: 외부 앱 연동
- 네이버지도로 길찾기 (딥링크)
- 카카오맵으로 길찾기 (딥링크)
- 전화 연결

### 3.2 SHOULD (v1.1)

#### F-06: 스마트 추천 점수
- 거리 + 평점 + 리뷰수 + 영업여부 가중치 계산
- "추천순" 정렬 옵션 추가

#### F-07: 방문 기록
- 방문 표시 토글
- 지역별 방문 히스토리 목록

#### F-08: 강의 일정 연동
- 수동 일정 입력 (날짜·장소·시간)
- 강의 당일 알림: "오늘 [장소] 강의, 근처 맛집 보기"

### 3.3 COULD (v2.0)

#### F-09: AI 추천 멘트
- "대표님, 오늘 수원 강의 전 30분, 국밥 한 그릇 어떠세요?"
- Gemini API 활용, 날씨·시간 맥락 반영

#### F-10: 리뷰 요약
- 블로그 리뷰 크롤링 or AI 요약
- "혼밥 가능", "주차 됨", "빠른 서비스" 키워드 태그

---

## 4. 추천 시스템 로직

### 4.1 기본 정렬식

```python
def calculate_score(place, context):
    """
    place: {distance_m, rating, review_count, is_open, category}
    context: {meal_type, time_budget_min}
    """
    
    # 거리 점수 (가까울수록 높음, 500m 기준 정규화)
    distance_score = max(0, 1 - place['distance_m'] / 500) * 40
    
    # 평점 점수 (5점 만점 기준)
    rating_score = (place['rating'] / 5.0) * 30
    
    # 리뷰 신뢰도 (리뷰 100개 이상이면 보너스)
    review_bonus = min(place['review_count'] / 100, 1.0) * 10
    
    # 영업 여부 (닫혀 있으면 0점)
    open_score = 20 if place['is_open'] else 0
    
    # 맥락 보너스
    context_bonus = 0
    if context['meal_type'] == 'quick' and place['category'] in ['국밥', '분식', '한식']:
        context_bonus = 15
    if context['meal_type'] == 'cafe' and place['category'] == '카페':
        context_bonus = 20
    
    return distance_score + rating_score + review_bonus + open_score + context_bonus
```

### 4.2 필터 우선순위 체계

```
영업중 > 거리 500m 이내 > 평점 3.5+ > 리뷰 10개+
→ 결과 부족 시: 반경 1km 확대 → 평점 조건 완화 → 카테고리 확장
```

### 4.3 시간대별 카테고리 가중치

| 시간대 | 우선 카테고리 | 제외 카테고리 |
|--------|------------|------------|
| 07-10시 | 카페, 해장국 | 술집 |
| 11-14시 | 한식, 중식, 분식 | - |
| 14-17시 | 카페, 베이커리 | - |
| 17-21시 | 전체 | - |
| 21시+ | 야식, 24시 영업 | - |

---

## 5. 데이터/API 설계

### 5.1 API 선택 (Claude Code 구현 기준)

```yaml
Primary: Kakao Local API (무료, 한국 특화)
  - 장소 검색: GET /v2/local/search/keyword.json
  - 카테고리 검색: GET /v2/local/search/category.json
  - 좌표→주소: GET /v2/local/geo/coord2address.json
  - 인증: REST API Key (Header: Authorization: KakaoAK {key})
  - 일일 무료: 300,000 쿼리
  - 응답: 이름, 주소, 좌표, 카테고리, 전화번호, 상세URL

Fallback: Naver Local API
  - 일일 25,000 쿼리 무료
  - 응답 유사 (평점 없음 주의)

위치 획득: Browser Geolocation API (웹) / React Native Location (앱)
```

### 5.2 API 호출 흐름

```
[사용자 입력: "수원역"]
    ↓
[Kakao Local: keyword.json?query=수원역] → 좌표(x,y) 추출
    ↓
[Kakao Local: category.json?category_group_code=FD6&x=&y=&radius=500]
    → FD6: 음식점, CE7: 카페
    ↓
[결과 배열] → score 계산 → 정렬 → UI 렌더링
```

### 5.3 로컬 데이터 스키마

```typescript
// 즐겨찾기 (localStorage or SQLite)
interface Favorite {
  id: string;           // kakao place id
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  phone?: string;
  memo?: string;        // 사용자 메모
  visited: boolean;
  savedAt: string;      // ISO date
  region: string;       // "수원", "대전" 등 자동 추출
}

// 최근 검색지
interface RecentSearch {
  query: string;
  lat: number;
  lng: number;
  searchedAt: string;
}
```

### 5.4 환경변수 (.env)

```bash
KAKAO_REST_API_KEY=your_key_here
NAVER_CLIENT_ID=your_id_here        # fallback
NAVER_CLIENT_SECRET=your_secret_here
```

---

## 6. 앱 화면 구조

### 6.1 화면 목록

```
├── Screen 1: 홈 (검색)
├── Screen 2: 맛집 리스트
├── Screen 3: 맛집 상세
├── Screen 4: 즐겨찾기 목록
└── Screen 5: 설정 (API키, 기본 반경)
```

### 6.2 화면별 상세

#### Screen 1: 홈 (검색)
```
┌─────────────────────────────┐
│  🍽️ 강의지 맛집 파인더        │
├─────────────────────────────┤
│  [📍 현재 위치 사용]           │
│  ─────── 또는 ───────        │
│  [ 목적지 검색...        🔍 ] │
│  최근: 수원역 / 세종청사 / KAIST│
├─────────────────────────────┤
│  맥락 선택                   │
│  [🚀빠른] [🍽️여유] [☕카페]  │
│                              │
│  반경: [500m] [1km] [2km]   │
├─────────────────────────────┤
│  [맛집 찾기]                 │
└─────────────────────────────┘
```

#### Screen 2: 맛집 리스트
```
┌─────────────────────────────┐
│  ← 수원역 근처 · 23곳         │
│  정렬: [추천순▼] [거리] [평점] │
├─────────────────────────────┤
│  ★ 4.5  [즐겨찾기 ♡]        │
│  진미식당 · 한식 · 230m       │
│  ● 영업중 · 점심특선 7,000원   │
├─────────────────────────────┤
│  ★ 4.3                      │
│  스타벅스 수원역점 · 카페 · 180m│
│  ● 영업중                    │
├─────────────────────────────┤
│  ...                        │
└─────────────────────────────┘
```

#### Screen 3: 맛집 상세
```
┌─────────────────────────────┐
│  ← 진미식당              ♡  │
├─────────────────────────────┤
│  한식 · ★ 4.5 (리뷰 142)    │
│  수원시 팔달구 매산로 12       │
│  230m · 도보 3분             │
│  ● 영업중 (11:00-21:00)      │
├─────────────────────────────┤
│  [📞 전화] [🗺️ 네이버지도]   │
│           [카카오맵]         │
├─────────────────────────────┤
│  메모 (나만 보임)             │
│  [ 혼밥 OK, 국밥 맛있음    ]  │
│  [방문완료 ✓] [저장]         │
└─────────────────────────────┘
```

---

## 7. MVP 개발 계획

### 7.1 기술 스택 결정

```
형태: 웹앱 (PWA) — 앱스토어 없이 스마트폰 바로가기 설치 가능
프레임워크: HTML/CSS/Vanilla JS (단일 파일, 청람 스타일)
저장소: localStorage (서버 없음, 비용 0)
배포: GitHub Pages (crmc.co.kr 서브경로)
```

**선택 이유:**
- Claude Code로 즉시 구현 가능
- 설치 없이 QR코드로 스마트폰 접근
- 유지비 0원
- crmc.co.kr/foodfinder 로 바로 배포 가능

### 7.2 스프린트 계획

#### Sprint 1 (Day 1-2): 코어 기능
```
- [ ] index.html 기본 구조 + 청람 브랜드 적용
- [ ] Kakao Local API 연동 (장소 검색)
- [ ] 맛집 리스트 렌더링
- [ ] 거리 계산 (Haversine 공식)
```

#### Sprint 2 (Day 3-4): UX 완성
```
- [ ] 맥락 필터 (빠른/여유/카페)
- [ ] 추천 점수 계산 적용
- [ ] 즐겨찾기 (localStorage)
- [ ] 외부 앱 딥링크 (네이버지도/카카오맵)
```

#### Sprint 3 (Day 5): 배포
```
- [ ] PWA manifest.json + Service Worker
- [ ] crmc.co.kr/foodfinder 배포
- [ ] QR코드 생성
- [ ] 모바일 UX 최종 점검
```

### 7.3 MVP 제외 범위

```
❌ 사용자 회원가입/로그인
❌ 서버/DB (localStorage로 대체)
❌ 푸시 알림
❌ 리뷰 크롤링
❌ AI 추천 멘트 (v2.0으로 이동)
❌ 안드로이드/iOS 네이티브 앱
```

---

## 8. 기술 스택

### 8.1 최종 선택

```yaml
Frontend:
  - HTML5 / CSS3 (청람 브랜드 적용)
  - Vanilla JavaScript (의존성 최소화)
  - PWA (manifest + service worker)
  
API:
  - Kakao Local API (장소 검색, 무료)
  - Browser Geolocation API (현재 위치)
  
Storage:
  - localStorage (즐겨찾기, 최근검색, 설정)
  
Deploy:
  - GitHub Pages → crmc.co.kr/foodfinder

추후 확장:
  - Gemini API (AI 추천 멘트, v2.0)
  - Google Calendar API (강의 일정 연동, v2.0)
```

### 8.2 파일 구조

```
foodfinder/
├── index.html          # 메인 앱 (싱글 파일 우선)
├── manifest.json       # PWA 설정
├── sw.js              # Service Worker
├── icons/             # 앱 아이콘
└── README.md          # 배포 가이드
```

---

## 9. 리스크 및 대응

| 리스크 | 가능성 | 대응 |
|--------|--------|------|
| Kakao API 키 노출 (클라이언트 사이드) | 높음 | 도메인 허용 설정으로 제한, 개인 사용이므로 허용 범위 |
| 맛집 결과 부족 (소도시) | 중간 | 반경 자동 확대 로직 적용 |
| 영업시간 정보 부정확 | 높음 | "영업정보는 변경될 수 있음" 안내 문구 |
| 모바일 위치 권한 거부 | 낮음 | 수동 주소 입력으로 대체 |
| Kakao API 정책 변경 | 낮음 | Naver Local API fallback 준비 |

---

## 10. 다음 단계 (Claude Code 지시 순서)

### Claude Code에 이렇게 요청하세요:

```
Step 1:
"PRD_lecture_foodfinder.md를 참고해서
 Sprint 1부터 시작해줘.
 Kakao REST API Key: [키 입력]
 crmc.co.kr 청람 브랜드 스타일 적용해서
 index.html 싱글파일로 만들어줘"

Step 2:
"맥락 필터와 추천 점수 로직 추가해줘 (Sprint 2)"

Step 3:
"PWA 설정하고 GitHub Pages 배포 준비해줘 (Sprint 3)"
```

### 확인이 필요한 사전 준비
- [ ] Kakao Developers 앱 등록 → REST API Key 발급
- [ ] crmc.co.kr GitHub 저장소 확인 (배포 경로)
- [ ] 도메인 허용 설정 (localhost + crmc.co.kr)

---

## Appendix: Kakao Local API 빠른 참조

```javascript
// 장소 검색 (키워드)
const searchPlace = async (query, x, y, radius = 500) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&x=${x}&y=${y}&radius=${radius}&category_group_code=FD6,CE7&sort=distance`,
    { headers: { Authorization: `KakaoAK ${KAKAO_KEY}` } }
  );
  return res.json();
};

// 응답 구조
{
  "documents": [{
    "id": "12345",
    "place_name": "진미식당",
    "category_name": "음식점 > 한식 > 백반,가정식",
    "category_group_code": "FD6",
    "phone": "031-123-4567",
    "address_name": "경기 수원시 팔달구...",
    "road_address_name": "경기 수원시 팔달구 매산로...",
    "x": "127.01234",  // 경도
    "y": "37.23456",   // 위도
    "distance": "230",  // 미터
    "place_url": "http://place.map.kakao.com/12345"
  }]
}
```

---

*PRD v1.0 | 청람M&C 내부 개발 문서 | Claude Code 최적화*
